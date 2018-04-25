//@flow
import React from 'react'
import { Table} from 'reactstrap'
import styled from 'styled-components'

const TimelineContainer = () => (
        <StyledTable className="text-center table-responsive-lg">
            <thead>
            <tr>
                <TimelineHead scope="col">THU 14.06</TimelineHead>
                <TimelineHead scope="col">FRI 15.06</TimelineHead>
                <TimelineHead scope="col">SAT 16.06</TimelineHead>
                <TimelineHead scope="col">SUN 17.06</TimelineHead>
                <TimelineHead scope="col">MON 18.06</TimelineHead>
            </tr>
            </thead>
            <tbody>
            <tr><td/><td className="border-bottom border-dark" colSpan="3">BREAKFAST</td><td/></tr>
            <tr>
                <td>PRE-EVENT NETWORKING_NIGHT<br/>Tech Talk, Music, Food and more_</td>
                <td>PRESENTATION OF PARTNER CHALLENGES</td>
                <td>PROJECTWORK & WORKSHOPS</td>
                <td>PROJECTWORK SEMI FINALS</td>
                <td>LAUNCHPAD DAY<br/>Exclusively for invited teams with most promising<br/> ideas for future business.</td>
            </tr>
            <tr><td/><td className="border-bottom border-dark" colSpan="3">LUNCH BREAK</td><td/></tr>
            <tr>
                <td/>
                <td>TRACK FACILITATION<br/>PROJECT WORK & IDEATION</td>
                <td>PROJECTWORK & WORKSHOPS</td>
                <td>GRAND FINAL TECHSLAM</td>
                <td/>
            </tr>
            <tr><td/><td className="border-bottom border-dark" colSpan="3">DINNER</td><td/></tr>
            <tr>
                <td/>
                <td>PROJECT WORK and more_<br/>MIDNIGHT SUPRISE</td>
                <td>PROJECT WORK and EVENTS</td>
                <td>AFTERSHOW PARTY</td>
            </tr>
            </tbody>
        </StyledTable>
);

const TimelineHead = styled.th`
font-weight: 900;
font-size: 1.8em;
border: none !important;
`;
const StyledTable = styled(Table)`
 > tbody > tr > td {
 border: none;
 font-weight: 700;
 width: 200px;
}
`;


export default TimelineContainer;