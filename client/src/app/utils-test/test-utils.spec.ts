export const routerSpy = {
  navigate: jasmine.createSpy('navigate'),
  navigateByUrl: jasmine.createSpy('navigateByUrl')
};

export const translateLoaderSpy = jasmine.createSpyObj('TranslateLoader', ['get', 'getBrowserLang']);

// export const eventServiceSpy = jasmine.createSpyObj('EventService',
//   ['getEvent', 'createEvent', 'queryEventsPaginated', 'editEvent', 'deleteEvent']
// );

export const pageNameServiceSpy = jasmine.createSpyObj('PageNameService',
  ['getPageName', 'getPageText', 'changePage', 'resolveName']
);

export const leftSidebarServiceSpy = jasmine.createSpyObj('LeftSidebarService',
  ['getSidebarSubject', 'update']
);

let store = {};
export const localStorageMock = {
  getItem: (key: string): string => {
    return key in store ? store[key] : null;
  },
  setItem: (key: string, value: string) => {
    store[key] = `${value}`;
  },
  removeItem: (key: string) => {
    delete store[key];
  },
  clear: () => {
    store = {};
  }
};

