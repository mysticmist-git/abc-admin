import { Grade, StatusType, User } from '@/config/erd';

export const users: User[] = [
  {
    uid: '00256789-4ec636',
    username: 'jorge_keebler',
    email: 'Nathanial56@gmail.com',
    birthday: new Date('2022-01-01'),
    grade: Grade.Manager,
    departmentId: 1,
    avatar: '',
    description: 'He is a member of great society',
    permissionIdToCRUD: [
      Grade.Manager,
      Grade.Manager,
      Grade.Manager,
      Grade.Manager,
    ],
    status: StatusType.Active,
    createdAt: new Date('2021-12-01'),
    updatedAt: new Date('2021-12-01'),
  },
  {
    uid: '72e1f77c-b185',
    username: 'Cordell.Thompson',
    email: 'Alayna_Walker@hotmail.com',
    birthday: new Date('2022-02-01'),
    grade: Grade.Employee,
    departmentId: 2,
    avatar: '',
    description: 'Okay good',
    permissionIdToCRUD: [
      Grade.Employee,
      Grade.Employee,
      Grade.Employee,
      Grade.Employee,
    ],
    status: StatusType.Active,
    createdAt: new Date('2021-12-05'),
    updatedAt: new Date('2021-12-06'),
  },
];
