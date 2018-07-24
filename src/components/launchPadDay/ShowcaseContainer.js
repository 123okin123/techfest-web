//@flow
import React from 'react'
import {Heading} from "../common/index";
import styled from "styled-components";

type ElementType = {
    title: string,
    logo: string,
    description:  string,
    teamMembers: string
}

const elements: ElementType[] = [{
    title: '#timbAR',
    logo: require('../../assets/partnerLogos/logo_stihl.png'),
    description: 'timbAR wants to build a solution for STIHL customers. They are working on a remote live assistant for Stihl to facilitate garden experience with the help of AR technology". Currently they are part of the Agile Incubation Program and work together with STIHL on further use cases.',
    teamMembers: 'Team: Tanja Baur, Julia Dillard, Tiberiu Corbu, Frederic Fischer'
},{
    title: '#betternot stealmybike.com',
    logo: require('../../assets/partnerLogos/logo_lh.png'),
    description: 'The team developed a bike tracker that prevents theft, and sends cycling data to Munich city to improve safety, traffic flow and infrastructure. Right they are further improving their product and get support from their cooperation partner LH München. https://www.instagram.com/betternotstealmybike/',
    teamMembers: 'Team: Simon Freund, Steffen Linßen, Kilian Schulte'
},{
    title: '#Audificial Intelligence',
    logo: require('../../assets/partnerLogos/logo_audi.png'),
    description: 'Audificial Intelligence´s idea is to combine conferencing with autonomous driving. After TECHFEST they entered in the Agile Incubation program of UnternehmerTUM and currently they are trying to find out if the idea is useful for AUDI AG and its` customers.',
    teamMembers: 'Team: Benjamin Gilg, Martin Duffner, René Lalla, Johannes Gilg'
},{
    title: '#Level6',
    logo: require('../../assets/partnerLogos/logo_magna.png'),
    description: 'The idea of Level 6 includes the use of novel sensor technologies in the automotive sector, above all in terms of safety and comfort functions. The collaboration with Magna started with a first short sprint to test the suitability of the technology. In the near future the team will further work on use cases and developments to improve their idea. They get support from UnternehmerTUM GmbH within the Agile Incubation program.',
    teamMembers: 'Team: Andreas Schrägle, Julian Eder, Francois-Xavier Aubet, Christian, Widderich, Sami Ibishi'
},{
    title: '#eCopilot',
    logo: require('../../assets/partnerLogos/logo_knorr.png'),
    description: 'Knorr-Bremse and eCopilot are developing a driver-assistant-system for train drivers which calculates the most energy-efficient style of driving by taking huge amounts of environmental and vehicle related data into account. Since the TECHFEST, eCopilot have met with Knorr-Bremse and discussed further steps in developing their product. After participating in the Agile Incubation Program, the team members work closely together with Knorr-Bremse.',
    teamMembers: 'Team: Oliver Bock, Moritz Makowski, Jan Müller, Lukas Schmierer, Michael Sodamin, Connor Leahy'
},{
    title: '#Wobble-touch',
    logo: require('../../assets/partnerLogos/logo_wacker.png'),
    description: 'The WobbleTouch takes touch control far beyond your smartphone. The silicone-based touch pad is flexible, stretchable, heat-resistant, antibacterial and can be glued and (re-)moved to anywhere you need, just like a tape. Via Wifi/Bluetooth integration you can control any Smartphone App (e.g. Spotify), hardware (e.g. GoPro) or industry applications (e.g. in the assembly line) using simple buttons & gestures. WobbleTouch offers a first step into a decentralized, connected, intuitively controlled IoT world. Right now the team is working on further use cases for their product together with Wacker Chemie AG.',
    teamMembers: 'Team: Luca Setili, Lars König, Jose Casas, Felix Koellner'
},{
    title: '#JASBA',
    logo: require('../../assets/partnerLogos/logo_siemens.jpg'),
    description: 'MindTenance – The team of JASBA was participating at the Siemens challenge to revolutionize the beverage industry´s production future workplace. And their idea was to provide IoT enabled superpowers to production workers. The solution contains a glove with touch display which triggers issue information of machines in real-time through the platform to the workers. It ensures a knowledge transfer between shifts and people about issues in real-time, standardizes the root-cause-analysis and conserves experience and knowledge of workers who will retire. The solution itself consists of the Siemens MindSphere Platform connected to the machines and added by different microservices and is displayed through a Raspberry Pi. JASBA is now figuring out how to continue working with Siemens.',
    teamMembers: 'Team: Benjamin Walterscheid, Jasmin Scholl, Patricia Müller, Fabian Beckmann, Paul Liepe'
}];





const Element = (props: {data: ElementType}) =>
  <Card>
      <Title>{props.data.title}</Title>
      <img width="100px" src={props.data.logo}/>
      <p className="mt-5">{props.data.description}</p>
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
    text-align: justify;
`;

const Title = styled.h3`
  font-weight: 900;
  font-size: 2.5em;
`;

const ShowcaseContainer = () =>
  <div>
    <Heading title="BUILDING TECH BUSINESS TOGETHER" subtitle="WHAT HAPPENED AFTER TECHFEST MUNICH 2018"/>
      <div className="d-flex flex-wrap justify-content-center mb-5">
          {elements.map(element =>
          <Element data={element} />
          )}
      </div>
  </div>;





export default ShowcaseContainer;