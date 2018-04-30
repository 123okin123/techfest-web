//@fow
import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Alert} from 'reactstrap';
import {AvForm, AvField} from 'availity-reactstrap-validation';

type Props = {
    +saveError?: string
}

class AddJob extends Component<Props> {
    render() {return (
      <div>
      <AvForm onValidSubmit={this.handleValidSubmit}>
          <AvField name="title" label="Title" required />
          <AvField type="textarea" name="description" label="Description" required />
          <Button>Submit</Button>
      </AvForm>
          {this.prop.saveError &&
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
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);