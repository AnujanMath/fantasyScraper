import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Team extends Component {
    constructor() {
        super();
        this.state = {
            players: [],
            loaded: false,
            open: true,
            newsData: []
        }

    }

    componentDidMount() {

        this.setState({ loaded: true })

    }

    playerNews(playerName) {

        axios({
            method: 'GET',
            url: "https://oauth.reddit.com/r/fantasybball/search.json?q=" + playerName + "&sort=new&restrict_sr=on",
            headers: {
                Authorization: `Bearer TOKEN`
            },

        }).then((res) => {

            debugger;
            let newsArray = (res.data.data.children)
            let parsedArray = []
            newsArray.forEach(element => {
                let tempObj = {
                    title: element.data.title,
                    url: "https://redd.it/"+element.data.id,
                    date : new Date(element.data.created_utc*1000).toDateString()  
                }
                parsedArray.push(tempObj)
            });
            this.setState({ newsData: parsedArray })
            /*             var output = "Returned:"
                        for (let i = 0; i < parsedArray.length; i++) {
                            output = output.concat(parsedArray[i].title + ": " + parsedArray[i].url)
            
                        }
                        this.setState({ newsData: output }) */
        }).catch(err =>
            console.log(err)
        );

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
        const items = []
        JSON.parse(localStorage.watchlist).forEach(element => {
            items.push(

                <div onClick={() => this.playerNews(element)} className="card">
                    <div className="card-body">

                        <h5 id="teamCard" className="card-title">{element}</h5>

                    </div>
                </div>

            )
        });

        return (
            <div>

                <Link to="/dashboard" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Back to
                    home
            </Link>

                <center><h1>Player List</h1></center>
                <center><h5>Select a player to view news</h5></center>
                <div class="col-1">

                    {this.state.loaded ? items : null}

                </div>


                <div class="col-2">                {this.state.newsData.length ? <table className="tat">
                    <tr><th>Title</th><th>Created at</th></tr>
                    {
                        this.state.newsData.map((dynamicData) =>
                            <tr className="trow"> <td><a href={dynamicData.url}>{dynamicData.title}</a>  
                            </td><td>{dynamicData.date}</td>
                            </tr>
                        )}
                </table> : null}</div>


            </div>
        )


    }
}
export default Team