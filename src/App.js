import React, { Component } from "react";

import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
library.add(faSpinner);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      loading: true
    };
  }

  componentDidMount() {
    axios
      .get(`https://the-index-api.herokuapp.com/api/authors/`)
      .then(res => res.data)
      .then(authors => this.setState({ authors: authors }))
      .then(() => this.setState({ loading: false }));
  }

  isLoading = () => {
    if (this.state.loading) {
      return (
        <div className="spinner mx-auto text-center">
          <FontAwesomeIcon icon={faSpinner} spin size="4x" />
        </div>
      );
    } else {
      return <AuthorsList authors={this.state.authors} />;
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="content col-10">{this.isLoading()}</div>
        </div>
      </div>
    );
  }
}

export default App;
