import { FC } from 'react';
import UserIcon from '../../components/icons/UserIcon';
import InputField from '../../components/common/input/InputField';
import Button from '../../components/common/button/Button';

const AuthFrom: FC<{
  label: string;
  placeholder: string;
  buttonLabel: string;
  value: string;
  onChange: (value: string) => void;
  onClick?: () => void;
  isLoading?: boolean;
}> = ({ label, placeholder, buttonLabel, value, onChange, onClick, isLoading }) => {
  return (
    <section>
      <div>
        <div className=" mt-10 max-w-md mx-auto flex items-center gap-10 justify-center flex-col border rounded-lg px-10 py-20 shadow-lg">
          <div className=" bg-blueGray-200  flex items-center justify-center p-5 rounded-full">
            <UserIcon className="w-16 h-16" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-bold text-primary mt-5">Welcome to Skipli AI</h1>
            <p className="text-base text-secondary text-center mt-3 max-w-md leading-6">{label}</p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <InputField
              placeholder={placeholder}
              value={value}
              onChange={e => onChange(e.target.value)}
            />
            <Button type="button" onClick={onClick} disabled={isLoading} loading={isLoading}>
              {buttonLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthFrom;
