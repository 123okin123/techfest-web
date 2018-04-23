//@flow
import React from 'react'
import {Container, Button, Col, Row} from 'reactstrap'
import {Link} from 'react-router-dom'



const RegisterStartPage = () => (
          <Container className="pt-5">
              <h1 className="mb-5">APPLY</h1>
              <Row>
                  <Col lg="6" className="mb-5">
                      <p>You want to join TECHFEST individually or in a team? Apply here for the hackathon competition!*</p>
                      <Button color="primary" tag={Link} to="/register-participant">APPLY AS INDIVIDUAL PARTICIPANT OR TEAM</Button>
                  </Col>
                  <Col lg="6" className="mb-5">
                      <p>Your start-up wants to get challenged at TECHFEST? Apply here for the start-up competition!*</p>
                      <Button color="primary" tag={Link} to="/register-startup">APPLY AS START-UP</Button>
                  </Col>
              </Row>
              <p className="text-muted">*for detailed information please check the <a href="/#faqs">FAQs.</a></p>
          </Container>
        );






export default RegisterStartPage;