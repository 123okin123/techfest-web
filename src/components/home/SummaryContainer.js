//@flow

import React from 'react'
import styled from "styled-components";
import {Container} from 'reactstrap'
import {Bracket} from "../common";


const SummaryContainer = () => (
    <Container>
    <DescriptionBox>
        <Bracket/>
        <DescriptionContent>
            <DescriptionHead>[MORE_DISCIPLINES] [MORE_IMPACT] [MORE_FUN]</DescriptionHead>
            <DescriptionText>
                THE FUSION OF TECHNOLOGY AND CREATIVE SPIRIT MAKES YOU FEEL THE BUZZING ATMOSPHERE OF TECHFEST.<br/>
                HERE, HACKERS, DESIGNERS, AND MAKERS START DOING OVER WATCHING, IMPLEMENTATION OVER TALKING AND CRAZY OVER NORMAL.<br/>
                GET SCHWIFTY AND CREATE THE UNTHINKABLE - FOR THE WORLD YOU WANT TO LIVE IN.
            </DescriptionText>
        </DescriptionContent>
        <Bracket right/>
    </DescriptionBox>
    </Container>
);

const DescriptionBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5em;
`;
const DescriptionContent = styled.div`
  padding: 20px;
  text-align: center;
`;
const DescriptionHead = styled.p`
  color: ${props => props.theme.primary};
  font-weight: 600;
  margin-bottom: 0;
`;
const DescriptionText = styled.p`
  color: ${props => props.theme.primary};
  font-size: 0.9em;
  line-height: 2em;
`;
export default SummaryContainer;