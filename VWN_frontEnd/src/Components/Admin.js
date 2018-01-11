import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Badge from 'material-ui/Badge';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ErrorPage from '../Components/ErrorPage';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

class Admin extends Component {
  static propTypes = {
    response: PropTypes.object.isRequired,
    serverLink: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    this.newOrgs = this.props.response.orgs
    this.componentDidCatchtags = this.props.response.tags
    this.myToken = this.props.response.myToken
    this.state = {
      selectedOrgId: false,
      canClick: true,
      status: 0,
      deleteIsClicked: false,
      value: 'a',
      orgs: {},
      open: false,
    };
  }

  componentWillMount() {
console.log (this.props.response)
this.setState({
  orgs: this.props.response.orgs,
  tags: this.props.response.tags   
})
  }

  handleChange = (value) => {
    this.setState({
      value: value,
      open: false
    });
  };

  handleClick = () => {
    alert("to show more info please go to the orgs main page");
  }

  handleRequestDelete = () => {
    this.setState({
      open: true
    });
  }

  handleDialogClose = () => {
    this.setState({ open: false });
  };

  sendRequest = (method, path) => {
    this.setState(Object.assign({}, this.state, { canClick: false }));
    const xhr = new XMLHttpRequest();
    xhr.open(method, `${this.props.serverLink}${path}`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${this.myToken}`);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const newOrgs = {};
          Object.keys(this.orgs).forEach(orgId => {
            if (orgId !== this.state.selectedOrgId) {
              newOrgs[orgId] = this.state.orgs[orgId];
            }
          });
          this.orgs = newOrgs;
        }
        this.setState(Object.assign({}, this.state, {
          status: xhr.status,
          canClick: true,
          selectedOrgId: false,
          deleteIsClicked: false
        }));
      }
    };
    xhr.send(JSON.stringify({ orgId: this.state.selectedOrgId }));
  }


  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleDialogClose}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleDialogClose}
      />,
    ];
    let orgs = this.state.orgs
    console.log (orgs)
    if (this.state.status === 401 || this.state.status === 404 || this.state.status === 500) {
      return <ErrorPage status={this.state.status} />;
    } else return (
      <div className="adminPage">
        <Badge
          badgeContent={10}
          secondary={true}
          badgeStyle={{ top: 12, right: 12 }}
        >
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label="Active Organizations" value="a">
              <div>
                <h2 style={styles.headline}>Active Organizations:</h2>
                {Object.keys(this.state.orgs).map(org => {
                  return (
                    <div key={org}>
                      <Chip
                        onRequestDelete={this.handleRequestDelete}
                        onClick={this.handleClick}
                        style={styles.chip}
                      >
                        <Avatar src={orgs[org]["logo"]} />
                        {orgs[org]["name"]}
                      </Chip>
                    </div>
                  )
                } )} 
            }
              </div>
            </Tab>
            <Tab label="Requests" value="b">
              <div>
                <h2 style={styles.headline}>Controllable Tab B</h2>
                <p>
                  This is another example of a controllable tab. Remember, if you
              use controllable Tabs, you need to give all of your tabs values or else
              you wont be able to select them.
            </p>
              </div>
            </Tab>
          </Tabs>
        </Badge>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Are you sure you want to delete this organization ?
        </Dialog>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <h2 style={styles.headline}>Tabs with slide effect</h2>
            Swipe to see the next slide.<br />
          </div>
          <div style={styles.slide}>
            slide n°2
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default Admin;