//the collection of types which needed in all project
export type Post = {
  id?: string;
  title: string;
  content: string;
  timestamp: string;
  Auther?: string;
};

export interface PostState {
  list: Post[];
  loading: boolean;
  error: string | null;
  SelectedPost: Post | null;
}

export interface ProtectedRouteProp {
  children: ReactNode;
}

export interface PostFormProp {
  title: string;
  setTitle: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  content: string;
  setContent: (value: string) => void;
  SelectedPost?: Post | null;
}

export interface MapingPostsProp {
  userPosts: Post[];
  handleEdit: (post: Post) => void;
  handleDelete: (id: string) => void;
}

export interface PaginationProp {
  totalPages:number;
  handlePageChange:(page:number)=>void;
  currentPage:number;
}

export interface ValidationsignupProp{
fullName:string,
phone:string,
email:string,
password:string
}

import { ReactNode } from "react";
import { store } from "../redux/store";

export type stateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
