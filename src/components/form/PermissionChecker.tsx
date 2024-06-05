import { FC } from "react";

import { CheckerRow } from "@/components/form";
import { Grade, GradeArray } from "@/config/erd";
import { DEFAULT_PERMISSIONS } from "@/config/permission";

type PermissionCheckerProps = {
  value: Grade[];
  onChange: (value: Grade[]) => void;
};

const PermissionChecker: FC<PermissionCheckerProps> = (props) => {
  const { value = DEFAULT_PERMISSIONS, onChange } = props;

  const handleChange = (index: number) => (grade: Grade) => {
    const clone = [...value];
    clone[index] = grade;
    onChange(clone);
  };

  return (
    <>
      <CheckerRow
        heading="Tạo"
        value={value[0]}
        options={GradeArray}
        onCheck={handleChange(0)}
      />
      <CheckerRow
        heading="Đọc"
        value={value[1]}
        options={GradeArray}
        onCheck={handleChange(1)}
      />
      <CheckerRow
        heading="Cập nhật"
        value={value[2]}
        options={GradeArray}
        onCheck={handleChange(2)}
      />
      <CheckerRow
        heading="Xoá"
        value={value[3]}
        options={GradeArray}
        onCheck={handleChange(3)}
      />
    </>
  );
};

export default PermissionChecker;
