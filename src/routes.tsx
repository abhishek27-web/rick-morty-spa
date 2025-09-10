import { createBrowserRouter, type RouteObject } from 'react-router-dom';
const ROUTES = {
  HOME: '/',
  CHARACTER_DETAIL: '/character/:id',
} as const;
import App from './App';
import CharacterListPage from './pages/CharacterListPage';
import CharacterDetailPage from './pages/CharacterDetailPage';

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        index: true,
        element: <CharacterListPage />,
      },
      {
        path: ROUTES.CHARACTER_DETAIL,
        element: <CharacterDetailPage />,
      }
    ]
  }
];

export const router = createBrowserRouter(routes);
