import React, { Component } from 'react'
import axios from 'axios';
export class Header extends Component {

    state = {
        data: '',
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            axios.get(`http://localhost:3001/backendData`)
              .then(res => {
                console.log(res);
                this.setState({data: res.data.data})
              })
        }, 1000);
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {
        return (
            <div>
                This is the frontend, recieving data from backend
                Data recieved from backend : {this.state.data}
            </div>
        )
    }
}

export default Header
