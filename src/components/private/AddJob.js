//@fow
import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Alert} from 'reactstrap';
import {AvForm, AvField} from 'availity-reactstrap-validation';
import {jobActions, userActions} from "../../actions";
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'
import {getCookie} from "../../helpers/session";
import styled from 'styled-components';

type Props = {
    +saveError?: string,
    +saveJob: ({})=>void,
    +getInfo: ()=>void,
    +saving?: boolean
}
type State = {
    uploadOptions: {},
    s3Url: string,
    fileURL?: string
}

class AddJob extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {};
    }

    handleValidSubmit(event, values) {
    if (!this.props.userData) {
        this.props.getInfo().then(()=>{
            const newJob = {...values,
                company: ((this.props.userData || {}).partnerFields || {}).company,
                fileURL: this.state.fileURL
            };
            console.log('add new job: ', newJob);
            return this.props.saveJob(newJob)
        }).then((job)=>{
            console.log('saved job');
            this.form && this.form.reset();
        }).catch(err=>console.log(err))
    } else {
        const newJob = {...values,
            company: ((this.props.userData || {}).partnerFields || {}).company,
            fileURL: this.state.fileURL
        };
        console.log('add new job: ', newJob);
        this.props.saveJob(newJob).then(job=>{
            console.log('saved job');
            this.from && this.form.reset();
        })
    }
    }
    handleFinishedUpload = info => {
        this.setState({
            fileURL: '/api/s3/img/' + info.filename
        });
    };

    componentDidMount() {
        this.setState({
            uploadOptions: {
                server: 'http://localhost:4000',
                signingUrl: "/api/s3/sign",
                signingUrlQueryParams: {uploadType: 'avatar', token: getCookie("jwt")},
                signingUrlWithCredentials: true
            },
            s3Url: 'https://techfest-job-uploads.s3.amazonaws.com'
    })
    }

    render() {
        const {className} = this.props;
        return (
      <div className={className}>
      <AvForm id="add-job-form" onValidSubmit={this.handleValidSubmit} ref={c => (this.form = c)}>
          <AvField name="title" label="Title" required />
          <AvField type="textarea" rows="8" name="description" label="Description" required />

          <h5 className="mt-3">Job File</h5>
          <DropzoneS3Uploader
            onFinish={this.handleFinishedUpload}
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
                overflow:'hidden'
            }}
            upload={this.state.uploadOptions}
          >
              <p className="mt-2">Drop file here</p>
          </DropzoneS3Uploader>
          <Button color="primary" className="mt-3">Save</Button>
      </AvForm>
          {this.props.saveError && (this.props.saving !== true) &&
          <Alert color="danger" className="mt-3">{this.props.saveError}</Alert>
          }
      </div>
    )}
}


const mapStateToProps = (state, ownProps) => {
    const {saveError, saving} = state.jobs;
    const {data} = state.user;
    return {saveError, userData: data}
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