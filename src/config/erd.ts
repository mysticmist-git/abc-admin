export enum StatusType {
  Create = "Create",
  Active = "Hoạt động",
  Inactive = "Ngưng hoạt động",
}

export const StatusTypeArray = [
  StatusType.Create,
  StatusType.Active,
  StatusType.Inactive,
];

export enum Action {
  Create,
  Read,
  Update,
  Delete,
}

export const ActionArray = [
  Action.Create,
  Action.Read,
  Action.Update,
  Action.Delete,
];

export enum Grade {
  Employee = "Nhân viên",
  Manager = "Quản lý",
  Director = "Giám đốc",
  Admin = "Quản trị viên",
}

export const GradeArray = [
  Grade.Manager,
  Grade.Director,
  Grade.Admin,
  Grade.Employee,
];

export enum MetricType {
  Like,
  View,
  Comment,
}

export enum ApprovalStatus {
  Pending,
  Approve,
  Cancel,
}

export const ApprovalStatusArray = [
  ApprovalStatus.Pending,
  ApprovalStatus.Approve,
  ApprovalStatus.Cancel,
];

export type Request = {
  id: number;
  requesterUid: string;
  requestType: number;
  reporterUid: string;
  name: string;
  description: string;
  startAt: Date;
  endAt: Date;
  //:
  approvalStatus: ApprovalStatus;
  decidedAt: Date;
  decisionDetail?: string;
  //:
  createdAt: Date;
  updatedAt: Date;
  status: StatusType;
};

export type User = {
  uid: string;
  departmentId: number;
  grade: Grade;
  //
  username: string;
  birthday: Date;
  email: string;
  avatar: string;
  description: string;
  //
  permissionIdToCRUD: Grade[];
  createdAt: Date;
  updatedAt: Date;
  status: StatusType;
};

export type Permission = {
  id: number;
  minGrade: Grade; // minimum grade to get this permission
  action: Action;
  //
  createdAt: Date;
  updatedAt: Date;
  isProtected: boolean;
  status: StatusType;
};
// isProtected == true -> cannot be changed via UI by all Grade, except admin

export type Department = {
  id: number;
  directorUid: string;
  //
  name: string;
  permissionIdToCRUD: Grade[];
  createdAt: Date;
  updatedAt: Date;
  status: StatusType;
};

export type PostType = {
  id: number;
  name: string;
  description: string;
  permissionIdToCRUDPost: Grade[];
  //
  permissionIdToCRUD: Grade[];
  createdAt: Date;
  updatedAt: Date;
  status: StatusType;
};

export type Post = {
  id: number;
  postTypeId: number;
  creatorUid: string;
  eventId?: number;
  mentionUid: string[]; //
  title: string;
  content: string;
  images: File[];
  files: File[];
  //
  likes: number;
  comments: number;
  //
  createdAt: Date;
  updatedAt: Date;
  status: StatusType;
};
// if eventId is valid
// -> event.permissionIdToCRUDPost > postType.permissionIdToCRUDPos= t

export type PostLike = {
  id: number;
  userId: string;
  postId: number;
  //:
  createdAt: Date;
  updatedAt: Date;
  status: StatusType;
};

export type PostComment = {
  id: number;
  userId: string;
  postId: number;
  content: string | null;
  images: File[];
  files: File[];
  //
  createdAt: Date;
  updatedAt: Date;
  status: StatusType;
};

export type File = {
  url: string;
  name: string;
  type: string; // png | mp4 | pdf | ..= .
  size: number;
};

export type ResouceType = {
  id: number;
  name: string;
  description: string;
  permissionIdToCRUDResourceUsing: Grade[];
  permissionIdToCRUDResource: Grade[];
  //:
  permissionIdToCRUD: Grade[];
  createdAt: Date;
  updatedAt: Date;
  status: StatusType;
};

export type Resource = {
  id: number;
  resourceTypeId: number;
  name: string;
  description: string;
  isFree: boolean; // sync with ResourceUsing
  //
  createdAt: Date;
  updatedAt: Date;
  status: StatusType;
};

export type ResourceUsing = {
  id: number;
  resourceId: number;
  reporterUid: string;
  borrowerUid: string;
  startAt: Date;
  endAt: Date;
  //
  createdAt: Date;
  updatedAt: Date;
  status: StatusType;
};

export type EventType = {
  id: number;
  name: string;
  description: string;
  permissionIdToCRUDEvent: Grade[];
  //
  permissionIdToCRUD: Grade[];
  createdAt: Date;
  updatedAt: Date;
  status: StatusType;
};

export type Event = {
  id: number;
  eventTypeId: number;
  reporterUid: string;
  resouceUsingId: number[]; // ex: room
  postsId: number[];
  paticipantsUid: string[]; //
  permissionIdToCRUDPost: Grade[];
  //
  name: string;
  description: string;
  startAt: Date;
  endAt: Date;
  //
  createdAt: Date;
  updatedAt: Date;
  status: StatusType;
};

export type DocumentType = {
  id: number;
  name: string;
  description: string;
  permissionIdToCRUDDocument: Grade[];
  //
  permissionIdToCRUD: Grade[];
  createdAt: Date;
  updatedAt: Date;
  status: StatusType;
};

export type Document = {
  id: number;
  documentTypeId: number;
  creatorUid: string;
  file: File;
  //
  createdAt: Date;
  updatedAt: Date;
  status: StatusType;
};

export type RequestType = {
  id: number;
  name: string;
  description: string;
  approvalDepartmentId: number;
  minApprovalGrade: Grade;
  //
  permissionIdToCRUD: Grade[];
  createdAt: Date;
  updatedAt: Date;
  status: StatusType;
};
