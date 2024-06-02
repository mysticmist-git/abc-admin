import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { usePage } from "@/hooks";

import {
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

const ResourcePage: FC<PageProps> = (props) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(resourcesStatusSelector);
  const rows = useAppSelector(resourcesSelector);

  const navigate = useNavigate();

  const { deleteState, dialog } = usePage();
  const { id: deleteId, deleteHandlerById } = deleteState;
  const { isOpen: isDialogOpen, close: closeDialog } = dialog;

  const { name = "tài nguyên" } = props;

  const loading = isLoading(status);

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
            "Miễn phí",
            "Tình trạng",
          ]}
        />

        <tbody>
          {loading && <LoadingRow />}
          {!loading &&
            rows.map((resource, index) => {
              const { id, resourceTypeId, name, description, isFree, status } =
                resource;

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
                  <TD>{resourceTypeId}</TD>
                  <TD>{name}</TD>
                  <TD>{description}</TD>
                  <TD>{isFree}</TD>
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
          text: "người dùng",
        }}
      />
    </>
  );

  const pageProps: PageProps = {
    ...props,
    name,
    body,
  };

  useEffect(() => {
    if (status === "idle") dispatch(fetchResources());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Page {...pageProps} />;
};

export default ResourcePage;
