import { LayoutPublic } from '../components/layouts';
import { StorePage, StoreDetailsPage } from '../pages';

const publicRoutes = {
  element: <LayoutPublic />,
  children: [
    {
      path: '/',
      element: <StorePage />,
    },
    {
      path: '/:provider/:name',
      element: <StoreDetailsPage />,
    },
  ],
};

export { publicRoutes };
