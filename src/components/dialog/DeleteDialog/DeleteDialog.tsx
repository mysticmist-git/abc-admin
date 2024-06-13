import { FC } from "react";

import { Dialog, defaultDialogButtons } from "@/components/dialog";
import { DialogProps } from "../Dialog";
import DeleteText from "./DeleteText";

export type DeleteObject = {
  id?: number | string;
  text?: string;
};

export type DeleteDialogProps = {
  deleteObject: DeleteObject;
  onDelete?: () => void;
  isDeleting?: boolean;
} & DialogProps;

const DeleteDialog: FC<DeleteDialogProps> = (props) => {
  const {
    body: bodyProp,
    deleteObject,
    onClose,
    onDelete: onDeleteClick,
    title: titleProp,
    isDeleting = false,
    ...rest
  } = props;

  const { id = "deleteObjectId", text = "deleteObjectText" } = deleteObject;

  const closeDialog = () => onClose && onClose();

  const title = titleProp || `Xoá ${text}`;
  const body = bodyProp || <DeleteText text={text} id={id} />;

  return (
    <Dialog
      {...rest}
      title={title}
      onClose={closeDialog}
      body={body}
      actions={defaultDialogButtons({
        deleteObjectText: isDeleting ? "..." : text,
        onDeleteClick: onDeleteClick,
        onCloseClick: onClose,
        disabled: isDeleting,
      })}
    />
  );
};

export default DeleteDialog;
