import React, { Component } from "react";
import "../../stylesheet.css"
import { Link } from "react-router-dom";
import Collapsible from 'react-collapsible';
import {InterviewQuestions,PersonalQuestions} from "../data/data"


export default class QuestionsContainer extends Component {
    render() {
        return(
            <div className="questionsContainer">
                <div className="bigBox" style={{backgroundColor:"rgb(32, 77, 83)",color:"white",border:" 1px solid black"}}>Sample Questions:</div>
                <Collapsible trigger={<div className="bigBox" style={{backgroundColor:"rgb(90, 197, 211)"}}>Interviewers Questions</div>}>
                    <div>
                    {
                    InterviewQuestions.map(item => (
                        <Collapsible trigger={<div className="mediumBox">{item[0]}</div>}>
                            <div className="smallBox">{item[1]}</div>
                         </Collapsible>
                    ))
                    }
                </div>
                </Collapsible>
                <Collapsible trigger={<div className="bigBox" style={{backgroundColor:"rgb(78, 174, 187)"}}>Personal Questions</div>}>
                    <div>
                    {
                    PersonalQuestions.map(item => (
                        <Collapsible trigger={<div className="mediumBox">{item[0]}</div>}>
                          <div className="smallBox">{item[1]}</div>
                         </Collapsible>
                    ))
                    }
                </div>
                </Collapsible>
                
                <Collapsible trigger={<div className="bigBox" style={{backgroundColor:"rgb(61, 139, 150)"}}>Others</div>}>
                <div className="mediumBox">Discover yourself...</div>
                </Collapsible>
                
            </div>
        )
    }



}