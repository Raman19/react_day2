import React from 'react';
import axios from 'axios';


export default class Apicall extends React.Component{
  constructor(props){
    super(props);
    this.state ={data:[]}
    this.fetch = this.fetch.bind(this);

  }
  fetch(){
    const num = this.number.value;
   axios.get(`https://qrng.anu.edu.au/API/jsonI.php?length=${num}&type=uint16`)
      .then((response) =>{
        const data = response.data.data;
        console.log(data);
        this.setState({data});

      })
      .catch(function (error) {
      console.log(error);
    });
  }
  render(){

    return (
      <div>
        <h1>Api Call</h1>
         <div>
           <input type="number" ref={node => this.number = node} />
           <button onClick={this.fetch} className="btn btn-success"> Fetch</button>
         </div>
          <br/>
          <ul>
         {
            this.state.data.map((e, i) => <li key={i}>{e}</li>)
         }
       </ul>
      </div>
    );
  }
}
