//@flow
import React, {Component} from 'react'
import {Button, Row, Col, Alert} from 'reactstrap'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {connect} from "react-redux";
import {store} from '../../helpers/store';
import {contactActions} from "../../actions/contactActions";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {pageActions} from "../../actions/pageActions";

type Props = {
    contacting: boolean,
    contactSuccess: boolean
}

class ContactContainer extends Component<Props> {
    constructor(props: Props) {
        super(props);
        (this:any).handleValidSubmit = this.handleValidSubmit.bind(this)
    }

    handleValidSubmit(event, values) {
        console.log("submit");
        if (this.props.contacting) {return}
        this.props.contact(values);
    }

    render() { return(
        <Row>
            <Col xs="12" sm="6" className="mb-3">
                <AvForm onValidSubmit={this.handleValidSubmit}>
                    <AvField name="name" type="text" placeholder="Surname, Name" autoComplete="name" required />
                    <AvField name="email" type="email" placeholder="Email Address" autoComplete="email" required />
                    <AvField name="phone" type="text" placeholder="Phone number" autoComplete="tel-national" required />
                    <AvField name="message" type="textarea" placeholder="Message" required />
                    <Button disabled={this.props.contacting || this.props.contactSuccess} className="w-25" color="primary">SEND</Button>
                </AvForm>
                {(!this.props.contacting && this.props.contactSuccess === false) &&
                <Alert className="mt-3" color="danger">
                    Sorry, message was not sent.
                </Alert>
                }
                {(!this.props.contacting && this.props.contactSuccess === true) &&
                <Alert className="mt-3" color="success">
                    Congratulations, message was successfully sent.
                </Alert>
                }
            </Col>
            <Col>
                <MapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px`, filter: 'grayscale(100%)' }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                <p><strong>UnternehmerTUM | Entrepreneurship Center <br/>
                    Lichtenbergstraße 6 | 85748 Garching bei München</strong></p>
            </Col>
        </Row>
    );}
}
const MapComponent = withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 48.3215763, lng: 11.6660655 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: 48.2681512, lng: 11.6662131 }} />}
    </GoogleMap>
);

const mapStateToProps = (state) => {
    const { contacting, contactSuccess } = state.contact;
    return {
        contacting,
        contactSuccess
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        contact: (values) => {
            dispatch(contactActions.contact(values))
        }
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(ContactContainer);

