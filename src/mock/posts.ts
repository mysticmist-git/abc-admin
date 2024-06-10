import { Post } from "@/config/erd";

export const posts: Post[] = [
  {
    id: 1,
    postTypeId: 1,
    creatorUid: "00256789-4ec636",
    eventId: 1,
    mentionUid: [],
    title: "Post 1",
    content: "Content 1",
    images: [],
    files: [],
    likes: 0,
    comments: 0,
    createdAt: new Date("2021-12-01"),
    updatedAt: new Date("2021-12-01"),
    status: "active",
  },
];
