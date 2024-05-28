import { useNavigate } from "react-router-dom";
import { FC } from "react";

import { departmentsSelector } from "@/redux/departmentsSlice";

import { DeleteDialog } from "@/components/dialog";
import { Button } from "@/components/form";
import { TD, THead } from "@/components/table";
import { useAppSelector } from "@/redux/storeUtils";
import Page, { PageProps } from "./Page";
import { usePage } from "@/hooks";

const DepartmentPage: FC<PageProps> = (props) => {
  const navigate = useNavigate();
  const departments = useAppSelector(departmentsSelector);

  const { deleteState, dialog } = usePage();
  const { id: deleteId, deleteHandlerById } = deleteState;
  const { isOpen: isDialogOpen, close: closeDialog } = dialog;

  const PageBody = (
    <>
      <table className="w-full mt-8">
        <THead headings={["#", "ID", "Giám đốc", "Tên", "Trạng thái"]} />

        <tbody>
          {departments.map((department, index) => {
            const { id, directorUid, name, status } = department;
            return (
              <tr
                key={index}
                className="border rounded cursor-pointer transition-colors hover:bg-neutral-100"
                onClick={() => {
                  navigate(`${department.id}`);
                }}
              >
                <TD>{(index + 1).toString().padStart(2, "0")}</TD>
                <TD>{id}</TD>
                <TD>{name}</TD>
                <TD>{directorUid}</TD>
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
          id: deleteId,
          text: "phòng ban",
        }}
      />
    </>
  );

  return <Page {...props} body={PageBody} />;
};

export default DepartmentPage;
