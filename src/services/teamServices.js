//@flow
import type {Mentor, Team, TeamFilter} from "../constants";
import fetch from "cross-fetch";
import {getCookie} from "../helpers/session";
import {authHeader, handleResponse} from "../helpers";

export const teamServices  = {
    fetchTeamsWithFilter,
    saveTeam,
    updateTeam
};



function fetchTeamsWithFilter(filter: TeamFilter): Promise<Array<Team>> {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`/api/teams?userId=${filter.userId || 'x'}&challengeId=${filter.challengeId || 'x'}&token=` + getCookie("jwt"), requestOptions)
      .then(handleResponse)
      .then(response=>Promise.resolve(response.teams));
}

function saveTeam(team: Team) :Promise<Team> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(team)
    };
    return fetch('/api/teams?token=' + getCookie("jwt"), requestOptions)
      .then(handleResponse).then(response=>Promise.resolve(response.team));
}

function updateTeam(id: string, team: Team) :Promise<Team> {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(team)
    };
    return fetch('/api/teams/'+ id +'?token=' + getCookie("jwt"), requestOptions)
      .then(handleResponse).then(response=>Promise.resolve(response.team));
}