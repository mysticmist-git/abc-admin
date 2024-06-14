export enum RouteKey {
  All,
  Index,
  SignIn,

  UserPage,
  DetailUserPage,
  NewUserPage,

  PostTypePage,
  DetailPostTypePage,
  NewPostTypePage,

  PostPage,
  DetailPostPage,
  NewPostPage,

  DepartmentPage,
  DetailDepartmentPage,
  NewDepartmentPage,

  EventTypePage,
  DetailEventTypePage,
  NewEventTypePage,

  ResourceTypePage,
  DetailResourceTypePage,
  NewResourceTypePage,

  ResourcePage,
  DetailResourcePage,
  NewResourcePage,

  ResourceUsingPage,
  DetailResourceUsingPage,
  NewResourceUsingPage,

  RequestPage,
  DetailRequestPage,
  NewRequestPage,

  FilePage,
  DetailFilePage,
  NewFilePage,
}

export const commonRoute = {
  [RouteKey.All]: "*",
  [RouteKey.Index]: "/",
};

export const authRoutes = {
  [RouteKey.SignIn]: "/signin",
};

export const userRoutes = {
  [RouteKey.UserPage]: "/users",
  [RouteKey.DetailUserPage]: "/users/:id",
  [RouteKey.NewUserPage]: "/users/new",
};

export const postRoutes = {
  [RouteKey.PostPage]: "/posts",
  [RouteKey.DetailPostPage]: "/posts/:id",
  [RouteKey.NewPostPage]: "/posts/new",
};

export const postTypeRoutes = {
  [RouteKey.PostTypePage]: "/postTypes",
  [RouteKey.DetailPostTypePage]: "/postTypes/:id",
  [RouteKey.NewPostTypePage]: "/postTypes/new",
};

export const eventTypesRoutes = {
  [RouteKey.EventTypePage]: "/eventTypes",
  [RouteKey.DetailEventTypePage]: "/eventTypes/:id",
  [RouteKey.NewEventTypePage]: "/eventTypes/new",
};

export const departmentRoutes = {
  [RouteKey.DepartmentPage]: "/departments",
  [RouteKey.DetailDepartmentPage]: "/departments/:id",
  [RouteKey.NewDepartmentPage]: "/departments/new",
};

export const resourceTypeRoutes = {
  [RouteKey.ResourceTypePage]: "/resourceTypes",
  [RouteKey.DetailResourceTypePage]: "/resourceTypes/:id",
  [RouteKey.NewResourceTypePage]: "/resourceTypes/new",
};

export const resources = {
  [RouteKey.ResourcePage]: "/resources",
  [RouteKey.DetailResourcePage]: "/resources/:id",
  [RouteKey.NewResourcePage]: "/resources/new",
};

export const resourceUsings = {
  [RouteKey.ResourceUsingPage]: "/resourceUsings",
  [RouteKey.DetailResourceUsingPage]: "/resourceUsings/:id",
  [RouteKey.NewResourceUsingPage]: "/resourceUsings/new",
};

export const requests = {
  [RouteKey.RequestPage]: "/requests",
  [RouteKey.DetailRequestPage]: "/requests/:id",
  [RouteKey.NewRequestPage]: "/requests/new",
};

export const files = {
  [RouteKey.FilePage]: "/files",
  [RouteKey.DetailFilePage]: "/files/:id",
  [RouteKey.NewFilePage]: "/files/new",
};

export const routes = {
  ...authRoutes,
  ...userRoutes,
  ...postRoutes,
  ...postTypeRoutes,
  ...departmentRoutes,
  ...eventTypesRoutes,
  ...departmentRoutes,
  ...commonRoute,
  ...resourceTypeRoutes,
  ...resources,
  ...resourceUsings,
  ...requests,
  ...files,
};
