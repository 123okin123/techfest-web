
import {countryList} from "../../../helpers/index";

const schema = {
    title: "CONTACT PERSON OF YOUR STARTUP",
    type: "object",
    required: ["firstName", "lastName", "email", "emailConfirmation", "startupFields"],
    properties: {
        firstName: {type: "string", title: "First Name", minLength: 2},
        lastName: {type: "string", title: "Last Name", minLength: 2},
        email: {type: "string", title: "Email", format: "email"},
        emailConfirmation: {type: "string", title: "Email confirmation", format: "email"},
        startupFields: {
            type: "object",
            title: "",
            required: [
              "nationality",
              "dateOfBirth",
              "gender",
              "needsAccommodation"
            ],
            properties: {
                nationality: {type: "string", title: "Nationality", enum: countryList.map(e=>e.label)},
                phone: {type: "string", title: "Phone"},
                dateOfBirth: {type: "string", title: "Date of birth"},
                gender: {type: "string", title: "Gender",
                    enum: ["female", "male", "none"]
                },
                residence: {
                    type: "object",
                    title: "PLACE OF RESIDENCE",
                    required: ["address", "city", "zipCode", "country"],
                    properties: {
                        address: {type: "string", title: "Street, house number"},
                        city: {type: "string", title: "City"},
                        zipCode: {type: "string", title: "Zip code"},
                        country: {type: "string", title: "Country"}
                    },
                },
                needsAccommodation: {type: "string", title: "Our team needs a sleeping place (limited space, non-locals are preferred, first come first serve).", enum: ["yes", "no"], enumNames: ["yes", "no"]},
                startup: {
                    type: "object",
                    title: "START-UP",
                    required: ["numberOfMembers", "startupName"],
                    properties: {
                        startupName: {type: "string", title: "Name of your Start-up"},
                        numberOfMembers: {
                            type: "string", title: "Total number of start-up members that will join TECHFEST?",
                            enum: ["2", "3", "4", "5", "6"]
                        },
                        numberOfVegetarians: {
                            type: "string", title: "How many vegetarians are in your team?",
                            enum: ["0", "1", "2", "3", "5", "6"]
                        }
                    },
                    dependencies: {
                        numberOfMembers: {
                            oneOf: [
                                {
                                    required: ["firstName1", "lastName1", "email1"],
                                    properties: {numberOfMembers: {enum: ["2"]},
                                        firstName1: {type: "string", title: "First Name"},
                                        lastName1: {type: "string", title: "Last Name"},
                                        email1: {type: "string", title: "Email"},
                                    }
                                },
                                {
                                    required: ["firstName2", "lastName2", "email2"],
                                    properties: {numberOfMembers: {enum: ["3"]},
                                        firstName1: {type: "string", title: "First Name"},
                                        lastName1: {type: "string", title: "Last Name"},
                                        email1: {type: "string", title: "Email"},
                                        firstName2: {type: "string", title: "First Name"},
                                        lastName2: {type: "string", title: "Last Name"},
                                        email2: {type: "string", title: "Email"},
                                    }
                                },
                                {
                                    required: ["firstName3", "lastName3", "email3"],
                                    properties: {numberOfMembers: {enum: ["4"]},
                                        firstName1: {type: "string", title: "First Name"},
                                        lastName1: {type: "string", title: "Last Name"},
                                        email1: {type: "string", title: "Email"},
                                        firstName2: {type: "string", title: "First Name"},
                                        lastName2: {type: "string", title: "Last Name"},
                                        email2: {type: "string", title: "Email"},
                                        firstName3: {type: "string", title: "First Name"},
                                        lastName3: {type: "string", title: "Last Name"},
                                        email3: {type: "string", title: "Email"},
                                    }
                                },
                                {
                                    required: ["firstName4", "lastName4", "email4"],
                                    properties: {numberOfMembers: {enum: ["5"]},
                                        firstName1: {type: "string", title: "First Name"},
                                        lastName1: {type: "string", title: "Last Name"},
                                        email1: {type: "string", title: "Email"},
                                        firstName2: {type: "string", title: "First Name"},
                                        lastName2: {type: "string", title: "Last Name"},
                                        email2: {type: "string", title: "Email"},
                                        firstName3: {type: "string", title: "First Name"},
                                        lastName3: {type: "string", title: "Last Name"},
                                        email3: {type: "string", title: "Email"},
                                        firstName4: {type: "string", title: "First Name"},
                                        lastName4: {type: "string", title: "Last Name"},
                                        email4: {type: "string", title: "Email"},
                                    }
                                },
                                {
                                    required: ["firstName5", "lastName5", "email5"],
                                    properties: {numberOfMembers: {enum: ["6"]},
                                        firstName1: {type: "string", title: "First Name"},
                                        lastName1: {type: "string", title: "Last Name"},
                                        email1: {type: "string", title: "Email"},
                                        firstName2: {type: "string", title: "First Name"},
                                        lastName2: {type: "string", title: "Last Name"},
                                        email2: {type: "string", title: "Email"},
                                        firstName3: {type: "string", title: "First Name"},
                                        lastName3: {type: "string", title: "Last Name"},
                                        email3: {type: "string", title: "Email"},
                                        firstName4: {type: "string", title: "First Name"},
                                        lastName4: {type: "string", title: "Last Name"},
                                        email4: {type: "string", title: "Email"},
                                        firstName5: {type: "string", title: "First Name"},
                                        lastName5: {type: "string", title: "Last Name"},
                                        email5: {type: "string", title: "Email"},
                                    }
                                }
                            ]
                        },
                    }
                },
                talent: {
                    type: "object",
                    title: "TALENT",
                    required: ["track", "worksOn", "whyChoose", "pitchDeck", "informEvents", "howHearAbout"],
                    properties: {
                        track: {type: "string", title: "Please choose your track:",
                            enum: ["futureMobilityTransport", "quantifiedEarthAndSpace", "theSmartAutomationWave", "theAugmentedHuman"],
                            enumNames: ["Future Mobility and Transport", "Quantified Earth and Space", "The Smart Automation Wave", "The Augmented Human"],
                        },
                        worksOn: {type: "string", title: "Which product feature do you plan to work on at TECHFEST?"},
                        whyChoose: {type: "string", title: "Why should we select your start-up (max. 140 characters)?"},
                        pitchDeck: {type: "string", title: "Please upload your pitchdeck."},
                        invitationCode: {type: "string", title: "Did you get an invitation code? If so, please type it in."},
                        informEvents: {type: "boolean", title: "Please inform me, if there are any events coming up. To do so I permit the use of my submitted personal data by UnternehmerTUM."},
                        howHearAbout: {type: "string", title: "How did you hear about TECHFEST?",
                            enum: ["techfestFB", "utumFB", "techFounders", "xpreneurs", "utumVCP", "appliedAi", "uni", "friends_family", "other"],
                            enumNames: ["TECHFEST facebook", "UnternehmerTUM facebook", "TechFounders", "Xpreneurs", "UnternehmerTUM Venture Captial Partners", "appliedAI", "University", "Friends & Family", "other"],
                        },
                    },
                    dependencies: {
                        howHearAbout: {
                            oneOf: [
                                {
                                    properties: {howHearAbout: {enum: ["techfestFB", "utumFB", "techFounders", "xpreneurs", "utumVCP", "appliedAi", "uni", "friends_family"]}}
                                },
                                {
                                    properties: {howHearAbout: {enum: ["other"]},
                                        howHearAboutOther: {type: "string", title: "How did you hear about TECHFEST then?"}
                                    },
                                }
                            ]
                        }
                    }
                },
                acknowledgement: {type: "boolean", title: " ", description: " "},
            },
            dependencies: {
                needsAccommodation: {
                    oneOf: [
                        {
                            properties: {needsAccommodation: {enum: ["no"]}}
                        },
                        {
                            properties: {needsAccommodation: {enum: ["yes"]},
                                numberOfAccommodation: {type: "string", title: "Number of start-up members that need a sleeping place?",
                                enum: ["1", "2", "3", "4", "5", "6"]
                                },
                            }
                        }
                    ]
                }
            }
        }
    }
};


export default schema;