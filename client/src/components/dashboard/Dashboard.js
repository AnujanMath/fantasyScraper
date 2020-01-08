import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    axios 
        .post("/api/users/getWatchlist", localStorage.email)
        .then(function (res) {
            localStorage.watchlist = JSON.stringify(res.data)
            alert("Watchlist loaded")
        }).catch(err =>
            alert(err)
        );
  };
  render() {
    const { user } = this.props.auth;
    const addMember =
      <Link to="/playerList">

        <button
          style={{
            marginLeft: "1rem",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem"
          }}
          onClick={this.playerList}
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >
          Add a player
            </button>

      </Link>

    const Team =
      <Link to="/team">

        <button
          style={{
            marginLeft: "1rem",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem"
          }}
          onClick={this.playerList}
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >
          View Team
        </button>

      </Link>


    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}

              {/*               <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p> */}
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
            {addMember}
            {Team}
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);