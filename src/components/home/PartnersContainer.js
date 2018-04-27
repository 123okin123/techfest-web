//@flow
import React, {Component} from 'react'
import {Container, Button} from 'reactstrap'
import styled from 'styled-components'
import {ImageGrid, Heading} from '../common'
import {Link} from "react-router-dom";
import {connect} from "react-redux";




class PartnersContainer extends Component {
    render() {return (
    <div>
    <FlexContainer>
        <Heading imageURL={require('../../assets/icons/icon_partners-handshake_black.png')} title="OUR PARTNERS" subtitle="WORLD-LEADING TECHNOLOGY PARTNERS AND MORE"/>
        <Button target="_blank" className="mb-3" tag={Link} to="/register-partner" color="primary">BECOME A PARTNER</Button>
    </FlexContainer>
    <PartnerContainer>
        {this.props.response && this.props.response.acf && this.props.response.acf.trackPartners &&
        <div>
        <Container><PartnerSubTitle>Our track partners</PartnerSubTitle> </Container>
        <ImageGrid containImage leftRightInset="20px" imageWidth={'100%'} elementWidth={'380px'} elementHeight={'200px'} elementMargin={'20px 20px'} elements={this.props.response.acf.trackPartners}/>
        </div>}

        {this.props.response && this.props.response.acf && this.props.response.acf.challengePartners &&
        <div>
        <Container><PartnerSubTitle>Our challenge partners</PartnerSubTitle> </Container>
        <ImageGrid containImage leftRightInset="20px" imageWidth={'100%'} elementWidth={'280px'} elementHeight={'130px'} elementMargin={'20px 20px'} elements={this.props.response.acf.challengePartners}/>
        </div>}

        {this.props.response && this.props.response.acf && this.props.response.acf.technologyPartners &&
        <div>
        <Container><PartnerSubTitle>Our technology partners</PartnerSubTitle> </Container>
        <ImageGrid containImage leftRightInset="20px" imageWidth={'100%'} elementWidth={'200px'} elementHeight={'110px'} elementMargin={'20px 20px'} elements={this.props.response.acf.technologyPartners}/>
        </div>}

        {this.props.response && this.props.response.acf && this.props.response.acf.ecosystemPartners &&
        <div>
        <Container><PartnerSubTitle>Our ecosystem partners</PartnerSubTitle> </Container>
        <ImageGrid containImage leftRightInset="20px" imageWidth={'100%'} elementWidth={'190px'} elementHeight={'110px'} elementMargin={'20px 20px'} elements={this.props.response.acf.ecosystemPartners}/>
        </div>}

    </PartnerContainer>
    </div>);
}
}


const FlexContainer = styled(Container)`
display: flex;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;
`;
const PartnerContainer = styled.div`
background-color: white;
`;
const PartnerSubTitle = styled.h3`
  font-size: 1.3em;
  padding-top: 2em;
  font-weight: 700;
`;

const mapStateToProps = (state) => {
    const {response, isFetching} = state.pages['241'] || {isFetching: true};
    return {
        response,
        isFetching
    }
};
export default connect(mapStateToProps)(PartnersContainer);