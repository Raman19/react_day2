import React from 'react';
import jsonp from 'jsonp';
import axios from 'axios';
import PouchDB from 'pouchdb'



export default class Movie extends React.Component{
  constructor(props){
    super(props);
    this.db = new PouchDB('kittens');
    this.state = {results:[]};
    this.search = this.search.bind(this);
    this.clear = this.clear.bind(this);
    this.add = this.add.bind(this);
  }
  search(){
    const searchName = this.movieName.value;
    const url = `http://www.omdbapi.com/?s=${searchName}&page=1`;
    axios.get(url)
       .then((response) =>{
         const results = response.data.Search;
         this.setState({results})

         console.log(response.data.Search);


       })
       .catch(function (error) {
       console.log(error);
     });
  }
  clear(){
    this.setState({results:[]})
  }
  add(event){
    var year = event.target.parentNode.parentNode.querySelector('.year').textContent
      var title = event.target.parentNode.parentNode.querySelector('.title').textContent
        var poster = event.target.parentNode.parentNode.querySelector('.poster').getAttribute("src")
      console.log(title,year,poster);
        var doc = {
            "_id":title,
            title,
            year,
            poster
            };
  this.db.put(doc).then(resp =>{
     console.log('rsp', resp);
  }).catch(function(err){
     console.log(err);
  })
  }
  componentDidMount(){


      this.db.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        console.log("haa");
      }).catch(function (err) {
        console.log(err);
      });


  }


  render(){
    return (
      <div>
        <h1>Movies</h1>
        <div className="panel panel-default">
          <div className="panel-body">
            <label>Movies</label>
            <input ref={n => this.movieName = n} type="text" />
            <button onClick={this.search} className="btn btn-primary btn-sm">Search</button>
            <button onClick={this.clear} className="btn btn-primary btn-sm">Clear</button>

          </div>
        </div>
        <div>
        <table  className="table table-striped">
         <thead>
           <tr>
             <th>Title</th>
             <th>Year</th>
             <th>Poster</th>
           </tr>
         </thead>
         <tbody>
         {
           this.state.results.map((e,i) =>{
             return(
               <tr key={i}>
               <td><button onClick={this.add} className="btn btn-success btn-xs">Add</button></td>
               <td className="title">{e.Title}</td>
               <td className="year">{e.Year}</td>
               <td className="poster"><img src={e.Poster}/></td>
               </tr>
             )
           })
         }
         </tbody>
        </table>
      </div>

      </div>
    );
  }
}
