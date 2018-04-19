//@flow
import {TextWidget, TermsAndConditions, FileWidget, NeedsTransport} from '../register/registrationWidgets'

const uiSchema =  {
    firstName: {"ui:widget": TextWidget,"ui:options": {autoComplete: 'given-name'}},
    lastName: {"ui:widget": TextWidget,"ui:options": {autoComplete: 'family-name'}},
    email: {"ui:widget": TextWidget,"ui:options": {autoComplete: 'email', type: 'email'}},
    emailConfirmation: {"ui:widget": TextWidget,"ui:options": {autoComplete: 'email', type: 'email'}},
    'ui:field': 'layout',
    'ui:layout': [
        {
            firstName: {sm: 6},
            lastName: {sm: 6}
        },{
            email: {sm: 6},
            emailConfirmation: {sm: 6}
        },{
            startupFields: {sm: 12}
        }
    ],
    startupFields: {
        phone: {"ui:widget": TextWidget,"ui:options": {autoComplete: 'email', inputType: 'tel'}},
        dateOfBirth: {"ui:widget": "alt-date", classNames: "custom-alt-date-widget"},
        gender: {"ui:widget": "radio"},
        needsAccommodation: {"ui:widget": "radio", "ui:options": {inline: true}},
        needsTransport: {"ui:widget": NeedsTransport, "ui:options": {inline: true}},
        acknowledgement: {"ui:widget": TermsAndConditions},
        'ui:field': 'layout',
        'ui:layout': [
            {
                nationality: {sm: 6},
                phone: {sm: 6}
            },{
                dateOfBirth: {md: 4},
                gender: {md: 4},
            },{
                residence: {sm: 12}
            },{
                needsAccommodation: {sm: 6},
                numberOfAccommodation: {sm: 6}
            },{
                needsTransport: {sm: 6},
                numberOfTransport: {sm: 6}
            },{
                startup: {sm: 12}
            },{
                talent: {sm: 12}
            },{
                acknowledgement: {sm: 12}
            }
        ],
        residence: {
            address: {"ui:widget": TextWidget,"ui:options": {autoComplete: 'address-line1'}},
            city: {"ui:widget": TextWidget,"ui:options": {autoComplete: 'address-level2'}},
            zipCode: {"ui:widget": TextWidget,"ui:options": {autoComplete: 'postal-code'}},
            country: {"ui:widget": TextWidget,"ui:options": {autoComplete: 'country-name'}},
            'ui:field': 'layout',
            'ui:layout': [
                {
                    address: {sm: 12 }
                },{
                    city: { sm: 4 },
                    zipCode: { sm: 4 },
                    country: { sm: 4 }
                }
            ]
        },
        startup: {
            'ui:field': 'layout',
            'ui:layout': [
                {
                    numberOfMembers: {sm: 12}
                },{
                    firstName1: {sm: 4},
                    lastName1: {sm: 4},
                    email1: {sm: 4},
                    firstName2: {sm: 4},
                    lastName2: {sm: 4},
                    email2: {sm: 4},
                    firstName3: {sm: 4},
                    lastName3: {sm: 4},
                    email3: {sm: 4},
                    firstName4: {sm: 4},
                    lastName4: {sm: 4},
                    email4: {sm: 4},
                    firstName5: {sm: 4},
                    lastName5: {sm: 4},
                    email5: {sm: 4},
                },
                {
                    numberOfVegetarians: {sm: 12}
                }
            ]
        },
        talent: {
            worksOn: {"ui:widget": "textarea"},
            whyChoose: {"ui:widget": "textarea"},
            pitchDeck:{"ui:widget": FileWidget},
            invitationCode: {"ui:widget": "hidden"},
            'ui:field': 'layout',
            'ui:layout': [
                {
                    track: {sm: 12 }
                },{
                    worksOn: { sm: 6 },
                    whyChoose: { sm: 6 }
                },{
                    pitchDeck: { sm: 6 },
                    invitationCode: { sm: 6 }
                },{
                    howHearAbout: { sm: 6 },
                    howHearAboutOther: {sm: 6}
                },{
                    informEvents: { sm: 12 },
                    acknowledgement: {sm: 12}
                }
            ]
        }
    },

};

export default uiSchema;