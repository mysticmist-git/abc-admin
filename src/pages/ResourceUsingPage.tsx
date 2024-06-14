import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { usePage } from "@/hooks";

import { fetchResources } from "@/redux/resourcesSlice/fetchResources";
import removeResource from "@/redux/resourcesSlice/removeResource";
import {
  resourceDetailCleared,
  resourcesSelector,
  resourcesStatusSelector,
} from "@/redux/resourcesSlice/resourcesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";

import {
  getDateText,
  getResourceTextFrom,
  getStatusTypeText,
  getUserNameByUidFrom,
} from "@/utils/text";
import { isLoading } from "@/utils/ui";

import { DeleteDialog } from "@/components/dialog";
import { Button } from "@/components/form";
import { LoadingRow, TD, THead } from "@/components/table";

import Page, { PageProps } from "./Page";
import {
  resourceUsingDetailCleared,
  resourceUsingLoaded,
  resourceUsingsSelector,
  resourceUsingsStatusSelector,
} from "@/redux/resourceUsingsSlice/resourceUsingsSlice";
import { fetchResourceUsings } from "@/redux/resourceUsingsSlice/fetchResourceUsings";
import {
  usersSelector,
  usersStatusSelector,
} from "@/redux/usersSlice/usersSlice";
import { fetchUsers } from "@/redux/usersSlice/fetchUsers";
import { ResourceUsing } from "@/config/erd";

const ResourceUsingPage: FC<PageProps> = (props) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(resourceUsingsStatusSelector);
  const rows = useAppSelector(resourceUsingsSelector);

  const resourcesStatus = useAppSelector(resourcesStatusSelector);
  const resources = useAppSelector(resourcesSelector);

  const usersStatus = useAppSelector(usersStatusSelector);
  const users = useAppSelector(usersSelector);

  const navigate = useNavigate();

  const { deleteState, dialog } = usePage();
  const { id: deleteId, deleteHandlerById } = deleteState;
  const { isOpen: isDialogOpen, close: closeDialog } = dialog;

  const { name = "sử dụng tài nguyên" } = props;

  const inAction = useAppSelector((state) => state.resourceUsings.inAction);

  const loading = isLoading(status);

  const onRowClick = (row: ResourceUsing) => () => {
    const { id } = row;

    dispatch(resourceUsingLoaded(row));

    navigate(id.toString());
  };

  const handleDeleteRow = async () => {
    await dispatch(removeResource(Number(deleteId))).unwrap();
    toast.success("Đã xóa");
    deleteHandlerById(undefined);
    closeDialog();
  };

  const getResourceText = getResourceTextFrom(resources);
  const getUserName = getUserNameByUidFrom(users);

  const body = (
    <>
      <table className="w-full mt-8">
        <THead
          headings={[
            "#",
            "ID",
            "Tài nguyên",
            "Người sử dụng",
            "Người báo cáo",
            "Bắt đầu",
            "Kết thúc",
            "Tình trạng",
          ]}
        />

        <tbody>
          {loading && <LoadingRow />}
          {!loading &&
            rows.map((row, index) => {
              const {
                id,
                resourceId,
                borrowerUid,
                reporterUid,
                startAt,
                endAt,
                status,
              } = row;

              return (
                <tr
                  key={index}
                  className="border rounded cursor-pointer transition-colors hover:bg-neutral-100"
                  onClick={onRowClick(row)}
                >
                  <TD>{(index + 1).toString().padStart(2, "0")}</TD>
                  <TD>{id}</TD>
                  <TD>{getResourceText(resourceId)}</TD>
                  <TD>{getUserName(borrowerUid)}</TD>
                  <TD>{getUserName(reporterUid)}</TD>
                  <TD>{getDateText(new Date(startAt))}</TD>
                  <TD>{getDateText(new Date(endAt))}</TD>
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
        onDelete={handleDeleteRow}
        deleteObject={{
          id: deleteId,
          text: "tài nguyên",
        }}
        isDeleting={inAction}
      />
    </>
  );

  const pageProps: PageProps = {
    ...props,
    name,
    body,
    onCreateNew: () => {
      dispatch(resourceUsingDetailCleared());
    },
  };

  useEffect(() => {
    const commonFetchParams = {
      page: 1,
      limit: 100,
    };

    if (status === "idle") dispatch(fetchResourceUsings(commonFetchParams));

    if (resourcesStatus === "idle") {
      dispatch(fetchResources(commonFetchParams));
    }

    if (usersStatus === "idle") {
      dispatch(fetchUsers(commonFetchParams));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Page {...pageProps} />;
};

export default ResourceUsingPage;
