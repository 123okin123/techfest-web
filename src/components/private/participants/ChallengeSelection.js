//@flow

import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import Switch from 'react-toggle-switch'

import "../../../../node_modules/react-toggle-switch/dist/css/switch.min.css"
import {pageActions} from "../../../actions/pageActions";
import {connect} from "react-redux";
import styled from 'styled-components';
import {ScaleLoader} from 'react-spinners';




type Props = {
    response: ?{},
    isFetching: ?boolean,
    onChange: ({})=>void,
    loading: ?boolean,
    userChallenges?: {
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
              <p>Please choose your three prefered challenges <strong>until May 31st</strong> (1 -  first preference, 2 - second preference, 3 - third preference). In the next couple of weeks we will assign you to one challenge and inform you about our decision as soon as possible. Of course, we try to consider your preferences as far as possible.</p>
              <p className="d-block mb-5">You find a detailed challenge description below...</p>
              <p><strong>Caution: Selection can not be changed!</strong></p>
              <Switch enabled={!this.props.userChallenges} className="custom-switch" onClick={this.switchChanged} on={this.state.userChallenges.dontCare}/>
              <span>I do not care - I am ready to hack any challenge</span>
                  <Row>
                      <Col md='4'>
                          <Form className="pt-3" onSubmit={(e)=>{e.preventDefault();this.props.onChange(this.state.userChallenges)}}>
                              <FormGroup>
                                  <Label for="firstChoice">First Preference</Label>
                                  <Input className="mb-2" disabled={(this.state.userChallenges.dontCare || (this.props.userChallenges || {}).firstChoice)} value={this.state.userChallenges.firstChoice} onChange={(e)=>this.onChange({firstChoice: e.target.value})} type="select" name="select" id="firstChoice">
                                      {this.state.options.filter((option) =>
                                        option !== this.state.userChallenges.secondChoice &&
                                        option !== this.state.userChallenges.thirdChoice
                                      ).map((option, index)=>(
                                        <option key={index.toString()}>{option}</option>
                                      ))}
                                  </Input>
                                  <Label for="secondChoice">Second Preference</Label>
                                  <Input className="mb-2" disabled={(this.state.userChallenges.dontCare || (this.props.userChallenges || {}).secondChoice)} value={this.state.userChallenges.secondChoice} onChange={(e)=>this.onChange({secondChoice: e.target.value})} type="select" name="select" id="secondChoice">
                                      {this.state.options.filter((option) =>
                                        option !== this.state.userChallenges.firstChoice &&
                                        option !== this.state.userChallenges.thirdChoice
                                      ).map((option, index)=>(
                                        <option key={index.toString()}>{option}</option>
                                      ))}
                                  </Input>
                                  <Label for="thirdChoice">Third Preference</Label>
                                  <Input className="mb-2" disabled={(this.state.userChallenges.dontCare || (this.props.userChallenges || {}).thirdChoice)} value={this.state.userChallenges.thirdChoice} onChange={(e)=>this.onChange({thirdChoice: e.target.value})} type="select" name="select" id="thirdChoice">
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


                  </Col>
              </Row>
          </div>
        );
    }
}

function shouldBeDisabled(userChallenges?: {firstChoice: ?string, dontCare: ?boolean}): boolean {
    if (userChallenges) {
        console.log(userChallenges.firstChoice !== "")
        return userChallenges.firstChoice !== ""
    } else {
        console.log(false);
        return false
    }
}

const LoaderContainer = styled.div`
  padding-top: 100px;
  margin: auto;
  text-align: center;
  width: 100px;
`;

function mapStateToProps(state, ownProps) {
    const {response, isFetching} = state.pages['2211'] || {response: {content: {rendered: ''}}, isFetching: false};
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