const path = require('path');
const fs = require('fs');
const React = require('react');
const {Provider} = require('react-redux');
const {renderToString} = require('react-dom/server');
const {StaticRouter} = require('react-router-dom');
const {default: configureStore} = require('../src/store');
const {default: App} = require('../src/components/App');
const { ServerStyleSheet } = require('styled-components'); // <-- importing ServerStyleSheet
const scTheme = require('../src/scTheme');
const {preFetchLandingPage} = require('./preFetchLandingPage');
const {ThemeProvider} = require('styled-components');
const jwt = require('jsonwebtoken');
const {getCookie} = require('../src/helpers/session');

module.exports = function universalLoader(req, res) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData)=>{
    if (err) {
      console.error('read err', err);
      return res.status(404).end()
    }
    const context = {};

    let store = configureStore();
        preFetchLandingPage()
          .then(result => {
              let initialStore =  {pages: {241: {isFetching: false, response: result}}};
              const token = getCookie("jwt", req) || '';
              try {
                  const decoded = jwt.verify(token, process.env.SUPER_SECRET);
                  if (decoded) {
                      initialStore = {...initialStore,  authentication: {loggedIn: !(err), role: decoded.role}}
                  }
              } catch(err) {
                 console.log(err);
              }
              store = configureStore(initialStore);
              return store
          })
          .catch(err => {
              console.log(`wp fetch error: ${err}`)
          })
          .then(() => {
              const sheet = new ServerStyleSheet();
              const markup = renderToString(sheet.collectStyles(
                <Provider store={store}>
                    <ThemeProvider theme={scTheme}>
                        <StaticRouter location={req.url} context={context}>
                            <App/>
                        </StaticRouter>
                    </ThemeProvider>
                </Provider>
              ));

              if (context.url) {
                  // Somewhere a `<Redirect>` was rendered
                  res.redirect(301, context.url)
              } else {
                  // we're good, send the response
                  const RenderedApp = htmlData.replace('{{SSR}}', markup);
                  const styles = sheet.getStyleTags(); // <-- getting all the tags from the sheet
                  const StyledRenderedApp = RenderedApp.replace('{{STYLES}}', styles);
                  const script = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}</script>`;
                  const StyledRenderedStatedApp = StyledRenderedApp.replace('{{STATE}}', script);
                  res.send(StyledRenderedStatedApp);
              }
          })
    })
};

