//@flow

import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import Switch from 'react-toggle-switch'

import "../../../node_modules/react-toggle-switch/dist/css/switch.min.css"




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
            options: [" ",
                "Sense the World! - Future Mobility",
                "German quality tools in a smart and connected future - Smart Automation Wave",
                "Countering drones - Build your SKY-PROTECTOR - Quantified Earth",
                "Future Hydraulics - Smart Automation Wave",
                "Shape energy efficient rail transportation - Future Mobility",
                "Wild Track and Smart City - Wild Track and Smart City",
                "Food and Baverage - Smart Automation Wave",
                "Audi Autonomous Fleet Experience - Future Mobility"
            ],
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
        const userChallenges = {
                dontCare: !this.state.userChallenges.dontCare,
                firstChoice: '',
                secondChoice: '',
                thirdChoice: '',
        };
        this.setState({
            ...this.state,
            userChallenges
        });
        this.props.onChange(userChallenges);
    }

    render() {
        return (
          <div className="mt-5">
              <h2>Challenge Preference</h2>
              <p>Please choose your three prefered challenges <strong>until May 6th</strong> (1 -  first preference, 2 - second preference, 3 - third preference). In the next couple of weeks we will assign you to one challenge and inform you about our decision as soon as possible. Of course, we try to consider your preferences as far as possible.</p>
              <a className="d-block mb-5" href='/#tracks' rel="noopener noreferrer" target='_blank'>Challenge overview...</a>
              <Switch className="custom-switch" onClick={this.switchChanged} on={this.state.userChallenges.dontCare}/>
              <span>I do not care - I am ready to hack any challenge</span>
                  <Row>
                      <Col md='4'>
                          <Form className="pt-3" onSubmit={(e)=>{e.preventDefault();this.props.onChange(this.state.userChallenges)}}>
                              <FormGroup>
                                  <Label for="firstChoice">First Preference</Label>
                                  <Input className="mb-2" disabled={this.state.userChallenges.dontCare} value={this.state.userChallenges.firstChoice} onChange={(e)=>this.onChange({firstChoice: e.target.value})} type="select" name="select" id="firstChoice">
                                      {this.state.options.filter((option) =>
                                        option !== this.state.userChallenges.secondChoice &&
                                        option !== this.state.userChallenges.thirdChoice
                                      ).map((option, index)=>(
                                        <option key={index.toString()}>{option}</option>
                                      ))}
                                  </Input>
                                  <Label for="secondChoice">Second Preference</Label>
                                  <Input className="mb-2" disabled={this.state.userChallenges.dontCare} value={this.state.userChallenges.secondChoice} onChange={(e)=>this.onChange({secondChoice: e.target.value})} type="select" name="select" id="secondChoice">
                                      {this.state.options.filter((option) =>
                                        option !== this.state.userChallenges.firstChoice &&
                                        option !== this.state.userChallenges.thirdChoice
                                      ).map((option, index)=>(
                                        <option key={index.toString()}>{option}</option>
                                      ))}
                                  </Input>
                                  <Label for="thirdChoice">Third Preference</Label>
                                  <Input className="mb-2" disabled={this.state.userChallenges.dontCare} value={this.state.userChallenges.thirdChoice} onChange={(e)=>this.onChange({thirdChoice: e.target.value})} type="select" name="select" id="thirdChoice">
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
                      </Col>
                </Row>
          </div>
        );
    }
}

export default ChallengeSelection;