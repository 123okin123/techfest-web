//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {jobActions} from "../../../actions/index";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {Button, Input} from 'reactstrap';
import styled from 'styled-components';
import {getCookie} from '../../../helpers/session';
import {type Job} from '../../../constants/index';

type Props = {
    showJobsOfCompany?: string,
    +fetchJobs: ()=>Promise<Array<Job>>,
    editable?: boolean,
    +jobs: Array<Job>,
    fetching?: boolean,
    deleteJob: (string)=>Promise<string>,
    updateJob: (Job)=>Promise<Job>,
    searchable?: boolean
}

type State = {
    jobs: Array<Job>,
    searchFilter: string
}

class JobList extends Component<Props,State> {
    constructor(props: Props) {
        super(props);
        (this: any).handleValidSubmit = this.handleValidSubmit.bind(this);
        (this: any).onDelete = this.onDelete.bind(this);
        this.state = {
            jobs: this.props.jobs,
            searchFilter: ''
        }
    }

    componentDidMount() {
        if (this.props.fetching) {return}
        this.props.fetchJobs().then(jobs=>{
            this.setState({jobs: this.props.jobs})
        })
    }


    handleValidSubmit(event, values, job) {
        this.props.updateJob({...job, ...values}).then(updateJob=>{
            this.setState({jobs: this.state.jobs.map(jobInState=> jobInState._id === updateJob._id ? {...updateJob, editable: false} : jobInState)});
        });
    }

    onDelete(id) {
        this.props.deleteJob(id).then(id=>{
            this.setState({jobs: this.props.jobs})
        })
    }

    render() {
        let jobs = this.state.jobs;
        if (this.props.showJobsOfCompany) {
            jobs = jobs.filter(job => job.company === this.props.showJobsOfCompany);
        }
        jobs = jobs.filter(job=> (job.company + job.title + job.description).toLowerCase().includes(this.state.searchFilter.toLowerCase()));

        return (
      <div>
          {this.props.searchable &&
            <div className="d-flex justify-content-end"><StyledInput placeholder="Search" onChange={(e)=>this.setState({searchFilter: e.target.value})}/></div>
          }
          {jobs.length === 0 && <div>No jobs yet</div>}
          <ul className="list-unstyled">
              {jobs.map((job, index)=> {
              if (job.editable) {
                  return (
                    <li className="border-bottom border-dark p-4" key={index.toString()}>
                        <AvForm onValidSubmit={(event, values)=>this.handleValidSubmit(event, values, job)} model={{title: job.title, description: job.description}}>
                            <StyledAvField name="title" required />
                            <p className="mb-0"><strong>{job.company}</strong></p>
                            <StyledAvField type="textarea" rows="8" name="description" required />
                            <Button onClick={()=>this.setState({jobs: this.state.jobs.map(jobInState=> jobInState._id === job._id ? {...job, editable: false} : jobInState)})} className="float-right" color="info" >Cancel</Button>
                            <Button type="submit" className="float-right" color="info" >Save</Button>
                        </AvForm>
                    </li>)
              } else {
                  return (
                    <li className="border-bottom border-dark p-4" key={index.toString()}>
                        <Button className="float-right" tag={'a'} size="sm" href={job.fileURL + '?token=' + getCookie("jwt")}>Job File</Button>
                        <h5 className="mb-0">{job.title}</h5>
                        <p className="mb-0"><strong>{job.company}</strong></p>
                        <p className="mb-0">{job.description}</p>
                        {this.props.editable &&
                          <div>
                              <Button color="info" className="float-right" onClick={()=>this.onDelete(job._id)}>Delete</Button>
                              <Button color="info" className="float-right" onClick={()=>this.setState({jobs: this.state.jobs.map(jobInState=>jobInState._id === job._id ? {...job, editable: true}:jobInState)})}>Edit</Button>
                          </div>
                        }
                    </li>)
              }
              })}
          </ul>
      </div>
    )}
}

const StyledAvField = styled(AvField)`
  background-color: #0000!important;
  padding: 0!important;
  color: #212529!important;
`;
const StyledInput = styled(Input)`
  @media (min-width: 700px) {
    width: 200px !important;
  }
`;
const mapStateToProps = (state, ownProps) => {
    const {items, fetching} = state.jobs;
    return {
        jobs: (items || []),
        fetching
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchJobs: ()=> {
            return dispatch(jobActions.fetchJobsIfNeeded())
        },
        updateJob: (job)=> {
            return dispatch(jobActions.updateJob(job))
        },
        deleteJob: (id)=> {
            return dispatch(jobActions.deleteJob(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(JobList);