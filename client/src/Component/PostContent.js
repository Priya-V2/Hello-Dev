import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import "../index.css";
import { useEffect } from "react";

export default function PostContent({ post }) {
  useEffect(() => {
    if (post && post.content) {
      hljs.highlightAll();
    }
  }, [post]);

  return (
    <div
      className="max-w-2xl w-full mx-auto my-4 px-3 post-content"
      dangerouslySetInnerHTML={{ __html: post && post.content }}
    ></div>
  );
}
