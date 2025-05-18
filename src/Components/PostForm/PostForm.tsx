import "./PostForm.css";
import { PostFormProp } from "../Types";

export default function PostForm({
  title,
  setTitle,
  handleSubmit,
  content,
  setContent,
  SelectedPost,
}: PostFormProp) {
  return (
    <form onSubmit={handleSubmit} className="post-form" data-testid="post-form">
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />
        <br />
        <label htmlFor="content">Content </label>
        <textarea
          id="content"
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-textarea"
          required
        />
        <br />

        <button type="submit" className="submit-btn">
          {SelectedPost ? "Edit Post" : "Add Post"}
        </button>
      </div>
    </form>
  );
}
