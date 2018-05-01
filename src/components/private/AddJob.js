//@fow
import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Alert} from 'reactstrap';
import {AvForm, AvField} from 'availity-reactstrap-validation';
import {jobActions} from "../../actions";

type Props = {
    +saveError?: string,
    +saveJob: ({})=>void
}

class AddJob extends Component<Props> {
    constructor(props: Props) {
        super(props);
        (this: any).handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    handleValidSubmit(event, values) {
        this.props.saveJob(values);
    }

    render() {return (
      <div>
      <AvForm onValidSubmit={this.handleValidSubmit}>
          <AvField name="title" label="Title" required />
          <AvField type="textarea" name="description" label="Description" required />
          <Button>Submit</Button>
      </AvForm>
          {this.props.saveError &&
          <Alert>{this.props.saveError}</Alert>
          }
      </div>
    )}
}


const mapStateToProps = (state, ownProps) => {
    const {saveError} = state.jobs;
    return {saveError}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveJob: (job) => {
            dispatch(jobActions.saveJob(job))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);