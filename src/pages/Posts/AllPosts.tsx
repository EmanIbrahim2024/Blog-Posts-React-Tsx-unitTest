import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, getPosts } from "../../Components/PostRequestsFirebase";
import { useNavigate } from "react-router-dom";
import { MapingPosts } from "../../Components";
import { Post, stateType, AppDispatch } from "Components/Types";

export default function Posts() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: stateType) => state.posts.list);
  const { loading, error } = useSelector((state: stateType) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleEdit = (post: Post) => {
    navigate(`/edit/${post.id}`);
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Are you sure to delete this post ?");
    if (confirmDelete) dispatch(deletePost(id));
  };

  return (
    <>
      <h2 className="pagetitle">All Posts</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <MapingPosts
        userPosts={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
}
