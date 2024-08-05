import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import AppProvider from './Context/Context';
import AppLayout from './Layouts/AppLayout';
import ProductsPage from './Pages/ProductsPage';
import ProductDetails from './Pages/ProductDetails';
import SearchPage from './Pages/SearchPage';
import CategoryPage from './Pages/CategoryPage';
import BooksPage from './Pages/BooksPage';
import BookDetails from './Pages/BookDetails';
import { ViewCart } from './Pages/ViewCart';

function App() {
  const router = createBrowserRouter([
    {
      path: "/Public-Api/",
      element: <AppLayout />,
      children: [
        {
          path: "",
          element: <ProductsPage />
        },
        {
          path: "product/:id",
          element: <ProductDetails />
        },
        {
          path: "search",
          element: <SearchPage />
        },
        {
          path: "category",
          element: <CategoryPage />
        },
        {
          path: "book",
          element: <BooksPage />
        },
        {
          path: "book/:id",
          element: <BookDetails />
        },
        {
          path: "cart-view",
          element: <ViewCart />
        }
      ]
    }
  ]);

  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
