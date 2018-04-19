//@flow

import React, {Component} from 'react'
import {Container} from "reactstrap";
import styled from "styled-components";
import Form from "react-jsonschema-form";
import { ScaleLoader } from 'react-spinners';
import {Alert, Button} from 'reactstrap';
import LayoutField from "react-jsonschema-form-layout";
import {connect} from "react-redux";
import {userActions} from "../actions/index";
import {TextWidget} from "./register/registrationWidgets";

const schema = {
    type: "object",
    required: ["email", "firstName", "lastName"],
    properties: {
        firstName: {type: "string", title: "First Name"},
        lastName: {type: "string", title: "Last Name"},
        email: {type: "string", title: "How can we reach you by mail?", format: "email"},
        partnerFields: {
            type: "object",
            required: ["company", "purpose", "hasBeenInTouch"],
            title: "",
            properties: {
                company: {type: "string", title: "What company do you represent?"},
                purpose: {
                    type: "string", title: "What are you looking for in TECHFEST?",
                    enum: ["showTech", "employeesAsParticipants", "marketing", "contactPartners", "hackathonCulture", "talents", "innovation", "other"],
                    enumNames: ["Showing our tech / products", "Send employees as participants", "Marketing and brand building", "Contact to the other partners", "Bringing hackathon culture into our own company", "Contact to talents", "Set a challenge to see innovation projects in our area", "Other"]
                },
                hasBeenInTouch: {type: "boolean", title: "Have you been in touch with TECHFEST / UnternehmerTUM before?"}
            },
            dependencies: {
                purpose: {
                    oneOf: [
                        {
                            properties: {purpose: {enum: ["showTech", "employeesAsParticipants", "marketing", "contactPartners", "hackathonCulture", "talents", "innovation"]}}
                        },
                        {
                            properties: {purpose: {enum: ["other"]},
                                otherPurpose: {type: "string", title: "Other"
                                },
                            },
                            required: ["otherPurpose"]
                        }
                    ]
                }
            }
        }
    }
};

const uiSchema = {
    firstName: {"ui:widget": TextWidget,"ui:options": {autoComplete: 'given-name'}},
    lastName: {"ui:widget": TextWidget,"ui:options": {autoComplete: 'family-name'}},
    email: {"ui:widget": TextWidget,"ui:options": {autoComplete: 'email', type: 'email'}},
    'ui:field': 'layout',
    'ui:layout': [
        {
            firstName: {sm: 4},
            lastName: {sm: 4},
            email: {sm: 4}
        },
        {
            partnerFields: {sm: 12}
        }
    ],
    partnerFields: {
        hasBeenInTouch: {"ui:widget": "radio"},
        'ui:field': 'layout',
        'ui:layout': [
            {
                company: {sm: 4},
                purpose: {sm: 4},
                otherPurpose: {sm: 4}
            },{
                hasBeenInTouch: {sm: 12}
            }
        ]
    }
};


const fields = {
    layout: LayoutField
};

type State = {
    form: {
        schema: {},
        uiSchema: {},
        formData: {},
        idSchema: {}
    },
    touchedFields: Array<string>,
    submitTried: boolean
}
type Props = {
    registering: boolean,
    registrationError: boolean,
    error?: string
}

class PartnerRegistration extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            form: {
                schema: schema,
                uiSchema: uiSchema,
                formData: {},
                idSchema: {}
            },
            touchedFields: [],
            submitTried: false
        };
        (this: any).onSubmit = this.onSubmit.bind(this);
        (this: any).onBlur = this.onBlur.bind(this);
        (this: any).transformErrors = this.transformErrors.bind(this);
    }

    onSubmit(form) {
        if (this.props.registering) {return}
        console.log("Data submitted: ",  form);
        this.props.register(this.state.form.formData)
        form.formData = this.state.form.formData
    }

    onBlur(id) {
        this.setState({touchedFields: [...this.state.touchedFields, id]});
    }

    transformErrors(errors) {
        return errors.map(error => {
            // $FlowFixMe
            const idSchema = Object.byString(this.state.form.idSchema, error.property);
            if ((idSchema && this.state.touchedFields.includes(idSchema.$id)) || this.state.form.status === 'submitted' || this.state.submitTried) {
                if (error.name === "required") {
                    error.message = "This field is required"
                } else if (error.name === "format") {
                    error.message = "Input has wrong format."
                } else if (error.name === "enum" || error.name === "oneOf") {
                    error.message = ""
                }
            } else {
                error.message = ""
            }
            return error;
        });
    }

    render() {
        return (
            <StyledContainer className="p-md-5">
                <h1>CALL FOR PARTNERS 2018</h1>
                <p>TECHFEST is what it is because of its participants and partners. Over the course of the last years we have had incredible experiences with companies and their employees during TECHFEST. The partners of TECHFEST are some of the largest companies around (Osram, SAP, Google, Infineon, Wacker, Würth, Rhode&Schwarz, Knorr Bremse, Magna, Stihl, Hawe). If you want to join TECHFEST as a partner, this is the place to get in touch with us.</p>
                {!(this.props.registrationSuccess === true) &&
                <Form schema={this.state.form.schema}
                      uiSchema={this.state.form.uiSchema}
                      onChange={(form) => this.setState({form})}
                      onSubmit={this.onSubmit}
                      onError={(errors) => console.log("Errors: ", errors)}
                      formData={this.state.form.formData}
                      onBlure={this.onBlur}
                      transformErrors={this.transformErrors}
                      showErrorList={false}
                      fields={fields}
                      noHtml5Validate
                      liveValidate
                      className="p-lg-5"
                      // transformErrors={this.transformErrors}
                    >
                    <div className="mt-2">
                        <Button disabled={this.props.registering === true} onClick={() => this.setState({submitTried: true})} className={"d-flex align-items-center"} color="primary" type="submit">
                            <span className="mr-2">Submit</span>
                            <ScaleLoader color={'#ffffff'} loading={this.props.registering === true} height={20} width={2} />
                        </Button>
                    </div>
                </Form>
                }

                {!this.props.registering &&
                this.props.registrationSuccess === false &&
                <Alert className="mt-3" color="danger">
                    Sorry, request was not successful.
                    {this.props.error}
                </Alert>
                }
                {!this.props.registering &&
                this.props.registrationSuccess === true &&
                <Alert className="mt-3" color="success">
                    Thanks for your request.
                </Alert>
                }
            </StyledContainer>
        );
    }
}


const StyledContainer = styled(Container)`
  min-height: 100vh;
`;

const mapStateToProps = (state) => {
    const { registering, registrationSuccess, error } = state.registration;
    return {
        error,
        registering,
        registrationSuccess
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        register: (formData) => {
            dispatch(userActions.register(formData))
        }
    }
};
// $FlowFixMe
Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    const a = s.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
        const k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
};


export default connect(mapStateToProps, mapDispatchToProps)(PartnerRegistration);