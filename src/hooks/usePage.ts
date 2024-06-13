import { useState, MouseEvent } from "react";
import useOpen from "./useOpen";

const usePage = () => {
  const [isDialogOpen, openDialog, closeDialog] = useOpen();
  const [deleteId, setDeleteId] = useState<number | string | undefined>(
    undefined
  );

  const handleDeleteId =
    (id?: number | string | undefined) =>
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      setDeleteId(id);
      openDialog();
    };

  return {
    deleteState: {
      id: deleteId,
      setId: setDeleteId,
      deleteHandlerById: handleDeleteId,
    },
    dialog: {
      isOpen: isDialogOpen,
      open: openDialog,
      close: closeDialog,
    },
  };
};

export default usePage;
