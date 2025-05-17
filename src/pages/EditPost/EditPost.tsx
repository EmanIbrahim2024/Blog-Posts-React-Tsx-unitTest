import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stateType, AppDispatch } from "Components/Types";
import {
  editPost,
  getCertainPost,
} from "../../Components/FirebaseRequestsAndtest/PostRequestsFirebase";
import { PostForm } from "../../Components";

function EditPost() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { SelectedPost, loading, error } = useSelector(
    (state: stateType) => state.posts
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch post once using Redux
  useEffect(() => {
    dispatch(getCertainPost(id!));
  }, [dispatch, id]);

  // Populate form when post is loaded
  useEffect(() => {
    if (SelectedPost) {
      setTitle(SelectedPost.title);
      setContent(SelectedPost.content);
    }
  }, [SelectedPost]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setErrorMessage("Title and content cannot be empty!");
      return;
    }

    try {
      if (id && SelectedPost) {
        dispatch(
          editPost({
            id,
            updatedPost: {
              title,
              content,
              timestamp: SelectedPost.timestamp,
            },
          })
        );
        navigate("/posts");
      }
    } catch (err) {
      setErrorMessage("Failed to update post.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="post-details-container">
      <h2 className="pagetitle">Edit Post</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        handleSubmit={handleSubmit}
        SelectedPost={SelectedPost}
      />
    </div>
  );
}

export default EditPost;
