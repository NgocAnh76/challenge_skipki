import { twMerge } from 'tailwind-merge';

interface LoaderProps {
  className?: string;
}

export default function Loader({ className }: LoaderProps) {
  return (
    <div
      className={twMerge(
        'w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto',
        className
      )}
    />
  );
}
