// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const icon = (name) =>  <Iconify icon={name} sx={{ width: 1, height: 1 }} />;

export const navAdminConfig = [
  {
    title: 'Thông Kê',
    path: '/admin/dashboard',
    icon: icon('bxs:dashboard'),
  },
  {
    title: 'Quản Lý Người Dùng',
    path: '/admin/users',
    icon: icon('bxs:user-rectangle'),
  },
  {
    title: 'Quản Lý Nhóm (Lớp)',
    path: '/admin/groups',
    icon: icon('bxs:user-rectangle'),
  },
  {
    title: 'Quản Lý Bài Viết',
    path: '/admin/posts',
    icon: icon('majesticons:article'),
  },
  {
    title: 'Quản Lý Bình Luận',
    path: '/admin/comments',
    icon: icon('bxs:comment'),
  },
  {
    title: 'Quản Lý Lượt Thích',
    path: '/admin/likes',
    icon: icon('bxs:like'),
  },
  {
    title: 'Lịch Sử Hoạt Động',
    path: '/admin/activities',
    icon: icon('fa:history'),
  },
];

export default navAdminConfig;
