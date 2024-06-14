import clsx from "clsx";
import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from "react";
import { InputCommonProps } from "./componentCommonType";
import WithLabel from "./WithLabel";

const TextField = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    InputCommonProps
>(({ label, ...props }, ref) => {
  const defaultClassName = "w-full px-2 border py-1 shadow";
  const className = clsx(defaultClassName, props.className);

  return (
    <WithLabel label={label}>
      <input type="text" ref={ref} {...props} className={className} />
    </WithLabel>
  );
});

export default TextField;
