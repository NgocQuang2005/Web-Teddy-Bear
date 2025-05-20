import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import Error from './Components/Error.jsx'
import Home from './Components/Client/pages/Home.jsx'
import Login from './Components/Admin/pages/Login.jsx'
import Dashboard from './Components/Admin/pages/Dashboard.jsx'
import ClientLayout from './Components/Client/ClientLayout.jsx'
import AdminLayout from './Components/Admin/AdminLayout.jsx'
import LoginClient from './Components/Client/pages/LoginClient.jsx'
import Register from './Components/Client/pages/Register.jsx'
import User from './Components/Admin/pages/User.jsx'
import Role from './Components/Admin/pages/Role.jsx'
import Products from './Components/Admin/pages/Products.jsx'
import Category from './Components/Admin/pages/Category.jsx'
import CartItem from './Components/Admin/pages/CartItem.jsx'
import Order from './Components/Admin/pages/Order.jsx'
import Product from './Components/Client/pages/Product.jsx'
import Contact from './Components/Client/pages/Contact.jsx'
import Blindbox from './Components/Client/pages/Blindbox.jsx'
import EditPersonal from './Components/Client/pages/EditPersonal.jsx'
import Orders from './Components/Client/pages/Orders.jsx'
import CartItemClient from './Components/Client/pages/CartItem.jsx'
import ProductDetails from './Components/Client/pages/ProductDetails.jsx'
import AuthRedirect from './AuthRedirect.jsx'
const router = createBrowserRouter([
  {
    path: '/client',
    element: <ClientLayout />, // 👈 dùng layout client
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'products',
        element: <Product />
      },
      {
        path: 'blindbox',
        element: <Blindbox />
      },
      {
        path: 'editpersonal',
        element: <EditPersonal />
      },
      {
        path: 'orders',
        element: <Orders />
      },
      {
        path: 'cartitems',
        element: <CartItemClient />
      },
      {
        path: 'contact',
        element: <Contact />
      },

      {
        path: 'product/:id',
        element: <ProductDetails />
      }
      // có thể thêm các route client khác ở đây
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />, // 👈 dùng layout admin
    children: [
      {
        path: 'home',
        element: <Dashboard />
      },
      {
        path: 'users',
        element: <User />
      },
      {
        path: 'role',
        element: <Role />
      },
      {
        path: 'product',
        element: <Products />
      },
      {
        path: 'order',
        element: <Order />
      },
      {
        path: 'category',
        element: <Category />
      },
      {
        path: 'cartitem',
        element: <CartItem />
      },
    ]
  },
  {
    path: '/admin/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/admin/',
    element: <Login />
  },
  {
    path: '/login',
    element: (
      <AuthRedirect>
        <LoginClient />
      </AuthRedirect>
    )
  },
  {
    path: '/',
    element: (
      <AuthRedirect>
        <LoginClient />
      </AuthRedirect>
    )
  },
  {
    path: '*',
    element: <Error />
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
