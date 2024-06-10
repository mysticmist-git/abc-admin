import clsx from "clsx";
import { forwardRef, DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import { InputCommonProps } from "./componentCommonType";
import WithLabel from "./WithLabel";

const TextArea = forwardRef<
  HTMLTextAreaElement,
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > &
    InputCommonProps
>(({ label, ...props }, ref) => {
  const className = clsx("border p-1 shadow", props.className);

  return (
    <WithLabel label={label}>
      {<textarea {...props} className={className} ref={ref} />}
    </WithLabel>
  );
});

export default TextArea;
