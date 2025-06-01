import { AiOutlineLogout, AiOutlineProfile } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import UserIcon from '../../icons/UserIcon';
import { PATHS } from '../../config/paths';
import Button from '../../common/button/Button';
import { ACCESS_TOKEN, PHONE_NUMBER } from '../../../api/constant';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname.includes(path);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(PHONE_NUMBER);
    navigate('/');
  };
  const phoneNumber = localStorage.getItem(PHONE_NUMBER);

  return (
    <div className="p-5 flex flex-col w-full justify-between h-full">
      <div className="">
        <div className=" bg-orange-300  flex items-center mx-auto justify-center p-5 rounded-lg w-16 h-16">
          <UserIcon className="w-16 h-16" />
        </div>
        <ul className="mt-5 ">
          <li>
            <NavLink
              to={PATHS.SERVICE.ROOT}
              className={twMerge(
                'text-white flex items-center gap-2 py-3 px-5 rounded-md mb-3 transition-all duration-300',
                isActive('service') ? 'bg-blue-500' : 'bg-gray-500 hover:bg-blue-500'
              )}
            >
              <AiOutlineProfile /> Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to={PATHS.PROFILE.ROOT}
              className={twMerge(
                'text-white flex items-center gap-2 py-3 px-5 rounded-md transition-all duration-300',
                isActive('profile') ? 'bg-blue-500' : 'bg-gray-500 hover:bg-blue-500'
              )}
            >
              <AiOutlineProfile /> Profile
            </NavLink>
          </li>
        </ul>
      </div>
      <div className=" rounded-md p-5 text-white flex flex-col items-center justify-center">
        <p className="flex items-end gap-5 mb-5 ">
          <RxAvatar className="text-4xl" /> <span className="text-lg underline">{phoneNumber}</span>
        </p>
        <Button color="white" className="w-auto" onClick={handleLogout}>
          <AiOutlineLogout /> Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
