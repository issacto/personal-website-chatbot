import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {sendText} from "./sendMessage"
import { ReactComponent as Logo } from "../images/audio.svg";
import "../../stylesheet.css"
import ParticlesBg from "particles-bg";
import emojiMapping from "../../components/map/emojiMap"
import backgroundMapping from "../../components/map/backgroundMap"
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Webcam from "react-webcam";
import {newSelfile} from "../../components/actions/sendMessage"
import { useSpeechSynthesis } from 'react-speech-kit';
import errorScreen from "../containers/error"
import  QuestionsSection from "../containers/questions"

const Dictaphone = () => {
  const [message, setMessage] = useState('Hi! This is ToTo! Click "Enter" or the button to start chatting');
  const [emoji, setEmoji] = useState('neutral');
  const [value, setValue] = useState('');
  const [type, setType] = useState('polygon');
  const [text, setText] = useState("Hi there! Press enter and ask me questions!");
  const { speak } = useSpeechSynthesis();

  const commands = [
    {
      command: 'reset',
      callback: () => resetTranscript()
    },
    {
      command: 'shut up',
      callback: () => {
        speak({ text: 'I wasn\'t talking' })
        setType('circle');
        setMessage('I wasn\'t talking.');
      }
    },
    {
      command: 'Hello',
      callback: () => {
        speak({ text: 'Hi there' })
        setMessage('Hi there');
      }
    },
    {
      command: 'what is',
      callback: () => setMessage('love!')
    },
  ]

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      newSelfile(imageSrc).then(data => { 
        setType(backgroundMapping.get(data));
        setEmoji(data)}).catch(err => {console.log("Error");console.log(err); return err})
      },
    [webcamRef]
  );

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,} = useSpeechRecognition({ 
      onResult: (result) => {
        setEmoji("neutral")
      },});
    
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  useEffect(() => {
      if (finalTranscript !== '') {
        console.log("do something here",'Got final result:', finalTranscript);
        setText(transcript)
        sendText(finalTranscript).then(data => { 
         
          speak({ text: data.message })
          if(data.personalWebsiteTrigger){
            openInNewTab(data.personalWebsiteTrigger)
            console.log("Here")
          }
        }).catch(err => {console.log("Error");console.log(err); return err})
        setEmoji("neutral")
        resetTranscript();
      }
  }, [interimTranscript, finalTranscript]);

  setInterval(() => {
    return
  }, 10000);


  useEffect(() => {
    const interval = setInterval(() => {
      capture()
    }, 9000);
    return () => clearInterval(interval);}, []);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return errorScreen;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return errorScreen;
    
  }
  
  const listenContinuously = () => {
    setEmoji("ear")
    SpeechRecognition.startListening({
      continuous: false,
      language: 'en-GB',
    });
  };


  return (
   <div className="audioMain">
      <KeyboardEventHandler
      handleKeys={['space', 'enter']}
      onKeyEvent={(key, e) => listenContinuously()} />
      
      <ParticlesBg type={type}  bg={true} />
      <div style={{marginBottom:"8vh"}}>
          < img className = "emojiLogo"src = {emojiMapping.get(emoji)}/>
      </div>

      

      <div style={{position:"fixed",right:"4vh", bottom:"25vh"}}>
          <Webcam
          ref={webcamRef}
              audio={false}
              height={300}
              screenshotFormat="image/jpeg"
              width={300}
          />
      </div>
      <QuestionsSection/>
        {listening ? 
        <div className="messageBox" style={{backgroundColor:"rgb(134, 18, 18)"}}>
        <div><p className="messageStyle">{ text}</p> </div></div>:
        <div className="messageBox" style={{backgroundColor:"rgb(7, 73, 7)"}}>
        <div><p className="messageStyle">{ text}</p> </div></div>}
      
   </div>
 );
};

export default Dictaphone;


