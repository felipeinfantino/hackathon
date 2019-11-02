import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/layout/Header';

//this is the aframe imports
import 'aframe';


//this import doesnt seem to work
//import 'aframe-particle-system-component';

import {Entity, Scene} from 'aframe-react';
import ReactDOM from 'react-dom';
import axios from 'axios';  



function App() {
  return (
    <div className="App">
      <Header />
      <VRScene />
    </div>
  );
}


class VRScene extends React.Component {

  state = {
    images : [],
}


componentDidMount() {
     this.interval = setInterval(() => {
      axios.get('http://localhost:3001/currentBase64')
      .then(res => {
          console.log("recieveing image", res.data)

          const base64 =  'data:image/png;base64, ' + res.data;
          const shuldAppend = !this.state.images.includes(base64);
          if(shuldAppend){
            this.state.images.push(base64);
            this.setState({images: [...this.state.images]})

          }
      })
     }, 3000); 
     
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }
 

  getImage = () => {
    return this.state.images[0] ? this.state.images[0] : "";
  }

  render () {
    let material = {
      shader: 'flat',
      src : this.currentImageSource
  };
    return (

      <Scene>
    
      <a-assets>
         <img id="my-texture" src></img> 
         </a-assets>
        <Entity geometry="primitive: box" material="src: #my-texture"/>

    </Scene>
    );
  }
}


export default App;
