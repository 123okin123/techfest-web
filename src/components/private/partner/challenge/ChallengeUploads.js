//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import {DropZoneChildComponent} from "../../../common";
import {getCookie} from "../../../../helpers/session";
import {faCloudDownloadAlt} from "@fortawesome/fontawesome-free-solid/index";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import type {Challenge} from '../../../../constants'
import {challengeActions} from "../../../../actions";
import {Button, Col, Row} from 'reactstrap'


type Props = {
    challenge?: Challenge,
    updateChallenge: (Challenge)=>Promise<Challenge>
}

type State = {
    uploadOptions?: {},
    s3Url: string,
    uploadState: {
        isUploadSuccess?: boolean,
        isUploadError?: boolean,
        isUploading?: boolean
    }
}

class ChallengeUploads extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).onDelete = this.onDelete.bind(this);
        (this: any).handleFinishedUpload = this.handleFinishedUpload.bind(this);
        this.state = {
            s3Url: 'https://techfest-challenge-uploads.s3.amazonaws.com',
            uploadState: {}
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            uploadOptions: {
                signingUrl: "/api/challenge-upload/s3/sign",
                signingUrlQueryParams: {uploadType: 'avatar', token: getCookie("jwt")},
                signingUrlWithCredentials: true
            },
        })
    }

    onDelete(upload: {name: string, url: string}) {
        if (!this.props.challenge) {return}
        this.props.updateChallenge({
            ...this.props.challenge,
            uploads: (this.props.challenge.uploads || []).filter(e=>e.url !== upload.url)
        })
    }

    handleFinishedUpload(info)  {
        if (!this.props.challenge) {return}
        this.props.updateChallenge({
          ...this.props.challenge,
            uploads: [
              ...(this.props.challenge.uploads || []),
                {name: info.file.name, url: '/api/challenge-upload/s3/img/' + info.filename}]
        }).then(()=>
          this.setState({
            ...this.state,
            uploadState: {isUploadSuccess: true}
        }));
    };

    render() {
        return (
          <div>
              <p>You can upload an unlimited number of files (any format | max 100mb per file) and also remove a file if necessary.</p>
              <DropzoneS3Uploader
                className="mb-3"
                onFinish={this.handleFinishedUpload}
                onProgress={()=>this.setState({...this.state, uploadState: {isUploading: true}})}
                onError={()=>this.setState({...this.state, uploadState: {isUploadError: true}})}
                s3Url={this.state.s3Url}
                multiple={false}
                maxSize={1024 * 1024 * 100}
                style={{
                    width: '100%', height: '100px', textAlign: 'center', margin: 'auto',
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
                    hint="Drop file here (max size: 100mb)"
                  />
              </DropzoneS3Uploader>

              {this.props.challenge && (this.props.challenge.uploads || []).map((upload, index)=>
                <Row key={index.toString()} className="justify-content-start">
                   <Col xs={1}>
                       <FontAwesomeIcon size="2x" className="mr-2" icon={faCloudDownloadAlt}/>
                   </Col>
                    <Col xs={8} className="text-truncate">
                        <a className="d-block pt-1" target="_blank" href={upload.url + '?token=' + getCookie("jwt")}>
                        {upload.name}</a>
                    </Col>
                    <Col xs={3}><Button onClick={()=>this.onDelete(upload)} color="info">Delete</Button></Col>
                </Row>
              )}



          </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const ownChallenge :?Challenge = state.challenge.challenges.find(challenge=>challenge._id === ((state.user.data || {}).partnerFields || {}).challengeId)
    return {
        challenge: ownChallenge
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateChallenge: (challenge)=>{
            return dispatch(challengeActions.updateChallenge(challenge))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeUploads);