import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import config from '../config';

// https://reactjs.org/docs/dom-elements.html <<<<<<<<< 'dangerouslySetInnerHTML'

const Html = props => {
  const { assets, content, store } = props;
  const head = Helmet.renderStatic();

  console.log('>>>>>> HTML.JS > Object.keys(assets.styles): ', Object.keys(assets.styles));
  console.log('>>>>>> HTML.JS > Object.keys(assets.styles).length: ', Object.keys(assets.styles).length);
  console.log('>>>>>> HTML.JS > assets.styles: ', assets.styles);
  console.log('>>>>>> HTML.JS > assets: ', assets);

  // DEVELOPMENT -----------------------------------------------------------------------------------------
  // >>>>>> HTML.JS > Object.keys(assets.styles):  []
  // >>>>>> HTML.JS > Object.keys(assets.styles).length:  0
  // >>>>>> HTML.JS > assets.styles:  {}
  // >>>>>> HTML.JS > assets:  { javascript: 
  //    { main: 'http://localhost:3001/assets/main.1477b7d5a2530eebb1a3.js',
  //      vendor: 'http://localhost:3001/assets/vendor.1477b7d5a2530eebb1a3.js',
  //      'vendors-main': 'http://localhost:3001/assets/vendors-main.3afdb594fc0a4022d7da.js',
  //      'vendors-main-vendor': 'http://localhost:3001/assets/vendors-main-vendor.fa7ad64be4f3caa2531d.js',
  //      'vendors-vendor': 'http://localhost:3001/assets/vendors-vendor.558be7861b6e9c645b4b.js' },
  //   styles: {} }

  // PRODUCTION -------------------------------------------------------------------------------------------
  // >>>>>> HTML.JS > Object.keys(assets.styles):  [ 'main' ]
  // >>>>>> HTML.JS > Object.keys(assets.styles).length:  1
  // >>>>>> HTML.JS > assets.styles:  { main: '/assets/main-741466ca48ed79dc2012.css' }
  // >>>>>> HTML.JS > assets:  { javascript: 
  //    { 'vendors-main-vendor': '/assets/vendors-main-vendor.974b806033a7bba944d4.js',
  //      'vendors-vendor': '/assets/vendors-vendor.7cb9126fcebdcdd7a169.js',
  //      'vendors-main': '/assets/vendors-main.2385dc9ef36d5746edc2.js',
  //      vendor: '/assets/vendor.423863f32e02f2f88f2a.js',
  //      main: '/assets/main.423863f32e02f2f88f2a.js' },
  //   styles: { main: '/assets/main-741466ca48ed79dc2012.css' } }
  
  return (

    <html lang="en-US">

      <head>
        {/* (>>>>>>> META <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<) */}
        {head.base.toComponent()}
        {head.meta.toComponent()}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Election App 2018!" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Election App 2018!" />
        <meta name="theme-color" content="#1E90FF" />

        {/* (>>>>>>> TITLE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<) */}
        {head.title.toComponent()}

        {/* (>>>>>>> LINK <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<) */}
        {head.link.toComponent()}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        {/* (>>>>>>> SCRIPT <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<) */}
        {head.script.toComponent()}

        {/* (>>>>>>> STYLES - will be physically present only in production with 'WETP' || 'MCEP') */}
        {Object.keys(assets.styles).length > 0 &&
          Object.keys(assets.styles)
            .reverse()
            .map(key => (
              <link
                rel="stylesheet"
                type="text/css"
                key={key}
                href={assets.styles[key]}
              />
            ))}

      </head>
      <body>

        {/* (>>>>>>> CONTENT <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<) */}
        <div id="content" dangerouslySetInnerHTML={{ __html: content }} ></div>

        {/* (>>>>>>> STORE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<) */}
        {store && (
          <script
            dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
            charSet="UTF-8"
          ></script>
        )}

        {__DLLS__ && <script key="dlls__vendor" src="/assets/dlls/dll__vendor.js" charSet="UTF-8" />}

        {/* (>>>>>>> JAVASCRIPTS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<) */}
        {Object.keys(assets.javascript).length > 0 &&
          Object.keys(assets.javascript)
            .reverse()
            .map(key => <script key={key} src={assets.javascript[key]}></script>)}

      </body>
    </html>
  );
};

Html.propTypes = {
  assets: PropTypes.shape({
    styles: PropTypes.object,
    javascript: PropTypes.object
  }),
  content: PropTypes.string,
  store: PropTypes.shape({
    getState: PropTypes.func
  }).isRequired
};

Html.defaultProps = {
  assets: {},
  content: ''
};

export default Html;
