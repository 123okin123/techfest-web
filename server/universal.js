const path = require('path');
const fs = require('fs');

const React = require('react');
const {Provider} = require('react-redux');
const {renderToString} = require('react-dom/server');
const {StaticRouter} = require('react-router-dom');
const {default: configureStore} = require('../src/store');
const {default: App} = require('../src/components/App');
const { ServerStyleSheet } = require('styled-components'); // <-- importing ServerStyleSheet







module.exports = function universalLoader(req, res) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData)=>{
    if (err) {
      console.error('read err', err);
      return res.status(404).end()
    }
    const context = {};
    const store = configureStore();
    const sheet = new ServerStyleSheet(); // <-- creating out stylesheet
    const markup = renderToString(sheet.collectStyles(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <App/>
        </StaticRouter>
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
      res.send(StyledRenderedApp)
    }
  })
}

