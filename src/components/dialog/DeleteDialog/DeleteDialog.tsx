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
} & DialogProps;

const DeleteDialog: FC<DeleteDialogProps> = (props) => {
  const {
    body: bodyProp,
    deleteObject,
    onClose,
    onDelete: onDeleteClick,
    open,
    title: titleProp,
  } = props;

  const { id = "deleteObjectId", text = "deleteObjectText" } = deleteObject;

  const closeDialog = () => onClose && onClose();

  const title = titleProp || `Xoá ${text}`;
  const body = bodyProp || <DeleteText text={text} id={id} />;

  return (
    <Dialog
      open={open}
      title={title}
      onClose={closeDialog}
      body={body}
      actions={defaultDialogButtons({
        deleteObjectText: text,
        onDeleteClick: onDeleteClick,
        onCloseClick: onClose,
      })}
    />
  );
};

export default DeleteDialog;
