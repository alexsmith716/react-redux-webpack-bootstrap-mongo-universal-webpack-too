import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

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
  //    { main: 'http://localhost:3001/assets/main.de3e0aca178f6704d5c2.js',
  //      vendor: 'http://localhost:3001/assets/vendor.de3e0aca178f6704d5c2.js',
  //      'vendors-main': 'http://localhost:3001/assets/vendors-main.28f1e3874b41014ccf7f.js',
  //      'vendors-main-vendor': 'http://localhost:3001/assets/vendors-main-vendor.a167806953b97bdb28e9.js',
  //      'vendors-vendor': 'http://localhost:3001/assets/vendors-vendor.28576e1e3d4e1f93aa9f.js' },
  //   styles: {} }

  // PRODUCTION -------------------------------------------------------------------------------------------
  // >>>>>> HTML.JS > Object.keys(assets.styles):  [ 'vendors-main', 'main' ]
  // >>>>>> HTML.JS > Object.keys(assets.styles).length:  2
  // >>>>>> HTML.JS > assets.styles:  { 'vendors-main': '/public/assets/vendors-main.2.css', main: '/public/assets/main.4.css' }
  // >>>>>> HTML.JS > assets:
  // {
  //   javascript: {
  //     'vendors-main-vendor': '/public/assets/vendors-main-vendor.e4e111bbca694daa0f88.js',
  //     'vendors-vendor': '/public/assets/vendors-vendor.b22cefbd3f41edbffaed.js',
  //     'vendors-main': '/public/assets/vendors-main.c780dc044dba75bba09d.js',
  //     vendor: '/public/assets/vendor.815980ec1d5a2ba57fde.js',
  //     main: '/public/assets/main.815980ec1d5a2ba57fde.js'
  //   },
  //   styles: {
  //     'vendors-main': '/public/assets/vendors-main.2.css',
  //     main: '/public/assets/main.4.css'
  //   }
  // }
  
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

        {/* () */}
        <div id="content" dangerouslySetInnerHTML={{ __html: content }} ></div>

        {/* () */}
        {store && (
          <script
            dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
            charSet="UTF-8"
          ></script>
        )}

        {/* () */}
        {Object.keys(assets.javascript)
          .filter(key => key.includes('main') || key.includes('vendor') || key.includes('vendors'))
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
