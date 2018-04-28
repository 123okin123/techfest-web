//@flow
import React, { Component } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import {Link} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem } from 'reactstrap';
import styled from 'styled-components'
import {userActions} from "../../actions";
import {connect} from "react-redux";
import PrivateNavItem from "../other/PrivateNavItem";
import {roles} from "../../constants/userConstants";

const allPartnerRoles = [
    roles.CHALLENGE_PARTNER_ROLE,
    roles.ECOSYSTEM_PARTNER_ROLE,
    roles.TECHNOLOGY_PARTNER_ROLE,
    roles.TRACK_PARTNER_ROLE
];

type State = {
    isOpen: boolean,
    isTop: boolean
}
type Props = {
    toggle?: () => void,
    isFrontPage: boolean,
    loggedIn: boolean
}

class Navigation extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            isTop: true
        };
    }
    toggle()  {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    componentDidMount() {
        //$FlowFixMe
        document.addEventListener('scroll', () => {
            //$FlowFixMe
            const isTop = window.scrollY < 50;
            if (isTop !== this.state.isTop) {
                this.setState({ isTop })
            }
        });
    }

    render() {
        const logo = (this.state.isTop && this.props.isFrontPage) ? <img className="d-none d-lg-block" src={require('../../assets/TF_logoNEW_ square_white.png')} height="40" alt="techfest-logo"/> :  <img className="d-none d-lg-block" src={require('../../assets/TF_logoNEW_ square_black.png')} height="40" alt="techfest-logo"/>;
        const mobileLogo = <img className="d-block d-lg-none" src={require('../../assets/TF_logoNEW_ square_black.png')} height="40" alt="techfest-logo"/>;
        const LoginComponent = (this.props.loggedIn) ?
          <PrivateNavItem title="Logout" to="/" onClick={this.props.logout} isLogin/> :
          <PrivateNavItem title="Login" to="/private"isLogin />;
        return (
          <div>
              <StyledNavBar light fixed="top" expand="lg">
                  <NavbarBrand tag={Link} to="/">{logo}{mobileLogo}</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                          <PrivateNavItem title="Member Area" to="/private" />
                          <PrivateNavItem title="Partner Area" to="/private/partner" permittedRoles={[roles.ADMIN_ROLE].concat(allPartnerRoles)}/>
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