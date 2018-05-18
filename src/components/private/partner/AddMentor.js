//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Input} from 'reactstrap'
import {AvForm, AvField} from 'availity-reactstrap-validation'
import {mentorActions} from "../../../actions";
import styled from 'styled-components'
import {DropZoneChildComponent} from '../../common'
import {getCookie} from "../../../helpers/session";
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'



type Props = {}

type State = {
    skills: Array<string>,
    currentSkill?: string,

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
        this.state = {
            skills: [],
            currentSkill: '',
            s3Url: 'https://techfest-job-uploads.s3.amazonaws.com',
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
        this.setState({
            ...this.state,
            fileURL: '/api/job-upload/s3/img/' + info.filename,
            uploadState: {isUploadSuccess: true}
        });
    };

    onValidSubmit(event, values) {

    }

    addSkill() {
        if (!this.state.currentSkill) {return}
        this.setState({skills: [...this.state.skills, this.state.currentSkill], currentSkill: ''})
    }

    render() {
        return (
          <div>
              <AddMentorContainer>
                  <DropzoneS3Uploader
                    onFinish={this.handleFinishedUpload}
                    onProgress={()=>this.setState({...this.state, uploadState: {isUploading: true}})}
                    onError={()=>this.setState({...this.state, uploadState: {isUploadError: true}})}
                    s3Url={this.state.s3Url}
                    accept="image/*"
                    multiple={false}
                    maxSize={1024 * 1024 * 5}
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
                      <DropZoneChildComponent
                        isUploadError={this.state.uploadState.isUploadError}
                        isUploading={this.state.uploadState.isUploading}
                        isUploadSuccess={this.state.uploadState.isUploadSuccess}
                        hint="Drop file here (max size: 5mb | format: png/jpg)"
                      />
                  </DropzoneS3Uploader>
              <AvForm onValidSubmit={this.onValidSubmit}>
                  <AvField name="firstName" label="First Name" required />
                  <AvField name="lastName" label="Last Name" required />
                  <Input name="skills" value={this.state.currentSkill} onChange={(e)=>this.setState({currentSkill: e.target.value})}/>
                  <Button className="d-inline" disabled={!this.state.currentSkill} onClick={this.addSkill}>Add Skill</Button>
                  <SkillContainer>
                      {this.state.skills.map((skill, index)=>
                        <Skill key={index.toString()}>#{skill}</Skill>
                      )}
                  </SkillContainer>
                  <Button type="submit">Add Mentor</Button>
              </AvForm>
              </AddMentorContainer>
          </div>
        )
    }
}

const AddMentorContainer = styled.div`
    background-color: #fff;
    border-radius: 3px;
    padding: 1em;
    box-shadow: 0 0 10px #0006;
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