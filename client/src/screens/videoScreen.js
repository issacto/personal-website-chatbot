import React, { Component } from "react";
import Dictaphone from "../components/actions/audioInput"



export default class videoScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <Dictaphone />
            </div>
        )
    }

}
