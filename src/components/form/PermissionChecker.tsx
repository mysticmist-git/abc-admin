import { CheckerRow } from "@/components/form";
import { Grade, GradeArray } from "@/config/erd";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

const PermissionChecker = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName>,
) => {
  const { ...rest } = props;
  const { field } = useController(rest);

  const getUpdatedPermissions = (index: number, value: Grade) => {
    const clone = [...field.value];
    clone[index] = value;
    return clone;
  };

  return (
    <>
      <CheckerRow
        heading="Tạo"
        options={GradeArray}
        checkedOption={field.value[0]}
        onCheck={(value) => field.onChange(getUpdatedPermissions(0, value))}
      />
      <CheckerRow
        heading="Đọc"
        options={GradeArray}
        checkedOption={field.value[1]}
        onCheck={(value) => field.onChange(getUpdatedPermissions(1, value))}
      />
      <CheckerRow
        heading="Cập nhật"
        options={GradeArray}
        checkedOption={field.value[2]}
        onCheck={(value) => field.onChange(getUpdatedPermissions(2, value))}
      />
      <CheckerRow
        heading="Xoá"
        options={GradeArray}
        checkedOption={field.value[3]}
        onCheck={(value) => field.onChange(getUpdatedPermissions(3, value))}
      />
    </>
  );
};

export default PermissionChecker;
