import { twMerge } from 'tailwind-merge';
import Loader from '../Loader';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'white';
}

export default function Button({
  className,
  loading,
  onClick,
  size = 'md',
  color = 'primary',
  children,
  ...props
}: ButtonProps) {
  const sizeClass = {
    sm: 'px-2 py-2 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2 text-base',
  };
  const colorClass = {
    primary: 'bg-accent text-white hover:bg-blue-600',
    secondary: 'bg-secondary text-white hover:bg-blue-600',
    accent: 'bg-white text-red-500 hover:bg-red-500 border border-red-500 hover:text-white',
    white: 'bg-white text-black hover:bg-blue-600 hover:text-white',
  };
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'w-full rounded-md border',
        'text-white font-medium  shadow-md flex items-center justify-center gap-2',
        'transition-all duration-300',
        loading && 'cursor-not-allowed opacity-50',
        sizeClass[size],
        colorClass[color],
        className
      )}
      {...props}
    >
      {loading && <Loader />}
      {children}
    </button>
  );
}
