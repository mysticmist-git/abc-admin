import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { usePage } from "@/hooks";

import {
  resourceDeleted,
  resourceLoaded,
  resourcesSelector,
  resourcesStatusSelector,
} from "@/redux/resourcesSlice/resourcesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";

import { getStatusTypeText } from "@/utils/text";
import { isLoading } from "@/utils/ui";

import { DeleteDialog } from "@/components/dialog";
import { Button } from "@/components/form";
import { LoadingRow, TD, THead } from "@/components/table";

import { fetchResources } from "@/redux/resourcesSlice/fetchResources";
import Page, { PageProps } from "./Page";
import { Resource } from "@/config/erd";
import { apiUrl } from "@/utils/api";
import axios from "axios";
import { toast } from "react-toastify";
import removeResource from "@/redux/resourcesSlice/removeResource";

const ResourcePage: FC<PageProps> = (props) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(resourcesStatusSelector);
  const rows = useAppSelector(resourcesSelector);

  const navigate = useNavigate();

  const { deleteState, dialog } = usePage();
  const { id: deleteId, deleteHandlerById } = deleteState;
  const { isOpen: isDialogOpen, close: closeDialog } = dialog;

  const { name = "tài nguyên" } = props;

  const inAction = useAppSelector((state) => state.resources.inAction);

  const loading = isLoading(status);

  const onRowClick = (row: Resource) => () => {
    const { id } = row;

    dispatch(resourceLoaded(row));

    navigate(id.toString());
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
            rows.map((row, index) => {
              const { id, resourceTypeId, name, description, isFree, status } =
                row;

              console.log(isFree);

              return (
                <tr
                  key={index}
                  className="border rounded cursor-pointer transition-colors hover:bg-neutral-100"
                  onClick={onRowClick(row)}
                >
                  <TD>{(index + 1).toString().padStart(2, "0")}</TD>
                  <TD>{id}</TD>
                  <TD>{resourceTypeId}</TD>
                  <TD>{name}</TD>
                  <TD>{description}</TD>
                  <TD>{isFree ? "Có" : "Không"}</TD>
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
        onDelete={handleDeleteRow}
        deleteObject={{
          id: deleteId,
          text: "tài nguyên",
        }}
        isDeleting={inAction}
      />
    </>
  );

  const pageProps: PageProps = {
    ...props,
    name,
    body,
  };

  useEffect(() => {
    if (status === "idle")
      dispatch(
        fetchResources({
          page: 1,
          limit: 100,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Page {...pageProps} />;
};

export default ResourcePage;
