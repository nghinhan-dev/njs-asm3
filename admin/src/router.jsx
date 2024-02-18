import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";

// HOTEL related routes
import Product from "./Product/Components/Product";
import AddProduct from "./Product/Components/AddProduct";
import EditProduct from "./Product/Components/EditProduct";
import {
  getSinglePrd,
  getProducts,
  addPrd,
  updateProduct,
  // delHotel,
} from "./Product/util";

import { login } from "./Login/util";

// Dashboard
import Dashboard from "./Dashboard/Dashboard";

// Transaction
import Transaction from "./Transaction/Transaction";
import { getTrans } from "./Transaction/util";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    action: login,
    children: [
      //index
      {
        index: true,
        element: <Dashboard />,
        // loader: getTrans,
      },

      // hotel paths
      {
        path: "product",
        children: [
          {
            path: "",
            element: <Product />,
            loader: getProducts,
          },
          // {
          //   path: ":hotelId/delete",
          //   action: delHotel,
          // },
          {
            path: ":prdId",
            element: <EditProduct />,
            loader: getSinglePrd,
            action: updateProduct,
          },
          {
            path: "add",
            element: <AddProduct />,
            action: addPrd,
          },
        ],
      },

      // Transactions related paths
      // {
      //   path: "transactions",
      //   children: [
      //     {
      //       path: "",
      //       element: <Transaction />,
      //       loader: getTrans,
      //     },
      //   ],
      // },
    ],
  },
]);

export default router;
