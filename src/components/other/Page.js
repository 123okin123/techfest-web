//@flow
import React, {Component} from 'react'
import {connect} from "react-redux";
import {pageActions} from "../../actions/pageActions";
import {ScaleLoader} from 'react-spinners';
import {Container} from 'reactstrap';
import styled from 'styled-components';

type Props = {
    +id: string,
    +title?: string,
    +response?: {
        content?: {
            rendered?: string
        }
    },
    +isFetching: true,
    +fetchPage: ()=>void
}

class Page extends Component<Props> {
    componentDidMount() {
        this.props.fetchPage();
    }
    componentDidUpdate() {
        this.props.fetchPage();
    }

    render() {

        return(
            <Container className="container pt-5">
                <h1>{this.props.title}</h1>
                <LoaderContainer><ScaleLoader loading={this.props.isFetching} height={20} width={2} /></LoaderContainer>
                {this.props.response && this.props.response.content &&
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchPage: () => {
            dispatch(pageActions.fetchPageIfNeeded(ownProps.id))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Page)