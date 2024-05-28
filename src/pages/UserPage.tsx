import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { DeleteDialog } from "@/components/dialog";
import { Button } from "@/components/form";
import { TD, THead } from "@/components/table";
import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";
import Page, { PageProps } from "./Page";
import { usePage } from "@/hooks";
import { fetchUsers, userListSelector } from "@/redux/usersSlice";

const UserPage: FC<PageProps> = (props) => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(userListSelector);
  const status = useAppSelector((state) => state.users.status);

  const navigate = useNavigate();

  const { deleteState, dialog } = usePage();
  const { id: deleteId, deleteHandlerById } = deleteState;
  const { isOpen: isDialogOpen, close: closeDialog } = dialog;

  const { name = "người dùng" } = props;

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
          {users.map((user, index) => {
            const { uid, username, email, birthday, grade, departmentId } =
              user;
            return (
              <tr
                key={index}
                className="border rounded cursor-pointer transition-colors hover:bg-neutral-100"
                onClick={() => {
                  navigate(`${user.uid}`);
                }}
              >
                <TD>{(index + 1).toString().padStart(2, "0")}</TD>
                <TD>{uid}</TD>
                <TD>{username}</TD>
                <TD>{email}</TD>
                <TD>{dayjs(birthday).format("YYYY-MM-DD")}</TD>
                <TD>{grade}</TD>
                <TD>{departmentId}</TD>
                <TD>
                  <div className="flex items-center justify-center">
                    <Button color="danger" onClick={deleteHandlerById(uid)}>
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
    dispatch(fetchUsers());
  }, []);

  console.log("status", status);

  return <Page {...pageProps} />;
};

export default UserPage;
