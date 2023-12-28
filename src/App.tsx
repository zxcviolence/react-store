import React, { Suspense } from 'react';
import classes from './MainStyles/MainStyles.module.scss';
import Home from './pages/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';

const ProductId = React.lazy(
  () => import(/* webpackChunkName: "ProductId" */ './pages/ProductId/ProductId'),
);
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart/Cart'));
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound/NotFound'),
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path={'product/:id'}
            element={
              <Suspense fallback={<div className={classes.lazyPreview} />}>
                <ProductId />
              </Suspense>
            }
          />
          <Route
            path={'/cart'}
            element={
              <Suspense fallback={<div className={classes.lazyPreview} />}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div className={classes.lazyPreview} />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
