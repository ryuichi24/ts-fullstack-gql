import React, { ReactNode } from "react";
import MoonLoader from "react-spinners/MoonLoader";

const variants = {
  primary: "bg-blue-600 text-white",
  danger: "bg-red-600 text-white",
};

const sizes = {
  sm: "py-2 px-4 text-sm",
  md: "py-2 px-6 text-md",
  lg: "py-3 px-8 text-lg",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  className?: string;
  children: ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${className} ${variants[variant]} ${sizes[size]} border border-gray-300 rounded-md hover:opacity-80`}
    >
      {isLoading ? (
        <div className="flex justify-center items-center">
          <MoonLoader size={15.5} color="white" />
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};
