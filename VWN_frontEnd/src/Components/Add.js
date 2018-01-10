import React, { Component } from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator } from 'react-material-ui-form-validator';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import Map from './Map';
import TagsCheckBoxes from './TagsCheckBoxes';
import Snackbar from 'material-ui/Snackbar';
import SuccessfullAdd from './SuccessfullAdd';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      tags: {},
      formData: {
        Name: '',
        Logo: '',
        Email: '',
        Website: '',
        Description: '',
        selectedRegions: {},
        selectedTags: {},
      },
      submitted: false,
      activeRegions: {},
      activeTags: {},
      errorText: '',
      open: false
    }
  };

  componentWillMount() {
    this.setState({
      tags: this.props.tags
    })
  }

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }

  handleChangeThirdStep = (event) => {
    const { formData } = this.state;
    const regions = formData.selectedRegions
    for (const region in regions){
      let name = event.target.name
      let value = event.target.value
      // if ( event.target.id === region){
      //   regions[region][name] = value
      //   // console.log("rrrr", regions)
      // }
      switch (event.target.id) {
        case region:
        regions[region][name] = value
          break;
        }
    }
    // console.log("fff",formData)
    this.setState({ formData });
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 2) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
  }

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  handleMapChange = (event) => {
    let { activeRegions } = this.state
    if (activeRegions[event.target.id]) {
      activeRegions[event.target.id] = false
    } else {
      activeRegions[event.target.id] = true
    }
    // console.log(activeRegions)
  }

  handleTagsChange = (event) => {
    let { activeTags } = this.state
    if (event.target.checked) {
      activeTags[event.target.value] = true
    } else {
      activeTags[event.target.value] = false
    }
  }

  handleSecondSubmit = () => {
    const { activeRegions, activeTags, formData } = this.state
    let toggle = true
    for (const tag in activeTags) {
      if (activeTags[tag]) {
        formData.selectedTags[tag] = tag
        for (const region in activeRegions) {
          if (activeRegions[region]) {
            formData.selectedRegions[region] = {}
            const { stepIndex } = this.state;
            if (stepIndex < 2) {
              this.setState({ stepIndex: stepIndex + 1 });
            }
            toggle = false
          }
        }
      }
    }
    this.setState({ formData })
    console.log(formData)
    if (toggle) {
      this.setState({
        open: true,
        errorText: "Please select at least one Tag and one Region"
      })
    }
  }

  handleSubmit = () => {
    const serverLink = 'http://localhost:8080/'
    const { formData } = this.state
    const xhr = new XMLHttpRequest();
    xhr.open('Post', serverLink, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = () => {
      console.log(JSON.stringify(formData))
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // showMessage('The new organization has been successfully added!', 'color_green');
          return(
            <div>
              <SuccessfullAdd />
            </div>
          )
        }
        else if (xhr.status === 500) {

          // showMessage(
          //   `The server encountered an internal error or misconfiguration
          //           and was unable to complete your request!`
          // );
        }
      }
    };
    console.log(JSON.stringify(formData))
    xhr.send(JSON.stringify(formData));
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  }

  errorText = () => {
    const { isValid } = this.state;
    if (isValid) {
      return null;
    }
    return (
      <div>
      </div>
    );
  }

  getStepContent(stepIndex) {
    const URLregex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    const { formData, tags } = this.state
    switch (stepIndex) {
      case 0:
        return (
          <ValidatorForm
            ref="form"
            onSubmit={this.handleNext}
            onError={errors => console.log(errors)}
          >
            <TextValidator
                            name="Name"
                            floatingLabelText="Name"
                            floatingLabelFixed={true}
                            value={formData.Name}
                            type="text"
                            onChange={this.handleChange}
                            validators={['required']}
                            errorMessages={['this field is required', 'please type a valid name']}
                        /><br />
                        <TextValidator
                            name="Logo"
                            floatingLabelText="Logo:"
                            floatingLabelFixed={true}
                            value={formData.Logo}
                            type="url"
                            onChange={this.handleChange}
                            validators={['required', ]}
                            errorMessages={['this field is required', 'url is not valid']}
                        /><br />
                        <TextValidator
                            name="Email"
                            floatingLabelText="E-mail"
                            floatingLabelFixed={true}
                            onChange={this.handleChange}
                            value={formData.Email}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        /><br />
                        <TextValidator
                            name="Website"
                            floatingLabelText="Website:"
                            floatingLabelFixed={true}
                            type="url"
                            onChange={this.handleChange}
                            value={formData.Website}
                            validators={['required',]}
                            errorMessages={['this field is required', 'url is not valid']}
                        /><br />
                        <TextValidator
                            name="Description"
                            floatingLabelText="Organization description:"
                            floatingLabelFixed={true}
                            onChange={this.handleChange}
                            rows={4}
                            rowsMax={100}
                            value={formData.Description}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        /><br />
            <div style={{ marginTop: 24, marginBottom: 12 }}>
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onClick={this.handlePrev}
                style={{ marginRight: 12 }}
              />
              <RaisedButton
                label={stepIndex === 2 ? 'Finish' : 'Next'}
                primary={true}
                type="submit"
              />
            </div>
          </ValidatorForm>

        );
      case 1:
        return (
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSecondSubmit}
            onError={this.throwErrormessage}
          >
            <div className="step2-container">
              <div className="add-map">
                <Map handle={this.handleMapChange} activeRegions={this.state.activeRegions} />
              </div>
              <div>
                <TagsCheckBoxes handle={this.handleTagsChange} tags={tags} activeTags={this.state.activeTags} />
              </div>
              <div style={{ marginTop: 24, marginBottom: 12 }}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{ marginRight: 12 }}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  type="submit"
                />
              </div>
              <div>
                <Snackbar
                  open={this.state.open}
                  message={this.state.errorText}
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                />
              </div>

            </div>
          </ValidatorForm>
        );
      case 2:
        return (
          <div>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
              onError={errors => console.log(errors)}
            >
              {Object.keys(this.state.activeRegions).map((region) => {
                if (this.state.activeRegions[region]) {
                  // console.log(formData.selectedRegions)
                  return (
                    <div key={region}>
                      <p>{region}</p>
                      <div>{this.state.activeRegions[region]}
                      </div><br />
                      <TextValidator
                        name="Phone"
                        id={region}
                        floatingLabelText="Phone:"
                        floatingLabelFixed={true}
                        type="Text"
                        onChange={this.handleChangeThirdStep}
                        value={formData.selectedRegions[region]["Phone"]}
                        validators={['required']}
                        errorMessages={['this field is required', 'please type a valid name']}
                      /><br />
                      <TextValidator
                        name="City"
                        id={region}
                        floatingLabelText="City:"
                        floatingLabelFixed={true}
                        type="Text"
                        onChange={this.handleChangeThirdStep}
                        value={formData.selectedRegions[region]["City"]}
                        validators={['required']}
                        errorMessages={['this field is required', 'please type a valid name']}
                      /><br />
                      <TextValidator
                        name="PostCode"
                        id={region}
                        floatingLabelText="Post Code:"
                        floatingLabelFixed={true}
                        type="Text"
                        onChange={this.handleChangeThirdStep}
                        value={formData.selectedRegions[region]["PostCode"]}
                        validators={['required',]}
                        errorMessages={['this field is required', 'please type a valid name']}
                      /><br />
                      <TextValidator
                        name="HouseNumber"
                        id={region}
                        floatingLabelText="House Number:"
                        floatingLabelFixed={true}
                        type="Text"
                        onChange={this.handleChangeThirdStep}
                        value={formData.selectedRegions[region]["HouseNumber"]}
                        validators={['required',]}
                        errorMessages={['this field is required', 'please type a valid name']}
                      /><br />
                      <div style={{ marginTop: 24, marginBottom: 12 }}>
                      </div>
                    </div>
                  )
                }
              })
              }
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onClick={this.handlePrev}
                style={{ marginRight: 12 }}
              />
              <RaisedButton
                label={stepIndex === 2 ? 'Finish' : 'Next'}
                primary={true}
                type="submit"
              />
            </ValidatorForm>
          </div>
        );
    }
  }

  render() {
    const { stepIndex } = this.state;
    return (
      <div className="add-page-container" style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
        <Stepper activeStep={stepIndex} connector={<ArrowForwardIcon />}>
          <Step>
            <StepLabel>Please fill the below fields</StepLabel>
          </Step>

          <Step>
            <StepLabel>Please Choose tags & regions</StepLabel>
          </Step>

          <Step>
            <StepLabel>Please fill in your contact details:</StepLabel>
          </Step>
        </Stepper>
        {this.getStepContent(stepIndex)}


      </div>
    );
  }
}
export default Add