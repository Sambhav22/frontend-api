import React, { Component } from 'react';
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            mode: "online"
        };
    }
    componentDidMount() {
        this.fetchAllRecords()
    }
    fetchAllRecords = () => {
        var headers = new Headers();
        headers.append("Content-Type", "application/json")
        fetch("https://node-app-apis.herokuapp.com/api/getAllInterviews", {
            method: "GET",
            headers: headers,

        }).then((res) => res.json()).then((result) => {
            console.log(result);
            this.setState({ users: result.data })
            localStorage.setItem("users", JSON.stringify(result.data))
        }).catch((error) => {
            this.setState({ mode: "offline" })
            let collection = localStorage.getItem("users");
            this.setState({ users: JSON.parse(collection) })
        })

    }



    deleteRecord = (id) => {

        var headers = new Headers();
        headers.append("Content-Type", "application/json")
        fetch("https://node-app-apis.herokuapp.com/deleteInterview/" + id
            , {
                method: "DELETE",
                headers: headers,

            }).then((res) => res.json()).then((result) => {
                console.log(result);
                this.fetchAllRecords()
            }).catch((error) => console.log(error))


    }

    render() {
        return (
            <div className="container">
                <div>
                    {
                        this.state.mode === "offline" ?
                            <div class="alert alert-warning" role="alert">
                                You are offline or some error with server    </div>
                            : null
                    }
                </div>
                <div className="py-4">
                    <h1>All Interviews</h1>
                    <table className="table border shadow">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Interviewer Name</th>
                                <th scope="col">Interviewee Name</th>
                                <th scope="col">Start Time</th>
                                <th>End Time</th>
                                <th colSpan="2">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <th scope="row">{user.email1.split("(")[0]}</th>
                                    <th scope="row">{user.email2.split("(")[0]}</th>
                                    <th scope="row">{new Date(user.startTime).toLocaleString()}</th>
                                    <th scope="row">{new Date(user.endTime).toLocaleString()}</th>
                                    <th>
                                        <Link to={"/editinterview/" + user.id + "/" + user.email1.split("(")[0] + "/" + user.email2.split("(")[0] + "/" + (new Date(user.startTime).toLocaleString().replaceAll("/", "-")).split(",") + "/" + (new Date(user.endTime).toLocaleString().replaceAll("/", "-")).split(",")}>      <Button variant="info" >
                                            Edit
												</Button></Link>
                                    </th>
                                    <th>
                                        <Button variant="danger" onClick={() => this.deleteRecord(user.id)}>
                                            Delete
												</Button>
                                    </th>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
}


export default Home;