//@flow
import React from 'react'
import {Heading} from "../common";
import styled from "styled-components";

type ElementType = {
    title: string,
    logo: string,
    agileIncubationProgram: boolean,
    description:  string,
    teamMembers: string
}

const elements: ElementType[] = [{
    title: '#timbAR',
    logo: require('../../assets/partnerLogos/logo_stihl.png'),
    agileIncubationProgram: true,
    description: 'timbAR wants to build a solution for STIHL customers to get support on how to cut their tree using new technologies (Augemented Reality, HoloLense). They are participating in the Agile Incubation Program and work together with STIHL on further use cases.',
    teamMembers: 'Team: Tanja Baur, Julia Dillard, Tiberiu Corbu, Frederic Fischer'
},{
    title: '#betternot stealmybike.com',
    logo: require('../../assets/partnerLogos/logo_lh.png'),
    agileIncubationProgram: true,
    description: 'The team developed a bike tracker that prevents theft, and sends cycling data to Munich city to improve safety, traffic flow and infrastructure. Right they are further improving their product and get support from their cooperation partner LH München. More info: https://www.instagram.com/betternotstealmybike/',
    teamMembers: 'Team: Simon Freund, Steffen Linßen, Kilian Schulte'
},{
    title: '#Audificial Intelligence',
    logo: require('../../assets/partnerLogos/logo_audi.png'),
    agileIncubationProgram: true,
    description: 'Audificial Intelligence´s idea is to combine conferencing with autonomous driving. After TECHFEST they entered in the Agile Incubation program of UnternehmerTUM and currently they are trying to find out if the idea is useful for AUDI AG and its` customers.',
    teamMembers: 'Team: Benjamin Gilg, Martin Duffner, René Lalla, Johannes Gilg'
},{
    title: '#Level6',
    logo: require('../../assets/partnerLogos/logo_magna.png'),
    agileIncubationProgram: true,
    description: 'The idea of Level 6 includes the use of novel sensor technologies in the automotive sector, above all in terms of safety and comfort functions. The collaboration with Magna started with a first short sprint to test the suitability of the technology. In the near future the team will further work on use cases and developments to improve their idea. They get support from UnternehmerTUM GmbH within the Agile Incubation program.',
    teamMembers: 'Team: Andreas Schrägle, Julian Eder, Francois-Xavier Aubet, Christian, Widderich, Sami Ibishi'
},{
    title: '#eCopilot',
    logo: require('../../assets/partnerLogos/logo_knorr.png'),
    agileIncubationProgram: false,
    description: 'Knorr-Bremse and eCopilot are developing a driver-assistant-system for train drivers which calculates the most energy-efficient style of driving by taking huge amounts of environmental and vehicle related data into account. Since the TECHFEST, eCopilot have met with Knorr-Bremse and discussed further steps in developing their product. After participating in the Agile Incubation Program, the team members work closely together with Knorr-Bremse.',
    teamMembers: 'Team: Oliver Bock, Moritz Makowski, Jan Müller, Lukas Schmierer, Michael Sodamin, Connor Leahy'
},{
    title: '#Wobble-touch',
    logo: require('../../assets/partnerLogos/logo_wacker.png'),
    agileIncubationProgram: false,
    description: 'The WobbleTouch takes touch control far beyond your smartphone. The silicone-based touch pad is flexible, stretchable, heat-resistant, antibacterial and can be glued and (re-)moved to anywhere you need, just like a tape. Via Wifi/Bluetooth integration you can control any Smartphone App (e.g. Spotify), hardware (e.g. GoPro) or industry applications (e.g. in the assembly line) using simple buttons & gestures. WobbleTouch offers a first step into a decentralized, connected, intuitively controlled IoT world. Right now the team is working on further use cases for their product together with Wacker Chemie AG.',
    teamMembers: 'Team: Luca Setili, Lars König, Jose Casas, Felix Koellner'
}];





const Element = (props: {data: ElementType}) =>
  <Card>
      <Title>{props.data.title}</Title>
      <img width="100px" src={props.data.logo}/>
      {props.data.agileIncubationProgram && <p className="text-muted font-weight-bold">agile incubation program</p>}
      <p>{props.data.description}</p>
      <p className="font-weight-light">{props.data.teamMembers}</p>
  </Card>;


const Card = styled.div`
    background-color: #fff;
    border-radius: 5px;
    padding: 2em 1em;
    box-shadow: 0 0 10px #0006;
    overflow: auto;
    margin: 20px;
    width: 500px;
    max-width: 100%;
`;

const Title = styled.h3`
  font-weight: 900;
  font-size: 2.5em;
`;

const ShowcaseContainer = () =>
  <div>
    <Heading title="BUILDING TECH BUSINESS TOGETHER" subtitle="WHAT HAPPENED AFTER TECHFEST MUNICH 2018"/>
      <div className="d-flex flex-wrap justify-content-center">
          {elements.map(element =>
          <Element data={element} />
          )}
      </div>
  </div>;





export default ShowcaseContainer;