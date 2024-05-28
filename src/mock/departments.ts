

import { Department, StatusType, Grade } from '@/config/erd';

export const departments: Department[] = [
  {
    id: 1,
    directorUid: 'asdfaufjqi',
    name: 'Hen Nguyen',
    permissionIdToCRUD: [Grade.Manager, Grade.Manager, Grade.Manager, Grade.Manager],
    createdAt: new Date('2024-04-25'),
    updatedAt: new Date('2024-04-26'),
    status: StatusType.Active,
  },
];
