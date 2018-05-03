//@flow
import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Alert} from 'reactstrap';
import {AvForm, AvField} from 'availity-reactstrap-validation';
import {jobActions, userActions} from "../../actions";
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'
import {getCookie} from "../../helpers/session";
import {ScaleLoader} from 'react-spinners';
import styled from "styled-components";
import {type Job} from "../../constants";

type Props = {
    className: string,
    +savingState: {
        +saveError?: string,
        +saving :boolean,
        +savingSuccess: boolean
    },
    +saveJob: ({})=>Promise<{}>,
    +getInfo: ()=>Promise<{}>,
    +userData: {
        partnerFields?: {company: string}
    },
    jobs: Array<Job>
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

class AddJob extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {
            s3Url: 'https://techfest-job-uploads.s3.amazonaws.com',
            uploadState: {}
        };
    }

    handleValidSubmit(event, values) {
        const company = (this.props.userData.partnerFields || {}).company;
        if (this.props.jobs.filter(job=>job.company === company).length >= 15) {return}
        if (!this.props.userData) {
            this.props.getInfo().then(()=>{
                const newJob = {...values,
                    company: ((this.props.userData || {}).partnerFields || {}).company,
                    fileURL: this.state.fileURL
                };
                return this.props.saveJob(newJob)
            }).then((job)=>{
                (this: any).form && (this: any).form.reset();
            }).catch(err=>console.log(err))
        } else {
            const newJob = {...values,
                company: ((this.props.userData || {}).partnerFields || {}).company,
                fileURL: this.state.fileURL
            };
            this.props.saveJob(newJob).then(job=>{
                (this: any).from && (this: any).form.reset();
            })
        }
    }
    handleFinishedUpload = info => {
        this.setState({
          ...this.state,
            fileURL: '/api/s3/img/' + info.filename,
            uploadState: {isUploadSuccess: true}
        });
    };

    componentDidMount() {
        this.setState({
          ...this.state,
            uploadOptions: {
                signingUrl: "/api/s3/sign",
                signingUrlQueryParams: {uploadType: 'avatar', token: getCookie("jwt")},
                signingUrlWithCredentials: true
            },
        })
    }

    render() {
        const {className} = this.props;
        const company = (this.props.userData.partnerFields || {}).company;
        return (
      <div className={className}>
          <p>Jobs: {this.props.jobs.filter(job=>job.company === company).length}/15</p>
          <AvForm id="add-job-form" onValidSubmit={this.handleValidSubmit} ref={c => ((this: any).form = c)}>
          <AvField name="title" label="Title" required />
          <AvField type="textarea" rows="8" name="description" label="Description" required />

          <h5 className="mt-3">Job File</h5>
          <DropzoneS3Uploader
            onFinish={this.handleFinishedUpload}
            onProgress={()=>this.setState({...this.state, uploadState: {isUploading: true}})}
            onError={()=>this.setState({...this.state, uploadState: {isUploadError: true}})}
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
                isUploadError={this.state.uploadState.isUploadError}
                isUploading={this.state.uploadState.isUploading}
                isUploadSuccess={this.state.uploadState.isUploadSuccess}/>
          </DropzoneS3Uploader>
          <Button color="primary" className="mt-3">Save</Button>
      </AvForm>
          {this.props.savingState.saving &&
          <LoaderContainer><ScaleLoader loading={this.props.savingState.saving} height={20} width={2}/></LoaderContainer>
          }
          {this.props.savingState.saveError &&
          <Alert color="danger" className="mt-3">{this.props.savingState.saveError}</Alert>
          }
          {this.props.savingState.savingSuccess &&
          <Alert color="success" className="mt-3">Job successfully posted</Alert>
          }
      </div>
    )}
}


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

const LoaderContainer = styled.div`
  padding-top: 3em;
  margin: auto;
  text-align: center;
  width: 100px;
`;



const mapStateToProps = (state, ownProps) => {
    const {savingState, items} = state.jobs;
    const {data} = state.user;
    return {savingState, userData: (data || {}), jobs: (items || []),}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getInfo: () => {
            return dispatch(userActions.getInfo())
        },
        saveJob: (job) => {
            return dispatch(jobActions.saveJob(job))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);