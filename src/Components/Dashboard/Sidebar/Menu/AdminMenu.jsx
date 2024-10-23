import { FaUserCog, FaBan, FaNewspaper } from 'react-icons/fa';
import MenuItem from './MenuItem';

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='allUsers' />
      <MenuItem icon={FaUserCog} label='Reporter Request' address='reporter-request' />
      <MenuItem icon={FaNewspaper} label='Manage News Articles' address='manage-news-articles' />
    </>
  );
};

export default AdminMenu;
