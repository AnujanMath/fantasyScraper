// src/components/contacts.js
import axios from "axios";

import React from 'react'

const togglePlayer = ((a) => {
    alert(a)
    let data = {
        email: localStorage.email,
        name: a
    }
    debugger;
    axios 
        .post("/api/users/togglePlayer", data)
        .then(function (res) {
            alert(res.data.toggle)
            localStorage.watchlist = res.data.body
        }).catch(err =>
            alert(err)
        );
});

const Players = ({ players }) => {

    return (
        <div>
            <center><h1>Player List</h1></center>
            {players.map((player) => (
                <div onClick={() => togglePlayer(player.first_name + " " + player.last_name)} className="card">
                    <div className="card-body">
                        <h5 className="card-title">{player.first_name} {player.last_name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{player.team.full_name}</h6>
                        <p className="card-text">{player.position}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Players