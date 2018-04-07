//@flow

import React, {Component} from 'react'
import styled from "styled-components";
import {Container} from 'reactstrap'
import {Bracket} from "../common";
import {connect} from "react-redux";


class SummaryContainer extends Component {
  render() {
    return (
      <Container>
        <DescriptionBox>
          <Bracket/>
          <DescriptionContent>
            <DescriptionHead>[MORE_DISCIPLINES] [MORE_IMPACT] [MORE_FUN]</DescriptionHead>
            {this.props.response && this.props.response.acf && this.props.response.acf.summarytext &&
            <DescriptionText dangerouslySetInnerHTML={{__html: this.props.response.acf.summarytext}}/>}
          </DescriptionContent>
          <Bracket right/>
        </DescriptionBox>
      </Container>
    );
  }
}
const DescriptionBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5em;
`;
const DescriptionContent = styled.div`
  padding: 20px;
  text-align: center;
`;
const DescriptionHead = styled.p`
  color: ${props => props.theme.primary};
  font-weight: 600;
  margin-bottom: 0;
`;
const DescriptionText = styled.p`
  color: ${props => props.theme.primary};
  font-size: 0.9em;
  line-height: 2em;
`;



const mapStateToProps = (state) => {
  const {response, isFetching} = state.pages['241'] || {isFetching: true};
  return {
    response,
    isFetching
  }
};
export default connect(mapStateToProps)(SummaryContainer);