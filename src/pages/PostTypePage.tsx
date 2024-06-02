import { useNavigate } from "react-router-dom";
import { FC, useEffect } from "react";

import { DeleteDialog } from "@/components/dialog";
import { Button } from "@/components/form";
import { LoadingRow, TD, THead } from "@/components/table";
import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";
import Page, { PageProps } from "./Page";
import { usePage } from "@/hooks";
import {
  postTypesSelector,
  postTypesStatusSelector,
} from "@/redux/postTypesSlice/postTypeSlice";
import { fetchPostTypes } from "@/redux/postTypesSlice/fetchPostTypes";
import { isLoading } from "@/utils/ui";

const PostTypePage: FC<PageProps> = (props) => {
  const status = useAppSelector(postTypesStatusSelector);
  const rows = useAppSelector(postTypesSelector);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { deleteState, dialog } = usePage();
  const { id: deleteId, deleteHandlerById } = deleteState;
  const { isOpen: isDialogOpen, close: closeDialog } = dialog;

  const name = "loại bài đăng";

  const loading = isLoading(status);

  const body = (
    <>
      <table className="w-full mt-8">
        <THead headings={["#", "Id", "Tên loại", "Mô tả", "Trạng thái"]} />

        <tbody>
          {loading && <LoadingRow />}
          {rows.map((postType, index) => {
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
        deleteObject={{
          id: deleteId,
          text: "loại bài đăng",
        }}
        onDelete={() => {}}
        onClose={closeDialog}
      />
    </>
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPostTypes());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Page {...props} name={name} body={body} />;
};

export default PostTypePage;
