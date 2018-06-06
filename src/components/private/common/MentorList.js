//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import styled from 'styled-components'
import {Button} from 'reactstrap'
import {type Mentor, type User, roles} from '../../../constants/'
import {mentorActions} from "../../../actions/index";
import {getCookie} from '../../../helpers/session';
import {AvField, AvForm} from 'availity-reactstrap-validation'
import {faUser} from "@fortawesome/fontawesome-free-solid/index";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

type Props = {
    className: string,
    companyFilter?: string,
    noChallengeMentors?: boolean,

    editable?: boolean,

    mentors: Array<Mentor>,
    fetchMentorsIfNeeded: ()=>Promise<Array<Mentor>>,
    deleteMentor: (string)=>Promise<string>,
    updateMentor: (Mentor)=>Promise<Mentor>,
}


type State = {
    mentors: Array<Mentor>
}

class MentorList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).deleteMentor = this.deleteMentor.bind(this);
        this.state = {
            mentors: this.props.mentors
        }
    }

    componentDidMount() {
        this.props.fetchMentorsIfNeeded().then(mentors=>{
            this.setState({mentors: this.props.mentors})
        })
    }
    componentWillReceiveProps() {
        this.props.fetchMentorsIfNeeded().then(mentors=>{
            this.setState({mentors: this.props.mentors})
        })
    }

    handleValidSubmit(event, values, mentor) {
        this.props.updateMentor({...mentor, ...values}).then(updateMentor=>{
            console.log(updateMentor);
            this.setState({mentors: this.state.mentors.map(mentorInState=> mentorInState._id === updateMentor._id ? {...updateMentor, editable: false} : mentorInState)});
        });
    }


    deleteMentor(mentor: Mentor) {
        this.props.deleteMentor(mentor._id).then(id=>{
            this.setState({mentors: this.props.mentors})
        })
    }

    render() {
        let filteredMentors = this.props.companyFilter ?
          this.state.mentors.filter((e)=>e.company === this.props.companyFilter)
          : this.state.mentors;
        filteredMentors = this.props.noChallengeMentors ?
          filteredMentors.filter((e)=> (e.partnerRole !== roles.TRACK_PARTNER_ROLE && e.partnerRole !== roles.CHALLENGE_PARTNER_ROLE))
            : filteredMentors;

        return (
          <MentorCollection className={this.props.className}>
              {filteredMentors.map((mentor: Mentor, index: number)=> {
                  if (mentor.editable) {
                      return (
                        <MentorContainer key={index.toString()}>
                            <AvForm onValidSubmit={(event, values)=>this.handleValidSubmit(event, values, mentor)} model={{firstName: mentor.firstName, lastName: mentor.lastName, slack: mentor.slack, email: mentor.email}}>
                            <div className="d-flex">
                                <Button type="submit">Save</Button>
                            </div>
                            <ImageContainer image={mentor.imageURL}/>
                                <StyledAvField placeholder="First Name" name="firstName" required />
                                <StyledAvField placeholder="Last Name" name="lastName" required />
                                <StyledAvField placeholder="Email" name="email" required />
                                <StyledAvField placeholder="Slack" name="slack" />
                            </AvForm>
                            <SkillContainer>
                                {mentor.skills.map((skill, index) =>
                                  <Skill key={index.toString()}>#{skill}</Skill>
                                )}
                            </SkillContainer>
                        </MentorContainer>)
                  } else {
                      return (
                        <MentorContainer key={index.toString()}>
                            {this.props.editable &&
                            <div className="d-flex">
                                <Button onClick={() => this.deleteMentor(mentor)}>Delete</Button>
                                <Button onClick={()=>this.setState({mentors: this.state.mentors.map(mentorInState=>mentorInState._id === mentor._id ? {...mentor, editable: true}:mentorInState)})}>Edit</Button>
                            </div>
                            }
                            {mentor.imageURL ? <ImageContainer image={mentor.imageURL}/>
                              : <EmptyImage><FontAwesomeIcon size="7x" color="#6c757d" icon={faUser}/></EmptyImage>
                            }

                            <h4>{mentor.firstName} {mentor.lastName}</h4>
                            {/*<StyledEmail href={'mailto:'+mentor.email}>{mentor.email}</StyledEmail>*/}
                            <h5>{mentor.company}</h5>
                            {/*<Button tag='a' href='slack://open?team=openunternehmertumevents' >Slack</Button>*/}
                            <SkillContainer>
                                {mentor.skills.map((skill, index) =>
                                  <Skill key={index.toString()}>#{skill}</Skill>
                                )}
                            </SkillContainer>
                        </MentorContainer>)
                  }
              })}
              {filteredMentors.length === 0 &&
              <p>No mentors yet.</p>
              }
          </MentorCollection>
        )
    }
}
const MentorCollection = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
const StyledAvField = styled(AvField)`
  border-bottom: 2px dashed #999 !important;
`;

const MentorContainer = styled.div`
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
const EmptyImage = styled.div`
    height: 180px;
    width: 180px;
    margin: 20px auto 20px;
    border-radius: 50%;
    background-color: #e9ecef;
    padding-top: 30px;
`;
const Skill = styled.span`
    background-color: #e9ecef;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 0.8em;
    color: #6c757d;
    margin: 5px;
`;
const SkillContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 20px;
`;
const StyledEmail = styled.a`
font-size: 0.8em;
`;
const mapStateToProps = (state, ownProps) => {
    const {items} = state.mentors;
    return {
        mentors: items || []
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchMentorsIfNeeded: () => {
            return dispatch(mentorActions.fetchMentorsIfNeeded())
        },
        deleteMentor: (index: string) => {
            return dispatch(mentorActions.deleteMentor(index))
        },
        updateMentor: (mentor: Mentor) => {
            return dispatch(mentorActions.updateMentor(mentor))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MentorList);