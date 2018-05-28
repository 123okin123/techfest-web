import * as React from 'react';
import {getCookie} from "../../../helpers/session";
import styled from "styled-components";
import {Button} from 'reactstrap';

type Props = {
    imageURL?: string,
    title: string,
    children?: React.Children,

    actionButtonText?: string,
    onActionButtonPressed?: ()=>void,
}


const Card = (props: Props) =>
  <Container>
      {props.actionButtonText && <Button className="float-right" onClick={props.onActionButtonPressed}>{props.actionButtonText}</Button>}
      {props.imageURL && <ImageContainer image={props.imageURL}/>}
      <h4>{props.title}</h4>
      {props.children}
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

export default Card;