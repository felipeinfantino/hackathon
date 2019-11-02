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


export const BACKEND_IP = 'http://18.185.43.108:3001';

function App() {
  return (
    <div className="App">
      <VRScene />
    </div>
  );
}


class VRScene extends React.Component {

  state = {
    images : [],
    currentImage: '',
}


componentDidMount() {
  axios.get(`${BACKEND_IP}/initialize`)
      .then(res => {
          console.log(res);
  })
     this.interval = setInterval(() => {
      axios.get(`${BACKEND_IP}/currentBase64`)
      .then(res => {
          const base64 =  'data:image/png;base64, ' + res.data;
          const shuldAppend = !this.state.images.includes(base64);
          if(shuldAppend){
            this.state.images.push(base64);
            console.log("changed ", base64);
            this.setState({images: [...this.state.images], currentImage: base64})

          }
      })
     }, 3000); 
     const elem = document.getElementById('my-texture');
     if(elem){
       elem.src = this.state.currentImage;
     }
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }
 

  getImage = () => {
    return this.state.images[0] ? this.state.images[0] : "";
  }

  getSrc = () => {
    return this.state.images.length === 0 ? '' : this.state.images[this.state.images.length -1];
  }

  render () {
    let material = {
      shader: 'flat',
      src : this.state.currentImage
  };
    console.log("this is the rendered", this.state.currentImage)
    return (

      // <div>
      //   <img src={this.state.currentImage} />
      // </div>
      <Scene>
      
      {this.state.images.length === 0 ? '' : this.state.images.map((image, index) => {
        return (
          <a-assets key={index}>
         <img id={index} src={image}></img> 
        </a-assets>
        )
      })}
      {/* <Asset src={material.src}/> */}
        <Entity geometry="primitive: box" material={{ src: this.getSrc()}} scale="5 5 1" position="0 1 -5"/>
    </Scene>
    );
  }
}

class Asset extends React.Component{


  render(){
    return(
    <a-assets>
          <img id="my-texture" src={this.props.src}></img> 
    </a-assets>
    );
  }

}

export default App;
