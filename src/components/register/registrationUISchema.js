//@flow
import {TextWidget, TermsAndConditions, FileWidget, NeedsTransport} from './registrationWidgets'

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
            participantsFields: {sm: 12}
        }
    ],
    participantsFields: {
        phone: {"ui:widget": TextWidget,"ui:options": {autoComplete: 'email', inputType: 'tel'}},
        dateOfBirth: {"ui:widget": "alt-date", classNames: "custom-alt-date-widget"},
        gender: {"ui:widget": "radio"},
        vegetarian: {"ui:widget": "radio"},
        needsAccommodation: {"ui:widget": "radio", "ui:options": {inline: true}},
        needsTransport: {"ui:widget": NeedsTransport, "ui:options": {inline: true}},
        isProgrammer: {"ui:widget": "radio", "ui:options": {inline: true}},
        isDesigner: {"ui:widget": "radio", "ui:options": {inline: true}},
        isMaker: {"ui:widget": "radio", "ui:options": {inline: true}},
        isArtist: {"ui:widget": "radio", "ui:options": {inline: true}},
        programmerSuperPowers: {"ui:widget": "textarea"},
        designerSuperpowers: {"ui:widget": "textarea"},
        makerSuperpowers: {"ui:widget": "textarea"},
        artistLetter: {"ui:widget": FileWidget},
        otherSuperpowers: {"ui:widget": "textarea"},
        whyChoose: {"ui:widget": "textarea"},
        cv:{"ui:widget": FileWidget},
        hasProjectIdea: {"ui:widget": "radio", "ui:options": {inline: true}},
        hasTeam:  {"ui:widget": "radio", "ui:options": {inline: true}},
        wouldDoAlone: {"ui:widget": "radio", "ui:options": {inline: true}},
        jobSeeking: {"ui:widget": "radio", "ui:options": {inline: true}},
        acknowledgement: {"ui:widget": TermsAndConditions},
        'ui:field': 'layout',
        'ui:layout': [
            {
                nationality: {sm: 6},
                phone: {sm: 6}
            },{
                dateOfBirth: {md: 4},
                gender: {md: 4},
                vegetarian: {md: 4}
            },{
                residence: {sm: 12}
            },{
                needsAccommodation: {sm: 6},
                needsTransport: {sm: 6}
            },{
                bestDescription: {sm: 4},
                profession: {sm: 4},
                uni: {sm: 4},
            },{
                isProgrammer: {sm: 6},
                programmerSuperPowers: {sm: 6},
                isDesigner: {sm: 6},
                designerSuperpowers: {sm: 6},
                isMaker: {sm: 6},
                makerSuperpowers: {sm: 6},
                isArtist: {sm: 6},
                artistLetter: {sm: 6}
            },{
                otherSuperpowers: {sm: 6},
                whyChoose: {sm: 6}
            },{
                socialProfileLink: {sm: 4},
                gitHubLink: {sm: 4},
                cv: {sm: 4},
            },{
                hasProjectIdea: {sm: 4},
                hasTeam: {sm: 4},
                teamMatesEmails: {sm: 12},
                wouldDoAlone: {sm: 12}
            },{
                jobSeeking: {sm: 4},
                howHearAbout: {sm: 4},
                howHearAboutOther: {sm: 4}
            },{
                informEvents: {sm: 12},
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
        }
    },

};

export default uiSchema;