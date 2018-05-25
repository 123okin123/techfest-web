//@flow

import React, {Component} from 'react'
import styled from "styled-components";
import {Container, Collapse, Button, Col, Row} from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/fontawesome-free-solid'
import {connect} from "react-redux";

type Props = {
    response?: {
        acf?: {
            faqs?: Array<{
                title?: string,
                body?: string
            }>
        }
    }
}
type State = {

}

class FAQs extends Component<Props,State> {
    constructor(props) {
        super(props);
        (this: any).toggle = this.toggle.bind(this);
        this.state = {}
    }
    toggle(i) {
        this.setState({
          ...this.state,
            [i]: !this.state[i]
        });
    }
    render() {
        return (
          <Container>
              <Row className="justify-content-center">
                  <Col xs="12" md="8">
                      {this.props.response && this.props.response.acf && this.props.response.acf.faqs && (this.props.response.acf.faqs.length > 0) &&
                      this.props.response.acf.faqs.map((e,i) =>
                          <div key={i} className="position-relative">
                              <CollapseButton className="text-left mx-3" color="link" onClick={() => this.toggle(i)}>{e.title}</CollapseButton>
                              <StyledFontAwesomeIcon icon={(this.state[i] === true) ? faAngleUp : faAngleDown}/>
                              <Divider/>
                              <Collapse isOpen={this.state[i]} ><CollapseContainer dangerouslySetInnerHTML={{__html: e.body}}/></Collapse>
                          </div>
                      )}
                  </Col>
              </Row>
          </Container>
        );
    }
}

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
position:absolute;
top: 15px;
right: 40px;
`;
const Divider = styled.div`
background-color: #000;
height: 1px;
width: 100%;
`;
const CollapseButton = styled(Button)`
    width: 90%;
    font-size: 1.2em;
    font-weight: 500;
    color: #000;
    white-space: pre-wrap;
    &:hover, &:focus {
      text-decoration: none;
      color: #000;
    }
`;
const CollapseContainer = styled.div`
  padding: 1em 2em;
`;


const mapStateToProps = (state) => {
    const {response, isFetching} = state.pages['241'] || {isFetching: true};
    return {
        response,
        isFetching
    }
};
export default connect(mapStateToProps)(FAQs);