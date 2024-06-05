import { Grade } from "@/config/erd";
import { DEFAULT_PERMISSIONS } from "@/config/permission";

export const ensurePermissions = (permissionIdToCRUD: Grade[]) => {
  const ensuredPermissions = DEFAULT_PERMISSIONS;

  for (let i = 0; i < ensuredPermissions.length; i++) {
    ensuredPermissions[i] = permissionIdToCRUD?.[i] || ensuredPermissions[i];
  }

  return ensuredPermissions;
};
