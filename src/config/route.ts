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

export const routes = {
  ...authRoutes,
  ...userRoutes,
  ...postRoutes,
  ...postTypeRoutes,
  ...departmentRoutes,
  ...eventTypesRoutes,
  ...departmentRoutes,
  ...commonRoute,
};
