import fs from 'fs';
import {minify} from 'html-minifier';
import inlineCss from 'inline-css';
import config from '../../config/environment';
import htmlToText from 'html-to-text';
import {validateProps} from './PropTypes';
import {sendEmail} from '../send';

export default class BaseHTMLComponent {
  constructor(props = {}) {
    this.props = props;
    this.propTypes;
    this.state = {};
    this.stylePath = '';
    this.components = {};
    this.componentList = [];
  }
  async init() {
    return;
  }
  validate() {
    if(this.propTypes) {
      validateProps(this.props, this.propTypes);
    }
  }
  async generate() {
    await this.init();
    const styles = await this.getStylesheet();
    const rawBody = await this.renderHtml();
    const encapsulatedHtml = encapsulateBody(rawBody, styles);
    return {
      html: await formatHtml(encapsulatedHtml),
      text: await this.renderText()
    };
  }
  async loadComponent(component, name) {
    this.componentList.push(component);
    const body = await component.generate();
    this.components[name] = body;
    this.components[name].component = component;
    return;
  }
  setStylePath(filepath) {
    this.stylePath = filepath;
  }
  async getStylesheet() {
    const myStyles = await fetchStylesheetFile(this.stylePath);
    const subcomponentStyles = await this.getStylesheetsFromSubcomponents();
    return `${myStyles}\n\n${subcomponentStyles}`;
  }
  async getStylesheetsFromSubcomponents() {
    const promises = this.componentList.map(component => component.getStylesheet());
    const styles = await Promise.all(promises);
    return styles.join('\n\n');
  }
  async renderHtml() {
    return '';
  }
  async renderText() {
    const html = await this.renderHtml();
    return htmlToText.fromString(html);
  }
  getDefaultSendOptions() {
    return {};
  }
  async send(options = {}) {
    const rendered = await this.generate();
    const defaultOptions = this.getDefaultSendOptions();
    return sendEmail({
      Destination: {
        ToAddresses: options.to || defaultOptions.to || [],
        BccAddresses: options.bcc || defaultOptions.bcc || [],
        CcAddresses: options.cc || defaultOptions.cc || []
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: rendered.html
          },
          Text: {
            Charset: 'UTF-8',
            Data: rendered.text
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: options.subject || defaultOptions.subject || ''
        }
      },
      Source: options.from || defaultOptions.from || `${config.email.name} <${config.email.address}>` || ''
    });
  }
}

async function formatHtml(rawHtml) {
  const inlined = await inlineCss(rawHtml, {
    url: config.domain
  });
  return minify(inlined, {
    collapseWhitespace: true
  });
}

function encapsulateBody(body, styles) {
  return `
    <html>
      <head>
        <style type="text/css">
          ${styles}
        </style>
      </head>
      <body>
        ${body}
      </body>
    </html>
  `;
}

function fetchStylesheetFile(filePath) {
  return new Promise((resolve, reject) => {
    if(filePath) {
      fs.readFile(filePath, (err, data) => {
        if(err) return reject(err);
        resolve(data);
      });
    } else {
      resolve('');
    }
  });
}
