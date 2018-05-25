//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container} from 'reactstrap'
import {pageActions} from "../../../../actions";
import {LoaderContainer} from "../../../common";
import {ScaleLoader} from 'react-spinners';

type Props = {
    fetchPageIfNeeded: ()=>Promise<void>,
    isFetchingPage?: boolean,
    response?: {content?: {rendered?: string}}
}

class ChallengePage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchPageIfNeeded();
    }

    render() {
        return (
          <Container>
              {this.props.isFetchingPage &&
              <LoaderContainer><ScaleLoader loading={this.props.isFetchingPage} height={20} width={2}/></LoaderContainer>
              }
              {this.props.response && this.props.response.content &&
              <div dangerouslySetInnerHTML={{__html: this.props.response.content.rendered}}/>
              }
          </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {response, isFetching} = state.pages['3101'] || {response: {content: {rendered: ''}}, isFetching: true};
    return {
        isFetchingPage: isFetching,
        response
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchPageIfNeeded: () => {
            return dispatch(pageActions.fetchPageIfNeeded("3101"))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengePage);