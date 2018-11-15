// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular.json`.

const _isDev = window.location.port.indexOf('4200') > -1;
const serverPath = _isDev ? 'http://localhost:3000/' : `/`;

export const environment = {
  production: false,
  serverPath,
  azureConfig: {
    tenant: 'eb25818e-5bd5-49bf-99de-53e3e7b42630',
    clientId: '7eb7f3c1-377e-433f-92fe-d657272d4b79',
    redirectUri: 'http://localhost:4200/'
  }
};
