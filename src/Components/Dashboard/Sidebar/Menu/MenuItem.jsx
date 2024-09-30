import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-[#02AA08] hover:text-white ${
          isActive ? 'bg-[#02AA08] text-white' : 'text-gray-600'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

export default MenuItem;
