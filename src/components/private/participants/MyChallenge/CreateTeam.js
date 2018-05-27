//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {userActions, teamActions} from "../../../../actions/index";
import {Input, Button, FormGroup, Label, Col, Row} from 'reactstrap'
import {AvField, AvForm} from 'availity-reactstrap-validation'
import {type User, type Team} from '../../../../constants/index'
import styled from "styled-components";
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'
import {getCookie} from "../../../../helpers/session";



type Props = {
    getUsers: ()=>Promise<Array<User>>,
    getTeamOfUser: (user: User)=>Promise<Array<Team>>,
    getInfo: ()=>Promise<void>,
    saveTeam: (team: Team)=>Promise<Team>,
    updateTeam: (team: Team)=>Promise<Team>,
    users: Array<User>,
    userData: User,
    team?: Team,
    +savingState: {
        +saveError?: string,
        +saving?: boolean,
        +savingSuccess?: boolean
    }
}
type State = {
    filter: string,
    team?: Team,
    readyState: {
        loading?: boolean,
        ready?: boolean,
        error?: string
    },

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

class CreateTeam extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).addMember = this.addMember.bind(this);
        (this: any).removeMember = this.removeMember.bind(this);
        (this :any).onlpdChange = this.onlpdChange.bind(this);
        (this: any).saveTeam = this.saveTeam.bind(this);
        (this: any).getFilteredUsers = this.getFilteredUsers.bind(this);
        this.state = {
            filter: "",
            team: this.props.team,
            readyState: {
                loading: true
            },
            s3Url: 'https://techfest-team-uploads.s3.amazonaws.com',
            uploadState: {
                isUploadSuccess: (typeof (this.props.team || {}).imageURL === "string")
            },
            preview: (this.props.team || {}).imageURL
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
        this.props.getInfo()
          .then(()=> this.props.getTeamOfUser(this.props.userData))
          .then(()=> this.props.getUsers())
          .then(()=> this.setState({
            ...this.state,
              team: this.props.team,
              uploadState: {
                  isUploadSuccess: (typeof (this.props.team || {}).imageURL === "string")
              },
              preview: ((this.props.team || {}).imageURL || '') + '?token=' + getCookie("jwt"),
            readyState: {
                ready: true
            }
          })).catch(err=>
        this.setState({
          ...this.state,
            readyState: {
              error: err
            }
        }))
    }

    handleFinishedUpload = info => {
        this.setState({
            ...this.state,
            preview: info.file.preview,
            fileURL: '/api/team-upload/s3/img/' + info.filename,
            uploadState: {isUploadSuccess: true}
        });
    };


    addMember(user: User) {
        this.setState({
            ...this.state,
            team: {
                ...this.state.team,
                participantIds: [...((this.state.team || {}).participantIds || []), user._id]
            }
        })
    }
    removeMember(user: User) {
        this.setState({
            ...this.state,
            team: {
                ...this.state.team,
                participantIds: ((this.state.team || {}).participantIds || []).filter(id=>id !== user._id),
                LPDParticipantIds: ((this.state.team || {}).LPDParticipantIds || []).filter(id=>id !== user._id)
            }
        })
    }

    getFilteredUsers(users: Array<User>): Array<User> {
        const filteredUsers = users.filter(user=>(user.firstName + user.lastName).toLowerCase().search(this.state.filter) !== -1);
        const filteredUsersWithOutMe = filteredUsers.filter(user=>user._id !== this.props.userData._id);
        const filteredUsersWithOutMeAndTeamUsers = filteredUsersWithOutMe.filter(user=> !((this.state.team || {}).participantIds || []).includes(user._id));
        return filteredUsersWithOutMeAndTeamUsers.filter(user=>(user.participantsFields || {}).challengeId === (this.props.userData.participantsFields || {}).challengeId)
    }

    onlpdChange(user: User, e) {
        let lpdParticipantIdsCopy = ((this.state.team || {}).LPDParticipantIds || []).slice();
        if (e.target.checked) {
            lpdParticipantIdsCopy =  lpdParticipantIdsCopy.includes(user._id) ? lpdParticipantIdsCopy : [...lpdParticipantIdsCopy, user._id]
        } else {
            lpdParticipantIdsCopy = lpdParticipantIdsCopy.filter((id)=>id !== user._id)
        }
        this.setState({
            ...this.state,
            team: {
                ...this.state.team,
                LPDParticipantIds: lpdParticipantIdsCopy
            }
        })

    }

    saveTeam(event, values) {
        const participantIds = ((this.props.team || {}).participantIds || []).includes(this.props.userData._id) ?
          [...((this.state.team || {}).participantIds || [])] :
          [...((this.state.team || {}).participantIds || []), this.props.userData._id];
        this.setState({
          ...this.state,
            team: {
              ...this.state.team,
                name: values.name,
                imageURL: this.state.fileURL,
                participantIds: participantIds,
                challengeId: (this.props.userData.participantsFields || {}).challengeId
            }
        },()=> {
            if (this.props.team) {
                this.state.team && this.props.updateTeam(this.state.team)
            } else {
                this.state.team && this.props.saveTeam(this.state.team)
            }
        })
    }


    render() {
        console.log((this.props.team || {}).updating);
        console.log(this.props.savingState.saving);



        const usersOfTeam = this.props.users.filter(user=> ((this.state.team || {}).participantIds || []).includes(user._id));
        return (

          <div>
              <TeamContainer>
                  {((!this.state.readyState.ready || (this.props.team || {}).updating === true) || (this.props.savingState.saving === true)) &&
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
                        width: '100%', height: '200px', textAlign: 'center', margin: 'auto',
                        backgroundColor: '#e6e6e6',
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


                  <AvForm onValidSubmit={this.saveTeam}>
                      <StyledAvField placeholder="Team name" name="name" value={(this.state.team || {}).name} required/>
                      <Row>
                      <Col xs={5}><p className="mt-3">Team Members:</p></Col>
                      <Col xs={4}>{usersOfTeam.length !== 0 && <p className="mt-3 text-center">Could come to Launchpad Day.</p>}</Col>
                      </Row>
                      {usersOfTeam.map((user: User, index)=>
                        <Row key={index.toString()}>
                            <Col xs={5}><p>{user.firstName} {user.lastName}</p></Col>
                            <Col xs={4}><FormGroup check>
                                <Input type="checkbox"
                                       checked={((this.state.team || {}).LPDParticipantIds || []).includes(user._id)}
                                       onChange={(e)=> this.onlpdChange(user, e)}/>
                            </FormGroup></Col>
                            <Col xs={3}><Button onClick={()=>this.removeMember(user)}>Remove</Button></Col>
                        </Row>
                  )}
                      {usersOfTeam.length === 0 &&
                      <p className="text-muted">No team members yet</p>
                      }

                  <p className="mt-3">Add Team Member</p>
                  <StyledInput disabled={usersOfTeam.length > 5} placeholder="team member" name="members" onChange={(e)=>this.setState({filter: e.target.value})}/>
                      {this.getFilteredUsers(this.props.users).length < 5 &&
                      this.getFilteredUsers(this.props.users).map((user: User, index: number)=>
                            <Row className="" key={index.toString()}>
                                <Col xs={8}><p className="mb-0">{user.firstName} {user.lastName}</p></Col>
                                <Col xs={4}><Button className="float-right" onClick={()=>this.addMember(user)}>Add to Team</Button></Col>
                            </Row>
                          )
                      }
                  <Button className="mt-3 float-right" type="submit">Save</Button>
                  </AvForm>

              </TeamContainer>


          </div>
        )
    }
}





const TeamContainer = styled.div`
    background-color: #fff;
    border-radius: 5px;
    padding: 1em;
    box-shadow: 0 0 10px #0006;
    overflow: auto;
    margin: auto;
`;

const Overlay = styled.div`
    width: calc(100% - 30px);
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
const StyledAvField = styled(AvField)`
  border-bottom: 2px dashed #999 !important;
`;
const StyledInput = styled(Input)`
  border-bottom: 2px dashed #999 !important;
  margin-bottom: 10px;
`;


const DropZoneImagePreview = (props) => {
    if (props.isUploading) {
        return (<div><strong>uploading...</strong></div>);
    }
    if (props.isUploadError) {
        return (<div className="text-danger"><strong>error</strong></div>)
    }
    if (props.isUploadSuccess) {
        return (<PreviewImage preview={props.preview}/>);
    }
    return (
      <div><p><strong>Drop team image here</strong></p>
        <p>(max size: 2mb | format: jpg/png)</p>
      </div>);
};

const PreviewImage = styled.div`
background: url(${(props)=> props.preview}) no-repeat center;
background-size: cover;
height: 100%;
width: 100%;
`;


const mapStateToProps = (state, ownProps) => {
    const team = state.team.teams.find((team: Team)=> {
        return team.participantIds.includes((state.user.data || {})._id)
    });
    return {
        savingState: state.team.savingState,
        team: team,
        userData: state.user.data || {},
        users:  state.user.users || []
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUsers: ()=> {
            return dispatch(userActions.getUsersIfNeeded())
        },
        getInfo: ()=> {
            return dispatch(userActions.fetchInfoIfNeeded())
        },
        getTeamOfUser: (user: User)=> {
            return dispatch(teamActions.getTeamOfParticipant(user))
        },
        saveTeam: (team: Team) => {
            return dispatch(teamActions.saveTeam(team))
        },
        updateTeam: (team: Team) => {
            return dispatch(teamActions.updateTeam(team))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);