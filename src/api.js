/**
 * Clasa generica care se instantiaza tot timpul cu toate setarile sin SettingsContext
 * Nu am reusit inca sa o fac sa-si ia automat contextul...
 */
export default class Api {
  apiLicenseHeader = 'X-CNMG-LicenseKey';
  tokenStorageName = 'api_user_token';
  settings = {
    api: {
      apiBaseUrl: '',
      apiLicense: '',
    },
    storage: {
      id: null,
    },
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
    this.settings = Object.assign({}, settings);
  }

  async call(method, callUrl, data = {}) {
    let url = new URL(
      callUrl.replace(/^\/|\/$/g, ''),
      this.settings.api.apiBaseUrl.replace(/^\/|\/$/g, '') + '/'
    );
    const options = {
      ...this.callOptions,
      method: method,
    };
    if (method === 'GET') {
      url += '?' + new URLSearchParams(data).toString();
    } else if (data) {
      options.body = JSON.stringify(data);
    }
    options.headers.push([this.apiLicenseHeader, this.settings.api.apiLicense]);

    const token = window.localStorage.getItem(this.tokenStorageName);
    if (token) {
      options.headers.push(['Authorization', `Bearer ${token}`]);
    }

    console.log(method, url.toString(), options.body, options);
    return window.fetch(url, options).then((response) => {
      console.log('response', response.status, response.statusText);
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

  ping() {
    return this.call('POST', '/default/ping');
  }

  pingValidator() {
    return this.call('POST', '/validator/ping');
  }

  login(pin) {
    return this.call('POST', '/validator/login', { pin: pin });
  }

  validate(code, validate) {
    return this.call('POST', '/validator/validate', {
      code: code,
      storage_id: this.settings.storage.id,
      validate: validate,
    });
  }
}
