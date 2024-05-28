import clsx from "clsx";
import { FC, HTMLAttributes } from "react";

const ErrorText: FC<HTMLAttributes<HTMLParagraphElement>> = (props) => {
  const className = clsx("italic text-sm text-danger-400", props.className);

  return <p {...props} className={className} />;
};

export default ErrorText;
