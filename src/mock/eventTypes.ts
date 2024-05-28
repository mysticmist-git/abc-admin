import { EventType, Grade, StatusType } from '@/config/erd';

export const eventTypes: EventType[] = [
  {
    id: 1,
    name: 'user',
    description: 'User events',
    permissionIdToCRUDEvent: [Grade.Manager, Grade.Manager, Grade.Manager, Grade.Manager],
    permissionIdToCRUD: [Grade.Manager, Grade.Manager, Grade.Manager, Grade.Manager],
    createdAt: new Date('2024-4-11'),
    updatedAt: new Date('2024-4-12'),
    status: StatusType.Active,
  }
];

