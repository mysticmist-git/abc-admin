import dayjs from "dayjs";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { usePage } from "@/hooks";
import { fetchDepartments } from "@/redux/departmentsSlice/fetchDepartments";
import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";
import { fetchUsers } from "@/redux/usersSlice/fetchUsers";
import { usersSelector } from "@/redux/usersSlice/usersSlice";

import { getGradeText } from "@/utils/text";
import { isLoading } from "@/utils/ui";

import { DeleteDialog } from "@/components/dialog";
import { Button } from "@/components/form";
import { LoadingRow, TD, THead } from "@/components/table";

import Page, { PageProps } from "./Page";

const UserPage: FC<PageProps> = (props) => {
  const dispatch = useAppDispatch();

  const usersStatus = useAppSelector((state) => state.users.status);
  const departmentsStatus = useAppSelector((state) => state.departments.status);

  const users = useAppSelector(usersSelector);
  const departments = useAppSelector((state) => state.departments.list);

  const navigate = useNavigate();

  const { deleteState, dialog } = usePage();
  const { id: deleteId, deleteHandlerById } = deleteState;
  const { isOpen: isDialogOpen, close: closeDialog } = dialog;

  const { name = "người dùng" } = props;

  const loading = isLoading(usersStatus);

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
            "Phòng ban",
          ]}
        />

        <tbody>
          {loading && <LoadingRow />}
          {!loading &&
            users.map((user, index) => {
              const { uid, username, email, birthday, grade, departmentId } =
                user;

              const gradeName = getGradeText(grade);
              const departmentName = departments.find(
                (department) => departmentId === department.id
              )?.name;

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
                  <TD>{gradeName}</TD>
                  <TD>{departmentName}</TD>
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
    if (usersStatus === "idle") dispatch(fetchUsers());
    if (departmentsStatus === "idle") dispatch(fetchDepartments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Page {...pageProps} />;
};

export default UserPage;
