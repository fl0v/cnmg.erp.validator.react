/**
 * Clasa generica, o instantiem o singura data pe aplicatie si apoi folosim Api
 */
class ApiClass {
  apiLicenseHeader = 'X-CNMG-LicenseKey';
  storageName = '__api__';
  settings = {
    apiBaseUrl: '',
    apiLicense: '',
    token: null,
    storage_id: null,
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
    this.useSettings(settings);
  }

  useSettings(settings) {
    this.settings = Object.assign(this.settings, settings);
  }

  async call(method, callUrl, data = {}) {
    callUrl = callUrl.replace(/^\/|\/$/g, '');
    let baseUrl =
      this.settings.apiBaseUrl &&
      this.settings.apiBaseUrl.replace(/^\/|\/$/g, '');
    if (!callUrl || callUrl.length === 0) {
      throw new Error('Empty call url!');
    }
    if (!baseUrl || baseUrl.length === 0) {
      throw new Error('Empty apiBaseUrl!');
    }

    let url = new URL(callUrl, baseUrl + '/');
    const options = {
      ...this.callOptions,
      method: method,
    };
    if (method === 'GET') {
      url += '?' + new URLSearchParams(data).toString();
    } else if (data) {
      options.body = JSON.stringify(data);
    }
    options.headers.push([this.apiLicenseHeader, this.settings.apiLicense]);

    if (this.settings.token) {
      options.headers.push(['Authorization', `Bearer ${this.settings.token}`]);
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
      storage_id: this.settings.storage_id,
      validate: validate,
    });
  }
}

const Api = new ApiClass();
export { Api, ApiClass }; // e nevoie de ApiClass ca sa creem instanta noua pentru a testa setarile introduse cand pornim aplicatia
