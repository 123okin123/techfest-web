//@flow 
import React, {Component} from 'react'
import {Container} from 'reactstrap'
import HomeHeader from './HomeHeader'
import {Heading} from "../../common/index";
import ContactContainer from './ContactContainer'
import GalleryContainer from './GalleryContainer'
import TeaserContainer from './TeaserContainer'
import PartnersContainer from './PartnersContainer'

class HomePage extends Component<{}> {
    componentWillMount() {

    }

    render() {
        return(
          <div style={{marginTop: '-5em'}}>
              <HomeHeader/>
              <section id="video">
              <Container className="text-center">
                  <video className="w-100" controls>
                      <source src="https://s3.eu-central-1.amazonaws.com/techfest-wp-admin/TF+MASTER+ALL_2.mp4" type="video/mp4"/>
                  </video>
              </Container>
              </section>
              <section id="gallery">
                  <Container>
                      <Heading title="GALLERY" subtitle="SOME IMPRESSIONS OF THE TECHFEST MUNICH"/>
                  </Container>
                  <GalleryContainer/>
              </section>
              <section id="teaser">
                  <Container>
                    <TeaserContainer/>
                  </Container>
              </section>
              <section id="partners">
                  <PartnersContainer/>
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