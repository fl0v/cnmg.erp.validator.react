export default class Api {
  apiLicenseHeader = 'X-CNMG-LicenseKey';
  settings = {
    apiBaseUrl: '',
    apiLicense: '',
  };
  callOptions = {
    method: 'POST', // or 'PUT'
    mode: 'cors', // cors, no-cors, *cors, same-origin
    crendetials: 'omit', // same-origin, include, *same-origin, omit
    cache: 'no-cache',
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    headers: [
      ['Accept', 'application/json'],
      ['Content-Type', 'application/json'],
    ],
  };

  constructor(settings) {
    this.settings = Object.assign(this.settings, settings);
  }

  async call(call, data = {}, method = 'POST') {
    // URL
    let url =
      this.settings.apiBaseUrl.replace(/^\/|\/$/g, '') +
      '/' +
      call.replace(/^\/|\/$/g, '');

    // OPTIONS
    let options = Object.assign({}, this.callOptions, {
      method: method,
    });
    if (options.method === 'GET') {
      url += '?' + new URLSearchParams(data).toString();
    } else if (data) {
      options.body = JSON.stringify(data);
    }
    options.headers.push([this.apiLicenseHeader, this.settings.apiLicense]);

    console.log('Api', method, url, 'data', data, 'options', options);
    return fetch(url, options).then((response) => {
      console.log('Api response', response.status, response.statusText);
      let data = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = response.json();
      } else {
        data = response.text();
      }
      if (response.ok) {
        return data;
      } else {
        console.error('Invalid response!', data['[[PromiseValue]]']);
        return Promise.reject(data);
        //throw new Error('Invalid response!');
      }
    });
    /*
      .catch((error) => {
        console.error(error);        
        return Promise.reject(error);
      });
      */
  }

  pingApi() {
    return this.call('/default/ping');
  }
  pingValidator() {
    return this.call('/validator/ping');
  }
}
