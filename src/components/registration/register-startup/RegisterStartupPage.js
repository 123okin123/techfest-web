//@flow
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Button, Container,  Alert} from 'reactstrap';
import {userActions} from "../../../actions/index";
import Form from "react-jsonschema-form";
import LayoutField  from 'react-jsonschema-form-layout';
import styled from 'styled-components';
import { ScaleLoader } from 'react-spinners';
import schema from './registerStartupSchema';
import uiSchema from './registerStartupUISchema';
import {uploadFiles} from '../registrationWidgets';

//$FlowFixMe

//import Recaptcha from 'react-recaptcha';
//let recaptchaInstance;

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

const fields = {
    layout: LayoutField
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

class RegisterStartupPage extends Component<Props,State> {
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
            submitTried: false,
        };
        (this: any).onSubmit = this.onSubmit.bind(this);
        (this: any).handleChange = this.handleChange.bind(this);
        (this: any).onCaptachVerification = this.onCaptachVerification.bind(this);
        (this: any).onBlur = this.onBlur.bind(this);
        (this: any).validate = this.validate.bind(this);
        (this: any).transformErrors = this.transformErrors.bind(this);
    }

    componentDidMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const inviteCode = params.get('invite');
        this.setState({
            form: {
              ...this.state.form,
                formData: {
                  ...this.state.form.formData,
                    inviteCode
                }
            }
        });
    }


    onSubmit(form) {
        if (this.props.registering || this.props.uploading) {return}
        // recaptchaInstance.execute();
        this.props.uploadAndRegister(this.state.form.formData, uploadFiles).then(()=>{
            window.scroll(0, 0);
        });
        this.setState({...this.state, errors: []});
        form.formData = this.state.form.formData
    }

    onCaptachVerification() {

    }

    onBlur(id) {
        this.setState({touchedFields: [...this.state.touchedFields, id]});
    }

    validate(formData, errors) {
        if (formData.email !== formData.emailConfirmation) {
            errors.emailConfirmation.addError("Emails don't match");
        }
        if (formData.startupFields.acknowledgement !== true) {
            errors.startupFields.acknowledgement.addError("Please accept the terms and conditions.");
        }
        return errors;
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

    handleChange(form) {
        this.setState({...this.state, errors: []});
        this.setState({form});
        const {formData} = form;
        let schema = {...this.state.form.schema};
        if (formData.startupFields.residence.city !== "munich"
            && formData.startupFields.residence.city !== "Munich"
            && formData.startupFields.residence.city !== "München"
            && formData.startupFields.residence.city !== "münchen") {
            schema.properties.startupFields.properties = {...schema.properties.startupFields.properties,
                needsTransport: {
                    type: "string",
                    title: "We are not from Munich and want to arrive by Flixbus (please be aware of Flixbus routes).",
                    enum: ["yes", "no"]
                },
            };
            schema.properties.startupFields.dependencies = {
              ...schema.properties.startupFields.dependencies,
                needsTransport: {
                    oneOf: [
                        {
                            properties: {needsTransport: {enum: ["no"]}}
                        },
                        {
                            properties: {needsTransport: {enum: ["yes"]},
                                numberOfTransport: {
                                    type: "string",
                                    title: "Number of start-up members that want to arrive by Flixbus?",
                                    enum: ["1", "2", "3", "4", "5", "6"]
                                },
                            }
                        }
                    ]
                }
            };

        } else {
            schema.properties.startupFields.properties = Object.assign({},schema.properties.startupFields.properties);
            delete formData.startupFields.needsTransport;
            delete formData.startupFields.numberOfTransport;

            delete schema.properties.startupFields.properties.needsTransport;
            delete schema.properties.startupFields.dependencies.numberOfTransport;
        }
    }

    render() {
        return (
                <StyledContainer className="p-md-5">
                    {/*<h1 className="mt-5">OFFICIAL APPLICATION PERIOD HAS ENDED!</h1>*/}
                    <h1>APPLY AS START-UP</h1>
                    {!((this.props.registrationSuccess === true) && (this.props.uploadingSuccess === true)) &&
                    <Form schema={this.state.form.schema}
                          uiSchema={this.state.form.uiSchema}
                          onChange={this.handleChange}
                          onSubmit={this.onSubmit}
                          onError={(errors)=>this.setState({errors})}
                          formData={this.state.form.formData}
                          showErrorList={false}
                          validate={this.validate}
                          onBlur={this.onBlur}
                          fields={fields}
                          noHtml5Validate
                          liveValidate
                          className="p-lg-5"
                          transformErrors={this.transformErrors}>
                        <Recaptcha
                            ref={e => recaptchaInstance = e}
                            sitekey="6LfxjUwUAAAAAHBDkBisDXbE1B8MBroWIEUVQa_B"
                            verifyCallback={this.onCaptachVerification}/>
                        <div className="mt-2">
                            <Button disabled={((this.props.uploading === true) || (this.props.registering === true))} onClick={() => this.setState({submitTried: true})} className={"d-flex align-items-center"} color="primary" type="submit">
                                <span className="mr-2">Submit</span>
                                <ScaleLoader color={'#ffffff'} loading={((this.props.uploading === true) || (this.props.registering === true))} height={20} width={2} />
                            </Button>
                        </div>
                    </Form>
                    }

                    {(!this.props.uploading && !this.props.registering) &&
                    ((this.props.registrationSuccess === false) || (this.props.uploadingSuccess === false)) &&
                        <Alert className="mt-3" color="danger">
                            Sorry, registration was not successful.
                            {" "}{this.props.error}
                        </Alert>
                    }
                    {(!this.props.uploading && !this.props.registering) &&
                        (typeof this.state.errors !== 'undefined' && this.state.errors.length > 0)  &&
                    <Alert className="mt-3" color="danger">
                        Please check the registration from.
                    </Alert>
                    }
                    {(!this.props.uploading && !this.props.registering) &&
                    ((this.props.registrationSuccess === true) && (this.props.uploadingSuccess === true)) &&
                        <Alert className="mt-3" color="success">
                            Congratulations, registration was successfully sent.
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
    const { uploading, uploadingSuccess } = state.upload;
    return {
        error,
        registering,
        registrationSuccess,
        uploading,
        uploadingSuccess
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        uploadAndRegister: (formData, uploadFiles) => {
            return dispatch(userActions.uploadFileAndRegister(formData, uploadFiles))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(RegisterStartupPage);
