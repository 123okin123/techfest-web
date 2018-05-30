//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import styled from 'styled-components'
import {Button} from 'reactstrap'
import {type Mentor, type User, roles} from '../../../constants/'
import {mentorActions} from "../../../actions/index";
import {getCookie} from '../../../helpers/session';

type Props = {
    className: string,
    companyFilter?: string,
    noChallengeMentors?: boolean,
    editable?: boolean,

    mentors: Array<Mentor>,
    fetchMentorsIfNeeded: ()=>Promise<void>,
    deleteMentor: (string)=>Promise<void>
}

class MentorList extends Component<Props> {
    constructor(props: Props) {
        super(props);
        (this: any).deleteMentor = this.deleteMentor.bind(this);
    }

    componentDidMount() {
        this.props.fetchMentorsIfNeeded()
    }

    deleteMentor(mentor: Mentor) {
        this.props.deleteMentor(mentor._id);
    }

    render() {
        let filteredMentors = this.props.companyFilter ?
          this.props.mentors.filter((e)=>e.company === this.props.companyFilter)
          : this.props.mentors;
        filteredMentors = this.props.noChallengeMentors ?
          filteredMentors.filter((e)=> (e.partnerRole !== roles.TRACK_PARTNER_ROLE && e.partnerRole !== roles.CHALLENGE_PARTNER_ROLE))
            : filteredMentors;
        return (
          <MentorCollection className={this.props.className}>
              {filteredMentors.map((mentor: Mentor, index: number)=>
                <MentorContainer key={index.toString()}>
                    {this.props.editable && <Button className="float-right" onClick={()=>this.deleteMentor(mentor)}>Delete</Button>}
                    <ImageContainer image={mentor.imageURL}/>
                    <h4>{mentor.firstName} {mentor.lastName}</h4>
                    <h5>{mentor.company}</h5>
                    <SkillContainer>
                        {mentor.skills.map((skill, index)=>
                          <Skill key={index.toString()}>#{skill}</Skill>
                        )}
                    </SkillContainer>
                </MentorContainer>
              )}
              {this.props.mentors.length === 0 &&
              <p>No mentors yet.</p>
              }
          </MentorCollection>
        )
    }
}
const MentorCollection = styled.div`
    display: flex;
    flex-wrap: wrap;
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
const Skill = styled.span`
    background-color: #e9ecef;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 1.05em;
    color: #6c757d;
    margin: 5px;
`;
const SkillContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 20px;
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MentorList);