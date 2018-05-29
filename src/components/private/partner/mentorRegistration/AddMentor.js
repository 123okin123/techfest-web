//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Input, Col, Row} from 'reactstrap'
import {AvForm, AvField} from 'availity-reactstrap-validation'
import {mentorActions} from "../../../../actions/index";
import styled from 'styled-components'
import {getCookie} from "../../../../helpers/session";
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'
import {type Mentor, type User} from '../../../../constants/index'
import {DropZoneImagePreview} from "../../../common";


type Props = {
    +addMentor: (Mentor)=>Promise<void>,
    +userData: User,
    allowedToAdd: boolean
}

type State = {
    skills: Array<string>,
    currentSkill?: string,
    skillError?: boolean,

    preview?: string,
    uploadOptions?: {},
    s3Url: string,
    fileURL?: string,
    uploadState: {
        isUploadSuccess?: boolean,
        isUploadError?: boolean,
        isUploading?: boolean
    }
}


class AddMentor extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).onValidSubmit = this.onValidSubmit.bind(this);
        (this: any).addSkill = this.addSkill.bind(this);
        (this: any).removeSkill = this.removeSkill.bind(this);
        this.state = {
            skills: [],
            currentSkill: '',
            s3Url: 'https://techfest-mentor-uploads.s3.amazonaws.com',
            uploadState: {}
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            uploadOptions: {
                signingUrl: "/api/mentor-upload/s3/sign",
                signingUrlQueryParams: {uploadType: 'avatar', token: getCookie("jwt")},
                signingUrlWithCredentials: true
            },
        })
    }

    handleFinishedUpload = info => {
        console.log(info);
        this.setState({
            ...this.state,
            preview: info.file.preview,
            fileURL: '/api/mentor-upload/s3/img/' + info.filename,
            uploadState: {isUploadSuccess: true}
        });
    };

    onValidSubmit(event, values) {
        if (this.state.skills.length === 0) {
            this.setState({skillError: true});
            return}
        let newMentor :Mentor = {
          ...values,
            imageURL: this.state.fileURL,
            skills: this.state.skills,
            company: (this.props.userData.partnerFields || {}).company
          };

        this.props.addMentor(newMentor)
          .then(()=> {
              this.setState({...this.state, currentSkill: '', skills: [], preview: ''});
              //$FlowFixMe
              if (this.form) {this.form.reset()}
          }).catch(err=>console.log(err))
    }

    addSkill() {
        if (!this.state.currentSkill) {return}
        this.setState({
            ...this.state,
            skills: [...this.state.skills, this.state.currentSkill],
            currentSkill: '',
            skillError: false
        })
    }

    removeSkill(index: number) {
        this.setState({...this.state, skills: this.state.skills.filter((e,i)=>i !== index)});
    }



    render() {
        return (
          <div>
              <AddMentorContainer>
                  {!this.props.allowedToAdd &&
                  <Overlay/>}
                  <DropzoneS3Uploader
                    className="mb-3"
                    onFinish={this.handleFinishedUpload}
                    onProgress={()=>this.setState({...this.state, uploadState: {isUploading: true}})}
                    onError={()=>this.setState({...this.state, uploadState: {isUploadError: true}})}
                    s3Url={this.state.s3Url}
                    accept="image/*"
                    multiple={false}
                    maxSize={1024 * 1024 * 2}
                    style={{
                        width: '180px', height: '180px', textAlign: 'center', margin: 'auto',
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
                      <DropZoneImagePreview
                        isUploadError={this.state.uploadState.isUploadError}
                        isUploading={this.state.uploadState.isUploading}
                        isUploadSuccess={this.state.uploadState.isUploadSuccess}
                        preview={this.state.preview}
                      />
                  </DropzoneS3Uploader>



              <AvForm onValidSubmit={this.onValidSubmit} ref={c =>
              {/*$FlowFixMe*/
                   (this.form = c)}}>
                  <StyledAvField name="firstName" label="" placeholder="First Name" required />
                  <StyledAvField name="lastName" label="" placeholder="Last Name" required />
                  <StyledAvField name="email" label="" placeholder="Email" type="email" required />
                  <Row>
                  <Col sm={8}><StyledInput error={this.state.skillError} placeholder="Skill" name="skills" value={this.state.currentSkill} onChange={(e)=>this.setState({...this.state, currentSkill: e.target.value})}/></Col>
                  <Col sm={2}><Button className="d-inline" disabled={!this.state.currentSkill} onClick={this.addSkill}>Add Skill</Button></Col>
                  </Row>
                      <SkillContainer>
                      {this.state.skills.map((skill, index)=>
                        <Skill onClick={()=>this.removeSkill(index)} key={index.toString()}>#{skill}</Skill>
                      )}
                  </SkillContainer>
                  <Button className="float-right mt-4" type="submit">Add Mentor</Button>
              </AvForm>
              </AddMentorContainer>
          </div>
        )
    }
}
const Overlay = styled.div`
    width: calc(100% - 30px);
    max-width: 350px;
    margin: auto;
    height: 100%;
    top: 0;
    position: absolute;
    z-index: 100;
    left: 0;
    right: 0;
    background-color: #ffffffd9;
    border-radius: 5px;
`;
const AddMentorContainer = styled.div`
    background-color: #fff;
    border-radius: 5px;
    padding: 1em;
    box-shadow: 0 0 10px #0006;
    max-width: 350px;
    overflow: auto;
    margin: auto;
`;
const StyledAvField = styled(AvField)`
  border-bottom: 2px dashed #999 !important;
`;
const StyledInput = styled(({ error, ...rest }) => <Input {...rest} />)`
  border-bottom: 2px dashed ${(props)=>props.error ? '#dc3545' : '#999'} !important;
  
`;

const Skill = styled.span`
    background-color: #e9ecef;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 1.05em;
    color: #6c757d;
    margin: 5px;
`;
const SkillContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 20px;
`;



const mapStateToProps = (state, ownProps) => {
    return {}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addMentor: (mentor)=> {
            return dispatch(mentorActions.saveMentor(mentor))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMentor);