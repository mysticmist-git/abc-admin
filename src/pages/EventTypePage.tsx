import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchPostTypes } from "@/redux/postTypesSlice/fetchPostTypes";
import {
  postTypeDetailLoaded,
  postTypesSelector,
  postTypesStatusSelector,
} from "@/redux/postTypesSlice/postTypeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";

import { PostType } from "@/config/erd";
import { usePage } from "@/hooks";
import { getStatusTypeText } from "@/utils/text";
import { isLoading } from "@/utils/ui";

import { DeleteDialog } from "@/components/dialog";
import { Button } from "@/components/form";
import { LoadingRow, TD, THead } from "@/components/table";

import Page, { PageProps } from "./Page";
import { apiUrl } from "@/utils/api";
import axios from "axios";
import { SUCCESS_STATUS_CODE } from "@/config/api/api";
import {
  eventTypesSelector,
  eventTypesStatusSelector,
} from "@/redux/eventTypesSlice/eventTypesSlice";
import { fetchEventTypes } from "@/redux/eventTypesSlice/fetchEventTypes";

const EventTypePage: FC<PageProps> = (props) => {
  const status = useAppSelector(eventTypesStatusSelector);
  const rows = useAppSelector(eventTypesSelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { deleteState, dialog } = usePage();
  const { id: deleteId, deleteHandlerById } = deleteState;
  const { isOpen: isDialogOpen, close: closeDialog } = dialog;

  const name = "loại sự kiện";

  const loading = isLoading(status);

  const onRowClick = (id: string) => () => {
    // dispatch(postTypeDetailLoaded(row));
    // navigate(id);
  };

  const handleDeleteRow = async (id: number | string) => {
    const url = apiUrl("/EventType");

    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
        },
        data: [id],
      });

      if (response.status == SUCCESS_STATUS_CODE) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const body = (
    <>
      <table className="w-full mt-8">
        <THead headings={["#", "Id"]} />

        <tbody>
          {loading && <LoadingRow />}
          {rows.map((row, index) => {
            const { id } = row;
            return (
              <tr
                key={index}
                className="border rounded cursor-pointer transition-colors hover:bg-neutral-100"
                onClick={onRowClick(row)}
              >
                <TD>{(index + 1).toString().padStart(2, "0")}</TD>
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
        deleteObject={{
          id: deleteId,
          text: "loại sự kiện",
        }}
        onDelete={() => deleteId && handleDeleteRow(deleteId)}
        onClose={closeDialog}
      />
    </>
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEventTypes());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Page {...props} name={name} body={body} />;
};

export default EventTypePage;
