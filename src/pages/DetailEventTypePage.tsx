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
import { EventTypeRequestDTO, UserRequestDTO } from "@/config/dto/request";
import { GradeArray, StatusTypeArray } from "@/config/erd";
import { DEFAULT_PERMISSIONS } from "@/config/permission";
import { RouteKey } from "@/config/route";
import { useAppSelector } from "@/redux/storeUtils";
import { route } from "@/utils/route";
import { capitalized, getSubmitText } from "@/utils/text";
import dayjs from "dayjs";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import DetailPage, { DetailPageProps } from "./DetailPage";
import { CreateMode } from "./common";

type DetailEventTypePageProps = DetailPageProps & CreateMode;

const DetailEventTypePage: FC<DetailEventTypePageProps> = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const eventType = useAppSelector((state) =>
    state.eventTypes.list.find((eventType) =>
      id ? eventType.id === parseInt(id) : null,
    ),
  );

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<EventTypeRequestDTO>();

  const { createMode = false, name = "loại sự kiện", ...rest } = props;

  const capitalizedName = capitalized(name);

  const submitText = getSubmitText(createMode, capitalizedName);

  const handleNavigateBack = () => navigate(route(RouteKey.UserPage));

  const onSubmit: SubmitHandler<EventTypeRequestDTO> = (user) => {
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
        defaultValue={eventType?.email}
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
        defaultValue={eventType?.description}
        placeholder="Thông tin mô tả gì đó"
      />

      <DatePicker
        {...register("birthday", {
          required: true,
        })}
        defaultValue={dayjs(eventType?.birthday).format("YYYY-MM-DD")}
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
        defaultValue={eventType?.grade}
      />
      <Select
        {...register("departmentId")}
        label="Phòng ban"
        options={[1, 2, 3]}
        defaultValue={eventType?.departmentId}
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
              defaultValue={
                eventType?.permissionIdToCRUD || DEFAULT_PERMISSIONS
              }
            />
          </tbody>
        </table>
      </WithLabel>

      <Select
        {...register("status")}
        label="Trạng thái"
        options={StatusTypeArray}
        defaultValue={eventType?.status}
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

export default DetailEventTypePage;
