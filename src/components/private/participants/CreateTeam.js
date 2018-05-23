//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {userActions} from "../../../actions";
import {AvForm, AvField} from "availity-reactstrap-validation"
import {Input} from 'reactstrap'
import {type User} from '../../../constants'


type Props = {
    getUsers: ()=>Promise<User>,
    users: Array<User>
}

class CreateTeam extends Component<Props> {
    constructor(props: Props) {
        super(props);
        (this: any).onMemberInputChange = this.onMemberInputChange.bind(this)
    }

    componentDidMount() {
        this.props.getUsers()
    }

    onMemberInputChange(e) {
        if (e.target.value.length < 3) {return}

    }

    render() {
        return (
          <div>
              <AvForm>
                  <Input name="members" onChange={this.onMemberInputChange}/>
                  {this.props.users.map((user: User)=>
                    <p>{user.firstName} {user.lastName}</p>
                  )}
              </AvForm>
          </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        users:  state.user.users || []
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUsers: ()=> {
            return dispatch(userActions.getUsers())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);