import * as React from 'react';
import {getCookie} from "../../../helpers/session";
import styled from "styled-components";
import {Button} from 'reactstrap';
import {faUser} from "@fortawesome/fontawesome-free-solid/index";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'


type Props = {
    imageURL?: string,
    title: string,
    skills?: Array<string>,
    children?: React.Children,

    actionButtonText?: string,
    onActionButtonPressed?: ()=>void,
}


const Card = (props: Props) =>
  <Container>
      {props.actionButtonText && <Button className="float-right" onClick={props.onActionButtonPressed}>{props.actionButtonText}</Button>}
      {props.imageURL ? <ImageContainer image={props.imageURL}/>
        : <EmptyImage><FontAwesomeIcon size="7x" color="#6c757d" icon={faUser}/></EmptyImage>
      }
      <h4>{props.title}</h4>
      {props.children}
      {props.skills &&
      <SkillContainer>
          {props.skills.map((skill, index) =>
            <Skill key={index.toString()}>#{skill}</Skill>
          )}
      </SkillContainer>
      }
  </Container>
;


const Container = styled.div`
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

export default Card;