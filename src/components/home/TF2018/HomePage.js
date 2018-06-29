//@flow 
import React, {Component} from 'react'
import {Container} from 'reactstrap'
import HomeHeader from './HomeHeader'
import {Heading} from "../../common/index";
import USPContainer from "./USPContainer";
import ChallengeContainer from '../TF2018/TracksContainer'
import ContactContainer from '../TF2019/ContactContainer'
import PartnersContainer from './PartnersContainer'
import GalleryContainer from '../TF2019/GalleryContainer'
import TimelineContainer from './TimelineContainer'
import VideoContainer from './VideoContainer'
import SummaryContainer from './SummaryContainer'
import FAQs from './FAQs'
import {ImageGrid} from "../../common/index";
import {speakers} from "../../../helpers/index";


class HomePage extends Component<{}> {
    componentWillMount() {

    }

    render() {
        return(
          <div style={{marginTop: '-5em'}}>
              <HomeHeader/>
              <section id="summary">
                  <SummaryContainer/>
              </section>
              <section id="video">
                  <VideoContainer/>
              </section>
              <section id="usps">
                  <Container>
                      <USPContainer/>
                  </Container>
              </section>
              <section id="tracks">
                  <Container>
                      <Heading imageURL={require('../../../assets/icons/icon_challenge-mountain_black.png')}
                               title="THE TRACKS 2018" subtitle="START CREATING IN ONE OF THIS YEAR'S TECHNOLOGY TRACKS"/>
                      <ChallengeContainer/>
                  </Container>
              </section>
              <section id="partners">
                  <PartnersContainer/>
              </section>
              <section id="timeline">
                  <Container>
                      <Heading title="TIMELINE TECHFEST 2018"
                               subtitle="72H HACKATHON WITH A WARM-UP PRE-EVENT AND FIRST OF ITS KIND LAUNCHPAD DAY"/>
                      <TimelineContainer/>
                  </Container>
              </section>
              <section id="speakers">
                  <Container>
                      <Heading imageURL={require('../../../assets/icons/icon_speakers-megafon_black.png')}
                               title="OUR SPEAKERS 2018" subtitle="TECH COMPETENCE - AT YOUR HANDS"/>
                      <ImageGrid justifyContent="space-between" backAndWhite imageWidth={'180px'} elementWidth={'450px'}
                                 elementHeight={'180px'} elementMargin={'20px 0px'} elements={speakers}/>
                  </Container>
              </section>
              {/*<section id="team">*/}
              {/*<Heading imageURL={require('../../assets/icons/icon_team-people_black.png')} title="REACH THE TEAM" subtitle="WE ARE HACKERS, MAKERS AND DESIGNERS"/>*/}
              {/*<ImageGrid imageWidth={'180px'} elementWidth={'340px'} elementHeight={'130px'} elementMargin={'20px 0px'} elements={teamElements}/>*/}
              {/*</section>*/}
              <section id="faqs">
                  <Container>
                      <Heading title="FAQs" subtitle=""/>
                      <FAQs/>
                  </Container>
              </section>
          </div>
        );
    }
}






export default HomePage