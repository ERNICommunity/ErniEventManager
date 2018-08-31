import { of } from 'rxjs';
import { currenPageMock1 } from '../interfaces';

export const routerSpy = {
  navigate: jasmine.createSpy('navigate'),
  navigateByUrl: jasmine.createSpy('navigateByUrl')
};

export const translateLoaderSpy = jasmine.createSpyObj('TranslateLoader', ['get', 'getBrowserLang']);

// export const eventServiceSpy = jasmine.createSpyObj('EventService',
//   ['getEvent', 'createEvent', 'queryEventsPaginated', 'editEvent', 'deleteEvent']
// );

export const pageNameServiceSpyAbstract = jasmine.createSpyObj('PageNameService',
  ['getPageName', 'getPageText', 'changePage', 'resolveName']
);

export const pageNameServiceSpyReal = {
  getPageName() {
    return of( {subscribe: () => currenPageMock1 });
  },
  getPageText() {
    return of(currenPageMock1);
  }
};

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

