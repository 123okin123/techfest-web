//@flow
import React from 'react'
import styled from 'styled-components'


type Props = {
    title: string,
    subtitle?: string,
    imageURL?: string
}

export const Heading = (props: Props) => (
    <div className="mb-5">
        <TitleFlex>
            {props.imageURL &&
            <Image imageURL={props.imageURL}/>
            }
            <Title>{props.title}</Title>
        </TitleFlex>
        <SubTitle>{props.subtitle}</SubTitle>
    </div>
);
const TitleFlex = styled.div`
  display: flex;
 align-items: baseline;
`;
const Image = styled.div`
  background: url(${props => props.imageURL}) left bottom no-repeat;
  background-size: contain;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;
const Title = styled.h2`
  margin-bottom: 0;
  font-weight: 900;
`;

const SubTitle = styled.h3`
  font-size: 1em;
  font-weight: 700;
`;



