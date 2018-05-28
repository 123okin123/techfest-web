//@flow
import React, {Component} from 'react'
import {connect} from "react-redux";
import {pageActions} from "../actions/pageActions";
import {ScaleLoader} from 'react-spinners';
import {Container, Col, Row} from 'reactstrap';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCloudDownloadAlt } from '@fortawesome/fontawesome-free-solid'
import {Bracket, FileUpload} from "./common";

const PAGE_ID = '1681';

type Props = {
    response: {
        content?: {rendered?: string},
        acf?: {
            uploads?:
              Array<{
                file: string,
                name: string,
                preview?: string
            }>}
    },
    isFetching: boolean,
    fetchPage: ()=>Promise<void>
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
              {this.props.response && this.props.response.content &&
              <div className="pt-5 my-5 text-center" dangerouslySetInnerHTML={{__html: this.props.response.content.rendered}}/>
              }
              <div className="d-flex flex-wrap justify-content-center">
              {this.props.response && this.props.response.acf && this.props.response.acf.uploads &&
                  this.props.response.acf.uploads.map((e,i)=>
                    <FileUpload width='300px' key={i.toString()} upload={e}/>
                  )
              }
              </div>
          </Container>
        )
    }
}

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
            return dispatch(pageActions.fetchPageIfNeeded(PAGE_ID))
        }
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(PressMediaPage);