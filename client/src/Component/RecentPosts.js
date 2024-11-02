import { Link } from "react-router-dom";

export default function RecentPosts({ posts }) {
  return (
    <div className="rounded shadow-custom-indigo p-4">
      <div className="flex justify-between px-4 mb-3">
        <h3 className="self-end font-medium">Recent Posts</h3>
        <Link to={"/dashboard?tab=posts"}>
          <button className="text-sm hover:underline hover:cursor-pointer">
            See All
          </button>
        </Link>
      </div>
      <div className="overflow-x w-40">
        <table className="table-auto overflow-scroll w-full">
          <thead>
            <tr>
              <th className="font-medium text-center max-w-max bg-gray-100 rounded-l-lg px-6 py-2">
                Date Created
              </th>
              <th className="font-medium text-center bg-gray-100 px-6 py-2">
                Date Updated
              </th>
              <th className="font-medium text-center bg-gray-100 px-6 py-2">
                Title
              </th>
              <th className="font-medium text-center bg-gray-100 px-6 py-2">
                Category
              </th>
              <th className="font-medium text-center min-w-min bg-gray-100 rounded-r-lg px-6 py-2">
                Views
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              return (
                <tr className="last:border-b-0">
                  <td className="text-center text-gray-600 px-6 py-2 border-b">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="text-center text-gray-600 px-6 py-2 border-b">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="font-medium px-6 py-2 border-b">
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </td>
                  <td className="text-gray-500 pl-6 px-6 py-2 border-b">
                    {post.category}
                  </td>
                  <td className="font-medium px-6 py-2 border-b">
                    {post.views}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
