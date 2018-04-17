
import createHistory from 'history/createBrowserHistory'


export let history;
if (!(typeof localStorage === 'undefined')) {
    history = createHistory();
}

