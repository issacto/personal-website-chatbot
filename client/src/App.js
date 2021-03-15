import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route,Router, Switch } from "react-router-dom";
import HomeScreen from "./screens/homeScreen";
import VideoScreen from "./screens/videoScreen";
import history from "./history";
import Footer from "./components/containers/footer"
import Header from "./components/containers/header"
import "./stylesheet.css"

function App() {
  return (
    <>
    
    <Router history={history}>
    <Header/>
    <div style={{minWidth:"99%",maxWidth:"99%"}}>
    
      <Route path="/" component={HomeScreen} exact />
      <Route path="/videoScreen" component={VideoScreen} exact />
      <Route/>
    </div>
    <Footer/>
    </Router >
    
    
    </>
    
  )
}

export default App;