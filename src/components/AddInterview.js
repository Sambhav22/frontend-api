import React, { Component } from 'react';
import Select from 'react-select';
import moment from 'moment';

class AddInterview extends Component {


    constructor(props) {
        super(props);

        this.state = {
            name1: "",
            name2: "",
            start: "",
            end: "",
            selectedOption: null,
            options: [],
            selectedOption2: null
        };

        this.press = this.press.bind(this);
    }
    componentDidMount() {

        var headers = new Headers();
        headers.append("Content-Type", "application/json")
        fetch("https://node-app-apis.herokuapp.com/api/getUsers", {
            method: "GET",
            headers: headers,

        }).then((res) => res.json()).then((result) => {
            const tempArray = [];

            result.data.forEach((element) => {
                tempArray.push({ label: `${element.name}`, value: element.name })

            })
            this.setState({ options: tempArray })
            console.log(tempArray)
        }).catch((error) => {
            console.log(error)
        })







    }







    onInputchange3 = (event) => {
        this.setState({
            start: event.target.value
        });

    }
    onInputchange4 = (event) => {
        this.setState({
            end: event.target.value
        });
    }
    press(e) {
        e.preventDefault();

        let { name1, name2, start, end } = this.state;
        if (name1 === "" || name2 === "" || start === "" || end === "") {
            alert("Please fill all fields");
            return;
        }
        if (name1 === name2) {
            alert("Interview and Interviewee cannot be same")
            return
        }
        start = moment(start).local().format('MM/DD/YYYY hh:mm A')
        end = moment(end).local().format('MM/DD/YYYY hh:mm A')

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email1: name1, email2: name2, startTime: start, endTime: end })
        };
        fetch('https://node-app-apis.herokuapp.com/insertInterview', requestOptions)
            .then(response => response.json())
            .then((data) => {

                console.log(data.data.id)
                if (data.data.id === -1) {
                    alert("Interviewer Unavailable");
                } else if (data.data.id === -2) {
                    alert("Interviewee Unavailable")
                } else {
                    alert("added successfully")
                    window.location.assign("http://localhost:3000/")

                }
            });

    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        this.setState({ name1: selectedOption.value })
        console.log(`Option selected:`, this.state.name1);
    };
    handleChange2 = selectedOption2 => {
        this.setState({ selectedOption2 });
        this.setState({ name2: selectedOption2.value })
        console.log(`Option selected:`, this.state.name2);
    };
    render() {
        const { selectedOption } = this.state;
        const { selectedOption2 } = this.state;
        return (

            <div className="container">
                <div className="w-75 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">Add Interview</h2>
                    <form>
                        <div className="form-group">
                            <label>Interviewer Name</label>

                            <Select
                                className=" form-control-lg"
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={this.state.options}
                            />



                        </div>
                        <div className="form-group">
                            <label>Interviewee Name</label>


                            <Select
                                className=" form-control-lg"
                                value={selectedOption2}
                                onChange={this.handleChange2}
                                options={this.state.options}
                            />


                        </div>
                        <div className="form-group">
                            <label>Start Time </label>
                            <input
                                type="datetime-local"
                                className="form-control form-control-lg"
                                name="phone" value={this.state.start}
                                onChange={this.onInputchange3}
                            />
                        </div>

                        <div className="form-group">
                            <label>End Time</label>

                            <input
                                type="datetime-local"
                                className="form-control form-control-lg"
                                placeholder="11/12/2020 4:00 PM"
                                name="phone" value={this.state.end}
                                onChange={this.onInputchange4}
                            />
                        </div>
                        <button className="btn btn-primary btn-block" onClick={this.press.bind(this)}>Add Interview</button>
                    </form>
                </div>
            </div >


        );
    }
}


export default AddInterview;