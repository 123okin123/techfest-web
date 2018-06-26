//@flow
import React, {Component} from 'react'
import styled from "styled-components";
import {pageActions} from "../../../actions/pageActions";
import {connect} from 'react-redux'
import {Container, Col, Row} from 'reactstrap'


type Props = {
    response?: {
        acf?: {
            gallery?: Array<{
                image?: string,
                width?: string,
                height?: string
            }>
        }
    },
    isFetching: boolean,
    fetchPage: ()=>Promise<void>,
}
class GalleryContainer extends Component<Props> {
    componentDidMount() {
        this.props.fetchPage()
    }
    componentDidUpdate() {
        this.props.fetchPage()
    }
    render() {
        return(
          <div>
            <ElementContainer>
                {this.props.response && this.props.response.acf &&  this.props.response.acf.gallery && this.props.response.acf.gallery.map((e, i) =>
                    <Element key={i} imageURL={e.image} elementWidth={e.width} elementHeight={e.height}/>
                )}
            </ElementContainer>
            <Container className="pt-5">
                <Row className="mt-5">
                    <Col xs="12" md="6">
                        <iframe title="techfest1" width="100%" height="315" src="https://www.youtube.com/embed/-E-DKadx5Hk" frameBorder="0"  allowFullScreen/>
                    </Col>
                    <Col xs="12" md="6">
                        <iframe title="techfest2" width="100%" height="315" src="https://www.youtube.com/embed/CUOdwcsd6ww" frameBorder="0"  allowFullScreen/>
                    </Col>
                </Row>
            </Container>
          </div>
        );
    }
}


const ElementContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Element = styled.div`
    background: url(${props => props.imageURL}) no-repeat center;
    background-size: cover;
    width: ${props => props.elementWidth + 'px'};
    height: ${props => props.elementHeight + 'px'};
    margin: 10px;
`;


const mapStateToProps = (state) => {
    const {response, isFetching} = state.pages['241'] || {isFetching: true};
    return {
        response,
        isFetching
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchPage: () => {
            return dispatch(pageActions.fetchPageIfNeeded('241'));
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(GalleryContainer);