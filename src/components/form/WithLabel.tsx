import { FC, PropsWithChildren } from 'react';
import Label from './Label';
import { WithLabelProperty } from './componentCommonType';

const WithLabel: FC<PropsWithChildren<WithLabelProperty>> = ({
  label,
  children,
}) => {
  if (!label) {
    return children;
  }

  return (
    <Label>
      <p>{label}</p>
      {children}
    </Label>
  );
};

export default WithLabel;
