import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { usePage } from "@/hooks";

import removeResource from "@/redux/resourcesSlice/removeResource";
import { resourceDetailCleared } from "@/redux/resourcesSlice/resourcesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";

import { Request } from "@/config/erd";
import { isLoading } from "@/utils/ui";

import { DeleteDialog } from "@/components/dialog";
import { Button } from "@/components/form";
import { LoadingRow, TD, THead } from "@/components/table";

import Page, { PageProps } from "./Page";
import {
  requestsSelector,
  requestsStatusSelector,
} from "@/redux/requestsSlice/requestsSlice";
import { fetchRequests } from "@/redux/requestsSlice/fetchRequests";

const RequestPage: FC<PageProps> = (props) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(requestsStatusSelector);
  const rows = useAppSelector(requestsSelector);

  console.log(rows);

  const navigate = useNavigate();

  const { deleteState, dialog } = usePage();
  const { id: deleteId, deleteHandlerById } = deleteState;
  const { isOpen: isDialogOpen, close: closeDialog } = dialog;

  const { name = "tài nguyên" } = props;

  const inAction = useAppSelector((state) => state.resources.inAction);

  const loading = isLoading(status);

  const onRowClick = (row: Request) => () => {
    const { id } = row;

    // dispatch(requestloaded(row));

    // navigate(id.toString());
  };

  const handleDeleteRow = async () => {
    await dispatch(removeResource(Number(deleteId))).unwrap();
    toast.success("Đã xóa");
    deleteHandlerById(undefined);
    closeDialog();
  };

  const body = (
    <>
      <table className="w-full mt-8">
        <THead
          headings={[
            "#",
            "ID",
            "Loại tài nguyên",
            "Tên",
            "Mô tả",
            "Khả dụng",
            "Tình trạng",
          ]}
        />

        <tbody>
          {loading && <LoadingRow />}
          {!loading &&
            rows?.length &&
            rows.map((row, index) => {
              console.log(row);
              const {
                id,
                name,
                description,
                requesterUid,
                reporterUid,
                requestType,
                startAt,
                endAt,
                approvalStatus,
              } = row;

              return (
                <tr
                  key={index}
                  className="border rounded cursor-pointer transition-colors hover:bg-neutral-100"
                  onClick={onRowClick(row)}
                >
                  <TD>{(index + 1).toString().padStart(2, "0")}</TD>
                  <TD>{id}</TD>
                  <TD>{name}</TD>
                  <TD>{description}</TD>
                  <TD>{requesterUid}</TD>
                  <TD>{reporterUid}</TD>
                  <TD>{requestType}</TD>
                  {/* <TD>{startAt}</TD>
                  <TD>{endAt}</TD> */}
                  <TD>{approvalStatus}</TD>
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
        onDelete={handleDeleteRow}
        deleteObject={{
          id: deleteId,
          text: "yêu cầu",
        }}
        isDeleting={inAction}
      />
    </>
  );

  const pageProps: PageProps = {
    ...props,
    name,
    body,
    onCreateNew: () => {
      dispatch(resourceDetailCleared());
    },
  };

  useEffect(() => {
    if (status === "idle")
      dispatch(
        fetchRequests({
          page: 1,
          limit: 100,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Page {...pageProps} />;
};

export default RequestPage;
