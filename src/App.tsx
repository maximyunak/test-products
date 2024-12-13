import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";

import { Product } from "./pages/Product";
import { CreateProduct } from "./pages/CreateProduct";
import { Products } from "./pages/Products";

const App: FC = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/create-product" element={<CreateProduct />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
