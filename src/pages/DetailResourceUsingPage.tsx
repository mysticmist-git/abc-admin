import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastOptions, toast } from "react-toastify";

import { ApprovalStatusArray, StatusTypeArray } from "@/config/erd";
import { RouteKey } from "@/config/route";
import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";
import { route } from "@/utils/route";

import {
  capitalized,
  getApprovalStatusText,
  getResourceTextFrom,
  getStatusTypeText,
  getSubmitText,
  getUserNameByUidFrom,
} from "@/utils/text";

import { CreateMode } from "./common";

import {
  resourcesSelector,
  resourcesStatusSelector,
} from "@/redux/resourcesSlice/resourcesSlice";

import { Loading } from "@/components/feedback";
import {
  Button,
  DatePicker,
  Select,
  TextArea,
  TextField,
} from "@/components/form";
import { commonInActionSelector } from "@/redux/commonUiSlice/commonSlice";
import createResourceUsing from "@/redux/resourceUsingsSlice/createResourceUsing";
import fetchResourceUsingById from "@/redux/resourceUsingsSlice/fetchResourceUsingById";
import {
  detailResourceUsingInActionSelector,
  detailResourceUsingSelector,
  detailResourceUsingStatusSelector,
  resourceUsingLoaded,
} from "@/redux/resourceUsingsSlice/resourceUsingsSlice";
import updateResourceUsing from "@/redux/resourceUsingsSlice/updateResourceUsing";
import { fetchResources } from "@/redux/resourcesSlice/fetchResources";
import { fetchUsers } from "@/redux/usersSlice/fetchUsers";
import {
  usersSelector,
  usersStatusSelector,
} from "@/redux/usersSlice/usersSlice";
import DetailPage, { DetailPageProps } from "./DetailPage";
import dayjs from "dayjs";
import {
  ResourceUsingStringDateRequestDTO,
  ResoureUsingNumberDateRequestDTO,
} from "@/config/dto/request";

type DetailResourceUsingPage = DetailPageProps & CreateMode;

const DetailResourceUsingPage: FC<DetailResourceUsingPage> = (props) => {
  const { id } = useParams();
  const { createMode = false, name = "sử dụng tài nguyên", ...rest } = props;

  const dispatch = useAppDispatch();

  const commonInAction = useAppSelector(commonInActionSelector);

  const detail = useAppSelector(detailResourceUsingSelector);
  const detailStatus = useAppSelector(detailResourceUsingStatusSelector);

  const resources = useAppSelector(resourcesSelector);
  const resourcesStatus = useAppSelector(resourcesStatusSelector);

  const usersStatus = useAppSelector(usersStatusSelector);
  const users = useAppSelector(usersSelector);

  const detailInAction = useAppSelector(detailResourceUsingInActionSelector);

  const loading =
    detailStatus === "loading" ||
    resourcesStatus === "loading" ||
    usersStatus === "loading";
  const inAction = commonInAction || detailInAction;

  const { handleSubmit, register, reset, resetField, control, watch } =
    useForm<ResourceUsingStringDateRequestDTO>({
      defaultValues: detail
        ? {
            id: detail?.id,
            resourceId: detail?.resourceId,
            borrowerUid: detail?.borrowerUid,
            approvalStatus: detail?.approvalStatus,
            reporterUid: detail?.reporterUid,
            decidedAt: detail.decidedAt
              ? dayjs(+detail.decidedAt * 1000).format("YYYY-MM-DD")
              : undefined,
            decisionDetail: detail?.decisionDetail,
            startAt: dayjs(+detail?.startAt * 1000).format("YYYY-MM-DD"),
            endAt: dayjs(+detail?.endAt * 1000).format("YYYY-MM-DD"),
            status: detail?.status,
          }
        : {
            startAt: dayjs().format("YYYY-MM-DD"),
            endAt: dayjs().add(3, "day").format("YYYY-MM-DD"),
          },
    });

  useEffect(() => {
    const isNoNeedToLoad = createMode || detailStatus === "succeeded";

    if (isNoNeedToLoad) {
      return;
    }

    // get the stop function
    dispatch(fetchResourceUsingById(id!))
      .unwrap()
      .then((payload) => {
        const value =
          {
            ...payload,
            startAt: dayjs(payload?.startAt * 1000).format("YYYY-MM-DD"),
            endAt: dayjs(payload?.endAt * 1000).format("YYYY-MM-DD"),
          } || {};

        dispatch(resourceUsingLoaded(value));
        reset(value);
      });
  }, [createMode, detailStatus, dispatch, id, reset]);

  useEffect(() => {
    const execute = async () => {
      if (resourcesStatus === "idle") {
        await dispatch(fetchResources()).unwrap();
      }

      if (usersStatus === "idle") {
        await dispatch(fetchUsers());
      }
    };
    execute();
  }, [dispatch, resetField, resourcesStatus, usersStatus]);

  const navigate = useNavigate();

  const capitalizedName = capitalized(name);
  const submitText = getSubmitText(createMode, capitalizedName);

  const handleNavigateBack = () => navigate(route(RouteKey.ResourceUsingPage));

  console.log(detail);

  const onSubmit: SubmitHandler<ResourceUsingStringDateRequestDTO> = async (
    values
  ) => {
    let isSuccess = false;

    console.log(values);

    const { resourceId, startAt, endAt, ...rest } = values;

    const updateValues: ResoureUsingNumberDateRequestDTO = {
      ...rest,
      resourceId: Number(resourceId),
      decidedAt:
        rest.approvalStatus === "approve"
          ? Math.floor(dayjs().valueOf() / 1000)
          : 0,
      startAt: Math.floor(dayjs(startAt).valueOf() / 1000),
      endAt: Math.floor(dayjs(endAt).valueOf() / 1000),
    };

    console.log(updateValues);

    if (createMode) {
      const addedData = await dispatch(
        createResourceUsing(updateValues)
      ).unwrap();
      isSuccess = !!addedData;
      if (addedData) {
        navigate(`/resourceUsings/${addedData.id}`);
      }
    } else {
      isSuccess = await !!dispatch(updateResourceUsing(updateValues)).unwrap();
    }

    let toastMessage = "";

    if (isSuccess) {
      toastMessage = createMode
        ? `Tạo ${name}  thành công`
        : `Cập nhật ${name} thành công`;
    } else {
      toastMessage = createMode
        ? `Tạo ${name} thất bại`
        : `Cập nhật ${name} thất bại`;
    }
    const toastOptions: ToastOptions = {
      type: isSuccess ? "success" : "error",
    };

    toast(toastMessage, toastOptions);
  };

  const userUids = users.map((user) => user.uid);
  const getUsername = getUserNameByUidFrom(users);

  watch((values) => console.log(values));

  const body = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-2"
    >
      {!createMode && (
        <TextField
          {...register("id", {
            required: true,
          })}
          placeholder="Device"
          label="ID"
          disabled={true}
        />
      )}
      <Select
        {...register("resourceId", {
          required: true,
        })}
        label="Tài nguyên"
        options={resources
          .filter((resource) => resource.isFree)
          .map((resource) => resource.id)}
        optionLabelConverter={getResourceTextFrom(resources)}
        disabled={inAction}
      />

      <Select
        {...register("borrowerUid", { required: true })}
        label="Người mượn"
        options={userUids}
        optionLabelConverter={getUsername}
        disabled={inAction}
      />

      <Select
        {...register("reporterUid", { required: true })}
        label="Người báo cáo"
        options={userUids}
        optionLabelConverter={getUsername}
        disabled={inAction}
      />

      <DatePicker
        {...register("startAt", {
          required: true,
        })}
        label="Ngày bắt đầu"
        defaultValue={dayjs().format("YYYY-MM-DD")}
      />
      <DatePicker
        {...register("endAt", {
          required: true,
        })}
        label="Ngày kết thúc"
        defaultValue={dayjs().add(3, "day").format("YYYY-MM-DD")}
      />

      <Select
        {...register("approvalStatus", {
          required: true,
        })}
        options={ApprovalStatusArray}
        optionLabelConverter={getApprovalStatusText}
        label="Tình trạng mượn"
      />

      <TextArea
        {...register("decisionDetail")}
        label="Chi tiết"
        defaultValue={detail?.decisionDetail}
        placeholder="Chi tiết"
      />

      <Select
        {...register("status", { required: true })}
        label="Trạng thái"
        options={StatusTypeArray}
        optionLabelConverter={getStatusTypeText}
        defaultValue={detail?.status}
        disabled={inAction}
      />

      <Button
        type="submit"
        className="disabled:cursor-not-allowed disabled:bg-neutral-400"
        disabled={inAction}
      >
        {inAction ? <Loading /> : submitText}
      </Button>
    </form>
  );

  const detailPageProps = {
    ...rest,
    name,
    body,
    handleNavigateBack,
    loading,
    disabled: inAction,
  };

  return <DetailPage {...detailPageProps} />;
};

export default DetailResourceUsingPage;
