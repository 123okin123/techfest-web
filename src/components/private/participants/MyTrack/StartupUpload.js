//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCookie} from "../../../../helpers/session";
import type {User} from "../../../../constants/index";
import {DropZoneChildComponent} from "../../../common/index";
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import {userActions} from "../../../../actions/index";
import {Button} from 'reactstrap'

type Props = {
    userData: User,
    updateUser: (User) => Promise<User>,
    getInfo: ()=> Promise<void>
}

type State = {
    uploadOptions?: {},
    s3Url: string,
    fileURL?: string,
    uploadState: {
        isUploadSuccess?: boolean,
        isUploadError?: boolean,
        isUploading?: boolean
    }
}

class StartupUpload extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            s3Url: 'https://techfest-team-uploads.s3.amazonaws.com',
            uploadState: {}
        }
    }

    componentDidMount() {
        this.props.getInfo();
        this.setState({
            ...this.state,
            uploadOptions: {
                signingUrl: "/api/team-upload/s3/sign",
                signingUrlQueryParams: {uploadType: 'avatar', token: getCookie("jwt")},
                signingUrlWithCredentials: true
            },
        });
    }

    handleFinishedUpload = info => {
        if (!this.props.userData.startupFields) {return}
        this.props.updateUser({
            ...this.props.userData,
            startupFields: {
              ...this.props.userData.startupFields,
                trackUploads: [
                    ...(this.props.userData.startupFields.trackUploads || []),
                    {name: info.file.name, url: '/api/team-upload/s3/img/' + info.filename}]
            }
        }).then(()=>
          this.setState({
              ...this.state,
              uploadState: {isUploadSuccess: true}
          }));
    };

    onDelete(upload: {name: string, url: string}) {
        if (!this.props.userData.startupFields) {return}
        this.props.updateUser({
            ...this.props.userData,
            startupFields: {
                ...this.props.userData.startupFields,
                trackUploads: (this.props.userData.startupFields.trackUploads || []).filter(e=>e.url !== upload.url)
            }
        })
    }

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

              {this.props.userData.startupFields && ((this.props.userData.startupFields ||{}).trackUploads || []).map((upload, index)=>
                <div key={index.toString()} >
                    <a target="_blank" href={upload.url + '?token=' + getCookie("jwt")}>{upload.name}</a>
                    <Button className="ml-1" onClick={()=>this.onDelete(upload)} color="info">Delete</Button>
                </div>
              )}
          </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userData:  state.user.data || {},

    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getInfo: () => {
            return dispatch(userActions.fetchInfoIfNeeded())
        },
        updateUser: (user: User) => {
            return dispatch(userActions.update(user))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StartupUpload);