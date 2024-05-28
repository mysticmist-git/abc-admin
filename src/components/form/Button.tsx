import clsx from "clsx";
import { ButtonHTMLAttributes, FC } from "react";

export type ButtonColor = "primary" | "danger" | "neutral";

const colorMap = {
  primary: "bg-primary-500 hover:bg-primary-600 active:bg-primary-700",
  danger: "bg-danger-500 hover:bg-danger-600 active:bg-danger-700",
  neutral: "bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-700",
};

const Button: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { color?: ButtonColor }
> = ({ color = "primary", className: passedClassName, ...props }) => {
  const className = clsx(
    "rounded p-1 font-bold text-light transition-colors",
    {
      [colorMap[color]]: true,
    },
    passedClassName,
  );

  return <button {...props} className={className} />;
};

export default Button;
