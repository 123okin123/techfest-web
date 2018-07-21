//@flow 
import React, {Component} from 'react'
import {Container} from 'reactstrap'
import HomeHeader from './HomeHeader'
import {Heading} from "../../common/index";
import USPContainer from "./USPContainer";
import ChallengeContainer from '../TF2018/TracksContainer'
import TimelineContainer from './TimelineContainer'
import VideoContainer from './VideoContainer'
import SummaryContainer from './SummaryContainer'
import FAQs from './FAQs'
import {ImageGrid} from "../../common/index";
import {speakers} from "../../../helpers/index";
import {pageActions} from "../../../actions/pageActions";
import {connect} from "react-redux";
import ImageGallery from 'react-image-gallery';


type Props = {
    fetchPage: ()=>Promise<void>,
    fetchImages: ()=>Promise<void>,
    response: {
        content?: {rendered?: string},
        acf?: {
            uploads?: Array<{
                file: string,
                name: string,
                preview?: string
            }>
        }
    },
    isFetching: boolean,
};


const PAGE_ID = '241';
class HomePage extends Component<Props> {
    componentDidMount() {
        this.props.fetchPage();
        this.props.fetchImages();
    }
    componentDidUpdate() {
        this.props.fetchPage();
        this.props.fetchImages();
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
              <section id="gallery">
                  <Container>
                  {this.props.response && this.props.response.acf && this.props.response.acf.uploads &&
                  <ImageGallery items={this.props.response.acf.uploads.map(upload => {
                      return {
                          original: upload.file,
                          thumbnail: upload.preview
                      }
                  })}/>
                  }
                  </Container>
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
const mapStateToProps = (state, ownProps) => {
    const {response, isFetching} = state.pages['1681'] || {response: {content: {rendered: ''}},isFetching: true};
    return {
        response,
        isFetching
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchPage: () => {
            return dispatch(pageActions.fetchPageIfNeeded(PAGE_ID))
        },
        fetchImages: () => {
            return dispatch(pageActions.fetchPageIfNeeded('1681'))
        }
    }
};





export default connect(mapStateToProps, mapDispatchToProps)(HomePage);