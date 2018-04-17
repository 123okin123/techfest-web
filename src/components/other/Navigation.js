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
        const logo = (this.state.isTop && this.props.isFrontPage) ? <img className="d-none d-sm-block" src={require('../../assets/TF_logoNEW_ square_white.png')} height="40" alt="techfest-logo"/> :  <img className="d-none d-sm-block" src={require('../../assets/TF_logoNEW_ square_black.png')} height="40" alt="techfest-logo"/>;
        const mobileLogo = <img className="d-block d-sm-none" src={require('../../assets/TF_logoNEW_ square_black.png')} height="40" alt="techfest-logo"/>;
        const LoginComponent = (this.props.loggedIn) ?
          <StyledNavItem>
              <StyledNavLink to="/" onClick={this.props.logout} isFrontPage={this.props.isFrontPage} isTop={this.state.isTop}>Logout</StyledNavLink>
          </StyledNavItem> :
          <StyledNavItem>
            <StyledNavLink to="/login" isFrontPage={this.props.isFrontPage} isTop={this.state.isTop}>Login</StyledNavLink>
          </StyledNavItem>;

        return (
            <div>
                <StyledNavBar isFrontPage={this.props.isFrontPage} isTop={this.state.isTop} light fixed="top" expand="sm">
                    <NavbarBrand tag={Link} to="/">{logo}{mobileLogo}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <StyledNavItem>
                                <StyledNavLink scroll={(el)=> el.scrollIntoView({ behavior: 'smooth', block: 'start'})} to="/#tracks" isFrontPage={this.props.isFrontPage} isTop={this.state.isTop} >Tracks</StyledNavLink>
                            </StyledNavItem>
                            {/*<StyledNavItem>*/}
                                {/*<StyledNavLink smooth to="/#speakers"  isFrontPage={this.props.isFrontPage} isTop={this.state.isTop} >Speakers</StyledNavLink>*/}
                            {/*</StyledNavItem>*/}
                            <StyledNavItem>
                                <StyledNavLink scroll={(el)=> el.scrollIntoView({ behavior: 'smooth', block: 'start'})} to="/#partners"  isFrontPage={this.props.isFrontPage} isTop={this.state.isTop} >Partners</StyledNavLink>
                            </StyledNavItem>
                            <StyledNavItem>
                                <StyledNavLink scroll={(el)=> el.scrollIntoView({ behavior: 'smooth', block: 'start'})} to="/#timeline"  isFrontPage={this.props.isFrontPage} isTop={this.state.isTop} >Timeline 2018</StyledNavLink>
                            </StyledNavItem>
                            <StyledNavItem>
                                <StyledNavLink scroll={(el)=> el.scrollIntoView({ behavior: 'smooth', block: 'start'})} to="/#gallery"  isFrontPage={this.props.isFrontPage} isTop={this.state.isTop} >Gallery</StyledNavLink>
                            </StyledNavItem>
                            {/*<StyledNavItem>*/}
                                {/*<StyledNavLink smooth to="/#team"  isFrontPage={this.props.isFrontPage} isTop={this.state.isTop} >Team</StyledNavLink>*/}
                            {/*</StyledNavItem>*/}
                            <StyledNavItem>
                                <StyledNavLink scroll={(el)=> el.scrollIntoView({ behavior: 'smooth', block: 'start'})} to="/#contact"  isFrontPage={this.props.isFrontPage} isTop={this.state.isTop} >Contact</StyledNavLink>
                            </StyledNavItem>
                            {/*<StyledNavItem>*/}
                                {/*<StyledNavLink to="/press-media" isFrontPage={this.props.isFrontPage} isTop={this.state.isTop} >Press & Media</StyledNavLink>*/}
                            {/*</StyledNavItem>*/}
                            <StyledNavItem>
                                <StyledNavLink target="_blank" to="/register" isFrontPage={this.props.isFrontPage} isTop={this.state.isTop} >Apply now</StyledNavLink>
                            </StyledNavItem>
                            {LoginComponent}
                        </Nav>
                    </Collapse>
                </StyledNavBar>
            </div>
        );
    }
}

const StyledNavItem = styled(NavItem)`
padding: 0.8em;
`;
const StyledNavBar = styled(({ isTop, isFrontPage, ...rest }) => <Navbar {...rest} />)`
background-color: ${props => props.theme.background};
box-shadow: 0 7px 10px 0 #00000024;
@media (min-width: 576px) { 
background-color: ${props => (props.isTop && props.isFrontPage) ? '#ffffff00' : props.theme.background};
box-shadow: ${props => (props.isTop && props.isFrontPage) ? 'none' : '0px 7px 10px 0px #00000024'};
transition: background-color 200ms linear;
}
`;
const StyledNavLink = styled(({isTop, isFrontPage, ...rest}) => <NavLink {...rest} />)`
color: #000;
&:hover {
text-decoration: none;
}
@media (min-width: 576px) { 
 color: ${props => (props.isTop && props.isFrontPage) ? '#fff' : '#000' }!important;
 &:hover {
  color: ${props => (props.isTop && props.isFrontPage) ? props.theme.secondary : '#828282' }!important;
 }
 }
`;


const mapStateToProps = (state) => {
    const { loggedIn } = state.authentication;
    return {
        loggedIn
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