//@flow

import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {connect} from "react-redux";
import {jobActions} from "../../actions";

type Props = {
    fetchJobs: ()=>void,
    jobs: Array<{
        title: string,
        description: string
    }>
}

class JobList extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchJobs()
    }

    render() {
        return (
      <div>
          <ul>
              {this.props.jobs.map((job, index)=>
              <li key={index.toString()}>
                  <p>{job.title}</p>
                  <p>{job.description}</p>
              </li>
              )}
          </ul>
      </div>
    )}
}

const mapStateToProps = (state, ownProps) => {
    const {items} = state.jobs;
    return {
        jobs: (items || [])
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchJobs: ()=> {
            dispatch(jobActions.fetchJobsIfNeeded())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(JobList);