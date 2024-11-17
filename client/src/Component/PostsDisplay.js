import { Link } from "react-router-dom";

export default function PostsDisplay({ posts }) {
  return (
    <div className="overflow-auto">
      <table className="w-[640px] xl:w-full">
        <thead>
          <tr className="font-medium text-center">
            <th className="bg-gray-100 px-6 py-2 rounded-l-lg whitespace-nowrap">
              Date Created
            </th>
            <th className="bg-gray-100 px-6 py-2 whitespace-nowrap">
              Date Updated
            </th>
            <th className="bg-gray-100 px-6 py-2">Title</th>
            <th className="bg-gray-100 px-6 py-2">Category</th>
            <th className="bg-gray-100 px-6 py-2 rounded-r-lg">Views</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            return (
              <tr className="last:border-b-0">
                <td className="text-center text-gray-600 w-36 px-6 py-2 border-b whitespace-nowrap">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="text-center text-gray-600 w-40 px-6 py-2 border-b whitespace-nowrap">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="font-medium px-6 py-2 border-b w-[512px] whitespace-nowrap">
                  <Link to={`/post/${post.slug}`}>{post.title}</Link>
                </td>
                <td className="text-gray-500 pl-6 px-6 py-2 border-b w-28 whitespace-nowrap">
                  {post.category}
                </td>
                <td className="font-medium px-6 py-2 border-b whitespace-nowrap">
                  {post.views}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
