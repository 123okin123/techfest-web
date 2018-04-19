//@flow
import React, {Component} from 'react'
import {connect} from "react-redux";
import {pageActions} from "../actions/pageActions";
import {ScaleLoader} from 'react-spinners';
import {Container, Col, Row} from 'reactstrap';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCloudDownloadAlt } from '@fortawesome/fontawesome-free-solid'
import {Bracket} from "./common";

const PAGE_ID = '1681';

type Props = {
    response: {},
    isFetching: boolean
}

class PressMediaPage extends Component<Props> {
    componentDidMount() {
        this.props.fetchPage()
    }
    componentDidUpdate() {
        this.props.fetchPage()
    }

    render() {
        return(
          <Container className="container pt-5">
              <h1>Press & Media</h1>
              <LoaderContainer><ScaleLoader loading={this.props.isFetching} height={20} width={2} /></LoaderContainer>
              {this.props.response &&
              <div className="pt-5 my-5 text-center" dangerouslySetInnerHTML={{__html: this.props.response.content.rendered}}/>
              }
              <Row className="mt-5 justify-content-center">
              {this.props.response && this.props.response.acf && this.props.response.acf.uploads &&
                  this.props.response.acf.uploads.map((e,i)=>
                    <ElementContainer xs="6" md="3" key={i} className="text-center mb-3">
                        <Bracket/>
                          <Link className="pt-3" target="_blank" href={e.file}>
                              <FontAwesomeIcon size="4x" icon={faCloudDownloadAlt}/>
                              <p className="mt-3">{e.name}</p>
                          </Link>
                        <Bracket right/>
                    </ElementContainer>
                  )
              }
              </Row>
          </Container>
        )
    }
}
const ElementContainer = styled(Col)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Link = styled.a`
color: #000;
width: 90%;
`;
const LoaderContainer = styled.div`
  position: absolute;
  top: 50vh;
  left: calc(50% - 50px);
  text-align: center;
  width: 100px;
`;

const mapStateToProps = (state, ownProps) => {
    const {response, isFetching} = state.pages[PAGE_ID] || {response: {content: {rendered: ''}},isFetching: true};
    return {
        response,
        isFetching
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchPage: () => {
            dispatch(pageActions.fetchPageIfNeeded(PAGE_ID))
        }
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(PressMediaPage);