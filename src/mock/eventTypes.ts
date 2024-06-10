import { EventType } from "@/config/erd";

export const eventTypes: EventType[] = [
  {
    id: 1,
    name: "user",
    description: "User events",
    permissionIdToCRUDEvent: ["manager", "manager", "manager", "manager"],
    permissionIdToCRUD: ["manager", "manager", "manager", "manager"],
    createdAt: new Date("2024-4-11"),
    updatedAt: new Date("2024-4-12"),
    status: "active",
  },
];
