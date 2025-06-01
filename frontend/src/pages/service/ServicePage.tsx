import { NavLink } from 'react-router-dom';
import { PATHS } from '../../components/config/paths';

const ServicePage = () => {
  return (
    <section>
      <div className="ml-10 mt-10">
        <div className="mb-14">
          <h1 className="text-xl font-bold text-primary">
            Generate post ideas and captions in seconds
          </h1>
        </div>
        <div>
          <NavLink
            to={PATHS.SERVICE.START}
            className="border rounded-md w-[430px] h-20 px-10 py-3 block mb-5 hover:bg-gray-100 "
          >
            <p className="text-base leading-6 text-secondary font-bold mb-1">Start from scratch</p>
            <p className="text-sm leading-5 text-secondary">
              Generate new captions to engage, delight, or sell
            </p>
          </NavLink>
          <NavLink
            to={PATHS.SERVICE.INSPIRED}
            className="border rounded-md w-[430px] h-20 px-10 py-3 block hover:bg-gray-100"
          >
            <p className="text-base leading-6 text-secondary font-bold mb-1">Get inspired</p>
            <p className="text-sm leading-5 text-secondary">
              Generate post ideas and captions for a topic
            </p>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default ServicePage;
