import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastOptions, toast } from "react-toastify";

import { PostTypeRequestDTO } from "@/config/dto/request";
import { GradeArray, StatusTypeArray } from "@/config/erd";
import { DEFAULT_PERMISSIONS } from "@/config/permission";
import { RouteKey } from "@/config/route";
import {} from "@/redux/postTypesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";
import { ensurePermissions } from "@/utils/permission";
import { route } from "@/utils/route";
import {
  capitalized,
  getGradeText,
  getStatusTypeText,
  getSubmitText,
} from "@/utils/text";

import { CreateMode } from "./common";

import {
  Button,
  PermissionChecker,
  Select,
  TextField,
  WithLabel,
} from "@/components/form";
import { TH } from "@/components/table";

import { Loading } from "@/components/feedback";
import { createPostType, fetchPostTypeById } from "@/redux/postTypesSlice";
import updatePostType from "@/redux/postTypesSlice/updatePostType";
import DetailPage, { DetailPageProps } from "./DetailPage";
import {
  postTypeDetailSelector,
  postTypeDetailStatusSelector,
  postTypeDetailInActionSelector,
} from "@/redux/postTypesSlice/postTypeSlice";

type DetailPostTypePageProps = DetailPageProps & CreateMode;

const DetailPostTypePage: FC<DetailPostTypePageProps> = (props) => {
  const { id } = useParams();
  const { createMode = false, name = "loại bài đăng", ...rest } = props;

  const dispatch = useAppDispatch();
  const detail = useAppSelector(postTypeDetailSelector);
  const detailStatus = useAppSelector(postTypeDetailStatusSelector);
  const detailInAction = useAppSelector(postTypeDetailInActionSelector);

  const { handleSubmit, register, control, reset } =
    useForm<PostTypeRequestDTO>({
      defaultValues: detail || {
        permissionIdToCRUD: DEFAULT_PERMISSIONS,
        permissionIdToCRUDPost: DEFAULT_PERMISSIONS,
      },
    });

  useEffect(() => {
    const isNoNeedToLoad = createMode || detailStatus === "succeeded";

    if (isNoNeedToLoad) {
      return;
    }

    // get the stop function
    dispatch(fetchPostTypeById(id!))
      .unwrap()
      .then((payload) => reset(payload || {}));
  }, [createMode, detailStatus, dispatch, id, reset]);

  const navigate = useNavigate();

  const capitalizedName = capitalized(name);
  const submitText = getSubmitText(createMode, capitalizedName);

  const handleNavigateBack = () => navigate(route(RouteKey.PostTypePage));

  const onSubmit: SubmitHandler<PostTypeRequestDTO> = async (values) => {
    let isSuccess = false;

    if (createMode) {
      isSuccess = await dispatch(createPostType(values)).unwrap();
    } else {
      // isSuccess = await requestPutPostType(postType);
      isSuccess = await dispatch(updatePostType(values)).unwrap();
    }

    let toastMessage = "";

    if (isSuccess) {
      toastMessage = createMode
        ? "Tạo loại bài đăng thành công"
        : "Cập nhật loại bài đăng thành công";
    } else {
      toastMessage = createMode
        ? "Tạo loại bài đăng thất bại"
        : "Cập nhật loại bài đăng thất bại";
    }
    const toastOptions: ToastOptions = {
      type: isSuccess ? "success" : "error",
    };

    toast(toastMessage, toastOptions);
  };

  const body = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-2"
    >
      <TextField
        {...register("id", {
          required: true,
        })}
        placeholder="Anounce"
        label="ID"
      />
      <TextField
        {...register("name", {
          required: true,
        })}
        placeholder="Tên loại bài đăng"
        label="Tên loại bài đăng"
      />
      <WithLabel label="Mô tả">
        <textarea
          {...register("description", {
            required: true,
          })}
          placeholder="Thông tin mô tả gì đó"
          className="border p-1 shadow"
          defaultValue={detail?.description}
        />
      </WithLabel>

      <WithLabel label="Quyền Xem / Tạo / Xoá / Sửa bài đăng ">
        <table>
          <thead>
            <tr>
              <TH>Quyền</TH>
              {GradeArray.map((value, index) => (
                <TH key={index}>{getGradeText(value)}</TH>
              ))}
            </tr>
          </thead>
          <tbody>
            <Controller
              control={control}
              name="permissionIdToCRUDPost"
              render={({ field: { onChange, value } }) => (
                <PermissionChecker
                  value={ensurePermissions(value)}
                  onChange={onChange}
                />
              )}
            />
          </tbody>
        </table>
      </WithLabel>

      <WithLabel label="Quyền Xem / Tạo / Xoá / Sửa">
        <table>
          <thead>
            <tr>
              <TH>Quyền</TH>
              {GradeArray.map((value, index) => (
                <TH key={index}>{getGradeText(value)}</TH>
              ))}
            </tr>
          </thead>
          <tbody>
            <Controller
              control={control}
              name="permissionIdToCRUD"
              render={({ field: { onChange, value } }) => (
                <PermissionChecker
                  value={ensurePermissions(value)}
                  onChange={onChange}
                />
              )}
            />
          </tbody>
        </table>
      </WithLabel>

      <Select
        {...register("status")}
        label="Trạng thái"
        options={StatusTypeArray}
        optionLabelConverter={getStatusTypeText}
        defaultValue={detail?.status}
      />

      <Button type="submit">{detailInAction ? <Loading /> : submitText}</Button>
    </form>
  );

  const detailPageProps = {
    ...rest,
    name,
    body,
    handleNavigateBack,
    loading: detailStatus === "loading",
  };

  return <DetailPage {...detailPageProps} />;
};

export default DetailPostTypePage;
