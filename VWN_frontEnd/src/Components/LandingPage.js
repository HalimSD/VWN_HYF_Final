import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Route from 'react-router-dom/Route';
// import { Responsive, WidthProvider } from 'react-grid-layout';
import '../CSS/LandingPage.css';
import YouTube from 'react-youtube';
// const ResponsiveReactGridLayout = WidthProvider(Responsive);

class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
    }
  }

  componentWillMount() {
    this.setState({
      data: this.props.data
    });
  }

  render() {
    const contacts = data[org].contacts;
    const opts = {
      height: '200',
      width: '320',
      muted: true,
      playerVars: {
        autoplay: 1
      }
    };
    const style = {
      margin: 20,
      textAlign: 'center',
      backgroundColor: '#e9e8e3',
    };
    const { data } = this.state
    return (

      <div className="main">
        <Route className="route" exact path="/" component={(props) => {
          return (
            <div className="landingPageBTNs">
              <RaisedButton className="BTN" label="Login as an admin" onClick={() => props.history.push('/login')} />
              <RaisedButton className="BTN" label="View Organizations" onClick={() => props.history.push('/organizations')} />
              <RaisedButton className="BTN" label="Add your organization" onClick={() => props.history.push('/add')} />

            </div>
          );
        }} />
<div className="title"><h1>Vluchtelingen Werk Nederland</h1></div>
        
        <div className="youtube">
          <YouTube
            videoId="18I58D0CRK0"
            opts={opts}
            volume= {0}
            onReady={this._onReady}
          />
        </div>
        <Route className='route' exact path='/' component={(props) => {
          return (

            <div className="orgContainer">
              {Object.keys(data).map((org) => {
                console.log(data[org].contacts)
                return (
                  <div key={org} className="org, card">
                    <Paper style={style} zDepth={1} className="front" children={
                      <div >
                        <Avatar src={data[org]['logo']} size={100} />
                        <h3>{data[org]['name']}</h3>
                      </div>
                    } />
                    <Paper style={style} zDepth={1} className="back" children={
                      <div >
                        <Avatar src={data[org].contacts['city']} size={100} />
                        <h3>{data[org]['name']}</h3>
                      </div>
                    } />
                  </div>
                )
              }
              )}
            </div>
          );
        }} />
      </div >

    );
  }

}
export default LandingPage;