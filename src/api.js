/**
 * Clasa generica, o instantiem o singura data pe aplicatie si apoi folosim Api
 */
class ApiClass {
  apiLicenseHeader = 'X-CNMG-LicenseKey';
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
  };
  callHeaders = [
    ['Accept', 'application/json'],
    ['Content-Type', 'application/json'],
  ];

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

    const options = Object.assign({}, this.callOptions);
    options.method = method;
    let url = new URL(callUrl, baseUrl + '/');
    if (method === 'GET') {
      url += '?' + new URLSearchParams(data).toString();
    } else if (data) {
      options.body = JSON.stringify(data);
    }
    const headers = Object.assign([], this.callHeaders);
    headers.push([this.apiLicenseHeader, this.settings.apiLicense]);

    if (this.settings.token) {
      //headers.push(['Authorization', `Bearer ${this.settings.token}`]);
      const bearer = Buffer.from(this.settings.token + ':').toString('base64');
      headers.push(['Authorization', `Basic ${bearer}`]);
    }
    options.headers = headers;

    console.log(method, url.toString(), options.body, options);
    return window
      .fetch(url, options)
      .then((response) => {
        const contentType = response.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');
        console.log('http', response.status, response.statusText, contentType);
        if (isJson) {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              console.error('Server error', data);
              const msg = data.errorMessage || 'Undefined error';
              return Promise.reject(new Error(msg));
            });
          }
        }
        return response.text().then((text) => {
          console.error('Format error', text);
          return Promise.reject(new Error('Invalid format!'));
        });
      })
      .catch((err) => {
        console.error('Api error!', err);
        return Promise.reject(err);
      });
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
