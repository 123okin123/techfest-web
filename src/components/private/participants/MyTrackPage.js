//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container} from 'reactstrap'
import {pageActions} from "../../../actions";
import {LoaderContainer} from "../../common";
import {ScaleLoader} from 'react-spinners';

type Props = {
    fetchPageIfNeeded: ()=>Promise<void>,
    isFetchingPage?: boolean,
    response?: {content?: {rendered?: string}},
}

class MyTrackPage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchPageIfNeeded();
    }

    render() {
        return (
          <Container>
              <h1>YOUR TRACK</h1>
              <h3 className="mt-5">How to</h3>
              {this.props.isFetchingPage && <LoaderContainer><ScaleLoader loading={this.props.isFetchingPage} height={20} width={2}/></LoaderContainer>}
              {this.props.response && this.props.response.content && <div dangerouslySetInnerHTML={{__html: this.props.response.content.rendered}}/>}
              {/*<h2>{this.props.challenge && this.props.challenge.name.toUpperCase()}</h2>*/}
              {/*<p>{this.props.challenge && this.props.challenge.description}</p>*/}

          </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {response, isFetching} = state.pages['4111'] || {response: {content: {rendered: ''}}, isFetching: true};
    return {
        isFetchingPage: isFetching,
        response,
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchPageIfNeeded: () => {
            return dispatch(pageActions.fetchPageIfNeeded("4111"))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTrackPage);