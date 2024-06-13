import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";

import { usePage } from "@/hooks";
import { isLoading } from "@/utils/ui";

import { DeleteDialog } from "@/components/dialog";
import { Button } from "@/components/form";
import { LoadingRow, TD, THead } from "@/components/table";

import Page, { PageProps } from "./Page";
import { apiUrl } from "@/utils/api";
import axios from "axios";
import { SUCCESS_STATUS_CODE } from "@/config/api/api";
import {
  postsSelector,
  postsStatusSelector,
} from "@/redux/postsSlice/postsSlice";
import { fetchPosts } from "@/redux/postsSlice/fetchPosts";

const PostPage: FC<PageProps> = (props) => {
  const status = useAppSelector(postsStatusSelector);
  const rows = useAppSelector(postsSelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { deleteState, dialog } = usePage();
  const { id: deleteId, deleteHandlerById } = deleteState;
  const { isOpen: isDialogOpen, close: closeDialog } = dialog;

  const name = "bài đăng";

  const loading = isLoading(status);

  const onRowClick = (id) => () => {
    // dispatch(postTypeDetailLoaded(row));
    // navigate(id);
  };

  const handleDeleteRow = async (id: number | string) => {
    const url = apiUrl("/Post");

    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
        },
        data: [id],
      });

      if (response.status == SUCCESS_STATUS_CODE) {
        console.log("deleted");
        return;
      }

      console.log("no ok");
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
                onClick={onRowClick(id)}
              >
                <TD>{(index + 1).toString().padStart(2, "0")}</TD>
                <TD>{id}</TD>
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
          text: "bài đăng",
        }}
        onDelete={() => deleteId && handleDeleteRow(deleteId)}
        onClose={closeDialog}
      />
    </>
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Page {...props} name={name} body={body} />;
};

export default PostPage;
