/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import 'regenerator-runtime';
import '../styles/style.css';
import '../styles/responsive.css';
import App from './views/app';
import WebSocketInitiator from './utils/websocket-initiator';
import CONFIG from './globals/config';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  const mainContent = document.querySelector('#mainContent');
  const skipLink = document.querySelector('.skip-link');
  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    mainContent.scrollIntoView({ behavior: 'smooth' });
    skipLink.blur();
  });
  swRegister();
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
});
