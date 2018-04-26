//@flow

import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import Switch from 'react-toggle-switch'

import "../../node_modules/react-toggle-switch/dist/css/switch.min.css"




type Props = {
    onChange: ({})=>void,
    loading: ?boolean,
    userChallenges: {
        dontCare: ?boolean,
        firstChoice: ?string,
        secondChoice: ?string,
        thirdChoice: ?string
    },
}

class ChallengeSelection extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.switchChanged = this.switchChanged.bind(this);
        const userChallenges = this.props.userChallenges || {
            dontCare: false,
            firstChoice: '',
            secondChoice: '',
            thirdChoice: ''
        };
        this.state = {
            options: [" ","1", "2", "3", "4"],
            userChallenges: userChallenges
        }
    }

    onChange(choice) {
        this.setState({
          ...this.state,
            userChallenges: {
                ...this.state.userChallenges,
                ...choice
            }
        });
    }

    switchChanged() {
        this.setState({
            ...this.state,
            userChallenges: {
                dontCare: !this.state.userChallenges.dontCare,
                firstChoice: '',
                secondChoice: '',
                thirdChoice: '',
            }
        })
    }

    render() {
        console.log(this.state);
        return (
          <div className="mt-5">
              <h2>Challenge Preference</h2>
              <p>Please choose your three prefered challenges until May 6th (1 -  first preference, 2 - second preference, 3 - third preference). In the next couple of weeks we will assign you to one challenge and inform you about our decision as soon as possible. Of course, we try to consider your preferences as far as possible.</p>
              <a className="d-block mb-5" href='/#tracks' target='_blank'>Challenge overview...</a>
              <Switch className="custom-switch" onClick={this.switchChanged} on={this.state.userChallenges.dontCare}/>
              <span>I do not care - I am ready to hack any challenge</span>
              <Form className="pt-5" onSubmit={(e)=>{e.preventDefault();this.props.onChange(this.state.userChallenges)}}>
                  <FormGroup>
                      <Label for="firstChoice">First Preference</Label>
                      <Input disabled={this.state.userChallenges.dontCare} value={this.state.userChallenges.firstChoice} onChange={(e)=>this.onChange({firstChoice: e.target.value})} type="select" name="select" id="firstChoice">
                          {this.state.options.filter((option) =>
                            option !== this.state.userChallenges.secondChoice &&
                            option !== this.state.userChallenges.thirdChoice
                          ).map((option, index)=>(
                            <option key={index.toString()}>{option}</option>
                          ))}
                      </Input>
                      <Label for="secondChoice">Second Preference</Label>
                      <Input disabled={this.state.userChallenges.dontCare} value={this.state.userChallenges.secondChoice} onChange={(e)=>this.onChange({secondChoice: e.target.value})} type="select" name="select" id="secondChoice">
                          {this.state.options.filter((option) =>
                            option !== this.state.userChallenges.firstChoice &&
                            option !== this.state.userChallenges.thirdChoice
                          ).map((option, index)=>(
                            <option key={index.toString()}>{option}</option>
                          ))}
                      </Input>
                      <Label for="thirdChoice">Third Preference</Label>
                      <Input disabled={this.state.userChallenges.dontCare} value={this.state.userChallenges.thirdChoice} onChange={(e)=>this.onChange({thirdChoice: e.target.value})} type="select" name="select" id="thirdChoice">
                          {this.state.options.filter((option) =>
                            option !== this.state.userChallenges.firstChoice &&
                            option !== this.state.userChallenges.secondChoice
                          ).map((option, index)=>(
                            <option key={index.toString()}>{option}</option>
                          ))}
                      </Input>
                  </FormGroup>
                  <Button disabled={this.props.loading} type="submit">Save</Button>
              </Form>
              {(!this.props.loading) && this.props.updateSuccess &&
              <Alert className="mt-3" color="success">
                  Saved
              </Alert>}
          </div>
        );
    }
}

export default ChallengeSelection;