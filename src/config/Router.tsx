import { Layout } from "@/layouts";
import {
  DepartmentPage,
  DetailDepartmentPage,
  DetailPostPage,
  DetailPostTypePage,
  DetailUserPage,
  EventTypePage,
  PostPage,
  PostTypePage,
  UserPage,
  SignInPage,
} from "@/pages";
import { route } from "@/utils/route";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { RouteKey } from "./route";
import ResourceTypePage from "@/pages/ResourceTypePage";
import ResourcePage from "@/pages/ResourcePage";
import ResourceUsingPage from "@/pages/ResourceUsingPage";

const ConfigRouter = createBrowserRouter([
  {
    path: route(RouteKey.SignIn),
    element: <SignInPage />,
  },
  {
    path: route(RouteKey.Index),
    element: <Layout />,
    children: [
      // user
      {
        path: route(RouteKey.UserPage),
        element: <UserPage route={route(RouteKey.UserPage)} />,
      },
      {
        path: route(RouteKey.DetailUserPage),
        element: <DetailUserPage />,
      },
      {
        path: route(RouteKey.NewUserPage),
        element: <DetailUserPage createMode />,
      },

      // post type
      {
        path: route(RouteKey.PostTypePage),
        element: <PostTypePage route={route(RouteKey.PostTypePage)} />,
      },
      {
        path: route(RouteKey.DetailPostTypePage),
        element: <DetailPostTypePage />,
      },
      {
        path: route(RouteKey.NewPostTypePage),
        element: <DetailPostTypePage createMode />,
      },

      // post
      {
        path: route(RouteKey.PostPage),
        element: <PostPage route={route(RouteKey.PostPage)} />,
      },
      {
        path: route(RouteKey.DetailPostPage),
        element: <DetailPostPage />,
      },
      {
        path: route(RouteKey.NewPostPage),
        element: <DetailPostPage createMode />,
      },

      // department
      {
        path: route(RouteKey.DepartmentPage),
        element: (
          <DepartmentPage
            name="phòng ban"
            route={route(RouteKey.DepartmentPage)}
          />
        ),
      },
      {
        path: route(RouteKey.DetailDepartmentPage),
        element: <DetailDepartmentPage />,
      },

      // event type
      {
        path: route(RouteKey.EventTypePage),
        element: (
          <EventTypePage
            name="loại sự kiện"
            route={route(RouteKey.EventTypePage)}
          />
        ),
      },

      // resource type
      {
        path: route(RouteKey.ResourceTypePage),
        element: (
          <ResourceTypePage
            name="loại tài nguyên"
            route={route(RouteKey.ResourceTypePage)}
          />
        ),
      },

      {
        path: route(RouteKey.ResourcePage),
        element: (
          <ResourcePage
            name="tài nguyên"
            route={route(RouteKey.ResourcePage)}
          />
        ),
      },

      {
        path: route(RouteKey.ResourceUsingPage),
        element: (
          <ResourceUsingPage
            name="mượn tài nguyên"
            route={route(RouteKey.ResourceUsingPage)}
          />
        ),
      },

      {
        path: route(RouteKey.FilePage),
        element: (
          <EventTypePage
            name="loại sự kiện"
            route={route(RouteKey.EventTypePage)}
          />
        ),
      },

      // fallback
      {
        path: route(RouteKey.Index),
        element: <Navigate to={route(RouteKey.UserPage)} />,
      },
      {
        path: route(RouteKey.All),
        element: <Navigate to={route(RouteKey.UserPage)} />,
      },
    ],
  },
]);

export default ConfigRouter;
