import { Outlet } from 'react-router-dom';

const ProfileLayout = () => {
  return (
    <section className="h-full w-full flex flex-col">
      <div className="w-full  border-b border-blueGray-200">
        <h1 className="text-3xl text-black font-semibold pl-10 py-5">Profile</h1>
      </div>
      <div className="h-full">
        <Outlet />
      </div>
    </section>
  );
};

export default ProfileLayout;
