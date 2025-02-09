import { Link } from "react-router-dom";

export default function PostCard({ relatedPost: post }) {
  return (
    <div className="font-roboto max-w-72 w-full mx-auto my-4">
      <Link to={`/post/${post.slug}`}>
        <div className="relative flex justify-center overflow-hidden bg-cover bg-no-repeat">
          <img
            className="w-full object-fill rounded "
            src={post && post.image}
            alt={post && post.title}
          />
          <div class="absolute h-full w-full overflow-hidden bg-neutral-500 rounded bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-40"></div>
        </div>
        <p className="font-medium text-base lg:text-lg text-left text-dark-charcoal mt-2 sm:mt-4 hover:text-blue-700 hover:underline hover:cursor-pointer">
          {post && post.title}
        </p>
      </Link>
    </div>
  );
}
