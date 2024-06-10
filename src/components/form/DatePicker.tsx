import { InputHTMLAttributes, forwardRef } from "react";
import { InputCommonProps } from "./componentCommonType";
import WithLabel from "./WithLabel";
import clsx from "clsx";

export type DatePickerProps = InputHTMLAttributes<HTMLInputElement> &
  InputCommonProps;

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (props, ref) => {
    const { label, ...rest } = props;

    const className = clsx("border p-1 shadow", rest.className);

    return (
      <WithLabel label={label}>
        <input {...rest} ref={ref} type="date" className={className} />
      </WithLabel>
    );
  },
);

export default DatePicker;
