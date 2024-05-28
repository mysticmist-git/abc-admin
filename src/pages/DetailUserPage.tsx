import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { avatar } from "@/assets";
import {
  Button,
  DatePicker,
  PermissionChecker,
  Select,
  TextArea,
  TextField,
  WithLabel,
} from "@/components/form";
import { TH } from "@/components/table";
import { ErrorText } from "@/components/texts";
import { UserRequestDTO } from "@/config/dto/request";
import { GradeArray, StatusTypeArray } from "@/config/erd";
import { RouteKey } from "@/config/route";
import { route } from "@/utils/route";
import { capitalized, getSubmitText } from "@/utils/text";
import DetailPage, { DetailPageProps } from "./DetailPage";
import { CreateMode } from "./common";
import { useAppSelector } from "@/redux/storeUtils";
import dayjs from "dayjs";
import { DEFAULT_PERMISSIONS } from "@/config/permission";

type DetailUserPageProps = DetailPageProps & CreateMode;

const DetailUserPage: FC<DetailUserPageProps> = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useAppSelector((state) =>
    state.users.list.find((user) => user.uid === id),
  );

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<UserRequestDTO>();

  const { createMode = false, name = "người dùng", ...rest } = props;

  const capitalizedName = capitalized(name);

  const submitText = getSubmitText(createMode, capitalizedName);

  const handleNavigateBack = () => navigate(route(RouteKey.UserPage));

  const onSubmit: SubmitHandler<UserRequestDTO> = (user) => {
    console.log(user);
  };

  const body = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-2"
    >
      <TextField
        {...register("email", {
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        })}
        defaultValue={user?.email}
        placeholder="user@gmail.com"
        label="Email"
        aria-invalid={!!errors.email}
      />
      {errors.email?.type === "required" && (
        <ErrorText>Vui lòng điền email</ErrorText>
      )}

      <TextArea
        {...register("description")}
        label="Mô tả"
        defaultValue={user?.description}
        placeholder="Thông tin mô tả gì đó"
      />

      <DatePicker
        {...register("birthday", {
          required: true,
        })}
        defaultValue={dayjs(user?.birthday).format("YYYY-MM-DD")}
        label="Ngày sinh"
      />
      {errors.birthday?.type && <ErrorText>Vui lòng điền ngày sinh</ErrorText>}

      <Controller
        name="avatar"
        control={control}
        render={({ field }) => {
          const avatarUrl = field.value
            ? URL.createObjectURL(field.value[0])
            : avatar;

          return (
            <WithLabel label="Avatar">
              <img
                src={avatarUrl}
                className="w-80 border rounded-lg shadow cursor-pointer transition-colors hover:border-neutral-300"
              />
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
        defaultValue={user?.grade}
      />
      <Select
        {...register("departmentId")}
        label="Phòng ban"
        options={[1, 2, 3]}
        defaultValue={user?.departmentId}
      />

      <WithLabel label="Quyền Xem / Tạo / Xoá / Sửa">
        <table>
          <thead>
            <tr>
              <TH>Quyền</TH>
              {GradeArray.map((value, index) => (
                <TH key={index}>{value}</TH>
              ))}
            </tr>
          </thead>
          <tbody>
            <PermissionChecker
              name="permissionIdToCRUD"
              control={control}
              defaultValue={user?.permissionIdToCRUD || DEFAULT_PERMISSIONS}
            />
          </tbody>
        </table>
      </WithLabel>

      <Select
        {...register("status")}
        label="Trạng thái"
        options={StatusTypeArray}
        defaultValue={user?.status}
      />

      <Button type="submit">{submitText}</Button>
    </form>
  );

  const detailPageProps: DetailPageProps = {
    ...rest,
    name,
    body,
    handleNavigateBack,
  };

  return <DetailPage {...detailPageProps} />;
};

export default DetailUserPage;
