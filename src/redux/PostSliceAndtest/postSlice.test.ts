import postReducer from "./postSlice";
import { addPost, getPosts, deletePost, editPost, getCertainPost } from "../../Components/FirebaseRequestsAndtest/PostRequestsFirebase";
import { PostState } from "Components/Types";

const initialState = {
  list: [],
  loading: false,
  error: null,
  SelectedPost: null,
};

describe("postSlice", () => {
  it("should handle addPost.fulfilled", () => {
    const newPost = { id: "1", title: "Test Post", content: "Test content" };
    const action = { type: addPost.fulfilled.type, payload: newPost };
    const state = postReducer(initialState, action);
    expect(state.list).toContainEqual(newPost);
  });

  it("should handle getPosts.pending", () => {
    const action = { type: getPosts.pending.type };
    const state = postReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("should handle getPosts.fulfilled", () => {
    const posts = [
      { id: "1", title: "Post 1", content: "Content 1" },
      { id: "2", title: "Post 2", content: "Content 2" },
    ];
    const action = { type: getPosts.fulfilled.type, payload: posts };
    const state = postReducer(initialState, action);
    expect(state.list).toEqual(posts);
    expect(state.loading).toBe(false);
  });

  it("should handle getPosts.rejected", () => {
    const action = {
      type: getPosts.rejected.type,
      error: { message: "Failed to fetch posts" },
    };
    const state = postReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Failed to fetch posts");
  });

  it("should handle deletePost.fulfilled", () => {
    const previousState:PostState = {
      ...initialState,
      list: [
        { id: "1", title: "Post 1", content: "Content" ,timestamp:"now"},
        { id: "2", title: "Post 2", content: "Content" ,timestamp:"now"},
      ],
    };
    const action = { type: deletePost.fulfilled.type, payload: "1" };
    const state = postReducer(previousState, action);
    expect(state.list).toHaveLength(1);
    expect(state.list[0].id).toBe("2");
  });

  it("should handle editPost.fulfilled", () => {
    const previousState = {
      ...initialState,
      list: [{ id: "1", title: "Old", content: "Old content" ,timestamp:"now"}],
    };
    const updatedPost = { id: "1", title: "New", content: "New content" };
    const action = { type: editPost.fulfilled.type, payload: updatedPost };
    const state = postReducer(previousState, action);
    expect(state.list[0].title).toBe("New");
  });

  it("should handle getCertainPost.fulfilled", () => {
    const post = { id: "99", title: "Certain Post", content: "..." };
    const action = { type: getCertainPost.fulfilled.type, payload: post };
    const state = postReducer(initialState, action);
    expect(state.SelectedPost).toEqual(post);
    expect(state.loading).toBe(false);
  });
  it("should handle getCertainPost.pending", () => {
    const post = { id: "99", title: "Certain Post", content: "..." };
     const action = { type: getCertainPost.pending.type };
    const state = postReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
  it("should handle getCertainPost.rejected", () => {
    const action = {
      type: getCertainPost.rejected.type,
      error: { message: "Failed to fetch posts" },
    };
    const state = postReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Failed to fetch posts");
  });
});
