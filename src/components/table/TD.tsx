import clsx from 'clsx';
import { FC, TdHTMLAttributes } from 'react';

import { commonCellCss } from './css';

const TD: FC<TdHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className,
  ...props
}) => {
  const css = clsx(className, commonCellCss);

  return (
    <td {...props} className={css}>
      {children}
    </td>
  );
};

export default TD;
