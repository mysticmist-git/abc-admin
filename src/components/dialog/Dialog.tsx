import { DialogHTMLAttributes, FC } from "react";

export type DialogProps = Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  "onClose"
> & {
  title?: string;
  body?: JSX.Element;
  actions?: JSX.Element[];
  onClose?: () => void;
};

const Dialog: FC<DialogProps> = (props) => {
  const { title, body, actions, onClose, open, ...rest } = props;

  const closeDialog = () => onClose && onClose();

  return (
    <>
      {open && (
        <div
          onClick={closeDialog}
          className="absolute inset-0 bg-dark/30"
        ></div>
      )}
      <dialog
        {...rest}
        open={open}
        className="absolute top-1/2 -translate-y-1/2 min-w-[25%] border rounded border-neutral-400"
      >
        <div className="flex justify-between items-center border-b p-2">
          <p className="font-bold">{title}</p>
          <button
            className="relative w-6 aspect-square rounded-full p-1 text-xl text-light bg-danger-500 transition-colors hover:bg-danger-600 active:bg-danger-700"
            onClick={closeDialog}
          >
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              &times;
            </p>
          </button>
        </div>
        <div className="p-2">{body}</div>
        <div className="flex items-center justify-end border-t p-2">
          <div className="flex gap-1">{actions}</div>
        </div>
      </dialog>
    </>
  );
};

export default Dialog;
