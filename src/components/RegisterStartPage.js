//@flow
import React from 'react'
import {Container, Button, Col, Row} from 'reactstrap'
import {Link} from 'react-router-dom'



const RegisterStartPage = () => (
          <Container className="pt-5">
              <h1>APPLY</h1>
              <h2 className="mb-5 h4">Application Deadline (25. Mai, 23:59 pm)</h2>
              <Row>
                  <Col lg="6" className="mb-5">
                      <Button color="primary" tag={Link} to="/register-participant">APPLY FOR HACKATHON COMPETITION</Button>
                      <p className="mt-3">You want to join TECHFEST individually or in a team? Apply here for the TECHFEST Hackathon Competition!*</p>
                  </Col>
                  <Col lg="6" className="mb-5">
                      <Button color="primary" tag={Link} to="/register-startup">APPLY FOR START-UP COMPETITION </Button>
                      <p className="mt-3">Your start-up wants to participate in TECHFEST? Apply here as a start-up for the TECHFEST Start-up Competition.*</p>
                  </Col>
              </Row>
              <p className="text-muted">*for detailed information please check the <a href="/#faqs">FAQs.</a></p>
          </Container>
        );






export default RegisterStartPage;