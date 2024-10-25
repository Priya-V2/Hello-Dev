import { Link } from "react-router-dom";

export default function PostCard({ relatedPost }) {
  return (
    <div className="font-roboto max-w-72 w-full mx-auto my-4">
      <div className="flex justify-center">
        <img
          className="w-full max-w-72 max-h-36 sm:max-w-56 sm:max-h-28 lg:max-w-72 lg:max-h-36 mb-2 sm:mb-4 object-cover rounded"
          src={relatedPost && relatedPost.image}
          alt={relatedPost && relatedPost.title}
        />
      </div>
      <Link to={`/post/${relatedPost.slug}`}>
        <p className="font-medium text-base sm:text-lg text-center text-dark-charcoal hover:text-blue-700 hover:underline hover:cursor-pointer">
          {relatedPost && relatedPost.title}
        </p>
      </Link>
    </div>
  );
}
