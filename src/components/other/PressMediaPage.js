//@flow
import React, {Component} from 'react'
import {connect} from "react-redux";
import {pageActions} from "../../actions/pageActions";
import {ScaleLoader} from 'react-spinners';
import {Container, Col, Row} from 'reactstrap';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import {FileUpload} from '../common'

const PAGE_ID = '1681';

type Props = {
    response: {
        content?: {rendered?: string},
        acf?: {
            uploads?: Array<{
                file: string,
                name: string,
                preview?: string
            }>,
            file_uploads?: Array<{
                file: string,
                name: string,
                preview?: string
            }>
        }
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
        return (
          <Container className="container pt-5">
              <h1>Press & Media</h1>
              <LoaderContainer><ScaleLoader loading={this.props.isFetching} height={20} width={2}/></LoaderContainer>
              {this.props.response && this.props.response.content &&
              <div className="pt-5 my-5 text-center"
                   dangerouslySetInnerHTML={{__html: this.props.response.content.rendered}}/>
              }
              <div className="w-100">
                  <h2 className="my-5">Images TECHFEST Munich 2018</h2>
                  {this.props.response && this.props.response.acf && this.props.response.acf.uploads &&
                  <ImageGallery items={this.props.response.acf.uploads.map(upload => {
                      return {
                          original: upload.file,
                          thumbnail: upload.preview
                      }
                  })}/>
                  }
                  <h2 className="my-5">Files</h2>
                  <div className="d-flex justify-content-center flex-wrap">
                  {this.props.response && this.props.response.acf && this.props.response.acf.file_uploads &&
                  this.props.response.acf.file_uploads.map((e, i) =>
                    <FileUpload width='300px' key={i.toString()} upload={e}/>
                  )
                  }
                  </div>
                  <h2 className="my-5">Aftermovies</h2>
                      <Row className="mt-5">
                          <Col xs="12" md="6">
                              <iframe title="techfest1" width="100%" height="315" src="https://www.youtube.com/embed/-E-DKadx5Hk" frameBorder="0"  allowFullScreen/>
                          </Col>
                          <Col xs="12" md="6">
                              <iframe title="techfest2" width="100%" height="315" src="https://www.youtube.com/embed/CUOdwcsd6ww" frameBorder="0"  allowFullScreen/>
                          </Col>
                      </Row>
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