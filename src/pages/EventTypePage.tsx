import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  eventTypeListSelector,
  eventTypesStatusSelector,
} from "@/redux/eventTypesSlice/eventTypesSlice";
import { fetchEventTypes } from "@/redux/eventTypesSlice/fetchEventTypes";
import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";

import { usePage } from "@/hooks";

import { DeleteDialog } from "@/components/dialog";
import { Button } from "@/components/form";
import { LoadingRow, TD, THead } from "@/components/table";

import Page, { PageProps } from "./Page";
import { getStatusTypeText } from "@/utils/text";
import { isLoading } from "@/utils/ui";

const EventTypePage: FC<PageProps> = (props) => {
  const status = useAppSelector(eventTypesStatusSelector);
  const rows = useAppSelector(eventTypeListSelector);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { deleteState, dialog } = usePage();
  const { id: deleteId, deleteHandlerById } = deleteState;
  const { isOpen: isDialogOpen, close: closeDialog } = dialog;

  const loading = isLoading(status);

  const body = (
    <>
      <table className="w-full mt-8">
        <THead headings={["#", "Id", "Tên loại", "Mô tả", "Trạng thái"]} />

        <tbody>
          {loading && <LoadingRow />}
          {rows.map((eventType, index) => {
            const { id, name, description, status } = eventType;
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
                <TD>{getStatusTypeText(status)}</TD>
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

  useEffect(() => {
    if (status === "idle") dispatch(fetchEventTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Page {...props} body={body} />;
};

export default EventTypePage;
