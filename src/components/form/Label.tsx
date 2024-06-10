import clsx from 'clsx';
import { FC, LabelHTMLAttributes } from 'react';

const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = (props) => {
  const defaultClassName = 'font-bold';
  const className = clsx(defaultClassName, props.className);

  return <label {...props} className={className} />;
};

export default Label;
