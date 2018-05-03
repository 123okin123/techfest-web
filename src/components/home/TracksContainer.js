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
                <Col key={index} xs="12" lg="4">
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
                        <StyledNavItem className="text-center">
                            <StyledNavLink
                              className={this.state.activeTab === '1' ? 'active' : '' }
                              onClick={() => { this.toggleTab('1'); }}
                            >
                                TRACK 1
                            </StyledNavLink>
                        </StyledNavItem>
                        <StyledNavItem className="text-center">
                            <StyledNavLink
                              className={this.state.activeTab === '2' ? 'active' : '' }
                              onClick={() => { this.toggleTab('2'); }}
                            >
                                TRACK 2
                            </StyledNavLink>
                        </StyledNavItem>
                        <StyledNavItem className="text-center">
                            <StyledNavLink
                              className={this.state.activeTab === '3' ? 'active' : '' }
                              onClick={() => { this.toggleTab('3'); }}
                            >
                                TRACK 3
                            </StyledNavLink>
                        </StyledNavItem>
                    </Nav>

                    <StyledTabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    {this.props.trackResponse && this.props.trackResponse.acf && this.props.trackResponse.acf.challenge_descriptions &&
                                    <div>
                                        {this.props.trackResponse.acf.challenge_descriptions.filter(track=>track.track_title === 'SMART AUTOMATION WAVE').map((track, index) =>
                                          <div key={index.toString()}>
                                              <h4 className="mt-5">{track.track_title}</h4>
                                              {track.challenges && track.challenges.map((challenge, index) =>
                                                <div key={index.toString()}>
                                                    <h5 className="mt-4">{challenge.challenge_title}</h5>
                                                    <p className="mb-0"><strong>{challenge.challenge_company}</strong></p>
                                                    <div dangerouslySetInnerHTML={{__html: challenge.challenge_description}}/>
                                                </div>
                                              )}
                                          </div>
                                        )}
                                    </div>
                                    }
                                    {this.props.isTrackFetching &&
                                        <LoaderContainer><ScaleLoader loading={this.props.isTrackFetching} height={20} width={2}/></LoaderContainer>
                                    }
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    {this.props.trackResponse && this.props.trackResponse.acf && this.props.trackResponse.acf.challenge_descriptions &&
                                    <div>
                                        {this.props.trackResponse.acf.challenge_descriptions.filter(track=>track.track_title === 'QUANTIFIED EARTH').map((track, index) =>
                                          <div key={index.toString()}>
                                              <h4 className="mt-5">{track.track_title}</h4>
                                              {track.challenges && track.challenges.map((challenge, index) =>
                                                <div key={index.toString()}>
                                                    <h5 className="mt-4">{challenge.challenge_title}</h5>
                                                    <p className="mb-0"><strong>{challenge.challenge_company}</strong></p>
                                                    <div dangerouslySetInnerHTML={{__html: challenge.challenge_description}}/>
                                                </div>
                                              )}
                                          </div>
                                        )}
                                    </div>
                                    }
                                    {this.props.isTrackFetching &&
                                    <LoaderContainer><ScaleLoader loading={this.props.isTrackFetching} height={20} width={2}/></LoaderContainer>
                                    }
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="3">
                            <Row>
                                <Col sm="12">
                                    {this.props.trackResponse && this.props.trackResponse.acf && this.props.trackResponse.acf.challenge_descriptions &&
                                    <div>
                                        {this.props.trackResponse.acf.challenge_descriptions.filter(track=>track.track_title === 'FUTURE MOBILITY').map((track, index) =>
                                          <div key={index.toString()}>
                                              <h4 className="mt-5">{track.track_title}</h4>
                                              {track.challenges && track.challenges.map((challenge, index) =>
                                                <div key={index.toString()}>
                                                    <h5 className="mt-4">{challenge.challenge_title}</h5>
                                                    <p className="mb-0"><strong>{challenge.challenge_company}</strong></p>
                                                    <div dangerouslySetInnerHTML={{__html: challenge.challenge_description}}/>
                                                </div>
                                              )}
                                          </div>
                                        )}
                                    </div>
                                    }
                                    {this.props.isTrackFetching &&
                                    <LoaderContainer><ScaleLoader loading={this.props.isTrackFetching} height={20} width={2}/></LoaderContainer>
                                    }
                                </Col>
                            </Row>
                        </TabPane>
                    </StyledTabContent>
                </Collapse>
            </Col>
            <Col xs="12" className="text-center">
                <Button className="mt-4 " onClick={this.toggle}>{this.state.fadeIn ? 'HIDE CHALLENGES' : 'SHOW CHALLENGES'}</Button>
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
  width: 33.3333333333%;
`;
const StyledNavLink = styled(NavLink)`
    font-weight: 600;
    font-size: 1.1em;
    color: #000 !important;
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

