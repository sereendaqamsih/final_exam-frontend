import React, { Component } from 'react';
// import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import {Card,Button} from 'react-bootstrap';

class AllDataAPI extends Component {
    constructor (props){
        super(props);
        this.state=({
            Link:process.env.REACT_APP_SERVER,
            show:false,
            color:[],
        })
    }

    componentDidMount=async()=>{
        // let url =`http://localhost:3001/allColorData`;
        const url =`http://localhost:3000/allColorData`
        const color =await axios.get(url);
        this.setState({
            show:true,
            color:color,
        })
    }

addtofav=async(color)=>{
    let url=`${this.state.Link}/addtofav`;
    const response =await axios.post(url,color);

}



    render() {
        return (
            
            <div>
                {this.state.show && this.state.color.map((color,index)=>{
                    return(
                        <Card style={{ width: '18rem' }} index={index}>
  <Card.Img variant="top" src={color.imageUrl} />
  <Card.Body>
    <Card.Title>{color.title}</Card.Title>
    <Card.Text>
Hello all    </Card.Text>
    <Button variant="primary" onClick={()=>this.addtofav(color)}>add to fav</Button>
  </Card.Body>
</Card>
                    )
                })}
                <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3>
            </div>
        )
    }
}

// export default withAuth0(AllDataAPI);
export default (AllDataAPI);
