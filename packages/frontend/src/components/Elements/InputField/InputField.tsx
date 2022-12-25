import React from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  className,
  type = "text",
  ...props
}) => {
  return (
    <div className={className}>
      <label className="text-slate-500 pb-1">New Todo</label>
      <input
        type={type}
        className="shadow border rounded w-full py-2 px-3 mr-4 text-gray-600 focus:outline-none"
        {...props}
      />
    </div>
  );
};
