//@flow
import React from 'react'
import {NavItem, NavLink, Nav} from "reactstrap";
import styled from "styled-components";

const HomePageNavigation = (props) => (
  <Nav className="ml-auto" navbar>
      <StyledNavItem>
          <StyledNavLink scroll={(el)=> el.scrollIntoView({ behavior: 'smooth', block: 'start'})} to="/#tracks" isFrontPage={props.isFrontPage} isTop={props.isTop} >Tracks</StyledNavLink>
      </StyledNavItem>
      {/*<StyledNavItem>*/}
      {/*<StyledNavLink smooth to="/#speakers"  isFrontPage={this.props.isFrontPage} isTop={this.state.isTop} >Speakers</StyledNavLink>*/}
      {/*</StyledNavItem>*/}
      <StyledNavItem>
          <StyledNavLink scroll={(el)=> el.scrollIntoView({ behavior: 'smooth', block: 'start'})} to="/#partners"  isFrontPage={props.isFrontPage} isTop={props.isTop} >Partners</StyledNavLink>
      </StyledNavItem>
      <StyledNavItem>
          <StyledNavLink scroll={(el)=> el.scrollIntoView({ behavior: 'smooth', block: 'start'})} to="/#timeline"  isFrontPage={props.isFrontPage} isTop={props.isTop} >Timeline 2018</StyledNavLink>
      </StyledNavItem>
      <StyledNavItem>
          <StyledNavLink scroll={(el)=> el.scrollIntoView({ behavior: 'smooth', block: 'start'})} to="/#gallery"  isFrontPage={props.isFrontPage} isTop={props.isTop} >Gallery</StyledNavLink>
      </StyledNavItem>
      {/*<StyledNavItem>*/}
      {/*<StyledNavLink smooth to="/#team"  isFrontPage={this.props.isFrontPage} isTop={this.state.isTop} >Team</StyledNavLink>*/}
      {/*</StyledNavItem>*/}
      <StyledNavItem>
          <StyledNavLink scroll={(el)=> el.scrollIntoView({ behavior: 'smooth', block: 'start'})} to="/#contact"  isFrontPage={props.isFrontPage} isTop={props.isTop} >Contact</StyledNavLink>
      </StyledNavItem>
  </Nav>
);

const StyledNavItem = styled(NavItem)`
padding: 0.8em;
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


export default HomePageNavigation;