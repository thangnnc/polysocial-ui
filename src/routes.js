import { Navigate, useRoutes } from "react-router-dom";
import AdminLayout from "./layouts/admin/AdminLayout";
import UserLayout from "./layouts/user/UserLayout";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ManagementContent from "./pages/AdminManagementContent/ManagementContent";
import ManagementGroup from "./pages/AdminManagementGroup/ManagementGroup";
import ManagementGroupDetail from "./pages/AdminManagementGroupDetail/ManagementGroupDetail";
import ManagementUser from "./pages/AdminManagementUser/ManagementUser";
import Page404 from "./pages/ErrorPage/Page404";
import HomePage from "./pages/HomePage/HomePage";
// layouts
import LoginPage from "./pages/LoginPage/LoginPage";
import MessagePage from "./pages/MessagePage/MessagePage";
import GroupPage from "./pages/GroupPage/GroupPage";
import useLogin from "./utils/Login/useLogin";
import GroupDetailPage from "./pages/GroupDetailPage/GroupDetailPage";
import GroupMemberPage from "./pages/GroupMemberPage/GroupMemberPage";
import GroupLayout from "./layouts/user/GroupLayout";
import GroupExercisePage from "./pages/GroupExercisePage/GroupExercisePage";
import GroupFeedbackPage from "./pages/GroupFeedbackPage/GroupFeedbackPage";
import GroupExerciseDetailPage from "./pages/GroupExerciseDetailPage/GroupExerciseDetailPage";
import AddFriendPage from "./pages/AddFriendPage/AddFriendPage";
import GroupAddMemberPage from "./pages/GroupAddMemberPage/GroupAddMemberPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

// ----------------------------------------------------------------------

export default function Router(props) {
  // console.log("router->",props)
  const { account } = useLogin();

  const routes = useRoutes([
    {
      path: "/",
      element: !account ? <Navigate to="/login" /> : <Navigate to="/home" />,
    },
    {
      path: "/login",
      element: !account ? <LoginPage /> : <Navigate to="/home" />,
    },
    {
      path: "/",
      element: !account ? (
        <Navigate to="/login" />
      ) : (
        <UserLayout socket={props} />
      ),
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: "home", element: <HomePage /> },
        {
          path: "message/room/:roomId",
          element: <MessagePage socket={props} />,
        },
        { path: "my-profile/:userId", element: <ProfilePage socket={props} /> },
        { path: "friends-requests", element: <AddFriendPage socket={props} /> },
      ],
    },
    {
      path: "/groups",
      element: !account ? <Navigate to="/login" /> : <GroupPage />,
    },
    {
      path: "/",
      element: !account ? <Navigate to="/login" /> : <GroupLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: "/groups/detail/:groupId", element: <GroupDetailPage /> },
        {
          path: "/groups/detail/add-members/:groupId",
          element:
            account?.role !== "Sinh viên" ? (
              <GroupAddMemberPage />
            ) : (
              <Navigate to="/home" />
            ),
        },
        {
          path: "/groups/detail/members/:groupId",
          element: <GroupMemberPage />,
        },
        {
          path: "/groups/detail/feedback/:groupId",
          element: <GroupFeedbackPage />,
        },
        {
          path: "/groups/detail/exercise/:groupId",
          element: <GroupExercisePage />,
        },
        {
          path: "/groups/detail/exercise/detail/:groupId/:exerciseId",
          element: <GroupExerciseDetailPage />,
        },
        {
          path: "/groups/detail/leave/:groupId",
          element: <h1>Rời nhóm </h1>,
        },
      ],
    },
    {
      path: "/admin",
      element: !account ? (
        <Navigate to="/login" />
      ) : account.role !== "Đào tạo" ? (
        <Navigate to="/home" />
      ) : (
        <AdminLayout />
      ),
      children: [
        { element: <Navigate to="/admin/dashboard" />, index: true },
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "users", element: <ManagementUser /> },
        { path: "groups", element: <ManagementGroup socket={props} /> },
        { path: "groups/detail/:groupId", element: <ManagementGroupDetail /> },
        { path: "posts", element: <ManagementContent /> },
        { path: "comments", element: <h2>Quản lý bình luận</h2> },
        { path: "likes", element: <h2>Quản lý lượt yêu thích</h2> },
        { path: "activities", element: <h2>Quản lý lịch sử hoạt động</h2> },
      ],
    },
    {
      path: "/404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
