import dayjs from "dayjs";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { usePage } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";
import { fetchUsers } from "@/redux/usersSlice/fetchUsers";
import { userListSelector } from "@/redux/usersSlice/usersSlice";
import { isLoading } from "@/utils/ui";

import { DeleteDialog } from "@/components/dialog";
import { Button } from "@/components/form";
import { LoadingRow, TD, THead } from "@/components/table";

import Page, { PageProps } from "./Page";

const UserPage: FC<PageProps> = (props) => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(userListSelector);
  const status = useAppSelector((state) => state.users.status);

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
            users.map((user, index) => {
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
    if (status === "idle") dispatch(fetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Page {...pageProps} />;
};

export default UserPage;
