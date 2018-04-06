import { createBrowserHistory } from 'history';

export const history = (typeof localStorage === 'undefined') ? undefined : createBrowserHistory();