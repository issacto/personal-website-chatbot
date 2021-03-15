import React, { Component } from "react";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import emojiMapping from "../components/map/emojiMap";
import CoolKidLogo from "../components/images/emoji/png/coolkid.png";
import "../stylesheet.css";
import ParticlesBg from "particles-bg";
import logo from "../components/images/robotic.svg";
import Speech from 'react-speech';

export default class introScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {time : "NA",indicator :0 };
    }
    login=()=>{
        this.props.history.push("/videoScreen");
    }
    
    render() {
        let config = {
            num: [4, 7],
            rps: 0.1,
            radius: [5, 40],
            life: [1.5, 3],
            v: [2, 3],
            tha: [-40, 40],
            alpha: [0.6, 0],
            scale: [.1, 0.4],
            position: "all",
            color: ["random", "#ff0000"],
            cross: "dead",
            // emitter: "follow",
            random: 15
          };
      
          if (Math.random() > 0.85) {
            config = Object.assign(config, {
              onParticleUpdate: (ctx, particle) => {
                ctx.beginPath();
                ctx.rect(
                  particle.p.x,
                  particle.p.y,
                  particle.radius * 2,
                  particle.radius * 2
                );
                ctx.fillStyle = particle.color;
                ctx.fill();
                ctx.closePath();
              }
            });
          }
      
        return(
            <div className="main">
                <div className="mainPageContainer">
                    <div className="content">
                        <div className="content-overlay"></div>
                        < img  className = "logoBackground" src={logo} width="100%"/>
                        <div className="overlay">
                        <div className="content-details fadeIn-bottom">
                            <h3 className="content-title">Toto the Chatbot</h3>
                            <br/>
                            <p className="introStyle"> Ask me anything about I.T. {">_<"}</p>
                            <p className="introStyle"> Disclaimer: The website would not 
                            <br/>store your image/message data</p>

                            </div>
                        </div>
                    </div>
                    <p className = "oauthtext"> Press enter to start</p>
                </div>
            <KeyboardEventHandler
                handleKeys={['enter']}
                onKeyEvent={(key, e) =>{ switch(key){case 'enter': this.login(); break; }}} />
            <ParticlesBg type="cobweb" config={config} bg={true} />
            </div>
           
        )
    }



}