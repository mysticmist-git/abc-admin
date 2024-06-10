import { ApprovalStatus, StatusType, Grade, Action } from "../erd";

export type RequestRequestDTO = {
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
  status: StatusType;
};

export type UserRequestDTO = {
  uid: string;
  username: string;
  departmentId: number;
  grade: Grade;
  //
  birthday: Date;
  email: string;
  avatar: File[];
  description: string;
  //
  permissionIdToCRUD: Grade[];
  status: StatusType;
};

export type PermissionRequestDTO = {
  id: number;
  minGrade: Grade; // minimum grade to get this permission
  action: Action;
  //

  isProtected: boolean;
  status: StatusType;
};
// isProtected == true -> cannot be changed via UI by all Grade, except admin

export type DepartmentRequestDTO = {
  id: number;
  directorUid: string;
  //
  name: string;
  permissionIdToCRUD: Grade[];

  status: StatusType;
};

export type PostTypeRequestDTO = {
  id?: string;
  name: string;
  description: string;
  permissionIdToCRUDPost: Grade[];
  //
  permissionIdToCRUD: Grade[];
  status: StatusType;
};

export type PostRequestDTO = {
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
  status: StatusType;
};
// if eventId is valid
// -> event.permissionIdToCRUDPost > postType.permissionIdToCRUDPos= t

export type PostLikeRequestDTO = {
  id: number;
  userId: string;
  postId: number;
  //:

  status: StatusType;
};

export type PostCommentRequestDTO = {
  id: number;
  userId: string;
  postId: number;
  content: string | null;
  images: File[];
  files: File[];
  //

  status: StatusType;
};

export type FileRequestDTO = {
  url: string;
  name: string;
  type: string; // png | mp4 | pdf | ..= .
  size: number;
};

export type ResouceTypeRequestDTO = {
  id: number;
  name: string;
  description: string;
  permissionIdToCRUDResourceUsing: Grade[];
  permissionIdToCRUDResource: Grade[];
  //:
  permissionIdToCRUD: Grade[];

  status: StatusType;
};

export type ResourceRequestDTO = {
  id: number;
  resourceTypeId: number;
  name: string;
  description: string;
  isFree: boolean; // sync with ResourceUsing
  //

  status: StatusType;
};

export type ResourceUsingRequestDTO = {
  id: number;
  resourceId: number;
  reporterUid: string;
  borrowerUid: string;
  startAt: Date;
  endAt: Date;
  //

  status: StatusType;
};

export type EventTypeRequestDTO = {
  id: number;
  name: string;
  description: string;
  permissionIdToCRUDEvent: Grade[];
  //
  permissionIdToCRUD: Grade[];

  status: StatusType;
};

export type EventRequestDTO = {
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

  status: StatusType;
};

export type DocumentTypeRequestDTO = {
  id: number;
  name: string;
  description: string;
  permissionIdToCRUDDocument: Grade[];
  //
  permissionIdToCRUD: Grade[];

  status: StatusType;
};

export type DocumentRequestDTO = {
  id: number;
  documentTypeId: number;
  creatorUid: string;
  file: File;
  //

  status: StatusType;
};

export type RequestTypeRequestDTO = {
  id: number;
  name: string;
  description: string;
  approvalDepartmentId: number;
  minApprovalGrade: Grade;
  //
  permissionIdToCRUD: Grade[];

  status: StatusType;
};
