import { Department, Grade, StatusType, User } from "@/config/erd";

export const capitalized = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const newRoute = (baseRoute: string) => `${baseRoute}/new`;

export const getSubmitText = (
  createMode: boolean = false,
  resourceText: string
) => (createMode ? `Tạo ${resourceText}` : `Cập nhật ${resourceText}`);

export const gradeTextMap: Record<Grade, string> = {
  employee: "Nhân viên",
  manager: "Quân lý",
  directory: "Giám đốc",
  admin: "Quản trị viên",
};

export const getGradeText = (grade: Grade): string => gradeTextMap[grade];

export const statusTypeTextMap: Record<StatusType, string> = {
  active: "Hoạt động",
  inactive: "Khoá",
  create: "Create",
};

export const getStatusTypeText = (statusType: StatusType): string =>
  statusTypeTextMap[statusType];

export const getDepartmentNameByIdFrom =
  (departments: Department[]) => (id: number) =>
    departments.find((department) => department.id === id)?.name ??
    "Phòng ban không tồn tại";

export const getUserNameByUidFrom = (users: User[]) => (uid: string) =>
  users.find((user) => user.uid === uid)?.username ??
  "Người dùng không tồn tại";
