import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import { Button } from "react-bootstrap"

class Navbar extends Component {
    handleClick() {
        window.location.assign("http://localhost:3000/addInterview  ")
    }
    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" href="/">
                        Interview Creation App
        </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/">
                                    All Interviews
                       
                                </NavLink>
                            </li>
                        </ul>
                        <Link to="/addInterview">      <Button variant="danger" >
                                          Add Interviews
                    </Button>
                    </Link>	          

                    </div>

                </div>
            </nav>

        );
    }
}


export default Navbar;