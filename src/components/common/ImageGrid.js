//@flow
import * as React from 'react'
import styled from 'styled-components'
import {Bracket} from './'

type Props = {
    justifyContent?: string,
    backAndWhite?: boolean,
    elementHeight: string,
    elementWidth: string,
    imageWidth: string,
    elementMargin?: string,
    magnifierImg: boolean,
    containImage?: boolean,
    leftRightInset?: string,
    elements: Array<{
        imageURL: string,
        title?: string | React.Element<'a'>,
        url?: string,
        description?: string,
        extraDescription?: string
    }>
}


export const ImageGrid = (props: Props) => {
    const elements = props.elements.map((e, i) =>
        <Element margin={props.elementMargin} height={props.elementHeight} width={props.elementWidth} key={i}>
            <Bracket/>
            {e.url ?
              <ElementImageLink width={props.imageWidth}  target="_blank" href={e.url}><ElementImage leftRightInset={props.leftRightInset} contain={props.containImage} imageURL={e.imageURL}/></ElementImageLink>
              :
              <ElementImage backAndWhite={props.backAndWhite} leftRightInset={props.leftRightInset} contain={props.containImage} imageURL={e.imageURL} width={props.imageWidth}/>
            }
            <Bracket right/>
            {e.title &&
            <ElementTextBox>
                <ElementTitle>{e.title}</ElementTitle>
                <ElementDescription>{e.description}</ElementDescription>
                <ElementExtraDescription>{e.extraDescription}</ElementExtraDescription>
            </ElementTextBox>
            }
            {props.magnifierImg &&
            <MagnifierImage className="my-3 mx-sm-3 " src={require('../../assets/icons/icon_magnifier_black-white.png')}/>
            }
        </Element>
    );
    return (<ElementContainer justifyContent={props.justifyContent}>{elements}</ElementContainer>);
};
const ElementContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props => props.justifyContent ? props.justifyContent : "center"};
`;
const Element = styled.div`
    max-width: 100%;
    display: flex;
    justify-content: center;
    width: ${props => props.width};
    height: ${props => props.height};
    margin: ${props => props.margin};
`;
const ElementTextBox = styled.div`
    flex-grow: 2;
    padding: 10px;
`;
const ElementTitle = styled.p`
    font-size: large;
    margin-bottom: 0;
    font-weight: 900;
`;
const ElementDescription = styled.p`
    font-size: 0.8em;
    margin-bottom: 0;
`;
const ElementExtraDescription = styled.p`
    font-size: large;
    font-weight: 900;
    margin-top: 0.4em;
`;
const MagnifierImage = styled.img`
    width: 20px;
    height: 20px;
`;
const ElementImageLink = styled.a`
    height: calc(100% - 10px);
    width: ${props => props.width};
`;
const ElementImage = styled.div`
    background: url(${props => props.imageURL}) no-repeat center;
    background-size: ${props => props.contain ? 'contain' : 'cover'};
    height: calc(100% - 10px);
    width: ${props => props.width};
    margin: 5px ${props => props.leftRightInset};
    filter: ${props => props.backAndWhite ? 'grayscale(100%)' : ''};
`;


