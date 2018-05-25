//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import styled from 'styled-components'
import {type Mentor, type User} from '../../../constants'
import {mentorActions} from "../../../actions";
import {getCookie} from '../../../helpers/session';

type Props = {
    className: string,
    userData: User,
    mentors: Array<Mentor>,
    fetchMentorsIfNeeded: ()=>Promise<void>
}

class MentorList extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchMentorsIfNeeded()
    }

    render() {
        const company = (this.props.userData.partnerFields || {}).company;
        return (
          <div className={this.props.className}>
              {this.props.mentors.filter((e)=>e.company === company).map((mentor: Mentor, index: number)=>
                <MentorContainer key={index.toString()}>
                    <ImageContainer image={mentor.imageURL}/>
                    <h3>{mentor.firstName} {mentor.lastName}</h3>
                    <SkillContainer>
                        {mentor.skills.map((skill, index)=>
                          <Skill key={index.toString()}>#{skill}</Skill>
                        )}
                    </SkillContainer>
                </MentorContainer>
              )}
          </div>
        )
    }
}
const MentorContainer = styled.div`
    background-color: #fff;
    border-radius: 5px;
    padding: 1em;
    box-shadow: 0 0 10px #0006;
    max-width: 350px;
    overflow: auto;
    margin: 20px;
    text-align: center;
`;

const ImageContainer = styled.div`
    background: url(${(props)=> props.image + '?token=' + getCookie("jwt")}) no-repeat center;
    background-size: cover;
    height: 180px;
    width: 180px;
    margin: 0 auto 20px;
    border-radius: 50%;
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MentorList);