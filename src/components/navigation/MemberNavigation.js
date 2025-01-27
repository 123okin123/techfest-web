//@flow
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav} from 'reactstrap';
import styled from 'styled-components'
import {userActions} from "../../actions/index";
import {connect} from "react-redux";
import PrivateNavItem from "./PrivateNavItem";
import {roles, allPartnerRoles} from "../../constants/userConstants";


type State = {
    isOpen: boolean
}
type Props = {
    +loggedIn: boolean,
    +logout: ()=>void
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
        const logo = <img src={require('../../assets/TF_logoNEW_ square_black.png')} height="40" alt="techfest-logo"/>;
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
                          {/*Participants & Start-ups*/}
                          <PrivateNavItem title="Member Area" to="/private/member-area" permittedRoles={[roles.ADMIN_ROLE,roles.SUPERVISOR_ROLE, roles.MENTOR_ROLE, roles.PARTICIPANT_ROLE, roles.STARTUP_ROLE]}/>
                          {/*<PrivateNavItem title="My Challenge" to="/private/my-challenge" permittedRoles={[roles.ADMIN_ROLE, roles.PARTICIPANT_ROLE]}/>*/}
                          {/*<PrivateNavItem title="My Track" to="/private/my-track" permittedRoles={[roles.ADMIN_ROLE, roles.STARTUP_ROLE]}/>*/}
                          {/*<PrivateNavItem title="Mentors" to="/private/mentors" permittedRoles={[roles.ADMIN_ROLE,roles.SUPERVISOR_ROLE, roles.MENTOR_ROLE, roles.PARTICIPANT_ROLE, roles.STARTUP_ROLE]}/>*/}
                          <PrivateNavItem title="Waiting List" to="/private/waitinglist" permittedRoles={[roles.ADMIN_ROLE, roles.PARTICIPANT_ROLE, roles.STARTUP_ROLE]} />



                          {/*Partners*/}
                          <PrivateNavItem title="Home" to="/private/partner" permittedRoles={[roles.ADMIN_ROLE, roles.MENTOR_ROLE, roles.SUPERVISOR_ROLE].concat(allPartnerRoles)}/>
                          <PrivateNavItem title="Post Job" to="/private/post-job" permittedRoles={[roles.ADMIN_ROLE, roles.TRACK_PARTNER_ROLE]} permittedEmails={["wuerth@techfestmunich.com"]} />
                          {/*<PrivateNavItem title="Mentors" to="/private/register-mentor" permittedRoles={[roles.ADMIN_ROLE, ...allPartnerRoles]}/>*/}
                          {/*<PrivateNavItem title="Guest Registration" to="/private/register-guest" permittedRoles={[roles.ADMIN_ROLE, ...allPartnerRoles]}/>*/}
                          {/*<PrivateNavItem title="Launchpad Day Registration" to="/private/register-lpd-guest" permittedRoles={[roles.ADMIN_ROLE, ...allPartnerRoles]}/>*/}
                          {/*<PrivateNavItem title="Challenge" to="/private/partner-challenge" permittedRoles={[roles.ADMIN_ROLE, roles.CHALLENGE_PARTNER_ROLE, roles.TRACK_PARTNER_ROLE]}/>*/}


                          {/*<PrivateNavItem title="Advisors" to="/private/register-advisor" permittedRoles={[roles.ADMIN_ROLE, roles.TRACK_PARTNER_ROLE, roles.CHALLENGE_PARTNER_ROLE]}/>*/}

                          {/*All*/}
                          <PrivateNavItem title="Jobs" to="/private/jobs" permittedRoles={Object.values(roles)}/>
                          <PrivateNavItem title="Crew" to="/private/crew" permittedRoles={Object.values(roles)}/>
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