//@flow
import React, {Component} from 'react'
import styled from 'styled-components'
import {Container, Row, Col, Button, Collapse, Nav, NavLink, NavItem, TabContent, TabPane} from 'reactstrap'
import {Bracket} from '../common'
import {connect} from "react-redux";
import {pageActions} from "../../actions/pageActions";
import {ScaleLoader} from 'react-spinners';


type Props = {
    response?: {
        acf?: {
            tracks?: Array<{
                icon: string,
                description: string,
                title: string
            }>
        }
    },
    trackResponse: {
        acf?: {
        challenge_descriptions?: Array<{
            track_title?: string,
            challenges?: Array<{
                challenge_title?: string,
                challenge_company?: string,
                challenge_description?: string
            }>
            }>
        }
    },
    isTrackFetching?: boolean,
    fetchTracks: ()=>Promise<void>
}

type State = {
    fadeIn: boolean,
    activeTab: string
}

class TracksContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            fadeIn: false,
            activeTab: '1'
        };
        (this :any).toggle = this.toggle.bind(this);
        (this :any).toggleTab = this.toggleTab.bind(this);
    }

    componentDidMount() {
        this.props.fetchTracks();
    }
    toggle() {
        this.setState({
            fadeIn: !this.state.fadeIn
        });
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        console.log((this.props.trackResponse.acf || {}).challenge_descriptions);
        return (
    <Container>
        {/*<Row className="my-5">*/}
            {/*<LineCol xs="12" lg="3" className="border-bottom border-dark"><LineColText>INDUSTRY</LineColText></LineCol>*/}
            {/*<IndustryCol xs="12" lg="3" className="p-0">*/}
                {/*<StyledImg src={require('../../assets/icons/icon_smartcity_black.png')}/>*/}
                {/*<IndustryColText className="m-0">SMART CITY AND MOBILITY</IndustryColText>*/}
            {/*</IndustryCol>*/}
            {/*<LineCol xs="12" lg="auto" className="border-bottom border-dark  d-none d-lg-block"> </LineCol>*/}
            {/*<IndustryCol xs="12" lg="3" className="p-0">*/}
                {/*<StyledImg src={require('../../assets/icons/icon_mobility_black.png')}/>*/}
                {/*<IndustryColText className="m-0">SMART ENTERPRISE</IndustryColText>*/}
            {/*</IndustryCol>*/}
            {/*<LineCol className="border-bottom border-dark  d-none d-lg-block"> </LineCol>*/}
        {/*</Row>*/}
        <Row>
            {this.props.response && this.props.response.acf && this.props.response.acf.tracks &&
              this.props.response.acf.tracks.map((track, index) =>
                <Col key={index} xs="12" lg="3">
                    <StyledImg src={track.icon}/>
                    <FlexContainer>
                        <Bracket/>
                        <HeaderTitle>
                            <HeaderTitleTrack>TRACK {index + 1}</HeaderTitleTrack><p dangerouslySetInnerHTML={{__html: track.title}}/>
                        </HeaderTitle>
                        <Bracket right/>
                    </FlexContainer>
                    <ColText dangerouslySetInnerHTML={{__html: track.description}} />
                </Col>
              )
            }
        </Row>




        <Row>
            <Col xs="12">
                <Collapse isOpen={this.state.fadeIn}>
                    <Nav tabs className="border-0">
                        {this.props.response && this.props.response.acf && this.props.response.acf.tracks &&
                        this.props.response.acf.tracks.map((track, index) =>
                          <StyledNavItem key={index.toString()} className="text-center">
                              <StyledNavLink
                                className={this.state.activeTab === (index + 1).toString() ? 'active' : '' }
                                onClick={() => { this.toggleTab((index + 1).toString()); }}
                              >
                                  {track.title === 'FLEXIBLE TRACK' ?
                                    <p dangerouslySetInnerHTML={{__html: track.title}}/> : <p>TRACK {(index + 1).toString()}</p>
                                  }
                              </StyledNavLink>
                          </StyledNavItem>
                        )}
                    </Nav>

                    <StyledTabContent activeTab={this.state.activeTab}>
                        {this.props.trackResponse && this.props.trackResponse.acf && this.props.trackResponse.acf.challenge_descriptions &&
                        this.props.trackResponse.acf.challenge_descriptions.map((track, index) =>
                        <TabPane key={index.toString()} tabId={(index + 1).toString()}>
                            <Row>
                                <Col sm="12">
                                    <div>
                                        <div>
                                            {this.props.response && this.props.response.acf && this.props.response.acf.tracks &&
                                              this.props.response.acf.tracks[index] &&
                                            <StyledDetailImg src={this.props.response.acf.tracks[index].icon}/>
                                            }
                                            <StyledTrackDetailH4>{track.track_title}</StyledTrackDetailH4>
                                            {track.challenges &&
                                            track.challenges.map((challenge, index) =>
                                              <div key={index.toString()}>
                                                  <h5 className="mt-4">{challenge.challenge_title}</h5>
                                                  <p className="mb-0"><strong>{challenge.challenge_company}</strong></p>
                                                  <div
                                                    dangerouslySetInnerHTML={{__html: challenge.challenge_description}}/>
                                              </div>
                                            )}
                                        </div>
                                    </div>
                                    {this.props.isTrackFetching &&
                                    <LoaderContainer><ScaleLoader loading={this.props.isTrackFetching} height={20}
                                                                  width={2}/></LoaderContainer>
                                    }
                                </Col>
                            </Row>
                        </TabPane>
                        )}
                    </StyledTabContent>
                </Collapse>
            </Col>
            <Col xs="12" className="text-center">
                <Button className="mt-4 " onClick={this.toggle}>{this.state.fadeIn ? 'HIDE CHALLENGES' : 'SHOW CHALLENGES'}</Button>
            </Col>
        </Row>


        <Row className="mt-5">
            <Col md={6}>
                <FlexContainer>
                    <Bracket/>
                    <HeaderTitle>HACKATHON COMPETITION</HeaderTitle>
                    <Bracket right/>
                </FlexContainer>
                <ul className="list-style-x mt-5">
                    <li>Individual participants grouped together or teams already formed, size: 3-5</li>
                    <li>Working on one Challenge</li>
                    <li>IP remains with every individual team member</li>
                </ul>
            </Col>
            <Col md={6}>
                <FlexContainer>
                    <Bracket/>
                    <HeaderTitle>STARTUP COMPETITION</HeaderTitle>
                    <Bracket right/>
                </FlexContainer>
                <ul className="list-style-x mt-5">
                    <li>Teams from Start-up companies, size: 2-6</li>
                    <li>Working on new feature or idea for start-up that is related to one Track</li>
                    <li>Judged only on TECHFEST output, not on overall start-up idea</li>
                    <li>IP remains with start-up company</li>
                </ul>
            </Col>
        </Row>


        <Row className="my-5">
            <LineCol xs="12" lg="3" className="border-bottom border-dark"><LineColText>TECHFEST TECHNOLOGIES</LineColText></LineCol>
            <IndustryCol xs="12" lg="auto" className="p-0">
                <StyledImg src={require('../../assets/icons/icon_IoT-network.png')}/>
                <IndustryColText className="m-0">IOT</IndustryColText>
            </IndustryCol>
            <LineCol xs="12" lg="auto" className="border-bottom border-dark  d-none d-lg-block"> </LineCol>
            <IndustryCol xs="12" lg="auto" className="p-0">
                <StyledImg src={require('../../assets/icons/icon_robotics_black.png')}/>
                <IndustryColText className="m-0">ROBOTICS</IndustryColText>
            </IndustryCol>
            <LineCol xs="12" lg="auto" className="border-bottom border-dark  d-none d-lg-block"> </LineCol>
            <IndustryCol xs="12" lg="auto" className="p-0">
                <StyledImg src={require('../../assets/icons/icon_blockchain_black.png')}/>
                <IndustryColText className="m-0">BLOCKCHAIN</IndustryColText>
            </IndustryCol>
            <LineCol xs="12" lg="auto" className="border-bottom border-dark  d-none d-lg-block"> </LineCol>
            <IndustryCol xs="12" lg="auto" className="p-0">
                <StyledImg src={require('../../assets/icons/icon_AI_black.png')}/>
                <IndustryColText className="m-0">AI</IndustryColText>
            </IndustryCol>
            <LineCol xs="12" lg="auto" className="border-bottom border-dark  d-none d-lg-block"> </LineCol>
            <IndustryCol xs="12" lg="auto" className="p-0">
                <StyledImg src={require('../../assets/icons/icon_Mixedreality_black.png')}/>
                <IndustryColText className="m-0">MIXED REALITY</IndustryColText>
            </IndustryCol>
            <LineCol className="border-bottom border-dark  d-none d-lg-block"> </LineCol>
        </Row>
    </Container>
);}
}
const StyledNavItem = styled(NavItem)`
  width: 25%;
`;
const StyledNavLink = styled(NavLink)`
    font-weight: 600;
    font-size: 1.1em;
    color: #000 !important;
    padding: 0.5rem 0.2rem !important;
    min-height: 85px;
&.active, &:focus, &:hover {
    color: #000 !important;
    background-color: #e4d041 !important;
    border-color: #e4d041 !important;
}
`;
const StyledTabContent = styled(TabContent)`
  background-color: #e4d141;
  border-radius: 0 0 3px 3px;
  padding: 0 3em 3em 3em;
`;
const LoaderContainer = styled.div`
  padding-top: 100px;
  margin: auto;
  text-align: center;
  width: 100px;
`;

const IndustryCol = styled(Col)`
  min-width: 110px;
`;
const IndustryColText = styled.p`
  background-color: ${props => props.theme.primary};
  color: #fff;
  font-size: 0.8em;
  padding: 3px 5px;
`;
const LineCol = styled(Col)`
  @media (min-width: 992px) {
  margin-bottom: ${props => props.lineUp ? '24px' : '0px'};
  }
`;
const LineColText = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  font-weight: 700;
`;
const StyledImg = styled.img`
  height: 50px;
  margin-top: 10px;
`;
const StyledDetailImg = styled.img`
  height: 50px;
  margin-top: -10px;
`;
const StyledTrackDetailH4 = styled.h4`
line-height: 5;
margin-left: 10px;
display: inline;
`;
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const HeaderTitle = styled.h3`
  padding: 8px;
  font-size: 1.1em;
  font-weight: 900;
`;
const HeaderTitleTrack = styled.p`
  font-size: 0.6em;
  margin-bottom: 0;
`;
const ColText = styled.p`
  padding: 40px 5%;
`;

const mapStateToProps = (state) => {
    const {response, isFetching} = state.pages['241'] || {isFetching: true};
    const trackResponse = (state.pages['2211'] || {}).response ||  {content: {rendered: ''}};
    const isTrackFetching = (state.pages['2211'] || {}).isFetching;

    return {
        trackResponse,
        isTrackFetching,
        response,
        isFetching
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchTracks: () => {
            return dispatch(pageActions.fetchPageIfNeeded('2211'))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TracksContainer);

