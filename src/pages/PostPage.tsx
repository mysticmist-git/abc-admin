import { useNavigate } from "react-router-dom";
import { FC } from "react";
import dayjs from "dayjs";

import { DeleteDialog } from "@/components/dialog";
import { Button } from "@/components/form";
import { TD, THead } from "@/components/table";
import { useAppSelector } from "@/redux/storeUtils";
import Page, { PageProps } from "./Page";
import { postListSelector } from "@/redux/postsSlice";
import { usePage } from "@/hooks";

const PostPage: FC<PageProps> = (props) => {
  const posts = useAppSelector(postListSelector);

  const { deleteState, dialog } = usePage();
  const { id: deleteId, deleteHandlerById } = deleteState;
  const { isOpen: isDialogOpen, close: closeDialog } = dialog;

  const navigate = useNavigate();

  const name = "bài đăng";

  const PageBody = (
    <>
      <table className="w-full mt-8">
        <THead
          headings={[
            "#",
            "Id",
            "Loại bài đăng",
            "Tiêu đề",
            "Lượt thích",
            "Lượt bình luận",
            "Sự kiện",
            "Đăng lúc",
            "Cập nhật",
            "Trạng thái",
          ]}
        />

        <tbody>
          {posts.map((post, index) => {
            const {
              id,
              postTypeId,
              title,
              likes,
              comments,
              eventId,
              createdAt,
              updatedAt,
              status,
            } = post;
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
                <TD>{postTypeId}</TD>
                <TD>{title}</TD>
                <TD>{likes}</TD>
                <TD>{comments}</TD>
                <TD>{eventId}</TD>
                <TD>{dayjs(createdAt).format("HH:mm DD/MM/YYYY")}</TD>
                <TD>{dayjs(updatedAt).format("HH:mm DD/MM/YYYY")}</TD>
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
          id: deleteId?.toString(),
          text: "người dùng",
        }}
      />
    </>
  );

  return <Page {...props} name={name} body={PageBody} />;
};

export default PostPage;
