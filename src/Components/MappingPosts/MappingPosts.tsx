import { formatDistanceToNow } from "date-fns";
import "./mapping.css";
import { Post, MapingPostsProp } from "Components/Types";
import { useState } from "react";
import { Pagination } from "../index";

export default function MapingPosts({
  userPosts,
  handleEdit,
  handleDelete,
}: MapingPostsProp) {
  const userInLocalSt = localStorage.getItem("user");
  const user = userInLocalSt ? JSON.parse(userInLocalSt) : null;

  function isValidDate(d: Date) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  //////////// sorting posts///////////////

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const sortedPosts = [...userPosts].sort((a, b) => {
    const TimeA = new Date(a.timestamp);
    const TimeB = new Date(b.timestamp);

    if (isNaN(TimeA.getTime()) || isNaN(TimeB.getTime())) {
      return 0;
    }
    return TimeB.getTime() - TimeA.getTime();
  });

  ////////////////////Pagination/////////////////////

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(userPosts.length / postsPerPage);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  //////////////////////return Mapping posts/////////////////////////////

  return (
    <>
      <ul className="post-list">
        {currentPosts.map((post: Post) => (
          <li key={post.id} className="user-posts-cont">
            <div className="post-Container">
              <p className="post-title">
                <strong>{post.title}</strong>
              </p>
              <div className="post-content">{post.content}</div>
            </div>
            <div className="bottompost">
              <div className="button-Container">
                {post.id && (
                  <button
                    data-testid={`deletebtn-${post.id}`}
                    onClick={() => handleDelete(post.id!)}
                    aria-label={`Delete post titled ${post.title}`}
                    aria-labelledby={`title-${post.id}`}
                    title="Delete Post"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={() => handleEdit(post)}
                  aria-label={`Edit post titled ${post.title}`}
                  aria-labelledby={`title-${post.id}`}
                  title="Edit Post"
                >
                  Edit
                </button>
              </div>
              <div className="dateAuther-container">
                <p className="auther-name">
                  By: {post.Auther === user.fullName ? "You" : `${post.Auther}`}{" "}
                </p>
                <p className="date">
                  {" "}
                  {isValidDate(new Date(post.timestamp))
                    ? formatDistanceToNow(new Date(post.timestamp), {
                        addSuffix: true,
                      })
                    : "Date is not available"}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {userPosts.length !== 0 && (
        <Pagination
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
