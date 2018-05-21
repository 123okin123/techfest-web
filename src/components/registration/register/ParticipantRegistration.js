//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {AvForm, AvField, AvRadioGroup, AvRadio, AvInput, AvGroup} from 'availity-reactstrap-validation';
import {Label, Container, Row, Col, Button, Alert, FormGroup} from 'reactstrap'
import {Link} from 'react-router-dom';
import styled from 'styled-components';
//$FlowFixMe
import {countryList} from "../../../helpers";
import { ScaleLoader } from 'react-spinners';
import {getCookie} from "../../../helpers/session";
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'
import {userActions} from '../../../actions'
import {type User} from '../../../constants'
import {pageActions} from "../../../actions/pageActions";



type Props = {
    registering?: boolean,
    registrationSuccess?: boolean,
    register: ({})=>Promise<void>,
    isFetching: ?boolean,
    fetchPage: ()=>Promise<void>,
    response: {
        acf?: {
            preference_options?: Array<{option: string}>,
            challenge_descriptions?: Array<{
                track_title?: string,
                challenges: Array<{
                    challenge_title?: string,
                    challenge_company?: string,
                    challenge_description?: string
                }>
            }>
        }
    }
};

type State = {
    formData: {
        participantsFields?: {
            residence?: {}
        },
        applicantFields?: {
            userChallenges?: {
                dontCare?: boolean,
                firstChoice?: string,
                secondChoice?: string,
                thirdChoice?: string
            }
        }
    },
    uploadOptions?: {},
    s3Url: string,
    fileKeys: Array<string>,
    uploadStateCV: {
        isUploadSuccess?: boolean,
        isUploadError?: boolean,
        isUploading?: boolean
    },
    uploadStateArtist: {
        isUploadSuccess?: boolean,
        isUploadError?: boolean,
        isUploading?: boolean
    },
    fileFormError?: ?string,
    submitError?: ?boolean,
    trackOptions: Array<string>
}

// const trackOptions = [
//     " ",
//     "German quality tools in a smart and connected future - Smart Automation Wave",
//     "Food and Baverage - Smart Automation Wave",
//     "Future Hydraulics - Smart Automation Wave",
//     "Countering drones - Build your SKY-PROTECTOR - Quantified Earth",
//     "Sense the World! - Future Mobility",
//     "Audi Autonomous Fleet Experience - Future Mobility",
//     "Shape energy efficient rail transportation - Future Mobility",
//     "Wild Track and Smart City - Wild Track and Smart City"
// ];

class ParticipantRegistration extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).onFormChange = this.onFormChange.bind(this);
        (this: any).onValidSubmit = this.onValidSubmit.bind(this);
        (this: any).handleFinishedUpload = this.handleFinishedUpload.bind(this);
        (this: any).onSubmit = this.onSubmit.bind(this);
        this.state = {
            fileKeys: [],
            formData: {},
            s3Url: 'https://techfest-uploads.s3.amazonaws.com',
            uploadStateCV: {},
            uploadStateArtist: {},
            trackOptions: [""]
        };
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            uploadOptions: {
                signingUrl: "/api/public/apply-upload/s3/sign",
                signingUrlQueryParams: {uploadType: 'avatar'},
                signingUrlWithCredentials: true
            },
        });
        this.props.fetchPage()
          .then(()=>{
              if (this.props.response && this.props.response.acf && this.props.response.acf.preference_options) {
                  this.setState({trackOptions: this.props.response.acf.preference_options.map(e=> e.option)})
              }
          }).catch(err=>console.log(err))
    }

    handleFinishedUpload = (info: {fileKey: string}, type: string) => {
        if (type === 'cv') {
            this.setState({
                ...this.state,
                fileKeys: [...this.state.fileKeys, info.fileKey],
                uploadStateCV: {isUploadSuccess: true}
            });
        } else if (type === 'artist') {
            this.setState({
                ...this.state,
                fileKeys: [...this.state.fileKeys, info.fileKey],
                uploadStateArtist: {isUploadSuccess: true}
            });
        }
    };

    onFormChange(e) {
        const array = e.target.name.split('.');
        let value = e.target.value;
        if (e.target.value === 'true') {
            value = true;
        } else if (e.target.value === 'false') {
            value = false;
        }
        
        let field = {[array[array.length - 1]]: value};

        array.reverse().forEach((e, i)=>{
            if (i > 0) {
                field = {[e]: field}
            }
        });
        let participantValues = {};
        Object.entries((field.participantsFields || {})).forEach((entries)=>{
            if (typeof entries[1] !== 'object') {
                participantValues = {...participantValues, [entries[0]]: entries[1]}
            }
        });
        let residenceValues = {};
        Object.entries((field.participantsFields || {}).residence || {}).forEach((entries)=>{
            if (typeof entries[1] !== 'object') {
                residenceValues = {...residenceValues, [entries[0]]: entries[1]}
            }
        });
        let applicantValues = {};
        Object.entries((field.applicantFields || {})).forEach((entries)=>{
            if (typeof entries[1] !== 'object') {
                applicantValues = {...applicantValues, [entries[0]]: entries[1]}
            }
        });
        let userChallengesValues = {};
        Object.entries((field.applicantFields || {}).userChallenges || {}).forEach((entries)=>{
            if (typeof entries[1] !== 'object') {
                userChallengesValues = {...userChallengesValues, [entries[0]]: entries[1]}
            }
        });

        this.setState({
          ...this.state,
            formData: {
              ...this.state.formData,
              ...field,
                participantsFields: {
                  ...this.state.formData.participantsFields,
                  ...participantValues,
                  residence: {
                      ...(this.state.formData.participantsFields || {}).residence,
                      ...residenceValues
                  },
                },
                applicantFields: {
                    ...this.state.formData.applicantFields,
                    ...applicantValues,
                  userChallenges: {
                      ...(this.state.formData.applicantFields || {}).userChallenges,
                      ...userChallengesValues
                  }
                }
            }
        });
    }


    onValidSubmit(event, values) {
        this.setState({...this.state, fileFormError: undefined, submitError: undefined});
        if (this.state.fileKeys.length === 0) {
            this.setState({...this.state, fileFormError: "Application file(s) missing. Please select file(s)."});
            return
        }
        const keys = this.state.fileKeys.map((e, i)=> {
            return {[`upload-${i}`]: e}
        });
        this.props.register({...this.state.formData, keys})
          .catch(e=>console.log(e))
    }

    onSubmit(event, errors, values) {
       errors ? this.setState({...this.state, submitError: true}) : this.setState({...this.state, submitError: undefined})
    }


    render() {
        console.log(this.state);
        return (
          <StyledContainer className="p-md-5">
          <h1>BE PART OF TECHFEST</h1>
          {!(this.props.registrationSuccess === true) &&
          <AvForm onChange={this.onFormChange} onValidSubmit={this.onValidSubmit} onSubmit={this.onSubmit}>
              <Row>
                  <Col sm={6}><AvField label="First Name*" name="firstName" autoComplete='given-name' required/></Col>
                  <Col sm={6}><AvField label="Last Name*" name="lastName" autoComplete='family-name' required/></Col>
              </Row>
              <Row>
                  <Col sm={6}><AvField label="Email*" name="email" type='email' autoComplete='email' required/></Col>
                  <Col sm={6}><AvField label="Email Confirmation*" name="emailConfirmation" type='email' autoComplete='email' validate={{match:{value:'email'}}} required/></Col>
              </Row>
              <Row>
                  <Col sm={6}><AvField label="Nationality*" name="participantsFields.nationality" type="select" required>
                      <option> </option>
                      {countryList.map(e=>e.label).map((option, index)=>
                        <option key={index.toString()}>{option}</option>
                      )}
                  </AvField></Col>
                  <Col sm={6}><AvField label="Phone" autoComplete='tel' name="participantsFields.phone"/></Col>
              </Row>
              <Row>
                  <Col sm={4}><AvField label="Date of Birth*" name="participantsFields.dateOfBirth" type="date" required/></Col>
                  <Col sm={4}><AvField label="Gender*" name="participantsFields.gender" type="select" required>
                      <option> </option>
                      <option>female</option>
                      <option>male</option>
                      <option>none</option>
                  </AvField></Col>
                  <Col sm={4}>
                      <StyledAvRadioGroup label="Are you vegetarian?" name="participantsFields.vegetarian">
                          <AvRadio label="Yes" value="true" />
                          <AvRadio label="No" value="false" />
                      </StyledAvRadioGroup>
                  </Col>
              </Row>


              <StyledLabel>PLACE OF RESIDENCE</StyledLabel>
              <Row>
                  <Col sm={6}><AvField label="Street, house number*" name="participantsFields.residence.address" autoComplete='address-line1' required/></Col>
                  <Col sm={6}><AvField label="City*" name="participantsFields.residence.city" autoComplete='address-line2' required/></Col>
              </Row>
              <Row>
                  <Col sm={6}><AvField label="Zip code*" name="participantsFields.residence.zipCode" autoComplete='postal-code' required/></Col>
                  <Col sm={6}><AvField label="Country*" name="participantsFields.residence.country" autoComplete='country-name' required/></Col>
              </Row>
              <Row>
                  {(((this.state.formData.participantsFields || {}).residence || {}).city !== "München" &&
                    ((this.state.formData.participantsFields || {}).residence || {}).city !== "münchen" &&
                    ((this.state.formData.participantsFields || {}).residence || {}).city !== "Munich" &&
                    ((this.state.formData.participantsFields || {}).residence || {}).city !== "munich"
                  ) &&
                  <Col sm={6}>
                      <label>I am not from Munich and want to arrive by Flixbus (please be aware of <a target="_blank" href="https://www.flixbus.com/bus-routes?wt_eid=2152154974100568657&wt_t=1521722684528&_ga=2.252078351.780838453.1521722659-854922651.1521549741 ">Flixbus routes</a>).*</label>
                      <StyledAvRadioGroup label="" name="participantsFields.needsTransport" required>
                      <AvRadio label="Yes" value="true" />
                      <AvRadio label="No" value="false" />
                      </StyledAvRadioGroup>
                  </Col>
                  }
                  <Col sm={6}>
                      <StyledAvRadioGroup label="I need a sleeping place (limited space, non-locals are preferred, first come first serve).*" name="participantsFields.needsAccommodation" required>
                          <AvRadio label="Yes" value="true" />
                          <AvRadio label="No" value="false" />
                      </StyledAvRadioGroup>
                  </Col>
              </Row>
              <Row>
                  <Col xs='12' sm='4'>
                      <AvField label="What describes you best?*" name="participantsFields.bestDescription" type="select" required>
                          <option> </option>
                          <option value="hacker">Hacker</option>
                          <option value="maker">Maker</option>
                          <option value="ideator">Ideator</option>
                          <option value="designer">Designer</option>
                          <option value="artist">Artist</option>
                          <option value="unicorn">Unicorn</option>
                      </AvField>
                  </Col>
                  <Col xs='12' sm='4'>
                      <AvField label="Profession*" name="participantsFields.profession" type="select" required>
                          <option> </option>
                          <option value="student">Student</option>
                          <option value="entrepreneur">Entrepreneur</option>
                          <option value="employee">Employee</option>
                      </AvField>
                  </Col>
                      {(this.state.formData.participantsFields || {}).profession === "student" &&
                      <Col xs='12' sm='4'>
                        <AvField label="Uni*" name="participantsFields.uni" required/>
                      </Col>
                      }
              </Row>
              <StyledAvRadioGroup label="You are the programming genius?*" name="participantsFields.isProgrammer" required>
                  <AvRadio label="Yes" value="true" />
                  <AvRadio label="No" value="false" />
              </StyledAvRadioGroup>
              {(this.state.formData.participantsFields || {}).isProgrammer &&
                <AvField label="Tell us your programming superpowers (Python, Arduino, Angular ect.).*" name="participantsFields.programmerSuperPowers" type="textarea" required/>
              }
              <StyledAvRadioGroup label="You are the design specialist?*" name="participantsFields.isDesigner" required>
                  <AvRadio label="Yes" value="true" />
                  <AvRadio label="No" value="false" />
              </StyledAvRadioGroup>
              {(this.state.formData.participantsFields || {}).isDesigner &&
                <AvField label="Tell us your designing superpowers (CAD, Autodesk Inventor, Adobe Illustrator, UI, Artist ect.)*" name="participantsFields.designerSuperpowers" type="textarea" required/>
              }
              <StyledAvRadioGroup label="You are the Master Maker?*" name="participantsFields.isMaker" required>
                  <AvRadio label="Yes" value="true" />
                  <AvRadio label="No" value="false" />
              </StyledAvRadioGroup>
              {(this.state.formData.participantsFields || {}).isMaker &&
                <AvField label="Tell us your superpowers in Making Stuff (Elektroniks, 3D Printing, Lasercutting etc.).*" name="participantsFields.makerSuperpowers" type="textarea" required/>
              }
              <StyledAvRadioGroup label="You are an artist?*" name="participantsFields.isArtist" required>
                  <AvRadio label="Yes" value="true" />
                  <AvRadio label="No" value="false" />
              </StyledAvRadioGroup>
              {(this.state.formData.participantsFields || {}).isArtist &&
                <div>
                <label>Please, upload a motivational letter (max. 1 page, max. 5MB, pdf format)*</label>
                <DropzoneS3Uploader
                  className="mb-4"
                  onFinish={(info)=>this.handleFinishedUpload(info, 'artist')}
                  onProgress={()=>this.setState({...this.state, uploadStateArtist: {isUploading: true}})}
                  onError={()=>this.setState({...this.state, uploadStateArtist: {isUploadError: true}})}
                  s3Url={this.state.s3Url}
                  accept="application/pdf"
                  multiple={false}
                  maxSize={1024 * 1024 * 5}
                  style={{
                  width: '100%', height: '80px', textAlign: 'center',
                  border: 'dashed 2px #999',
                  borderRadius: '5px',
                  position: 'relative',
                  cursor: 'pointer',
                  overflow:'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
              }}
                  upload={this.state.uploadOptions}
                  >
                  <DropZoneChildComponent
                  isUploadError={this.state.uploadStateArtist.isUploadError}
                  isUploading={this.state.uploadStateArtist.isUploading}
                  isUploadSuccess={this.state.uploadStateArtist.isUploadSuccess}/>
                  </DropzoneS3Uploader>
                </div>
              }
              <AvField label="Some types of other Superpowers?" name="participantsFields.otherSuperpowers" type="textarea"/>
              <AvField label="Why should we select you (max. 140 characters)?" name="participantsFields.whyChoose" type="textarea"/>
              <AvField label="Link of your LinkedIn/ Xing profil" name="participantsFields.socialProfileLink"/>
              <AvField label="Link to your github Profile?" name="participantsFields.gitHubLink"/>
              <label>Show us your CV (max. 2 pages, max. 5MB, pdf format)*</label>
              <DropzoneS3Uploader
                className="mb-4"
                onFinish={(info)=>this.handleFinishedUpload(info, 'cv')}
                onProgress={()=>this.setState({...this.state, uploadStateCV: {isUploading: true}})}
                onError={()=>this.setState({...this.state, uploadStateCV: {isUploadError: true}})}
                s3Url={this.state.s3Url}
                accept="application/pdf"
                multiple={false}
                maxSize={1024 * 1024 * 5}
                style={{
                    width: '100%', height: '80px', textAlign: 'center',
                    border: 'dashed 2px #999',
                    borderRadius: '5px',
                    position: 'relative',
                    cursor: 'pointer',
                    overflow:'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                upload={this.state.uploadOptions}
              >
                  <DropZoneChildComponent
                    isUploadError={this.state.uploadStateCV.isUploadError}
                    isUploading={this.state.uploadStateCV.isUploading}
                    isUploadSuccess={this.state.uploadStateCV.isUploadSuccess}/>
              </DropzoneS3Uploader>
              <Row>
                  <Col sm={6}>
                      <StyledAvRadioGroup label="I already have a project idea.*" name="participantsFields.hasProjectIdea" required>
                          <AvRadio label="Yes" value="true" />
                          <AvRadio label="No" value="false" />
                      </StyledAvRadioGroup>
                  </Col>
                  <Col sm={6}>
                      <StyledAvRadioGroup label="Do you already have a team for TECHFEST?*" name="participantsFields.hasTeam" required>
                          <AvRadio label="Yes" value="true" />
                          <AvRadio label="No" value="false" />
                      </StyledAvRadioGroup>
                  </Col>
              </Row>

              {(this.state.formData.participantsFields || {}).hasTeam &&
                <Row>
                    <Col sm={6}>
                      <StyledAvRadioGroup label="Would you also participate as a single person?*" name="participantsFields.wouldDoAlone" required>
                          <AvRadio label="Yes" value="true" />
                          <AvRadio label="No" value="false" />
                      </StyledAvRadioGroup>
                    </Col>
                    <Col sm={6}>
                        <AvField label="Please tell us your team mates mail adresses (same as in your team mates application!):*" name="participantsFields.teamMatesEmails" required/>
                    </Col>
                </Row>
              }
              <Row>
                  <Col sm={6}>
                      <StyledAvRadioGroup label="Are you looking for a job?*" name="participantsFields.jobSeeking" required>
                          <AvRadio label="Yes" value="true" />
                          <AvRadio label="No" value="false" />
                      </StyledAvRadioGroup>
                  </Col>
                  <Col sm={6}>
                      <StyledAvRadioGroup label="Please inform me, if there are any events coming up. To do so I permit the use of my submitted personal data by UnternehmerTUM.*" name="participantsFields.informEvents" required>
                          <AvRadio label="Yes" value="true" />
                          <AvRadio label="No" value="false" />
                      </StyledAvRadioGroup>
                  </Col>
              </Row>
              <Row>
                  <Col sm={4}>
                      <AvField label="How did you hear about TECHFEST?*" name="participantsFields.howHearAbout" type="select" required>
                          <option> </option>
                          <option value="techfestFB">TECHFEST facebook</option>
                          <option value="utumFB">UnternehmerTUM facebook</option>
                          <option value="uni">University</option>
                          <option value="friends_family">Friends & Family</option>
                          <option value="TFpromotionAktion">TECHFEST Promotion</option>
                          <option value="print">Print advertising</option>
                          <option value="other">other</option>
                      </AvField>
                  </Col>
              {(this.state.formData.participantsFields || {}).howHearAbout === "other"  &&
                <Col sm={4}>
                 <AvField label="How did you hear about TECHFEST then?" name="howHearAboutOther"/>
                </Col>
              }
              </Row>
              <StyledLabel>CHALLENGE PREFERENCES</StyledLabel>
              <StyledAvRadioGroup label="I do not care - I am ready to hack any challenge*" name="applicantFields.userChallenges.dontCare" required>
                  <AvRadio label="Yes" value="true" />
                  <AvRadio label="No" value="false" />
              </StyledAvRadioGroup>
              {(((this.state.formData.applicantFields || {}).userChallenges || {}).dontCare !== true) &&
              <div>
                  <AvField label="First Choice*" name="applicantFields.userChallenges.firstChoice" type="select" required>
                      <option/>
                      {this.state.trackOptions.filter((option) =>
                        option !== ((this.state.formData.applicantFields || {}).userChallenges || {}).secondChoice &&
                        option !== ((this.state.formData.applicantFields || {}).userChallenges || {}).thirdChoice
                      ).map((option, index)=>
                          <option key={index.toString()} value={option}>{option}</option>
                      )}
                  </AvField>
                  <AvField label="Second Choice*" name="applicantFields.userChallenges.secondChoice" type="select" required>
                      <option/>
                      {this.state.trackOptions.filter((option) =>
                        option !== ((this.state.formData.applicantFields || {}).userChallenges || {}).firstChoice &&
                        option !== ((this.state.formData.applicantFields || {}).userChallenges || {}).thirdChoice
                      ).map((option, index)=>
                        <option key={index.toString()} value={option}>{option}</option>
                      )}
                  </AvField>
                  <AvField label="Third Choice*" name="applicantFields.userChallenges.thirdChoice" type="select" required>
                      <option/>
                      {this.state.trackOptions.filter((option) =>
                        option !== ((this.state.formData.applicantFields || {}).userChallenges || {}).firstChoice &&
                        option !== ((this.state.formData.applicantFields || {}).userChallenges || {}).secondChoice
                      ).map((option, index)=>
                        <option key={index.toString()} value={option}>{option}</option>
                      )}
                  </AvField>
                  <Button tag={Link} to="/#tracks" target="_blank">Find out about this year´s TECHFEST Challenges.</Button>
              </div>
              }
              <AvGroup className="mt-4" check>
                  <Label check for="participantsFields.acknowledgement">
                      <StyledCheckboxAvInput type="checkbox" name="acknowledgement" required/>
                      I hereby acknowledge that i have read and agreed to the TECHFEST <Link target="_blank" to="/terms-conditions">terms and conditions</Link>*
                  </Label>
              </AvGroup>
              <FormGroup className="mt-4">
                  <Button disabled={this.props.registering === true} className={"d-flex align-items-center"} color="primary" type="submit">
                      <span className="mr-2">Submit</span>
                      <ScaleLoader color={'#ffffff'} loading={this.props.registering === true} height={20} width={2} />
                  </Button>
              </FormGroup>
          </AvForm>
          }
              {!this.props.registering && (this.props.registrationSuccess === false) &&
                <Alert className="mt-3" color="danger">Sorry, registration was not successful.</Alert>
              }
              {!this.props.registering && this.state.fileFormError &&
                <Alert className="mt-3" color="danger">{this.state.fileFormError}</Alert>
              }
              {!this.props.registering && this.state.submitError &&
              <Alert className="mt-3" color="danger">Registration form contains errors.</Alert>
              }
              {!this.props.registering && (this.props.registrationSuccess === true) &&
                <Alert className="mt-3" color="success">Congratulations, registration was successfully sent.</Alert>
              }
          </StyledContainer>
        )
    }
}

const StyledAvRadioGroup = styled(AvRadioGroup)`
&>legend {
  font-size: 1em;
}
&>.form-check>label>input {
    margin-left: -20px;
    margin-top: 2px;
}
`;
const StyledLabel = styled(Label)`
    font-size: 1.5em;
`;
const StyledContainer = styled(Container)`
  min-height: 100vh;
`;
const StyledCheckboxAvInput = styled(AvInput)`
    margin-left: -20px!important;
    margin-top: 2px!important;
`;

const DropZoneChildComponent = (props) => {
    if (props.isUploading) {
        return (<div><strong>uploading...</strong></div>);
    }
    if (props.isUploadError) {
        return (<div className="text-danger"><strong>error</strong></div>)
    }
    if (props.isUploadSuccess) {
        return (<div className="text-success"><strong>success</strong></div>);
    }
    return (<div>Drop file here (max size: 5mb | format: pdf)</div>);
};

const mapStateToProps = (state, ownProps) => {
    const {registering, registrationSuccess, error} = state.registration;
    const {response, isFetching} = state.pages['2211'] || {response: {content: {rendered: ''}}, isFetching: false};
    return {registering, registrationSuccess, registrationError: error, response, isFetching}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        register: (user) => {
            return dispatch(userActions.register(user))
        },
        fetchPage: () => {
            return dispatch(pageActions.fetchPageIfNeeded('2211'))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantRegistration);