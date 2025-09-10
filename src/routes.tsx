import { createBrowserRouter } from 'react-router-dom';
import CharacterListPage from './pages/CharacterListPage';
import CharacterDetailPage from './pages/CharacterDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CharacterListPage />,
  },
  {
    path: '/character/:id',
    element: <CharacterDetailPage />,
  },
]);
