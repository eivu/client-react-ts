import FC from 'react';

export const ErrorPanel: FC = ({errorMessage}:{errorMessage: sting}) => {
  return (
    <div className="flex items-center justify-center text-2xl py-10">
      {errorMessage}
    </div>
  );
} 
