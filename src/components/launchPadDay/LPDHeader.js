//@flow
import React, {Component} from 'react'
import styled from 'styled-components'
import {Button, Container, Row, Col} from 'reactstrap'
import { Link } from 'react-router-dom';

type State = {
    scrollY: number
}

class LPDHeader extends Component<{},State> {
    constructor() {
        super();
        (this: any).onScroll = this.onScroll.bind(this);
        this.state = {
            scrollY: 0
        }
    }
    componentDidMount() {
        document.addEventListener('scroll',this.onScroll);
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScroll)
    }

    onScroll() {
        this.setState({ scrollY: window.scrollY })
    }

    render() { return (
      <Header>
          <Background imgURL={require('../../assets/lpd_header.jpg')}/>
          <LineOverlay yPosition={- this.state.scrollY * 0.6}/>
          <Container>
              <StyledRow className='align-items-center'>
                  <Col>
                      <img style={{maxWidth: '100%', marginTop: '3.5em'}} width="550px"  src={require('../../assets/logo_utum_launchpad-day_white.png')} alt="Techfest Logo"/>
                      {/*<Date>Monday, June 18<sup>th</sup>, 2018</Date>*/}
                      <HashTag>AT LAKE WÖRTHSEE</HashTag>
                  </Col>
              </StyledRow>
          </Container>
      </Header>
    )}


}
// const Video = styled.video`
//     position: absolute;
//     min-height: 100%;
//     min-width: 100%;
//     left: 50%;
//     top: 50%;
//     transform: translate(-50%, -50%);
// `;
const Background = styled.div`
    background: url(${prop => prop.imgURL}) no-repeat;
    background-size: cover;
    position: absolute;
    min-height: 100%;
    min-width: 100%;
    left: 50%; 
    top: 50%;
    transform: translate(-50%, -50%); 
`;
// const Overlay = styled.div`
//     width: 100%;
//     height: 100%;
//     background-color: #0000009c;
//     position: absolute;
//     top: 0;
//     left: 0;
// `;
const Header = styled.div`
  background-color: ${props => props.theme.primary};
  min-height: calc(100vh - 3.5em);
  text-align: center;
  overflow: hidden;
  position: relative;
`;
const StyledRow = styled(Row)`
  min-height: 100vh;
`;

const Date = styled.p`
  font-size: 3.6em;
  margin-bottom: 0;
  margin-top: 0.5em;
  font-weight: 700;
  color: #fff;
`;
const HashTag = styled.p`
  font-size: 1.8em;
  color: #fff;
`;


const LineOverlay = (props) => (
  <LineContainer className="d-none d-lg-block" top={props.yPosition}>
      <Line top="30" left="15"/>
      <Line top="60" left="17"/>
      <Line top="80" left="20" length="7"/>
      <Line top="70" left="10" color="#fce200"/>
      <Line top="15" left="10" length="7" color="#fce200"/>
      <Line top="50" left="5" length="5"/>
      <Line top="20" left="75"/>
      <Line top="30" left="80" color="#fce200"/>
      <Line top="60" left="85" length="7"/>
      <Line top="50" left="90" color="#fce200"/>
      <Line top="85" left="80" length="10" color="#fce200"/>
  </LineContainer>
);
const LineContainer = styled.div`
  top: ${props => ((props.top*10)/10) + 'px'};
  transition: top;
  position: absolute;
  height: 100vh;
  width: 100vw;
`;
const Line = styled.div`
  width: ${props => props.length ? (props.length + '%') : '4%'};
  position: absolute;
  top: ${props => props.top + '%'};
  left: ${props => props.left + '%'};
  height: 2px;
  background-color: ${props => props.color ? props.color : '#fce200'};
`;

export default LPDHeader;

