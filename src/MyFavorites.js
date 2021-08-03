import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyFavorites.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import{Card,Button} from 'react-bootstrap';

class MyFavorites extends React.Component {
  constructor (props){
    super(props);
    this.state=({
        Link:process.env.REACT_APP_SERVER,
       show:false,
       color:[],
       index=0,
       showFormUpdated:false,
       title:'',
       imageUrl:'',
    })
}
componentDidMount=async()=>{
  const url =`http://localhost:3000/favrender`;
  const colorFav= await axios.get(url);
  this.setState({
    show:true,
    color:colorFav,

  })
}
deleteFun=async(index)=>{

  const id= this.state.color[index].id;
  const url =`http://localhost:3000/delete/${id}`;

  await axios.delete(url);
}
updateFun=(index)=>{
const updatedColor=this.state.color[index];
this.setState({
  showFormUpdated:true,
  title:updatedColor.title,
  imageUrl:updatedColor.imageUrl,
  index:index,
})
}
updatedForm=async(event)=>{
  event.preventDefault();
  const id= this.state.color[this.state.index].id;
  const data={
    title:this.title,
    imageUrl:this.imageUrl,

  }
  const url=`http://localhost:3000/updated`;
  const updated=await axios.put(url,data);
  this.setState
({
  color:updated,
})


}

  render() {
    
    return(
      <>
      {this.state.showFormUpdated && this.state.color.map((color,idx)=>{
        return(
          <form onSubmit={()=>this.updatedForm(event)} > 
            <label>title update</label>
            <input value={color.title}onChange={this.state.title} />
            <label>image update</label>
            <input value={color.imageUrl} onChange={this.state.imageUrl}/>
            <input value='submit'/>
          </form>
        )
      })}
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>
        {this.state.show && this.state.color.map((color,index)=>
        {
          return(
            <Card style={{ width: '18rem' }} index={index}>
<Card.Img variant="top" src={color.imageUrl} />
<Card.Body>
<Card.Title>{color.title}</Card.Title>
<Card.Text>
Hello all    </Card.Text>
<Button variant="primary" onClick={()=>this.deleteFun(index)}>delete</Button>
<Button variant="primary" onClick={()=>this.updateFun(index)}>update</Button>

</Card.Body>
</Card>
        )
        }
        )}
      </>
    )
  }
}

export default withAuth0(MyFavorites);

