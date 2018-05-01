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

type State = {
    defaultValues: {}
}

class AddJob extends Component<Props> {
    constructor(props: Props) {
        super(props);
        (this: any).handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    handleValidSubmit(event, values) {
        this.props.saveJob(values).then(job=>{
            this.form && this.form.reset();
        });
    }

    render() {
        const {className} = this.props;
        return (
      <div className={className}>
      <AvForm id="add-job-form" onValidSubmit={this.handleValidSubmit} ref={c => (this.form = c)}>
          <AvField name="title" label="Title" required />
          <AvField type="textarea" rows="8" name="description" label="Description" required />
          <Button>Save</Button>
      </AvForm>
          {this.props.saveError &&
          <Alert color="danger" className="mt-3">{this.props.saveError}</Alert>
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
            return dispatch(jobActions.saveJob(job))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);