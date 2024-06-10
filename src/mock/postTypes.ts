import { PostType } from "@/config/erd";

export const postTypes: PostType[] = [
  {
    id: 1,
    name: "Post Type 1",
    description: "Description 1",
    permissionIdToCRUDPost: ["manager", "manager", "manager", "manager"],
    permissionIdToCRUD: ["manager", "manager", "manager", "manager"],
    createdAt: new Date("2021-12-01"),
    updatedAt: new Date("2021-12-01"),
    status: "active",
  },
  {
    id: 2,
    name: "Post Type 2",
    description: "Description 2",
    permissionIdToCRUDPost: ["manager", "manager", "manager", "manager"],
    permissionIdToCRUD: ["manager", "manager", "manager", "manager"],
    createdAt: new Date("2021-12-01"),
    updatedAt: new Date("2021-12-01"),
    status: "active",
  },
];
