//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {type User} from "../../../../constants/index";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {Button, Table} from 'reactstrap';
import {userActions} from "../../../../actions/index";
import styled from 'styled-components';
import type {Mentor} from "../../../../constants";
import {getCookie} from "../../../../helpers/session";

type Props = {
    className?: string,
    userData: User,
    +fetchInfoIfNeeded: ()=>Promise<void>,
    +deleteGuest: ({}, User)=>Promise<User>
};
type State = {
    launchPadGuests: Array<{
        editable?: boolean,
        firstName: string,
        lastName: string,
        email: string,
        imageURL: string,
        numberOfDays: number
    }>
}

class LaunchPadGuestList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).handleValidSubmit = this.handleValidSubmit.bind(this);
        (this: any).onDelete = this.onDelete.bind(this);
        const launchPadGuests = ((props.userData.partnerFields || {}).launchPadGuests || []).map(guest=>{return{...guest, editable: false}});
        this.state = {
            launchPadGuests: launchPadGuests
        }
    }



    componentDidMount() {
        this.props.fetchInfoIfNeeded()
    }

    componentWillReceiveProps(nextProps) {
        const launchPadGuests = ((nextProps.userData.partnerFields || {}).launchPadGuests || []).map(guest=>{return{...guest, editable: false}});
        this.state = {
            launchPadGuests: launchPadGuests
        }
    }


    handleValidSubmit(event, values, guest) {
        values.numberOfDays = 1;
    }

    onDelete(guest) {
        this.props.deleteGuest(guest, this.props.userData)
    }

    render() {
        return (
          <GuestCollection className={this.props.className}>
              {this.state.launchPadGuests.map((guest, index: number)=>
                <GuestContainer key={index.toString()}>
                    <Button className="float-right" onClick={()=>this.onDelete(guest)}>Delete</Button>
                    <ImageContainer image={guest.imageURL}/>
                    <h3>{guest.firstName} {guest.lastName}</h3>
                    <p className="text-muted">{guest.email}</p>
                </GuestContainer>
              )}
              {this.state.launchPadGuests.length === 0 &&
              <p>No mentors yet.</p>
              }
          </GuestCollection>
        )
    }
}

const GuestCollection = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const GuestContainer = styled.div`
    background-color: #fff;
    border-radius: 5px;
    padding: 1em;
    box-shadow: 0 0 10px #0006;
    max-width: 350px;
    overflow: auto;
    margin: 20px;
    text-align: center;
    width: 300px;
`;

const ImageContainer = styled.div`
    background: url(${(props)=> props.image + '?token=' + getCookie("jwt")}) no-repeat center;
    background-size: cover;
    height: 180px;
    width: 180px;
    margin: 20px auto 20px;
    border-radius: 50%;
    background-color: #e9ecef;
`;


const mapStateToProps = (state, ownProps) => {
    const {data} = state.user;
    return {userData: (data || {})}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchInfoIfNeeded: () => {
            return dispatch(userActions.fetchInfoIfNeeded())
        },
        deleteGuest: (guestToDelete, user) => {
            const updatedUser = {
                ...user,
                partnerFields: {
                    ...user.partnerFields,
                    launchPadGuests: ((user.partnerFields || {}).launchPadGuests || []).filter(guest=>guest.email !== guestToDelete.email)
                }
            };
            return dispatch(userActions.update(updatedUser))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchPadGuestList);