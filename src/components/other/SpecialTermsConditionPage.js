//@flow

import React, {Component} from 'react';
import {AvForm, AvField, AvGroup, AvInput} from 'availity-reactstrap-validation'
import {Button, Label, Container, Col, Row, Alert} from 'reactstrap'

type Props = {}

type Form = {
    firstName: string,
    lastName: string,
    email: string
}
type State = {
    confirming: boolean,
    verified?: boolean,
    error?: string
}


class SpecialTermsConditionPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).onValidSubmit = this.onValidSubmit.bind(this);
        this.state = {
            confirming: false,
        }
    }

    onValidSubmit(event: SyntheticEvent<HTMLButtonElement>, values: Form) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YXdlc29tZVRlYW06ZmVzdHRlY2g=',
                'Proxy-Authorization': 'Basic YXdlc29tZVRlYW06ZmVzdHRlY2g='
            },
            body: JSON.stringify(values)
        };
        this.setState({confirming: true});
        fetch('api/public/accept-terms-conditions', requestOptions)
          .then((response)=>response.json())
          .then(json=> {
              this.setState({verified: json.success, error: json.reason + '. ' + json.error})
          })
          .catch(err=>{console.log(err);this.setState({verified : false})})
          .then(()=>this.setState({confirming: false}))
    }

    render() {
        return (
          <Container>

              <h1>TECHFEST 2018 Terms & Conditions</h1>
              <p>Waiver Declaration and Disclaimer TECHFEST MUNICH</p>
              <p>UnternehmerTUM GmbH, UnternehmerTUM Projekt GmbH, and UnternehmerTUM are hereafter referred to as UnternehmerTUM.</p>


              <h2>TECHFEST Munich Code of Conduct</h2>

              <p>All attendees, sponsors, partners, volunteers and staff at our hackathon are required to agree with the following code of conduct. The Organizer will enforce this code throughout the event. We expect cooperation from all participants to ensure a safe environment for everybody. Our hackathon is dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, nationality, religion, previous hackathon attendance or computing experience (or lack of any of the aforementioned). We do not tolerate harassment of hackathon participants in any form. Sexual language and imagery is not appropriate at any hackathon venue, including hacks, talks, workshops, parties, social media and other online media. Hackathon participants violating these rules may be sanctioned or expelled from the hackathon without a refund (if applicable) at the discretion of the hackathon organizer.</p>

              <h2>Pictures & Videos</h2>

              <p>I understand that at this event or related activities, I may be photographed. I agree to allow my photo, video, or film likeness to be used for any legitimate purpose by the event holders, producers, sponsors, organizer, and assigns.  By participating in the event, you give permission to the organizer to take photographs and/or make audio or video recordings and edit them, and release the organizer from any and all liability that may or could arise from the taking or use of the images. The organizer will own and may publish, sell, distribute, or otherwise use them in any way that they believe is proper, including, but not limited to, print publications, video for the web, podcasting, and broadcast media. You understand that you and any other person photographed or recorded will not receive any payment or compensation.</p>


              <h2>Intellectual Property Rights</h2>

              <p>All submissions to the TECHFEST Munich Hackathon Competition remain the intellectual property of the individuals that developed them. We encourage participants to open source their projects to both share their hacks with the greater community and promote innovation in this space. All submissions to the TECHFEST Munich Start-up Competition remain the intellectual property of the start-up company to which the team members belong that developed them. The individuals that developed the submissions waive all rights and claims and transmit them to the start-up company.</p>


              <h2>Protection of Intellectual Property</h2>

              <p>By submitting a TECHFEST Munich Hackathon Entry or accepting any prize, participants have to represent and warrant the following: (a) they will not submit content that is copyrighted, protected by trade secret or otherwise subject to third party intellectual property rights or other proprietary rights, including privacy and publicity rights, unless participants are the owner of such rights or have permission from their rightful owner to post the content and to grant UnternehmerTUM Projekt GmbH (“UnternehmerTUM”) as the organizer of TECHFEST Munich Hackathon all of the rights granted herein; (b) participants will not publish falsehoods or misrepresentations that could damage UnternehmerTUM, TECHFEST Munich Hackathon, Sponsors, or any third party; (c) participants will not submit content that is unlawful, obscene, defamatory, libelous, threatening, pornographic, harassing, hateful, racially or ethnically offensive, or encourages conduct that would be considered a criminal offense, give rise to civil liability, violate any law, or is otherwise inappropriate or destructive to UnternehmerTUM, TECHFEST Munich Hackathon or Sponsors' brand image or goodwill; (d) participants will not post advertisements or solicitations of business; (e) the content submitted by the participant does not contain any viruses, Trojan horses, worms or other disabling devices or harmful code. By posting or submitting a TECHFEST Munich Entry to the Contest (regardless of the form or medium of such content), participants hereby grant UnternehmerTUM a worldwide, perpetual, irrevocable, non- exclusive right and license, with the right to sublicense, to discuss, publicize, market and otherwise display content derived from or relating to the TECHFEST Munich Entry (only valid for Marketing Content), and to distribute and use such Marketing Content for promotional and marketing purposes (either in the form submitted or in the form of a derivative or adapted work). Participants understand that they will not receive any compensation or credit for use of participants’ TECHFEST Munich Entry, other than what is described in these Official Contest Rules.</p>


              <h2>Copyright</h2>

              <p>Each participant represents and warrants that he or she is the sole author and copyright owner of the Submission, and that the Submission is an original work of the Participant, or if the Submission is a work based on an existing application, that the Participant has acquired sufficient rights to use and to authorize others, including the TECHFEST Munich, to use the Submission, as specified in the “Intellectual Property Rights” section of the Rules; and that the Submission does not infringe upon any copyright or upon any other third party rights of which the Participant is aware, and that the Submission is free of malware. By supporting TECHFEST Munich as a Sponsor you officially agree on this policy about Intellectual Property. We will also point out this policy to all participants.</p>


              <h2>General rules for the event</h2>

              <p>We expect respectful behaviour towards other participants and staff as laid down in the code of conduct.
              Malicious damage of any kind will not be tolerated and will have to be covered by the perpetrator. In addition, this may lead to immediate exclusion from the event.
              We expect all participants to help keep the premises in order and clean.
              Illegal substances and objects including weapons of any kind are forbidden. The organizer has the managerial authority over all participants to register an official complaint and thus about the exclusion of participants from the event.
              If you are an employee of a company, government agency, or an academic institution, you are responsible for ensuring that your participation in the Hackathon complies with any policies your company, agency, or institution may have regarding participation in contests of this type. We are not responsible for any disputes arising between you and your employer.
              The organizer reserves the right to cancel, postpone or displace the event and to change its duration.
              The organizer reserve the right to modify this agreement at any time before or after registration, up to and including the weekend of the event. Changes will be announced as they are made, and continued participation in the event will constitute full agreement to these changes.
              The TECHFEST is one of several hackathons organized by UnternehmerTUM. You authorize us to share certain application/registration information for event administration, ranking, pre- and post-event information e-mails, and occasional messages about future hackathons organized by UnternehmerTUM.
                  By registration and participation in the hackathon, I certify that I have read this document, and I fully understand and agree to its content. I am aware that this is a release of liability and a contract and I register for and participate at the event at my own free will.</p>


              <h2>Sleeping Areas</h2>

              <p>Participants are only allowed to sleep in the dedicated sleeping areas.
              Entrance to the sleeping areas is possible at all times as long as the maximum number of persons has not been reached. Entrance is only allowed through the main entrance doors. All other doors to the buildings need to be closed; windows are only to be opened for ventilation.
              The sleeping areas can be accessed from Thursday, June 14 th, 8 pm.
              The sleeping areas are meant for recreation. Food and drinks, or loud music are not allowed.
                  Check-out: All sleeping areas need to be cleared by Monday, June 18 th, 10 am. Alternative storage locations are offered from 8 am on, but you leave your luggage at your own risk. ATTENTION: All baggage items left unattended after Monday, June 18th, 10 am will be collected and stored in the lost & found area without any liability.</p>


              <h2>Staff</h2>

              <p>At all times, instructions of all staff are to be followed. This includes members and volunteers of the core organizing team as well as external service providers.</p>


              <h2>Maker Space</h2>

              <p>Entrance to Maker Space only with closed shoes.</p>


              <h2>Visitor’s obligation to cooperate</h2>

              <p>Prior to entering a workshop, visitors must make themselves familiar with the house and workshop rules and security notices displayed and must comply with these. By entering the workshop, the visitor acknowledges the validity of the GTC and the house and workshop rules.
              All visitors are obliged to comply with instructions from MakerSpace, its employees, legal representatives or vicarious agents and to observe the specifically marked danger zones and to behave in accordance therewith.
              All members must behave in such a manner that proper and safe operations are not impaired and other persons are neither put at risk nor harassed.
              The visitor is forbidden to smoke, consume alcoholic beverages, drugs or other addictive substances in the workshop. Furthermore MakerSpace is entitled to exclude from the workshop any members suspected of being under the influence of the substances referred to above.
              Animals are forbidden in the workshop.
                  MakerSpace reserves the right to undisturbed operation and is entitled at any time to remove a member who is disturbing or jeopardising this orderly operation.</p>


              <h2>Liability and disclaimer</h2>

              <p>Irrespective of the type of breach of duty, including claims in tort, claims for compensation in damages against MakerSpace are excluded, unless the damage has been caused by the culpably intentional or grossly negligent actions of the legal representatives, senior executives or vicarious agents of MakerSpace or falls into the field of application of a category for which MakerSpace has expressly given a guarantee or warranty.
              Contributory negligence, a breach of the duty to mitigate damages or an omission of the support and assistance required from the visitor under the contract must be set against this. In particular, MakerSpace does not accept liability for damage if this damage has arisen by virtue of culpable breaches by the visitor of the GTC, the house and workshop rules, by virtue of non-compliance with MakerSpaces instructions or those of its employees, legal representatives or vicarious agents  or by virtue of unauthorised or inappropriate use of the workshop (in particular of its appliances, machines and tools among others).
              Vistors shall be liable for culpable damage to the appliances, tools and machines put at their disposal, in accordance with the statutory law.
              MakerSpace assumes no liability for objects and the storage of such objects which the visitor has brought into the workshop.
              Any claim for compensation in damages against the MakerSpace, are subject to the statute of limitations; within 12 months from the end of the month in which the claim arose and the member gained knowledge of the circumstances on which the claim is founded and of the identity of the party causing the damage, or would have gained such knowledge had he not been grossly negligent.
              The foregoing limitations of liability do not apply to culpably intentional or fraudulent conduct, liability for guaranteed quality features, to claims based on product liability or to damage arising from injury to life, limb or health.
                  Where the liability of MakerSpace is limited or excluded, the same shall apply to its employees, legal representatives or vicarious agents.</p>


              <h2>Rights of use and intellectual property rights / Copyright</h2>

              <p>Visitors are hereby made aware that, for the purpose of image presentation and advertising for MakerSpace, photos may be taken in the workshop and where appropriate, these may be published. The visitor gives his informed consent to the use, exploitation and publication of these photos by MakerSpace, including where the visitor can be identified on these photos. In the case of targeted representations of the member, MakerSpace shall obtain separate consent from the member for each individual case.</p>


              <h2>Lottery</h2>

              <p>The promoter is: UnternehmerTUM Projekt GmbH whose registered office is at Lichtenbergstr. 6, 85748 Garching b. München.
              The competition is open to residents of Germany aged 18 years or over except employees of UnternehmerTUM Projekt GmbH and their close relatives and anyone otherwise connected with the organisation or judging of the competition.
              There is no entry fee and no purchase necessary to enter this competition.
              By entering this competition, an entrant is indicating his/her agreement to be bound by these terms and conditions.
                  Route to entry for the competition and details of how to enter are via <a href="https://www.facebook.com/TECHFESTMUNICH/">https://www.facebook.com/TECHFESTMUNICH/</a> where the lottery post can be found in the page’s editorial contribution.
              Only one entry will be accepted per person. Multiple entries from the same person will be disqualified.
              Closing date for entry will be as mentioned in the Facebook post. After this date the no further entries to the competition will be permitted.
              No responsibility can be accepted for entries not received for whatever reason.
              The rules of the competition and how to enter are as follows:
              The promoter is not responsible for inaccurate prize details supplied to any entrant by any third party connected with this competition.
              The prize is as follows:
              The prize is as stated and no cash or other alternatives will be offered.The prizes are not transferable. Prizes are subject to availability and we reserve the right to substitute any prize with another of equivalent value without giving notice.
              Winners will be chosen by random allocation.
              The winner will be notified by linking of his/her name and/or personal message on Facebook within 28 days of the closing date. If the winner cannot be contacted or do not claim the prize within 14 days of notification, we reserve the right to withdraw the prize from the winner and pick a replacement winner.
              The promoter will notify the winner when and where the prize can be collected / is delivered.
              The promoter’s decision in respect of all matters to do with the competition will be final and no correspondence will be entered into.
              By entering this competition, an entrant is indicating his/her agreement to be bound by these terms and conditions.
              The competition and these terms and conditions will be governed by German law and any disputes will be subject to the exclusive jurisdiction of the courts of Germany.
              The winner agrees to the use of his/her name and image in any publicity material, as well as their entry. Any personal data relating to the winner or any other entrants will be used solely in accordance with the country-specific data protection regulations applicable to the UnternehmerTUM Projekt GmbH – the data protection declaration is based on the terms used by the European legislator for the adoption of the General Data Protection Regulation (GDPR) – and will not be disclosed to a third party without the entrant’s prior consent.
                  This promotion is in no way sponsored, endorsed or administered by, or associated with, Facebook or any other Social Network. You are providing your information to UnternehmerTUM Projekt GmbH and not to any other party. The information provided will be used in conjunction with the following Privacy Policy found at <a href="https://www.unternehmertum.de/disclaimer.html?lang=en">https://www.unternehmertum.de/disclaimer.html?lang=en.</a>
              UnternehmerTUM Projekt GmbH shall have the right, at its sole discretion and at any time, to change or modify these terms and conditions, such change shall be effective immediately upon posting to this webpage.
                  UnternehmerTUM Projekt GmbH also reserves the right to cancel the competition if circumstances arise outside of its control.</p>




              <h2 className="mt-5">Agree</h2>
              {(!this.state.verified) &&
              <AvForm onValidSubmit={this.onValidSubmit}>
                  <Row>
                      <Col sm={4}><AvField name="email" label="Email" type="email" autoComplete="email" required /></Col>
                      <Col sm={4}><AvField name="firstName" label="First Name" autoComplete="given-name" required /></Col>
                      <Col sm={4}><AvField name="lastName" label="Last Name" autoComplete="family-name" required /></Col>
                  </Row>
                  <AvGroup check>
                      <Label check for="checkItOut">
                          <AvInput type="checkbox" name="accepted" required/>  I agree to the terms and conditions of Techfest Munich 2018.
                      </Label>
                  </AvGroup>
                  <Button disabled={this.state.confirming} className="mt-3" type="submit">Submit</Button>
              </AvForm>
              }
              {(this.state.verified === true) &&
                  <Alert className="mt-3" color="success">
                      Thanks for accepting the terms & conditions.
                  </Alert>
              }
              {(this.state.verified === false) &&
                  <Alert className="mt-3" color="danger">
                      Ops, something bad happened. {this.state.error}
                  </Alert>
              }
          </Container>
        )
    }
}


export default SpecialTermsConditionPage;