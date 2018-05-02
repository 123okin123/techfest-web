//@flow

import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import Switch from 'react-toggle-switch'

import "../../../node_modules/react-toggle-switch/dist/css/switch.min.css"
import {pageActions} from "../../actions/pageActions";
import {connect} from "react-redux";
import styled from 'styled-components';
import {ScaleLoader} from 'react-spinners';




type Props = {
    response: ?{},
    isFetching: ?boolean,
    onChange: ({})=>void,
    loading: ?boolean,
    userChallenges: {
        dontCare: ?boolean,
        firstChoice: ?string,
        secondChoice: ?string,
        thirdChoice: ?string
    },
    fetchPage: ()=>Promise<void>,
    response: {
        acf?: {
            preference_options?: Array<{option: string}>,
            challenge_descriptions?: Array<{
                track_title?: string,
                challenges: Array<{
                    challenge_title?: string,
                    challenge_company?: string,
                    challenge_description?: string
                }>
            }>
        }
    }
}

type State = {
    options: Array<string>,
    userChallenges: {
        dontCare: ?boolean,
        firstChoice: ?string,
        secondChoice: ?string,
        thirdChoice: ?string
    }
}

class ChallengeSelection extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).onChange = this.onChange.bind(this);
        (this: any).switchChanged = this.switchChanged.bind(this);
        const userChallenges = this.props.userChallenges || {
            dontCare: false,
            firstChoice: '',
            secondChoice: '',
            thirdChoice: ''
        };
        this.state = {
            options: [" ",
                // "German quality tools in a smart and connected future - Smart Automation Wave",
                // "Food and Baverage - Smart Automation Wave",
                // "Future Hydraulics - Smart Automation Wave",
                // "Countering drones - Build your SKY-PROTECTOR - Quantified Earth",
                // "Sense the World! - Future Mobility",
                // "Audi Autonomous Fleet Experience - Future Mobility",
                // "Shape energy efficient rail transportation - Future Mobility",
                // "Wild Track and Smart City - Wild Track and Smart City"
            ],
            userChallenges: userChallenges
        }
    }

    componentDidMount() {
        if (this.props.isFetching) {return}
        this.props.fetchPage()
          .then(()=>{
            if (this.props.response && this.props.response.acf && this.props.response.acf.preference_options) {
                this.setState({options: this.props.response.acf.preference_options.map(e=> e.option)})
            }
        }).catch(err=>console.log(err))
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
              <p className="d-block mb-5">You find a detailed challenge description below...</p>
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
                              <Button color="primary" disabled={this.props.loading} type="submit">Save</Button>
                          </Form>
                      </Col>
                </Row>
              <Row>
                  <Col className="mt-3">
                    <h3 className="mt-5 mb-4">Challenge Descriptions</h3>
                      {this.props.response && this.props.response.acf && this.props.response.acf.challenge_descriptions &&
                      <div>
                          {this.props.response.acf.challenge_descriptions.map((track, index) =>
                            <div key={index.toString()}>
                                <h4 className="mt-5">{track.track_title}</h4>
                                {track.challenges.map((challenge, index) =>
                                  <div key={index.toString()}>
                                      <h5 className="mt-4">{challenge.challenge_title}</h5>
                                      <p className="mb-0"><strong>{challenge.challenge_company}</strong></p>
                                      <div dangerouslySetInnerHTML={{__html: challenge.challenge_description}}/>
                                  </div>
                                )}
                            </div>
                          )}
                      </div>
                      }{this.props.isFetching &&
                        <LoaderContainer><ScaleLoader loading={true} height={20} width={2}/></LoaderContainer>
                       }






                      {/*<h4 className="mt-5">SMART AUTOMATION WAVE</h4>*/}
                      {/*<h5 className="mt-4">German quality tools in a smart and connected future</h5>*/}
                      {/*<p className="mb-0"><strong>Stihl</strong></p>*/}
                      {/*<p>*/}
                          {/*German quality tools in a smart and connected future:*/}
                          {/*How can smart connected tools enable the future of environmental landscaping?*/}
                          {/*Smart supporting tools that support landscape architects to design the landscape of tomorrow (e.g. landscape generator app, smart lawn mower, drones)*/}
                          {/*How can data, collected by smart tools be leveraged for value based services?*/}
                          {/*How can digital processes/products bring more efficiency to landscape management?*/}
                      {/*</p>*/}

                      {/*<h5 className="mt-5">Food and Baverage</h5>*/}
                      {/*<p className="mb-0"><strong>Siemens</strong></p>*/}
                      {/*<p>comming soon...</p>*/}

                      {/*<h5 className="mt-5">Future Hydraulics</h5>*/}
                      {/*<p className="mb-0"><strong>Hawe</strong></p>*/}
                      {/*<p>*/}
                          {/*Smart Hydraulics: A Future of intelligent and autonomous hydraulic Systems: Hack a crawler lift with a 35m boom and make it smart by employing the latest sensor technology!*/}
                          {/*How will a future hydraulic system look like by using IoT and machine learning?*/}
                          {/*How can future services and products in a digitalized hydraulics industry look like?*/}
                      {/*</p>*/}

                      {/*<h4 className="mt-5">QUANTIFIED EARTH</h4>*/}
                      {/*<h5 className="mt-4">Countering drones - Build your SKY-PROTECTOR</h5>*/}
                      {/*<p className="mb-0"><strong>Rohde & Schwarz</strong></p>*/}
                      {/*<p>*/}
                          {/*Drones are easy-to-buy and easy-to-fly gadgets. They can be seen*/}
                          {/*everywhere - In private and professional contexts. Develop your own*/}
                          {/*“SKY-PROTECTOR” and help us to regain a safer airspace.*/}
                          {/*While most drones are being used in a legal framework, new kinds of threats arises when drones do penetrate restricted airspaces. Innovative technical solutions are required in order to monitor critical areas and prevent drones from entering secured areas.*/}
                      {/*</p>*/}

                      {/*<h4 className="mt-5">FUTURE MOBILITY</h4>*/}
                      {/*<h5 className="mt-4">Sense the World!</h5>*/}
                      {/*<p className="mb-0"><strong>Magna</strong></p>*/}
                      {/*<p>*/}
                          {/*Today’s vehicles have over 100 sensors on board and are getting smarter with each vehicle generation. Invent new functionalities & features by using the sensor & connectivity landscape!*/}
                          {/*Dive into the world of automotive sensors and their current functions, be creative, use sensor fusion to create new features with the existing sensor landscape! Show us your new and innovative ideas to transform the world of mobility: It’s about creating technology that is smarter, cleaner, safer, and lighter. For the automotive industry, our communities, and all who share the road. Drive the future of Mobility!*/}
                      {/*</p>*/}

                      {/*<h5 className="mt-5">Audi Autonomous Fleet Experience</h5>*/}
                      {/*<p className="mb-0"><strong>Audi</strong></p>*/}
                      {/*<p>*/}
                          {/*2025 – you just ordered your Audi urban mobility service, an autonomous driving car which interior is perfectly adjusted to your current needs. You are challenged to develop a service creating the ultimate mobility experience resulting in a click dummy or prototype.*/}
                          {/*Description:*/}
                          {/*#Setting Imaging you are living in the year 2025 and you just 1-click ordered your Audi urban*/}
                          {/*mobility service. Your car is part within a fleet. While the external design of your car is fixed, the*/}
                          {/*internal design is adjusted to your current needs. It is your choice if you want company during*/}
                          {/*your ride or not.*/}
                          {/*#Outcome We want you to design a service that creates the ultimate mobility experience*/}
                          {/*covering the whole customer journey. Develop a prototype (e.g., a click-dummy or proof of*/}
                          {/*concept) for one or more customer touchpoints such as AI, PA, mobile devices, in-car*/}
                          {/*entertainment, etc.*/}
                          {/*#Input We provide you a specific GUI and customer insights.*/}
                      {/*</p>*/}

                      {/*<h5 className="mt-5">Shape energy efficient rail transportation</h5>*/}
                      {/*<p className="mb-0"><strong>Knorr bremse</strong></p>*/}
                      {/*<p>*/}
                          {/*Reducing energy consumption while creating the ground for autonomous rail transport*/}
                          {/*Today, Driver Advisory Systems support train operators to save energy by optimizing the driving style of their drivers. Driver Advisory Systems are utilizing various data, e.g. vehicle dynamics, time tables and track maps. These driver advisory systems are the basis for the upcoming autonomous train operation. In this challenge: take the real field-data to further enhance the advisory algorithms, expand the senses of the train to get more insights and develop ways of more accurate mapping and quantifying trains' environments. Short, whatever helps to further reduce energy consumption of trains.*/}
                      {/*</p>*/}

                      {/*<h4 className="mt-5">WILD TRACK AND SMART CITY</h4>*/}
                      {/*<h5 className="mt-4">Wild Track and Smart City</h5>*/}
                      {/*<p className="mb-0"><strong>LH München</strong></p>*/}
                      {/*<p>Get wild and crazy!</p>*/}

                  </Col>
              </Row>
          </div>
        );
    }
}

const LoaderContainer = styled.div`
  padding-top: 100px;
  margin: auto;
  text-align: center;
  width: 100px;
`;

function mapStateToProps(state, ownProps) {
    const {response, isFetching} = state.pages['2211'] || {response: {content: {rendered: ''}}, isFetching: true};
    return {
        response,
        isFetching
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchPage: () => {
            return dispatch(pageActions.fetchPageIfNeeded('2211'))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeSelection);