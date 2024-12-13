import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';

import { Product } from './pages/Product';
import { CreateProduct } from './pages/CreateProduct';
import { Products } from './pages/Products';

export const routes = [
  { path: '/products', element: <Products /> },
  { path: '/products/:id', element: <Product /> },
  { path: '/create-product', element: <CreateProduct /> },
];

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
