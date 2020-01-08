import React, { Component } from "react";
import Players from "./Players";
import { Link } from "react-router-dom";
import Search from "./Search";
class PlayerList extends Component {
  constructor() {
    super();
    this.state = {
      players : [],
      loaded : false
    } 
    this.changeHandler = this.changeHandler.bind(this)
  }
  componentDidMount() {
    fetch('https://www.balldontlie.io/api/v1/players')
      .then(res => res.json())
      .then((data) => {
        this.setState({ players: data.data })
        this.setState({loaded: true})
        debugger;
      })
      .catch(console.log)
  }
  changeHandler(value){
    fetch('https://www.balldontlie.io/api/v1/players?search='+value)
      .then(res => res.json())
      .then((data) => {
        this.setState({ players: data.data })
        this.setState({loaded: true})
        debugger;
      })
      .catch(console.log)
  }
  
  /*   componentDidMount() {
      fetch('https://www.balldontlie.io/api/v1/players')
      .then(results => {
        return results.json();
      }).then (data => {
        let players = data.results.map((pic) =>{
          return(
            <div key={pic.results}>
              {pic.first_name}
            </div>
          )
        })
        this.setState({players: players});
      })
      
    } */

  render() {
    return (
      
      <div style={{textAlign: "center"}}>
                    <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
         <Search updatedValue={this.changeHandler}/>
      {this.state.loaded ?  <Players players={this.state.players} />: null}

      </div>
     

    )


  }
}
export default PlayerList