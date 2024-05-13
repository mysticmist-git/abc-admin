import { NavigationSidebarItem } from './NavigationSideBarItem';

import { FC, PropsWithChildren } from 'react';
import { useLocation, Link } from 'react-router-dom';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="grid grid-cols-12">
      <nav className="col-span-2 h-screen border-gray shadow">
        <ul>
          <li>
            <Link to={'/users'}>
              <NavigationSidebarItem
                active={location.pathname === '/users'}
                text="Users"
              />
            </Link>
          </li>
          <li>
            <Link to="/posts">
              <NavigationSidebarItem
                active={location.pathname === '/posts'}
                text="Posts"
              />
            </Link>
          </li>
        </ul>
      </nav>
      <main className="col-span-10 p-8">{children}</main>
    </div>
  );
};
