export const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

export const translateLoaderSpy = jasmine.createSpyObj('TranslateLoader', ['get', 'getBrowserLang']);

export const eventServiceSpy = jasmine.createSpyObj('EventService',
  ['getEvent', 'createEvent', 'queryEventsPaginated', 'editEvent', 'deleteEvent']
);

export const pageNameServiceSpy = jasmine.createSpyObj('PageNameService',
  ['getPageName', 'getPageText', 'changePage', 'resolveName']
);

export const leftSidebarServiceSpy = jasmine.createSpyObj('LeftSidebarService',
  ['getSidebarSubject', 'update']
);

export const userServiceSpy = jasmine.createSpyObj('UserService',
  ['create', 'get', 'queryPaginated', 'edit', 'delete']
);

