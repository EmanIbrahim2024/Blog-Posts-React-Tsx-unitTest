import { get, ref, push, remove, update } from "firebase/database";
import { realTimeDataBase } from "../../firebase";
import {createAsyncThunk} from "@reduxjs/toolkit";
import { Post } from "../Types";


//create thunk with firebase its name posts/addPost to add new posts to its real time database
export const addPost = createAsyncThunk("posts/addPost", async (post:Post) => {
    const newRef = push(ref(realTimeDataBase, "posts"));
    await update(newRef, post);
    return { id: newRef.key!, ...post };
  });
  
//create thunk with firebase its name posts/getPosts to get posts  from its real time database

export const getPosts = createAsyncThunk<Post[]>("posts/getPosts", async (_,thunkAPI) => {
  try{
     const snapShot = await get(ref(realTimeDataBase, "posts"));
  const posts = snapShot.val();
  if (!posts) return [];
  return Object.entries(posts).map(([id, val]) => ({ id, ...(val as Post) }));

  } catch(error){
    return thunkAPI.rejectWithValue("Error in downloading posts")
  }
 
});

//create thunk with firebase its name posts/deletePost to delete post which send its id 
  export const deletePost = createAsyncThunk("posts/deletePost", async (id:string) => {
    await remove(ref(realTimeDataBase, `posts/${id}`));
    return id;
  });
  

//create thunk with firebase its name "posts/editPost" to edit post which send its id 

  export const editPost = createAsyncThunk(
    "posts/editPost",
    async ({ id, updatedPost }:{id:string,updatedPost:Post}) => {
      await update(ref(realTimeDataBase, `posts/${id}`), updatedPost);
      return { id, ...updatedPost };
    }
  );

//create thunk with firebase its name "posts/getCertainPost" to get post which send its id 
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


