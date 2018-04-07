//@flow
import React, {Component} from 'react'
import styled from 'styled-components'
import {Container, Row, Col} from 'reactstrap'
import {Bracket} from '../common'
import {connect} from "react-redux";

class TracksContainer extends Component {
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
                <Col xs="12" lg="4">
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
        <Row><Col className="text-center"><strong>MORE TRACKS TO BE ANNOUNCED SOON</strong></Col></Row>
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
    return {
        response,
        isFetching
    }
};

export default connect(mapStateToProps)(TracksContainer);

