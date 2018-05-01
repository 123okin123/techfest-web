//@flow
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav} from 'reactstrap';
import styled from 'styled-components'
import {userActions} from "../../actions";
import {connect} from "react-redux";
import PrivateNavItem from "../other/PrivateNavItem";
import {roles, allPartnerRoles} from "../../constants/userConstants";


type State = {
    isOpen: boolean
}
type Props = {
    toggle?: () => void,
    loggedIn: boolean
}

class Navigation extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle()  {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    render() {
        const logo = <img className="d-none d-lg-block" src={require('../../assets/TF_logoNEW_ square_black.png')} height="40" alt="techfest-logo"/>;
        const LoginComponent = (this.props.loggedIn) ?
          <PrivateNavItem title="Logout" to="/" onClick={this.props.logout} isLogin/> :
          <PrivateNavItem title="Login" to="/private" isLogin />;
        return (
          <div>
              <StyledNavBar light fixed="top" expand="lg">
                  <NavbarBrand tag={Link} to="/">{logo}</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                          <PrivateNavItem title="Pre-Event" to="/private/pre-event" permittedRoles={[roles.ADMIN_ROLE, roles.PARTICIPANT_ROLE]}/>
                          <PrivateNavItem title="Partner Area" to="/private/partner" permittedRoles={[roles.ADMIN_ROLE].concat(allPartnerRoles)}/>
                          <PrivateNavItem title="Jobs" to="/private/jobs" permittedRoles={Object.values(roles)}/>
                          {LoginComponent}
                      </Nav>
                  </Collapse>
              </StyledNavBar>
          </div>
        );
    }
}


const StyledNavBar = styled(({ ...rest }) => <Navbar {...rest} />)`
background-color: ${props => props.theme.background};
box-shadow: 0 7px 10px 0 #00000024;
`;




const mapStateToProps = (state) => {
    const { loggedIn, role } = state.authentication;
    return {
        loggedIn,
        role
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => {
            dispatch(userActions.logout())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);