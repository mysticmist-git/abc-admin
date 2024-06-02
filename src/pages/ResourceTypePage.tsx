import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { usePage } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";
import { isLoading } from "@/utils/ui";

import { DeleteDialog } from "@/components/dialog";
import { Button } from "@/components/form";
import { LoadingRow, TD, THead } from "@/components/table";

import { fetchResourceTypes } from "@/redux/resourceTypesSlice/fetchResourceTypes";
import {
  resourceTypesSelector,
  resourceTypesStatusSelector,
} from "@/redux/resourceTypesSlice/resourceTypesSlice";
import { getStatusTypeText } from "@/utils/text";
import Page, { PageProps } from "./Page";

const ResourceTypePage: FC<PageProps> = (props) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(resourceTypesStatusSelector);
  const rows = useAppSelector(resourceTypesSelector);

  const navigate = useNavigate();

  const { deleteState, dialog } = usePage();
  const { id: deleteId, deleteHandlerById } = deleteState;
  const { isOpen: isDialogOpen, close: closeDialog } = dialog;

  const { name = "người dùng" } = props;

  const loading = isLoading(status);

  const body = (
    <>
      <table className="w-full mt-8">
        <THead
          headings={[
            "#",
            "UID",
            "Tên tài khoản",
            "Email",
            "Ngày sinh",
            "Chức vụ",
            "Phần ban",
          ]}
        />

        <tbody>
          {loading && <LoadingRow />}
          {!loading &&
            rows.map((resourceType, index) => {
              const { id, name, description, status } = resourceType;

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
    if (status === "idle") dispatch(fetchResourceTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Page {...pageProps} />;
};

export default ResourceTypePage;
