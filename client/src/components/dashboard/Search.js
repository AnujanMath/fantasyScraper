import React, { Component } from "react";

class Search extends Component {

    callApi() {
/*         let search = this.refs.search.value;
        fetch('https://www.balldontlie.io/api/v1/players?search=' + search)
            .then((result) => {
                this.props.searchFill(result.json());
            }).then((jsonResult) => {
                console.log(jsonResult);
            }) */
            this.props.updatedValue(this.refs.search.value);
    }

    render() {
        return (
            <div class="input-group mb-3" id="search">
                <input id="searchBar" type="text" class="form-control" ref="search" placeholder="Enter Player Name" aria-label="URL" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="submit" onClick={() => this.callApi()}>Search</button>
                </div>
            </div>
        );
    }
}

export default Search