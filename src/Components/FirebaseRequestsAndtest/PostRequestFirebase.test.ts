import { get, getDatabase, push, ref, remove, update } from "firebase/database";
import {
  addPost,
  getPosts,
  deletePost,
  editPost,
  getCertainPost,
} from "./PostRequestsFirebase";
import { Post } from "../Types";

import { realTimeDataBase } from "../../firebase";

// 🧪 Mock firebase methods
jest.mock("firebase/database", () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(),
  push: jest.fn(),
  update: jest.fn(),
  get: jest.fn(),
  remove: jest.fn(),
}));

const thunkAPI = {
  dispatch: jest.fn(),
  getState: jest.fn(),
  rejectWithValue: jest.fn((msg) => msg),
  fulfillWithValue: jest.fn(),
  extra: {},
  signal: {},
  requestId: "",
};

describe("addPost", () => {
  it("should add a post and return it with id", async () => {
    const mockPost: Post = {
      title: "My first post",
      content: "This is the content of the post",
      timestamp: new Date().toISOString(),
      Auther: "Eman",
    };

    const mockKey = "d1";
    const mockNewRef = { key: mockKey };
    // إعداد الموك
    (ref as jest.Mock).mockReturnValue("mockedRef");
    (push as jest.Mock).mockReturnValue(mockNewRef);
    (update as jest.Mock).mockResolvedValue(undefined);

    const thunk = addPost(mockPost);
    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await thunk(dispatch, getState, undefined);

    expect(ref).toHaveBeenCalledWith(realTimeDataBase, "posts");
    expect(push).toHaveBeenCalledWith("mockedRef");
    expect(update).toHaveBeenCalledWith(mockNewRef, mockPost);

    expect(result.payload).toEqual({
      id: mockKey,
      ...mockPost,
    });
  });
});

describe("getPosts", () => {
  it("Should return an array of posts", async () => {
    const mockData = {
      "1": {
        title: "Post 1",
        content: "Content 1",
        timestamp: "123",
        Author: "Eman",
      },
      "2": {
        title: "Post 2",
        content: "Content 2",
        timestamp: "456",
        Author: "Ahmed",
      },
    };

    const mockSnapshot = {
      val: () => mockData,
    };
    (get as jest.Mock).mockResolvedValue(mockSnapshot);
    const thunk = getPosts();
    const result = await thunk(thunkAPI.dispatch, thunkAPI.getState, undefined);
    expect(result.payload).toEqual([
      {
        id: "1",
        title: "Post 1",
        content: "Content 1",
        timestamp: "123",
        Author: "Eman",
      },
      {
        id: "2",
        title: "Post 2",
        content: "Content 2",
        timestamp: "456",
        Author: "Ahmed",
      },
    ]);
  });
});

describe("delete post", () => {
  it("should call remove with correct ref and id", async () => {
    const mockId = "IdPostToremove";

    (ref as jest.Mock).mockReturnValue(`posts/${mockId}`);
    (remove as jest.Mock).mockReturnValue(undefined);

    const thunk = deletePost(mockId);
    const result = await thunk(thunkAPI.dispatch, thunkAPI.getState, undefined);

    expect(ref).toHaveBeenCalledWith(realTimeDataBase, `posts/${mockId}`);
    expect(remove).toHaveBeenCalledWith(`posts/${mockId}`);

    expect(result.payload).toBe(mockId);
  });
});

describe("edit post", () => {
  it("should edit the specific post with the true id", async () => {
    const updatedPost: Post = {
      title: "My editing post",
      content: "This is the content of the post",
      timestamp: new Date().toISOString(),
      Auther: "Eman",
    };
    const postId = "Id2";

    (ref as jest.Mock).mockReturnValue(`posts/${postId}`);
    (update as jest.Mock).mockReturnValue(undefined);

    const thunk = editPost({ id: postId, updatedPost });
    const result = await thunk(thunkAPI.dispatch, thunkAPI.getState, undefined);

    expect(ref).toHaveBeenCalledWith(realTimeDataBase, `posts/${postId}`);
    expect(update).toHaveBeenCalledWith(`posts/${postId}`, updatedPost);

    expect(result.payload).toEqual({ id: postId, ...updatedPost });
  });
});

describe("get certain Post by id ", () => {
  it("Should return the post with id I sent", async () => {
    const postId = "1";

    const mockData = {
      title: "Post 1",
      content: "Content 1",
      timestamp: "123",
      Author: "Eman",
    };

    const mockSnapshot = {
      exists: () => true,
      val: () => mockData,
    };

    (ref as jest.Mock).mockReturnValue(`posts/${postId}`);
    (get as jest.Mock).mockResolvedValue(mockSnapshot);

    const thunk = getCertainPost(postId);
    const result = await thunk(thunkAPI.dispatch, thunkAPI.getState, undefined);

    expect(ref).toHaveBeenCalledWith(realTimeDataBase, `posts/${postId}`);
    expect(get).toHaveBeenCalledWith(`posts/${postId}`);
    expect(result.payload).toEqual({
      id: postId,
      ...mockData,
    });
  });

  
});
