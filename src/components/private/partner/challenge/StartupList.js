//@flow

import React, {Component} from 'react';
import type { User} from '../../../../constants'
import {getCookie} from "../../../../helpers/session";
import styled from "styled-components";
import {Button} from 'reactstrap'

type Props = {
    startUps: Array<User>,
    className?: string,
}

class StartupList extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
          <StartupCollection className={this.props.className}>
              {this.props.startUps.map((startup, index: number)=>
                <StartupContainer key={index.toString()}>
                    <h3>{(startup.startupFields ||{}).startup.startupName || '[No startup name]'}</h3>
                    <p className="mb-0">{(startup.startupFields ||{}).startup.firstName1} {(startup.startupFields ||{}).startup.lastName1}</p>
                    <p className="mb-0">{(startup.startupFields ||{}).startup.firstName2} {(startup.startupFields ||{}).startup.lastName2}</p>
                    <p className="mb-0">{(startup.startupFields ||{}).startup.firstName3} {(startup.startupFields ||{}).startup.lastName3}</p>
                    <p className="mb-0">{(startup.startupFields ||{}).startup.firstName4} {(startup.startupFields ||{}).startup.lastName4}</p>
                    <p className="mb-0">{(startup.startupFields ||{}).startup.firstName5} {(startup.startupFields ||{}).startup.lastName5}</p>

                    {((startup.startupFields || {}).trackUploads || []).map((upload, index)=>
                      <Button key={index.toString()} target='_blank' tag={'a'} href={upload.url + '?token=' + getCookie('jwt')} color="link">Upload {index + 1}</Button>
                    )}
                    {(startup.startupFields || {}).trackComment &&
                    <div className="mt-3">
                        <h5>Comment:</h5>
                        <p>{(startup.startupFields || {}).trackComment}</p>
                    </div>
                    }

                </StartupContainer>
              )}
              {this.props.startUps.length === 0 &&
              <p>No startups yet.</p>
              }
          </StartupCollection>
        )
    }
}


const StartupCollection = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const StartupContainer = styled.div`
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px #0006;
    max-width: 350px;
    overflow: hidden;
    margin: 20px;
    text-align: center;
    width: 300px;
    padding: 20px 10px;
`;


export default StartupList;