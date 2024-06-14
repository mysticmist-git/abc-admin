import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastOptions, toast } from "react-toastify";

import { UserForm, UserRequestDTO } from "@/config/dto/request";
import { GradeArray, StatusTypeArray } from "@/config/erd";
import { RouteKey } from "@/config/route";
import {} from "@/redux/postTypesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";
import { route } from "@/utils/route";
import {
  capitalized,
  getDepartmentNameByIdFrom,
  getGradeText,
  getStatusTypeText,
  getSubmitText,
} from "@/utils/text";

import { CreateMode } from "./common";

import { resourceDetailInActionSelector } from "@/redux/resourcesSlice/resourcesSlice";

import {
  Button,
  DatePicker,
  PermissionChecker,
  Select,
  TextArea,
  TextField,
  WithLabel,
} from "@/components/form";
import { ErrorText } from "@/components/texts";
import { commonInActionSelector } from "@/redux/commonUiSlice/commonSlice";
import {
  departmentsSelector,
  departmentsStatusSelector,
} from "@/redux/departmentsSlice/departmentsSlice";
import { fetchDepartments } from "@/redux/departmentsSlice/fetchDepartments";
import createUser from "@/redux/usersSlice/createUser";
import updateUser from "@/redux/usersSlice/updateUser";
import {
  detailUserSelector,
  detailUserStatusSelector,
} from "@/redux/usersSlice/usersSlice";
import dayjs from "dayjs";
import DetailPage, { DetailPageProps } from "./DetailPage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { TH } from "@/components/table";
import { ensurePermissions } from "@/utils/permission";
import fetchUserByUid from "@/redux/usersSlice/fetchUserByUid";
import uploadFiles from "@/api/common/uploadFiles";
import clsx from "clsx";
import { Loading } from "@/components/feedback";

type DetailUserPageProps = DetailPageProps & CreateMode;

const DetailUserPage: FC<DetailUserPageProps> = (props) => {
  const { id } = useParams();
  const { createMode = false, name = "người dùng", ...rest } = props;

  const dispatch = useAppDispatch();

  const commonInAction = useAppSelector(commonInActionSelector);

  const detail = useAppSelector(detailUserSelector);
  const detailStatus = useAppSelector(detailUserStatusSelector);
  const detailInAction = useAppSelector(resourceDetailInActionSelector);

  const departments = useAppSelector(departmentsSelector);
  const departmentsStatus = useAppSelector(departmentsStatusSelector);

  const inAction = commonInAction || detailInAction;

  const {
    handleSubmit,
    register,
    reset,
    resetField,
    control,
    formState: { errors },
  } = useForm<UserForm>({
    defaultValues:
      {
        ...detail,
        birthday: (detail?.birthday
          ? dayjs(+detail.birthday * 1000)
          : dayjs("2000-01-01")
        ).format("YYYY-MM-DD"),
      } || {},
  });

  useEffect(() => {
    const isNoNeedToLoad =
      createMode ||
      detailStatus === "succeeded" ||
      departmentsStatus === "succeeded";

    if (isNoNeedToLoad) {
      return;
    }

    dispatch(fetchUserByUid(id!))
      .unwrap()
      .then((payload) =>
        reset(
          {
            ...payload,
            password: undefined,
            birthday: dayjs(
              payload?.birthday ? +payload.birthday * 1000 : 0
            ).format("YYYY-MM-DD"),
          } || {}
        )
      );

    dispatch(
      fetchDepartments({
        page: 1,
        limit: 100,
      })
    )
      .unwrap()
      .then((departments) => {
        const { id } = departments[0];
        resetField("departmentId", {
          defaultValue: id,
        });
      });
  }, [
    createMode,
    departmentsStatus,
    detailStatus,
    dispatch,
    id,
    reset,
    resetField,
  ]);

  const navigate = useNavigate();

  const capitalizedName = capitalized(name);
  const submitText = getSubmitText(createMode, capitalizedName);

  const handleNavigateBack = () => navigate(route(RouteKey.UserPage));

  const onSubmit: SubmitHandler<UserForm> = async (values) => {
    console.log(values);

    let isSuccess = false;

    const { email, password, birthday, avatar, ...rest } = values;

    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    let avatarUrl = "";

    if (avatar instanceof FileList) {
      const files = Array.from(avatar);
      [avatarUrl] = await dispatch(uploadFiles(files)).unwrap();
    } else {
      avatarUrl = avatar as string;
    }

    const updateValues: UserRequestDTO = {
      ...rest,
      uid: credential.user.uid,
      email,
      birthday: Math.floor(dayjs(birthday).valueOf() / 1000),
      avatar: avatarUrl,
    };

    console.log(updateValues);

    if (createMode) {
      const addedData = await dispatch(createUser(updateValues)).unwrap();
      isSuccess = !!addedData;
      if (addedData) {
        navigate(`/users/${addedData.uid}`);
      }
    } else {
      isSuccess = await !!dispatch(updateUser(updateValues)).unwrap();
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

  const body = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-2"
    >
      <TextField
        {...register("username", {
          required: true,
        })}
        defaultValue={detail?.username}
        placeholder="Nguyễn Văn A"
        label="Tên người dùng"
        aria-invalid={!!errors.username}
        disabled={inAction}
      />
      {errors.username?.type === "required" && (
        <ErrorText>Vui lòng nhập tên người dùng</ErrorText>
      )}

      <TextField
        {...register("email", {
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        })}
        defaultValue={detail?.email}
        placeholder="user@gmail.com"
        label="Email"
        aria-invalid={!!errors.email}
        disabled={inAction}
      />
      {errors.email?.type === "required" && (
        <ErrorText>Vui lòng điền email</ErrorText>
      )}

      {createMode && (
        <>
          <TextField
            {...register("password", {
              required: true,
            })}
            type="password"
            placeholder="*********"
            label="Mật khẩu"
            aria-invalid={!!errors.password}
          />
          {errors.password?.type === "required" && (
            <ErrorText>Vui lòng điền mật khẩu</ErrorText>
          )}
        </>
      )}

      <TextArea
        {...register("description")}
        label="Mô tả"
        defaultValue={detail?.description}
        placeholder="Thông tin mô tả gì đó"
        disabled={inAction}
      />

      <DatePicker
        {...register("birthday", {
          required: true,
        })}
        defaultValue={dayjs(
          (detail?.birthday ? +detail.birthday : 0) * 1000
        ).format("YYYY-MM-DD")}
        label="Ngày sinh"
        disabled={inAction}
      />
      {errors.birthday?.type && <ErrorText>Vui lòng điền ngày sinh</ErrorText>}

      <Controller
        name="avatar"
        control={control}
        render={({ field }) => {
          const avatarUrl =
            field.value && field.value instanceof FileList
              ? URL.createObjectURL(field.value[0])
              : (field.value as string);

          return (
            <WithLabel label="Avatar">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  className="w-80 border rounded-lg shadow cursor-pointer transition-colors hover:border-neutral-300"
                />
              ) : (
                <div
                  className={clsx(
                    "rounded p-2 font-bold bg-neutral-100",
                    inAction ? "cursor-not-allowed" : "cursor-pointer"
                  )}
                >
                  <p>Tải hình ảnh lên</p>
                </div>
              )}
              <input
                {...register("avatar")}
                type="file"
                accept="image/*"
                className="border p-1 shadow hidden"
              />
            </WithLabel>
          );
        }}
      />

      <Select
        {...register("grade")}
        label="Chức vụ"
        options={GradeArray}
        optionLabelConverter={getGradeText}
        defaultValue={detail?.grade || GradeArray[0]}
        disabled={inAction}
      />
      <Select
        {...register("departmentId")}
        label="Phòng ban"
        options={departments.map((department) => department.id)}
        optionLabelConverter={getDepartmentNameByIdFrom(departments)}
        defaultValue={
          detail?.departmentId || (departments?.length && departments[0].id)
        }
        disabled={inAction}
      />

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
        disabled={inAction}
      />

      <Button type="submit" disabled={inAction}>
        {inAction ? <Loading /> : submitText}
      </Button>
    </form>
  );

  const detailPageProps = {
    ...rest,
    name,
    body,
    handleNavigateBack,
    loading: detailStatus === "loading" || departmentsStatus === "loading",
    disabled: inAction,
  };

  return <DetailPage {...detailPageProps} />;
};

export default DetailUserPage;
