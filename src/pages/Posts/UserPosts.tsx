import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPosts } from "../../Components/FirebaseRequestsAndtest/PostRequestsFirebase";
import { useNavigate } from "react-router-dom";
import MapingPosts from "../../Components/MappingPosts/MappingPosts";
import { Post, stateType, AppDispatch } from "Components/Types";

export default function UserPosts() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userInLocalSt = localStorage.getItem("user");
  const user = userInLocalSt ? JSON.parse(userInLocalSt) : null;
  const {list: posts,loading,error} = useSelector((state: stateType) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const userPosts = posts.filter(
    (post: Post) => post.Auther === user?.fullName
  );

  const handleEdit = (post: Post) => {
    navigate(`/edit/${post.id}`);
  };
  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Are you sure to delete this post ?");
    if (confirmDelete) dispatch(deletePost(id));
  };

  return (
    <div>
      {userPosts.length !== 0 && <h2 className="pagetitle">Your Posts</h2>}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {userPosts.length === 0 && (
        <>
          <p className="no-posts">
            You have no posts yet. Publish your passions and ideas, That is your
            way
          </p>
          <button
            className="create-post-btn"
            onClick={() => navigate(`/new-post`)}
          >
            Create Your First Post
          </button>
        </>
      )}
      <MapingPosts
        userPosts={userPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
