import { Navigate, useRoutes } from 'react-router-dom';
import AdminLayout from './layouts/admin/AdminLayout';
import UserLayout from './layouts/user/UserLayout';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ManagementUser from './pages/AdminManagementUser/ManagementUser';
import Page404 from './pages/ErrorPage/Page404';
// layouts
import LoginPage from './pages/LoginPage/LoginPage';
import useLogin from './utils/Login/useLogin';

// ----------------------------------------------------------------------

export default function Router() {
  const {account} = useLogin();

  const routes = useRoutes([
    {
      path: '/',
      element: !account ? <Navigate to="/login" /> : <Navigate to="/home" />,
    },
    {
      path: '/login',
      element: !account ? <LoginPage /> : <Navigate to="/home" />,
    },
    {
      path: '/',
      element: !account ? <Navigate to="/login" /> : <UserLayout /> ,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: 'home', element: <h2>Home</h2>},
      ],
    },
    {
      path: '/admin',
      element: !account ? <Navigate to="/login" /> : <AdminLayout />,
      children: [
        { element: <Navigate to="/admin/dashboard" />, index: true },
        { path: 'dashboard', element: <AdminDashboard /> },
        { path: 'users', element: <ManagementUser /> },
        { path: 'groups', element: <h2>Quản lý nhóm (lớp)</h2> },
        { path: 'posts', element: <h2>Quản lý bài viết</h2> },
        { path: 'comments', element: <h2>Quản lý bình luận</h2> },
        { path: 'likes', element: <h2>Quản lý lượt yêu thích</h2> },
        { path: 'activities', element: <h2>Quản lý lịch sử hoạt động</h2> },
      ],
    },
    {
      path: '/404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
