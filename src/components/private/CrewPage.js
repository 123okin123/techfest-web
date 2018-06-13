//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {ImageGrid} from "../common";
import {crew} from "../../helpers/crew";
import {Container} from 'reactstrap';
import {userActions} from "../../actions";
import {roles, allPartnerRoles} from "../../constants";

type Props = {
    role?: string,
    getInfo: ()=>Promise<void>
}

class CrewPage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        this.props.getInfo()
    }

    render() {
        return (
          <Container>
              <h1>CREW</h1>
              <ImageGrid justifyContent="space-between" backAndWhite elements={crew.map(e=>{return {title: e.name, description: e.role, imageURL: e.imageURL}})} imageWidth={'180px'} elementWidth={'450px'} elementHeight={'180px'} elementMargin={'20px 0px'}/>
              {(this.props.role === roles.ADMIN_ROLE || allPartnerRoles.includes(this.props.role)) &&
              <ImageGrid justifyContent="space-between" backAndWhite elements={[{title: "Max Seeberger", description:"lead project management", imageURL: require('../../assets/crew/crew-10.jpeg')}]} imageWidth={'180px'} elementWidth={'450px'} elementHeight={'180px'} elementMargin={'20px 0px'}/>
              }
          </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        role: (state.user.data || {}).role,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getInfo: ()=> {
            return dispatch(userActions.fetchInfoIfNeeded())
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CrewPage);