
import {countryList} from "../../helpers";

const schema = {
    type: "object",
    required: ["firstName", "lastName", "email", "emailConfirmation", "participantsFields"],
    properties: {
        firstName: {type: "string", title: "First Name", minLength: 2},
        lastName: {type: "string", title: "Last Name", minLength: 2},
        email: {type: "string", title: "Email", format: "email"},
        emailConfirmation: {type: "string", title: "Email confirmation", format: "email"},
        participantsFields: {
            type: "object",
            title: "",
            required: [
                "nationality",
                "dateOfBirth",
                "gender",
                "needsAccommodation",
                "profession",
                "bestDescription",
                "isProgrammer",
                "isDesigner",
                "isMaker",
                "cv",
                "hasProjectIdea",
                "jobSeeking",
                "informEvents",
                "howHearAbout",
            ],
            properties: {
                nationality: {type: "string", title: "Nationality", enum: countryList.map(e=>e.label)},
                phone: {type: "string", title: "Phone"},
                dateOfBirth: {type: "string", title: "Date of birth"},
                gender: {type: "string", title: "Gender",
                    enum: ["female", "male", "none"]
                },
                vegetarian: {type: "boolean", title: "Are you vegetarian?"},
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
                needsAccommodation: {type: "boolean", title: "I need a sleeping place (limited space, non-locals are preferred, first come first serve)."},
                bestDescription: {type: "string", title: "What describes you best?",
                    enum: ["hacker", "maker", "ideator", "designer", "artist", "unicorn"],
                    enumNames: ["Hacker", "Maker", "Ideator", "Designer", "Artist", "Unicorn"]
                },
                profession: {type: "string", title: "Profession",
                    enum: ["student", "entrepreneur", "employee"],
                    enumNames: ["Student", "Entrepreneur", "Employee"]
                },
                isProgrammer: {type: "string", title: "You are the programming genius?", enum: ["yes", "no"], enumNames: ["yes", "no"]},
                isDesigner: {type: "string", title: "You are the design specialist?", enum: ["yes", "no"], enumNames: ["yes", "no"]},
                isMaker: {type: "string", title: "You are the Master Maker?", enum: ["yes", "no"], enumNames: ["yes", "no"]},
                isArtist: {type: "string", title: "You are an artist?", enum: ["yes", "no"], enumNames: ["yes", "no"]},
                otherSuperpowers: {type: "string", title: "Some types of other Superpowers?"},
                whyChoose: {type: "string", title: "Why should we select you (max. 140 characters)?", minLength: 0, maxLength: 140},
                socialProfileLink: {type: "string", title: "Link of your LinkedIn/ Xing profil"},
                gitHubLink: {type: "string", title: "Link to your github Profile?"},
                cv: {type: "string", title: "Show us your CV (max. 2 pages, max. 5MB, pdf format)"},
                hasProjectIdea: {type: "string", title: "I already have a project idea.", enum: ["yes", "no"], enumNames: ["yes", "no"]},
                hasTeam: {type: "string", title: "Do you already have a team for TECHFEST?", enum: ["yes", "no"], enumNames: ["yes", "no"]},
                jobSeeking: {type: "boolean", title: "Are you looking for a job?"},
                informEvents: {type: "boolean", title: "Please inform me, if there are any events coming up. To do so I permit the use of my submitted personal data by UnternehmerTUM."},
                howHearAbout: {type: "string", title: "How did you hear about TECHFEST?",
                    enum: ["techfestFB", "utumFB", "uni", "friends_family", "other"],
                    enumNames: ["TECHFEST facebook", "UnternehmerTUM facebook", "University", "Friends & Family", "other"]
                },
                acknowledgement: {type: "boolean", title: " ", description: " "},


            },
            dependencies: {
                profession: {
                    oneOf: [
                        {
                          properties: {profession: {enum: ["entrepreneur", "employee"]}}
                        },
                        {
                            properties: {profession: {enum: ["student"]},
                                uni: {type: "string", title: "Uni"
                                },                            },
                            required: ["uni"]
                        }
                    ]
                },
                isProgrammer: {
                    oneOf: [
                        {
                            properties: {isProgrammer: {enum: ["no"]}}
                        },
                        {
                            properties: {isProgrammer: {enum: ["yes"]},
                                programmerSuperPowers: {type: "string", title: "Tell us your programming superpowers (Python, Arduino, Angular ect.)."}
                            },
                            required: ["programmerSuperPowers"]
                        }
                    ]
                },
                isDesigner: {
                    oneOf: [
                        {
                            properties: {isDesigner: {enum: ["no"]}}
                        },
                        {
                            properties: {isDesigner: {enum: ["yes"]},
                                designerSuperpowers: {type: "string", title: "Tell us your designing superpowers (CAD, Autodesk Inventor, Adobe Illustrator, UI, Artist ect.)"},
                            },
                            required: ["designerSuperpowers"]
                        }
                    ]
                },
                isMaker: {
                    oneOf: [
                        {
                            properties: {isMaker: {enum: ["no"]}}
                        },
                        {
                            properties: {isMaker: {enum: ["yes"]},
                                makerSuperpowers: {type: "string", title: "Tell us your superpowers in Making Stuff (Elektroniks, 3D Printing, Lasercutting etc.)."},
                            },
                            required: ["makerSuperpowers"]
                        }
                    ]
                },
                isArtist: {
                    oneOf: [
                        {
                            properties: {isArtist: {enum: ["no"]}}
                        },
                        {
                            properties: {isArtist: {enum: ["yes"]},
                                artistLetter: {type: "string", title: "Please, upload a motivational letter (max. 1 page, max. 5MB, pdf format)"},
                            },
                            required: ["artistLetter"]
                        }
                    ]
                },
                hasTeam: {
                    oneOf: [
                        {
                            properties: {hasTeam: {enum: ["no"]}}
                        },
                        {
                            properties: {hasTeam: {enum: ["yes"]},
                                wouldDoAlone: {type: "boolean", title: "Would you also participate as a single person?"},
                                teamMatesEmails: {type: "string", title: "Please tell us your team mates mail adresses (same as in your team mates application!):"},
                            }
                        }
                    ]
                },
                howHearAbout: {
                    oneOf: [
                        {
                            properties: {howHearAbout: {enum: ["techfestFB", "utumFB", "uni", "friends_family"]}}
                        },
                        {
                            properties: {howHearAbout: {enum: ["other"]},
                                howHearAboutOther: {type: "string", title: "How did you hear about TECHFEST then?"}
                                },
                        }
                    ]
                }
            }
        }
    }
};


export default schema;