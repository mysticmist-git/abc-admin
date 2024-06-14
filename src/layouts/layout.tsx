import NavigationSidebarItem from "./NavigationSideBarItem";

import { FC, PropsWithChildren } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";

type LinkComponentProps = {
  label: string;
  route: string;
  active: (route: string) => boolean;
};

const routes = [
  {
    label: "Người dùng",
    route: "/users",
  },
  {
    label: "Loại bài đăng",
    route: "/postTypes",
  },
  {
    label: "Loại sự kiện",
    route: "/eventTypes",
  },
  {
    label: "Phòng ban",
    route: "/departments",
  },
  // {
  //   label: "Yêu cầu",
  //   route: "/requests",
  // },
  {
    label: "Tài nguyên",
    route: "/resources",
  },
  {
    label: "Loại tài nguyên",
    route: "/resourceTypes",
  },
  {
    label: "Sử dụng tài nguyên",
    route: "/resourceUsings",
  },
];

const LinkComponent: FC<LinkComponentProps> = (props) => {
  const { label, route, active } = props;

  return (
    <li>
      <Link to={route}>
        <NavigationSidebarItem active={active(route)} text={label} />
      </Link>
    </li>
  );
};

const Layout: FC<PropsWithChildren> = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="grid grid-cols-12">
      <nav className="col-span-2 h-screen border-gray shadow">
        <h1 className="p-1 py-3 text-center text-3xl font-bold text-primary-500">
          ABC
        </h1>
        <ul>
          {routes.map((route) => (
            <LinkComponent key={route.route} {...route} active={isActive} />
          ))}
        </ul>
      </nav>
      <main className="col-span-10 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
