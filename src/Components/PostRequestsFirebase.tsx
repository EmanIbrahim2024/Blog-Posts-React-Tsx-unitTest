import { get, ref, push, remove, update } from "firebase/database";
import { realTimeDataBase } from "../firebase";
import {createAsyncThunk} from "@reduxjs/toolkit";
import { Post } from "./Types";

export const addPost = createAsyncThunk("posts/addPost", async (post:Post) => {
    const newRef = push(ref(realTimeDataBase, "posts"));
    await update(newRef, post);
    return { id: newRef.key, ...post };
  });
  
export const getPosts = createAsyncThunk<Post[]>("posts/getPosts", async () => {
  const snapShot = await get(ref(realTimeDataBase, "posts"));
  const posts = snapShot.val();
  if (!posts) return [];
  return Object.entries(posts).map(([id, val]) => ({ id, ...(val as Post) }));
});

  
  export const deletePost = createAsyncThunk("posts/deletePost", async (id:string) => {
    await remove(ref(realTimeDataBase, `posts/${id}`));
    return id;
  });
  
  export const editPost = createAsyncThunk(
    "posts/editPost",
    async ({ id, updatedPost }:{id:string,updatedPost:Post}) => {
      await update(ref(realTimeDataBase, `posts/${id}`), updatedPost);
      return { id, ...updatedPost };
    }
  );
  
  export const getCertainPost=createAsyncThunk("posts/getCertainPost",
      async (id:string) => {
          const snapShot= await get(ref(realTimeDataBase,`posts/${id}`));
          if(snapShot.exists()){
              return{id,...snapShot.val()}
          }
          else {
              throw new Error("Post not found")
          }
      }
  )


