import {
  ForwardedRef,
  ReactElement,
  SelectHTMLAttributes,
  forwardRef,
} from "react";
import { InputCommonProps } from "./componentCommonType";
import WithLabel from "./WithLabel";
import clsx from "clsx";

export type SelectProps<T> = {
  optionLabelConverter?: (option: T) => string;
  options: T[];
} & SelectHTMLAttributes<HTMLSelectElement> &
  InputCommonProps;

const Select = forwardRef(
  <T,>(props: SelectProps<T>, ref: ForwardedRef<HTMLSelectElement>) => {
    const { label, options, optionLabelConverter, ...rest } = props;

    const className = clsx("border p-1 shadow", rest.className);

    const getOptionText = (option: T) =>
      optionLabelConverter ? optionLabelConverter(option) : (option as string);

    return (
      <WithLabel label={label}>
        <select {...rest} ref={ref} className={className}>
          {options.map((option, index) => (
            <option key={index} value={index}>
              {getOptionText(option)}
            </option>
          ))}
        </select>
      </WithLabel>
    );
  },
) as <T>(
  props: SelectProps<T>,
  ref: ForwardedRef<HTMLSelectElement>,
) => ReactElement;

export default Select;
