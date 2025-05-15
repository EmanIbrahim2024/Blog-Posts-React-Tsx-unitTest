import "./PostForm.css";
import {PostFormProp} from '../Types';

export default function PostForm({
  title,
  setTitle,
  handleSubmit,
  content,
  setContent,
  SelectedPost,
}:PostFormProp) {
  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />
        <br />
        <label>Content </label>
        <textarea
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
