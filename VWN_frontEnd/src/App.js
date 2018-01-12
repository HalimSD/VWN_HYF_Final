import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Router from 'react-router-dom/BrowserRouter';
import { AnimatedSwitch } from 'react-router-transition';
import Route from 'react-router-dom/Route';
import Orgs from './Components/Orgs';
import Header from './Components/Header';
import LandingPage from './Components/LandingPage';
import Add from './Components/Add';
// import Admin from './Components/Admin';
import Login from './Components/Login';
import Observable from './Observable';
import Loading from './Components/Loading';
import './CSS/App.css';
import './CSS/Login.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.serverLink = 'http://localhost:8080/'
    this.state = {
      Data: {},
      status: 0
    }
  }

  componentDidMount() {
    Observable.newStatefullObservable("Observable");
    const xhr = new XMLHttpRequest();
    xhr.open('Get', `${this.serverLink}search`, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.setState({
            Data: JSON.parse(xhr.response),
          });
        }
        this.setState({
          status: xhr.status
        });
      }
    }
    xhr.send();
  }

  render() {
    const { tags, orgs } = this.state.Data
    if (this.state.status === 200) {
      return (
        <MuiThemeProvider>
          <Router>
          <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="switch-wrapper"
    >
            <div>
              <LandingPage data={orgs} />
              <Route className ="route" exact path="/login" component={() => {
                return(
                  <div className="login">
                    <Login orgs={orgs}/>
                  </div>
                );
              }} />
              <Route className="route" exact path="/add" component={() => {
                return (
                  <div className="add-page">
                    <Add tags={tags} />
                  </div>
                );
              }} />
              <Route className="route" exact path='/organizations' component={() => {
                return (
                  <div className="app-home-container">
                    <div><Header tags={tags} /></div>
                    <div><Orgs orgs={orgs} /></div>
                  </div>
                );
              }} />
            </div>
            </AnimatedSwitch>
          </Router>
          
        </MuiThemeProvider>

      );
    }
    else { return (<div><Loading/></div>) }
  }
}

export default App;