//@flow
import React, {Component} from 'react'
import {connect} from "react-redux";
import {pageActions} from "../../actions/pageActions";
import {ScaleLoader} from 'react-spinners';
import {Container} from 'reactstrap';
import styled from 'styled-components';
import {store} from '../../helpers';

type Props = {
    +response: {},
    +isFetching: true,
}

class MediaPressPage extends Component<Props> {
    componentDidMount() {
        store.dispatch(pageActions.fetchPageIfNeeded('243'))
    }
    componentDidUpdate() {
        store.dispatch(pageActions.fetchPageIfNeeded('243'))
    }

    render() {

        return(
            <Container className="container pt-5">
                <h1>{this.props.title}</h1>
                <LoaderContainer><ScaleLoader loading={this.props.isFetching} height={20} width={2} /></LoaderContainer>
                {this.props.response &&
                <div className="pt-3" dangerouslySetInnerHTML={{__html: this.props.response.content.rendered}}/>

                }
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

function mapStateToProps(state, ownProps) {
    const {response, isFetching} = state.pages[ownProps.id] || {response: {content: {rendered: ''}}, isFetching: true};
    return {
        response,
        isFetching
    }
}



export default connect(mapStateToProps)(MediaPressPage)