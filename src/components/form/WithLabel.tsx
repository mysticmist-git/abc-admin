import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

import Label from "./Label";
import { WithLabelProperty } from "./componentCommonType";

const WithLabel: FC<PropsWithChildren<WithLabelProperty>> = (props) => {
  const { label, children, horizontal = false, ...rest } = props;

  if (!label) {
    return children;
  }

  const horizontalClassName = clsx("flex gap-2 items-center");

  return (
    <Label {...rest} className={horizontal ? horizontalClassName : ""}>
      <p>{label}</p>
      {children}
    </Label>
  );
};

export default WithLabel;
