
import {countryList} from "../../helpers";

const schema = {
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
              "residence",
              "needsAccommodation",
              "numberOfAccommodation"
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
                    title: "Address",
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
                    required: ["numberOfMembers"],
                    properties: {
                        numberOfMembers: {
                            type: "string", title: "Total number of start-up members that will join TECHFEST?",
                            enum: ["2", "3", "4", "5", "6"]
                        },
                        numberOfVegetarians: {
                            type: "string", title: "How many vegetarians are in your team?",
                            enum: ["0", "1", "2", "3", "5", "6"]
                        }
                    }
                },
                talent: {
                    type: "object",
                    title: "TALENT",
                    required: ["numberOfMembers"],
                    properties: {
                        track: {type: "string", title: "Please choose your track:",
                            enum: ["futureMobilityTransport", "quantifiedEarthAndSpace", "theSmartAutomationWave"],
                            enumNames: ["Future Mobility & Transport", "Quantified Earth and Space", "The Smart Automation Wave"]
                        },

                    }
                }


            },
            dependencies: {
                needsAccommodation: {
                    oneOf: [
                        {
                            properties: {needsAccommodation: {enum: ["no"]}}
                        },
                        {
                            properties: {needsAccommodation: {enum: ["yes"]},
                                numberOfAccommodation: {type: "string", title: "Number of start-up members that need a sleeping place?"},
                            }
                        }
                    ]
                },
                numberOfMembers: {
                    oneOf: [
                        {
                            properties: {numberOfMembers: {enum: ["2"]},
                                firstName1: {type: "string", title: "First Name"},
                                lastName1: {type: "string", title: "Last Name"},
                                email1: {type: "string", title: "Email"},
                            }
                        },
                        {
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
                                firstName4: {type: "string", title: "First Name"},
                                lastName4: {type: "string", title: "Last Name"},
                                email4: {type: "string", title: "Email"},

                            }
                        },
                        {
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
                                firstName5: {type: "string", title: "First Name"},
                                lastName5: {type: "string", title: "Last Name"},
                                email5: {type: "string", title: "Email"},
                            }
                        }
                    ]
                },
            }
        }
    }
};


export default schema;