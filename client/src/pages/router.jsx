import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { publicRoutes, protectedRoutes } from './pagesData';

const Router = () => {
  const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

  return <RouterProvider router={router} />;
};

export default Router;
