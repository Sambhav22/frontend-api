import React, { Component } from 'react';

class EditInterview extends Component {


    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            name1: this.props.match.params.name1,
            name2: this.props.match.params.name2,
            start: this.props.match.params.start.replaceAll(",", "").replaceAll("-", "/"),
            end: this.props.match.params.end.replaceAll(",", "").replaceAll("-", "/")

        };
        this.press = this.press.bind(this);
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

        const { id, name2, name1, start, end } = this.state;
        if (start === "" || end === "") {
            alert("Please fill all fields");
            return;
        }
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, email1: name1, email2: name2, startTime: start, endTime: end })
        };
        fetch('https://node-app-apis.herokuapp.com/updateInterview', requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data.data.id)
                if (data.data.id === -1) {
                    alert("Interviewer Unavailable");
                } else if (data.data.id === -2) {
                    alert("Interviewee Unavailable")
                } else {
                    alert("Updated successfully")
                    window.location.assign("http://localhost:3000/")

                }
            });

    }















    render() {

        console.log(this.state)
        return (

            <div className="container">
                <div className="w-75 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">Edit Interview</h2>
                    <form>
                        <div className="form-group">
                            <label>Start Time Format: MM/DD/YYYY HH:MM AM/PM</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="11/12/2020 3:00 PM"
                                name="phone" value={this.state.start}
                                onChange={this.onInputchange3}
                            />
                        </div>

                        <div className="form-group">
                            <label>End Time Format: MM/DD/YYYY HH:MM AM/PM</label>

                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="11/12/2020 4:00 PM"
                                name="phone" value={this.state.end}
                                onChange={this.onInputchange4}
                            />
                        </div>
                        <button className="btn btn-primary btn-block" onClick={this.press.bind(this)}>Edit Interview</button>
                    </form>
                </div>
            </div >


        );
    }
}


export default EditInterview;