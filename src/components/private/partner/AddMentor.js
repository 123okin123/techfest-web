//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container} from 'reactstrap'


type Props = {}

class AddMentor extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
          <Container>

          </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMentor);