import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../Components/FirebaseRequestsAndtest/PostRequestsFirebase";
import { useNavigate, useParams } from "react-router-dom";
import { Post, AppDispatch } from "Components/Types";
import { PostForm } from "../../Components";

export default function NewPost() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userInLocalSt = localStorage.getItem("user");
  const user = userInLocalSt ? JSON.parse(userInLocalSt) : null;

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      setErrorMessage("Please fill in both title and content.");
      return;
    }
      const newPost: Post = {
        title,
        content,
        timestamp: new Date().toLocaleString(),
        Auther: user.fullName,
      };

      dispatch(addPost(newPost!));
      navigate("/posts");
    
  };

  return (
    <div className="newpost-container">
      <h2 className="pagetitle">Add New Post</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
