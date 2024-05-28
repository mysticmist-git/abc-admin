import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { PostTypeRequestDTO } from "@/config/dto/request";
import { GradeArray, StatusTypeArray } from "@/config/erd";
import { DEFAULT_PERMISSIONS } from "@/config/permission";
import { RouteKey } from "@/config/route";
import { route } from "@/utils/route";

import {
  Button,
  PermissionChecker,
  Select,
  TextField,
  WithLabel,
} from "@/components/form";
import { TH } from "@/components/table";
import { capitalized, getSubmitText } from "@/utils/text";
import { useNavigate, useParams } from "react-router-dom";
import DetailPage, { DetailPageProps } from "./DetailPage";
import { CreateMode } from "./common";
import { useAppSelector } from "@/redux/storeUtils";

type DetailPostTypePageProps = DetailPageProps & CreateMode;

const DetailPostTypePage: FC<DetailPostTypePageProps> = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleSubmit, register, control } = useForm<PostTypeRequestDTO>();

  const { createMode = false, name = "bài đăng", ...rest } = props;

  const postType = useAppSelector((state) =>
    id
      ? state.postTypes.list.find((postType) => postType.id === parseInt(id))
      : null,
  );
  const capitalizedName = capitalized(name);

  const submitText = getSubmitText(createMode, capitalizedName);

  const handleNavigateBack = () => navigate(route(RouteKey.PostPage));

  const onSubmit: SubmitHandler<PostTypeRequestDTO> = (post) => {
    console.log(post);
  };

  const body = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-2"
    >
      <TextField
        {...register("name", {
          required: true,
        })}
        placeholder="Tên bài đăng"
        label="Tên bài loại đăng"
        defaultValue={postType?.name}
      />
      <WithLabel label="Mô tả">
        <textarea
          {...register("description", {
            required: true,
          })}
          placeholder="Thông tin mô tả gì đó"
          className="border p-1 shadow"
          defaultValue={postType?.description}
        />
      </WithLabel>

      <WithLabel label="Quyền Xem / Tạo / Xoá / Sửa bài đăng ">
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
              name="permissionIdToCRUDPost"
              control={control}
              defaultValue={
                postType?.permissionIdToCRUDPost || DEFAULT_PERMISSIONS
              }
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
                <TH key={index}>{value}</TH>
              ))}
            </tr>
          </thead>
          <tbody>
            <PermissionChecker
              name="permissionIdToCRUD"
              control={control}
              defaultValue={postType?.permissionIdToCRUD || DEFAULT_PERMISSIONS}
            />
          </tbody>
        </table>
      </WithLabel>

      <Select
        {...register("status")}
        label="Trạng thái"
        options={StatusTypeArray}
        defaultValue={postType?.status}
      />

      <Button type="submit">{submitText}</Button>
    </form>
  );

  const detailPageProps = {
    ...rest,
    name,
    body,
    handleNavigateBack,
  };

  return <DetailPage {...detailPageProps} />;
};

export default DetailPostTypePage;
