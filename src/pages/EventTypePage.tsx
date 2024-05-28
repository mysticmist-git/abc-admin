import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/redux/storeUtils";
import { eventTypeListSelector } from "@/redux/eventTypesSlice";

import { usePage } from "@/hooks";

import { DeleteDialog } from "@/components/dialog";
import { Button } from "@/components/form";
import { TD, THead } from "@/components/table";
import Page, { PageProps } from "./Page";

const EventTypePage: FC<PageProps> = (props) => {
  const eventTypes = useAppSelector(eventTypeListSelector);

  const navigate = useNavigate();

  const { deleteState, dialog } = usePage();
  const { id: deleteId, deleteHandlerById } = deleteState;
  const { isOpen: isDialogOpen, close: closeDialog } = dialog;

  const PageBody = (
    <>
      <table className="w-full mt-8">
        <THead headings={["#", "Id", "Tên loại", "Mô tả", "Trạng thái"]} />

        <tbody>
          {eventTypes.map((postType, index) => {
            const { id, name, description, status } = postType;
            return (
              <tr
                key={index}
                className="border rounded cursor-pointer transition-colors hover:bg-neutral-100"
                onClick={() => {
                  navigate(`${id}`);
                }}
              >
                <TD>{(index + 1).toString().padStart(2, "0")}</TD>
                <TD>{id}</TD>
                <TD>{name}</TD>
                <TD>{description}</TD>
                <TD>{status}</TD>
                <TD>
                  <div className="flex items-center justify-center">
                    <Button color="danger" onClick={deleteHandlerById(id)}>
                      Xoá
                    </Button>
                  </div>
                </TD>
              </tr>
            );
          })}
        </tbody>
      </table>

      <DeleteDialog
        open={isDialogOpen}
        onClose={closeDialog}
        onDelete={() => {}}
        deleteObject={{
          id: deleteId,
          text: "loại sự kiện",
        }}
      />
    </>
  );

  return <Page {...props} body={PageBody} />;
};

export default EventTypePage;
