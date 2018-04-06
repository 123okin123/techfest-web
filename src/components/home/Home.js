//@flow 
import React, {Component} from 'react'
import {Container} from 'reactstrap'
import HomeHeader from './HomeHeader'
import {Heading} from "../common";
import USPContainer from "./USPContainer";
import ChallengeContainer from './TracksContainer'
import ContactContainer from './ContactContainer'
import PartnersContainer from './PartnersContainer'
import GalleryContainer from './GalleryContainer'
import TimelineContainer from './TimelineContainer'
import VideoContainer from './VideoContainer'
import SummaryContainer from './SummaryContainer'




class Home extends Component<{}> {
    componentWillMount() {

    }

    render() {
        return(<div>
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
                        <Heading imageURL={require('../../assets/icons/icon_challenge-mountain_black.png')} title="THE TRACKS" subtitle="START CREATING IN ONE OF THIS YEAR'S TECHNOLOGY TRACKS"/>
                        <ChallengeContainer/>
                        </Container>
                    </section>
                    {/*<section id="speakers">*/}
                        {/*<Heading imageURL={require('../../assets/icons/icon_speakers-megafon_black.png')} title="OUR SPEAKERS" subtitle="TECH COMPETENCE - AT YOUR HANDS"/>*/}
                        {/*<ImageGrid imageWidth={'180px'} elementWidth={'450px'} elementHeight={'180px'} elementMargin={'20px 0px'} elements={speakerElements} magnifierImg/>*/}
                    {/*</section>*/}
                    <section id="partners">
                        <PartnersContainer/>
                    </section>
                    <section id="gallery">
                        <Container>
                            <Heading title="GALLERY" subtitle="SOME IMPRESSIONS OF THE TECHFEST MUNICH 2017"/>
                        </Container>
                        <GalleryContainer/>
                    </section>
                    <section id="timeline">
                        <Container>
                        <Heading title="TIMELINE TECHFEST 2018" subtitle="72H HACKATHON WITH A WARM-UP PRE-EVENT AND FIRST OF IT´S KIND LAUNCHPAD DAY FOR WINNING TEAMS"/>
                        <TimelineContainer/>
                        </Container>
                    </section>
                    {/*<section id="team">*/}
                        {/*<Heading imageURL={require('../../assets/icons/icon_team-people_black.png')} title="REACH THE TEAM" subtitle="WE ARE HACKERS, MAKERS AND DESIGNERS"/>*/}
                        {/*<ImageGrid imageWidth={'180px'} elementWidth={'340px'} elementHeight={'130px'} elementMargin={'20px 0px'} elements={teamElements}/>*/}
                    {/*</section>*/ }
                    <section id="contact">
                        <Container>
                        <Heading imageURL={require('../../assets/icons/icon_contact-mail_black.png')} title="GET IN CONTACT" subtitle="QUESTIONS, INQUIRIES AND FURTHER INFORMATION"/>
                        <ContactContainer/>
                        </Container>
                    </section>


            </div>
        );
    }
}






export default Home