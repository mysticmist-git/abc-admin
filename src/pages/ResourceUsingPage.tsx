import dayjs from "dayjs";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { usePage } from "@/hooks";

import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";

import { getStatusTypeText, getUserNameByUidFrom } from "@/utils/text";
import { isLoading } from "@/utils/ui";

import { fetchResourceUsings } from "@/redux/resourceUsingsSlice/fetchResourceUsings";
import {
  resourceUsingsSelector,
  resourceUsingsStatusSelector,
} from "@/redux/resourceUsingsSlice/resourceUsingsSlice";
import {
  usersSelector,
  usesStatusSelector,
} from "@/redux/usersSlice/usersSlice";

import { DeleteDialog } from "@/components/dialog";
import { Button } from "@/components/form";
import { LoadingRow, TD, THead } from "@/components/table";

import Page, { PageProps } from "./Page";
import { fetchUsers } from "@/redux/usersSlice/fetchUsers";

const ResourceUsingPage: FC<PageProps> = (props) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(resourceUsingsStatusSelector);
  const rows = useAppSelector(resourceUsingsSelector);

  const usersStatus = useAppSelector(usesStatusSelector);
  const users = useAppSelector(usersSelector);

  const navigate = useNavigate();

  const { deleteState, dialog } = usePage();
  const { id: deleteId, deleteHandlerById } = deleteState;
  const { isOpen: isDialogOpen, close: closeDialog } = dialog;

  const { name = "mượn tài nguyên" } = props;

  const loading = isLoading(status);

  const body = (
    <>
      <table className="w-full mt-8">
        <THead
          headings={[
            "#",
            "ID",
            "Tài nguyên",
            "Chịu trách nhiệm",
            "Người mượn",
            "Mượn lúc",
            "Trả lại",
            "Tình trạng",
          ]}
        />

        <tbody>
          {loading && <LoadingRow />}
          {!loading &&
            rows.map((resourceUsing, index) => {
              const {
                id,
                resourceId,
                reporterUid,
                borrowerUid,
                startAt,
                endAt,
                status,
              } = resourceUsing;

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
                  <TD>{resourceId}</TD>
                  <TD>{getUserNameByUidFrom(users)(reporterUid)}</TD>
                  <TD>{getUserNameByUidFrom(users)(borrowerUid)}</TD>
                  <TD>{dayjs(startAt).format("DD/MM/YYYY")}</TD>
                  <TD>{dayjs(endAt).format("DD/MM/YYYY")}</TD>
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
    if (status === "idle") dispatch(fetchResourceUsings());
    if (usersStatus === "idle") dispatch(fetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Page {...pageProps} />;
};

export default ResourceUsingPage;
