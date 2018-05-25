//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {Button, Row, Col} from 'reactstrap';
import {userActions} from "../../../../actions/index";
import {type User, roles} from '../../../../constants/index';
import styled from "styled-components";
import {getCookie} from "../../../../helpers/session";
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import {DropZoneImagePreview} from '../../../common'


type Props = {
    userData: User,
    add: ({}, User)=>Promise<void>
}

type State = {
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

class AddLaunchPadGuest extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).onValidSubmit = this.onValidSubmit.bind(this);
        (this: any).getNumberOfDayTicketsUsed = this.getNumberOfDayTicketsUsed.bind(this);
        (this: any).allowedNumberOfDayTickets = this.allowedNumberOfDayTickets.bind(this);
        this.state = {
            s3Url: 'https://techfest-lpdguest-uploads.s3.amazonaws.com',
            uploadState: {}
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            uploadOptions: {
                signingUrl: "/api/lpdguest-upload/s3/sign",
                signingUrlQueryParams: {uploadType: 'avatar', token: getCookie("jwt")},
                signingUrlWithCredentials: true
            },
        })
    }


    onValidSubmit(event, values) {
        values.numberOfDays = 1;
        if ((this.getNumberOfDayTicketsUsed() < this.allowedNumberOfDayTickets())) {
            this.props.add({...values, imageURL: this.state.fileURL}, this.props.userData).then(()=>{
                this.setState({...this.state, preview: ''});
                (this: any).form && (this: any).form.reset();
            })
        }
    }

    handleFinishedUpload = info => {
        console.log(info);
        this.setState({
            ...this.state,
            preview: info.file.preview,
            fileURL: '/api/lpdguest-upload/s3/img/' + info.filename,
            uploadState: {isUploadSuccess: true}
        });
    };

    getNumberOfDayTicketsUsed() :number {
        const guests = ((this.props.userData.partnerFields || {}).launchPadGuests || []);
        const numberOfDaysArray = guests.map(guest=> guest.numberOfDays);
        return (numberOfDaysArray.length <= 0) ? 0 : numberOfDaysArray.reduce((acc, val) => (acc + val))
    }

    allowedNumberOfDayTickets() :number {
        let allowedNumber = 0;
        switch (this.props.userData.role) {
            case roles.TRACK_PARTNER_ROLE: allowedNumber = 3; break;
            default: allowedNumber = 2;
        }
        return allowedNumber
    }


    render() {
        return (
        <div>
            <AddGuestContainer>
                {!(this.getNumberOfDayTicketsUsed() < this.allowedNumberOfDayTickets()) &&
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
                    <StyledAvField name="email" label="" placeholder="Email" required />
                    <Button className="float-right mt-4" type="submit">Add Guest</Button>
                </AvForm>
            </AddGuestContainer>
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
const AddGuestContainer = styled.div`
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

const mapStateToProps = (state, ownProps) => {
    const {data} = state.user;
    return {userData: (data || {})}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        add: (guest, user) => {
            const updatedUser :User = {
                ...user,
                partnerFields: {
                    ...user.partnerFields,
                    launchPadGuests: [...((user.partnerFields || {}).launchPadGuests || []), guest]
                }
            };
            return dispatch(userActions.update(updatedUser))
        }
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(AddLaunchPadGuest);