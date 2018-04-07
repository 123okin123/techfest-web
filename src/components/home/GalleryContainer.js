//@flow
import React, {Component} from 'react'
import styled from "styled-components";
import {pageActions} from "../../actions/pageActions";
import {store} from '../../helpers'
import {connect} from 'react-redux'


type Props = {
    response: {},
    isFetching: boolean
}
class GalleryContainer extends Component<Props> {
    componentDidMount() {
        store.dispatch(pageActions.fetchPageIfNeeded('241'));
    }
    componentDidUpdate() {
        store.dispatch(pageActions.fetchPageIfNeeded('241'));
    }
    render() {
        return(
            <ElementContainer>
                {this.props.response && this.props.response.acf && this.props.response.acf.gallery.map((e, i) =>
                    <Element key={i} imageURL={e.image} elementWidth={e.width} elementHeight={e.height}/>
                )}
            </ElementContainer>
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

export default connect(mapStateToProps)(GalleryContainer);