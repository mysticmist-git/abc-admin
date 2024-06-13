import clsx from "clsx";
import { FC, LabelHTMLAttributes } from "react";

const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = (props) => {
  const { className, ...rest } = props;

  const defaultClassName = "font-bold";
  const labelClassName = clsx(defaultClassName, className);

  return <label {...rest} className={labelClassName} />;
};

export default Label;
