//@flow 
import React, {Component} from 'react'
import {Container} from 'reactstrap'
import HomeHeader from './HomeHeader'
import {Heading} from "../../common/index";
import USPContainer from "../TF2018/USPContainer";
import ChallengeContainer from './TracksContainer'
import ContactContainer from './ContactContainer'
import PartnersContainer from '../TF2018/PartnersContainer'
import GalleryContainer from './GalleryContainer'
import TimelineContainer from '../TF2018/TimelineContainer'
import VideoContainer from '../TF2018/VideoContainer'
import SummaryContainer from '../TF2018/SummaryContainer'
import FAQs from '../TF2018/FAQs'
import {ImageGrid} from "../../common/index";
import {speakers} from "../../../helpers/index";


class HomePage extends Component<{}> {
    componentWillMount() {

    }

    render() {
        return(
          <div style={{marginTop: '-5em'}}>
              <HomeHeader/>
              <section id="gallery">
                  <Container>
                      <Heading title="GALLERY" subtitle="SOME IMPRESSIONS OF THE TECHFEST MUNICH 2018"/>
                  </Container>
                  <GalleryContainer/>
              </section>
              <section id="contact">
                  <Container>
                      <Heading imageURL={require('../../../assets/icons/icon_contact-mail_black.png')}
                               title="GET IN CONTACT" subtitle="QUESTIONS, INQUIRIES AND FURTHER INFORMATION"/>
                      <ContactContainer/>
                  </Container>
              </section>


          </div>
        );
    }
}






export default HomePage