import { twMerge } from 'tailwind-merge';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  sizes?: 'sm' | 'md' | 'lg';
}

const InputField = ({
  placeholder,
  className,
  value,
  onChange,
  sizes = 'md',
  ...props
}: InputFieldProps) => {
  const sizeClass = {
    sm: 'px-2 py-2 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2 text-base',
  };
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={twMerge(
        'w-full rounded-md border border-secondary/30 shadow-sm',
        'outline-none focus:border-blue-500 hover:border-blue-500 disabled:border-gray-300',
        sizeClass[sizes],
        className
      )}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default InputField;
