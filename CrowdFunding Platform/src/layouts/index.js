import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Link from '../components/Link';

const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

const AppWrapper = styled.div`
  margin: 0 auto;
  padding: 30px 10px 60px;
  max-width: 650px;

  ul,
  li {
    margin-left: 0px;
  }
`;

const App = ({ children }) => (
  <AppWrapper>
    <Helmet
      meta={[
        {
          name: 'description',
          content:
            'Your open source solution to crowd fund your own projects and host it yourself.'
        },
        { name: 'keywords', content: 'open crowd fund alternative' }
      ]}
      links={[
        {
          rel: 'shortcut icon',
          type: 'image/png',
          sizes: '16x16',
          href: __PATH_PREFIX__ + '/favicons/favicon-16x16.png'
        }
      ]}
    />

    {children()}

    <Footer>
      <small>
        Powered by{' '}
        <Link href="https://github.com/rwieruch/open-crowd-fund">
          <span>Open Crowd</span> Fund
        </Link>{' '}
        and created<span>
          {' '}
          by <Link href="https://www.robinwieruch.de/">Robin <span>Wieruch</span></Link>
        </span>{' '}
        🐣
      </small>
    </Footer>
  </AppWrapper>
);

App.propTypes = {
  children: PropTypes.func
};

export default App;
