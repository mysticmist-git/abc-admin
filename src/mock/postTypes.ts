import { Grade, PostType, StatusType } from '@/config/erd';

export const postTypes: PostType[] = [
  {
    id: 1,
    name: 'Post Type 1',
    description: 'Description 1',
    permissionIdToCRUDPost: [
      Grade.Manager,
      Grade.Manager,
      Grade.Manager,
      Grade.Manager,
    ],
    permissionIdToCRUD: [
      Grade.Manager,
      Grade.Manager,
      Grade.Manager,
      Grade.Manager,
    ],
    createdAt: new Date('2021-12-01'),
    updatedAt: new Date('2021-12-01'),
    status: StatusType.Active,
  },
  {
    id: 2,
    name: 'Post Type 2',
    description: 'Description 2',
    permissionIdToCRUDPost: [
      Grade.Manager,
      Grade.Manager,
      Grade.Manager,
      Grade.Manager,
    ],
    permissionIdToCRUD: [
      Grade.Manager,
      Grade.Manager,
      Grade.Manager,
      Grade.Manager,
    ],
    createdAt: new Date('2021-12-01'),
    updatedAt: new Date('2021-12-01'),
    status: StatusType.Active,
  },
];
