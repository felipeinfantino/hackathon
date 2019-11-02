import React, { Component } from 'react'
import axios from 'axios';
export class Header extends Component {

    state = {
        data: '',
        imageSrc: '',
    }

    componentDidMount() {
        // this.interval = setInterval(() => {
        //     axios.get(`http://localhost:3001/backendData`)
        //       .then(res => {
        //         console.log(res);
        //         this.setState({data: res.data.data})
        //       })
        // }, 1000);
        axios.get(`http://localhost:3001/test`)
              .then(res => {
                  console.log("recieveing image", res.data)
                this.setState({imageSrc: 'data:image/png;base64, ' + res.data})
              })
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {
        return (
            <div>
                This is the frontend, recieving data from backend
                Data recieved from backend : {this.state.data}
                {this.state.imageSrc === '' ? '' : <img src={this.state.imageSrc}/>}
            </div>
        )
    }
}

export default Header
