import { commonCellCss } from './css';

import clsx from 'clsx';
import { FC, ThHTMLAttributes } from 'react';

const TH: FC<ThHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className,
  ...props
}) => {
  const css = clsx(className, commonCellCss);

  return (
    <th {...props} className={css}>
      {children}
    </th>
  );
};

export default TH;
