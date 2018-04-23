//@flow
import React from 'react'
import styled from 'styled-components'
import {Container, Row, Col} from 'reactstrap'
import {Link} from 'react-router-dom'


const Footer = () => (
    <FooterContainer className="mt-5 pt-3">

        <Container>
            <Row className="justify-content-center">
                <Col xs="12" sm="8" md="6">
                    <Slug>POWERED BY</Slug>
                    <Row>
                    <Col xs="4" sm="4" ><a target="_blank" href="https://www.unternehmertum.de/index.html"><Logo src={require('../../assets/icons/icon_unternehmertum.png')}/></a></Col>
                    <Col xs="4" sm="4"><a target="_blank" href="https://www.tum.de/"><Logo src={require('../../assets/icons/icon_tum.png')}/></a></Col>
                    <Col xs="4" sm="4"><a target="_blank" href="http://x.unternehmertum.de/"><Logo src={require('../../assets/icons/icon_x.png')}/></a></Col>
                    <Col xs="6" sm="6"><a target="_blank" href="https://www.maker-space.de/index.html"><Logo src={require('../../assets/icons/icon_makerspace.png')}/></a></Col>
                    <Col xs="6" sm="6"><a target="_blank" href="https://www.unternehmertum.de/venture-capital.html"><Logo src={require('../../assets/icons/icon_uvm.png')}/></a></Col>
                    </Row>
                </Col>
                <Col xs="12" sm="4" className="border-left mt-5 mt-sm-0 pl-sm-5">
                    <Link className="text-white mx-2 d-block" to="/privacy-policy">Privacy Policy</Link>
                    <Link className="text-white mx-2 d-block" to="/imprint">Imprint</Link>
                    <Link className="text-white mx-2 mb-3 d-block" to="/terms-conditions">Terms & Conditions</Link>
                    <a target="_blank" href="https://www.facebook.com/TECHFESTMUNICH/"><i className="fab fa-facebook fa-2x text-white m-3"></i></a>
                    <a target="_blank" href="https://www.instagram.com/techfest_munich/"><i className="fab fa-instagram fa-2x text-white m-3"></i></a>
                </Col>
            </Row>
        </Container>
    </FooterContainer>
);


const FooterContainer = styled.div`
  background-color: ${props => props.theme.primary};
  padding: 10px 20px 20px 20px;
`;
const Logo = styled.img`
  width: 100%;
`;
const Slug = styled.p`
  color: #fff;
  font-size: 0.9em;
`;
export default Footer;

