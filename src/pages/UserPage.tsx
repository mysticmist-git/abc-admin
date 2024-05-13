import clsx from 'clsx';
import { FC, TdHTMLAttributes, ThHTMLAttributes } from 'react';

const commonCellCss = clsx('border p-1');

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

const UserPage: FC = () => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border rounded">
          <TH>#</TH>
          <TH>UID</TH>
          <TH>Username</TH>
          <TH>Email</TH>
          <TH>Grade</TH>
          <TH>Department</TH>
          <TH>Actions</TH>
        </tr>
      </thead>
      <tbody>
        <tr className="border rounded">
          <TD>01</TD>
          <TD>00256789-4ec636</TD>
          <TD>Jorge_Keebler</TD>
          <TD>Nathanial56@gmail.com</TD>
          <TD>Manager</TD>
          <TD>IT</TD>
        </tr>
        <tr className="border rounded">
          <TD>02</TD>
          <TD>00256789-4ec636</TD>
          <TD>Jorge_Keebler</TD>
          <TD>Nathanial56@gmail.com</TD>
          <TD>Manager</TD>
          <TD>IT</TD>
          <TD>
            <div>
              <button className="rounded p-1 font-bold text-neutral-100 bg-primary-500">
                Delete
              </button>
            </div>
          </TD>
        </tr>
      </tbody>
    </table>
  );
};

export default UserPage;
