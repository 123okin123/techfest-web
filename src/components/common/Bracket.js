//@flow

import styled from "styled-components";

export const Bracket = styled.div`
    width: 8px;
    flex-shrink: 0;
    border-top: 4px solid ${props => (props.color || 'white')};
    border-bottom: 4px solid ${props => (props.color || 'white')};
    border-left: ${props => props.right ? 'none' : ('4px solid ' + (props.color || 'white')) };
    border-right: ${props => props.right ? ('4px solid ' + (props.color || 'white')) : 'none' };
    margin: ${props => props.right ? '0px 0px 0px -4px' : '0px -4px 0px 0px' };
`;

