//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCookie} from "../../../../helpers/session";
import type {Team} from "../../../../constants";
import {DropZoneChildComponent} from "../../../common";
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import {teamActions} from "../../../../actions";
import {Button} from 'reactstrap'

type Props = {
    team: Team,
    updateTeam: (Team) => Promise<Team>
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

class TeamUpload extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            s3Url: 'https://techfest-team-uploads.s3.amazonaws.com',
            uploadState: {}
        }
    }

    componentDidMount() {
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
        if (!this.props.team) {return}
        this.props.updateTeam({
            ...this.props.team,
            uploads: [
                ...(this.props.team.uploads || []),
                {name: info.file.name, url: '/api/team-upload/s3/img/' + info.filename}]
        }).then(()=>
          this.setState({
              ...this.state,
              uploadState: {isUploadSuccess: true}
          }));
    };

    onDelete(upload: {name: string, url: string}) {
        if (!this.props.team) {return}
        this.props.updateTeam({
            ...this.props.team,
            uploads: (this.props.team.uploads || []).filter(e=>e.url !== upload.url)
        })
    }

    render() {
        return (
          <div>
              <DropzoneS3Uploader
                className="mb-3"
                onFinish={this.handleFinishedUpload}
                onProgress={()=>this.setState({...this.state, uploadState: {isUploading: true}})}
                onError={()=>this.setState({...this.state, uploadState: {isUploadError: true}})}
                s3Url={this.state.s3Url}
                multiple={false}
                maxSize={1024 * 1024 * 5}
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
                    hint="Drop file here (max size: 5mb)"
                  />
              </DropzoneS3Uploader>

              {this.props.team && (this.props.team.uploads || []).map((upload, index)=>
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
    const team = state.team.teams.find((team: Team)=> {
        return team.participantIds.includes((state.user.data || {})._id)
    });
    return {
        team: team
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateTeam: (team: Team) => {
            return dispatch(teamActions.updateTeam(team))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamUpload);