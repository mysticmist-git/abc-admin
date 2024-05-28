import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  PermissionChecker,
  Select,
  TextField,
  WithLabel,
} from "@/components/form";
import { DepartmentRequestDTO } from "@/config/dto/request";
import { GradeArray, StatusTypeArray } from "@/config/erd";
import { RouteKey } from "@/config/route";
import { route } from "@/utils/route";
import { TH } from "@/components/table";
import { DEFAULT_PERMISSIONS } from "@/config/permission";

type DetailDepartmentPageProps = object;

const DetailDepartmentPage: FC<DetailDepartmentPageProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleSubmit, register, control } = useForm<DepartmentRequestDTO>();

  const getSubmitText = (createMode: boolean) =>
    createMode ? "Tạo phòng ban" : "Cập nhật phòng ban";

  const submitText = getSubmitText(false);

  const handleNavigateBack = () => navigate(route(RouteKey.UserPage));

  const onSubmit: SubmitHandler<DepartmentRequestDTO> = (user) => {
    console.log(user);
  };

  return (
    <>
      <Button onClick={handleNavigateBack}>Quay lại</Button>
      <p className="inline ml-3 font-bold">Users - {id}</p>
      <div>
        <div className="w-full h-[1px] my-2 bg-dark/10" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-2"
        >
          <TextField
            {...register("name", {
              required: true,
            })}
            placeholder="Phòng kế toán"
            label="Phòng ban"
          />

          <Select options={["director 1", "director 2"]} label="Trường phòng" />

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
                  defaultValue={DEFAULT_PERMISSIONS}
                />
              </tbody>
            </table>
          </WithLabel>

          <Select
            {...register("status")}
            label="Trạng thái"
            options={StatusTypeArray}
          />

          <Button type="submit">{submitText}</Button>
        </form>
      </div>
    </>
  );
};

export default DetailDepartmentPage;
