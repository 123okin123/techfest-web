//@flow
import React, {Component} from 'react'
import styled from 'styled-components'
import {Container, Row, Col } from 'reactstrap'
import {Bracket} from '../common'

class USPContainer extends Component {
    constructor() {
        super();

        (this: any).toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen1: false,
            popoverOpen2: false,
            popoverOpen3: false
        };
    }

    toggle(id: string) {
        this.setState({
            [id] : !this.state[id]
        });
        console.log(this.state);
    }

    render() { return (
    <Container>
        <Row className="justify-content-center">
            <Col xs="12" lg="4" className="py-3">
                <FlexContainer id="usp-title-1" className="mb-4">
                    <Bracket/>
                    <HeaderLogo src={require('../../assets/icons/icon_challenge-mountain_black-white.png')}/>
                    <HeaderTitle  onMouseOut={(e) =>e.target.innerHTML = "THE TECHFEST COMPETITION"} onMouseOver={(e) =>e.target.innerHTML = "MORE_DISCIPLINES"}>THE TECHFEST COMPETITION</HeaderTitle>
                    <Bracket right/>
                </FlexContainer>
                <ul className="list-style-x">
                    <li>JOIN FORCES WITH AN AWESOME TEAM AND FIND HIGHLY SKILLED TEAM MATES</li>
                    <li>WE OFFER YOU MULTIPLE TECHNOLOGY TRACKS AND A VAST OF CHALLENGES</li>
                    <li>WIN THE GREAT TECHFEST TROPHY AND GET PRICES SUCH AS SPONSORINGS, LATEST TECH DEVICES, COACHINGS OR START-UP SUPPORT</li>
                    <li className="d-lg-none">CHALLENGE YOUR BELIEVES AND GO BEYOND WHAT`S THINKABLE!</li>
                </ul>
            </Col>
            <Col xs="12" lg="4" className="py-3">
                <FlexContainer id="usp-title-3" className="mb-4">
                    <Bracket/>
                    <HeaderLogo src={require('../../assets/icons/icon_launchpad-rocket_black-white.png')}/>
                    <HeaderTitle onMouseOut={(e) =>e.target.innerHTML = "UNTERNEHMERTUM LAUNCH PAD"} onMouseOver={(e) =>e.target.innerHTML = "MORE_IMPACT"}>UNTERNEHMERTUM LAUNCH PAD</HeaderTitle>
                    <Bracket right/>
                </FlexContainer>
                <ul className="list-style-x">
                    <li>GREAT PROJECTS AND IDEAS DESERVE GREAT PARTNERS</li>
                    <li>FOR TECHFEST PROJECTS: AT OUR UNTERNEHMERTUM LAUNCHPAD DAY (JUNE 18TH), WE HELP THE BEST TEAMS TO START TRANSFORMING THEIR PROJECT INTO A REAL START-UP</li>
                    <li>FOR TECHFEST START-UPS: WE WANT YOU TO GO THE NEXT STEP, WE HELP YOU MATCHING WITH THE RIGHT PARTNERS AND START GROWING  IN OUR ECOSYSTEM.</li>
                    <li className="d-lg-none">DO WHAT YOU LOVE AND START CREATING THE WORLD YOU WANT TO LIVE IN!</li>
                </ul>
            </Col>
            <Col xs="12" lg="4" className="py-3">
                <FlexContainer id="usp-title-2" className="mb-4">
                    <Bracket/>
                    <HeaderLogo src={require('../../assets/icons/icon_toolsmethods_chip_black-white.png')}/>
                    <HeaderTitle  onMouseOut={(e) =>e.target.innerHTML = "STATE-OF-THE-ART TOOLS & METHODS"} onMouseOver={(e) =>e.target.innerHTML = "MORE_FUN"}>STATE-OF-THE-ART TOOLS & METHODS</HeaderTitle>
                    <Bracket right/>
                </FlexContainer>
                <ul className="list-style-x">
                    <li>GET TO KNOW AND LEARN IN WORKSHOPS WITH HI-TECH INDUSTRY PARTNERS</li>
                    <li>GET INSPIRED BY SPEAKERS FROM WORLD LEADING INDUSTRIES</li>
                    <li>ENJOY AN INSPIRING AND CREATIVE FESTIVAL ENVIRONMENT</li>
                    <li>TRANSFORM YOUR IDEAS INTO REAL PROTOTYPES AT OUR MASSIVE MAKERSPACE</li>
                    <li className="d-lg-none">DO CRAZY OVER NORMAL AND GET SCHWIFTY!</li>
                </ul>
            </Col>
            <Col xs="12" lg="4"><ul className="list-style-x"><li className="d-xs-none d-lg-block">CHALLENGE YOUR BELIEVES AND GO BEYOND WHAT`S THINKABLE!</li></ul></Col>
            <Col xs="12" lg="4"><ul className="list-style-x"><li className="d-xs-none d-lg-block">DO WHAT YOU LOVE AND START CREATING THE WORLD YOU WANT TO LIVE IN!</li></ul></Col>
            <Col xs="12" lg="4"><ul className="list-style-x"><li className="d-xs-none d-lg-block">DO CRAZY OVER NORMAL AND GET SCHWIFTY!</li></ul></Col>
        </Row>
        <Row className="mt-5 justify-content-center">
            <Col lg="10" className="mt-5">
                <USPHeadline className="text-center mt-5" >TECHFEST IN A NUTSHELL</USPHeadline>
                <FlexContainer center>
                <Bracket color="#fff"/>
                <USPFeatures className="text-center py-3 px-4" >
                    72 HOURS / 100 MACHINES AND GADGETS / 1500 SQM MAKERSPACE<br/>
                    MORE THAN 400 HIGHLY SKILLED PARTICIPANTS / CREATIVES, CODERS, HACKERS, MAKERS & START-UPS<br/>
                    TECH DEMOS / WORKSHOPS FOR IDEATION AND PROTOTYPING / HANDS-ON SUPPORT<br/>
                    WORLD-LEADING TECHNOLOGY PARTNERS / LAUNCHPAD DAY / PARTNER MATCH MAKING FOR SUCCESSFUL PROJECTS<br/>
                    ART INSTALLATIONS / NETWORKING / FUNFAIR / AFTERPARTY / AND MUCH MORE_<br/><br/>
                    <strong>FREE ACCOMMODATION / FREE FLIXBUS TICKETS WITHIN EUROPE</strong>
                </USPFeatures>
                <Bracket color="#fff" right/>
                </FlexContainer>
            </Col>
        </Row>
    </Container>
);}

}


const FlexContainer = styled.div`
  display: flex;
  justify-content: ${props => props.center ? 'center' : 'space-between'};
`;
const HeaderTitle = styled.h3`
  padding: 8px;
  font-size: 1.3em;
  font-weight: 900;
  width: 80%;
  min-height: 80px;
`;
const HeaderLogo = styled.img`
  height: 50px;
  flex-shrink: 0;
  width: 50px;
  margin: 8px;
`;
const USPHeadline = styled.p`
    font-size: 1.5em;
    font-weight: 700;
`;
const USPFeatures = styled.p`
  line-height: 1.8em;
`;


export default USPContainer;