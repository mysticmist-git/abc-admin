import { FC, useEffect } from "react";

import { usePage } from "@/hooks";
import { fetchFiles } from "@/redux/filesSlice/fetchFiles";
import {
  filesSelector,
  filesStatusSelector,
} from "@/redux/filesSlice/filesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";

import { isLoading } from "@/utils/ui";

import { DeleteDialog } from "@/components/dialog";
import { Button } from "@/components/form";
import { LoadingRow, TD, THead } from "@/components/table";

import Page, { PageProps } from "./Page";

const FilePage: FC<PageProps> = (props) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(filesStatusSelector);
  const rows = useAppSelector(filesSelector);

  const { deleteState, dialog } = usePage();
  const { id: deleteId } = deleteState;
  const { isOpen: isDialogOpen, close: closeDialog } = dialog;

  const { name = "tệp" } = props;

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
            "Phòng ban",
          ]}
        />

        <tbody>
          {loading && <LoadingRow />}
          {!loading &&
            rows.map((file, index) => {
              const {
                url,
                name,
                type, // png | mp4 | pdf | ..= .
                size,
              } = file;

              return (
                <tr
                  key={index}
                  className="border rounded cursor-pointer transition-colors hover:bg-neutral-100"
                >
                  <TD>{(index + 1).toString().padStart(2, "0")}</TD>
                  <TD>{url}</TD>
                  <TD>{name}</TD>
                  <TD>{type}</TD>
                  <TD>{size}</TD>
                  <TD>
                    <div className="flex items-center justify-center">
                      <Button color="danger">Xoá</Button>
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
    if (status === "idle") dispatch(fetchFiles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Page {...pageProps} />;
};

export default FilePage;
