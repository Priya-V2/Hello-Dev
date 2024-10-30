import { FaEye, FaRegFileAlt, FaUsers } from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
import { LiaCommentsSolid } from "react-icons/lia";

export default function DashboardOverview() {
  return (
    <div className="font-roboto text-dark-charcoal mt-8 p-4 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
        <div
          className="grid grid-cols-2 gap-4 sm:gap-y-4 xl:gap-y-5 w-52 lg:w-44 xl:w-52 px-4 pt-4 pb-3 rounded"
          style={{
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div className="self-center justify-self-center bg-orange-50 w-14 lg:w-12 xl:w-14 h-14 lg:h-12 xl:h-14 mx-auto rounded-full">
            <FaRegFileAlt className="text-orange-600 w-14 lg:w-12 xl:w-14 h-14 lg:h-12 xl:h-14 p-3" />
          </div>
          <div className="self-center justify-self-center">
            <p className="font-bold text-2xl lg:text-xl xl:text-2xl text-center">
              54
            </p>
            <p className="text-sm lg:text-xs xl:text-sm text-gray-600">
              Total Posts
            </p>
          </div>
          <div className="col-span-2 flex items-center ml-4">
            <span className="justify-self-end self-center flex items-center gap-1 text-sm lg:text-xs xl:text-sm text-green-600 mr-1">
              <FaArrowUpLong /> 28
            </span>
            <p className="text-sm lg:text-xs xl:text-sm text-gray-500 self-center ml-2 lg:ml-1 xl:ml-2">
              Last Month
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-4 sm:gap-y-4 xl:gap-y-5 w-52 lg:w-44 xl:w-52 px-4 pt-4 pb-3 rounded"
          style={{
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div className="self-center justify-self-center bg-blue-50 w-14 lg:w-12 xl:w-14 h-14 lg:h-12 xl:h-14 mx-auto rounded-full">
            <FaEye className="text-blue-600 w-14 lg:w-12 xl:w-14 h-14 lg:h-12 xl:h-14 p-3" />
          </div>
          <div className="self-center justify-self-center">
            <p className="font-bold text-2xl lg:text-xl xl:text-2xl text-center">
              6546
            </p>
            <p className="text-sm lg:text-xs xl:text-sm text-gray-600">
              Total Views
            </p>
          </div>
          <div className="col-span-2 flex items-center ml-4">
            <span className="justify-self-end self-center flex items-center gap-1 text-sm lg:text-xs xl:text-sm text-green-600 mr-1">
              <FaArrowUpLong /> 3554
            </span>
            <p className="text-sm lg:text-xs xl:text-sm text-gray-500 self-center ml-2 lg:ml-1 xl:ml-2">
              Last Month
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-4 sm:gap-y-4 xl:gap-y-5 w-52 lg:w-44 xl:w-52 px-4 pt-4 pb-3 rounded"
          style={{
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div className="self-center justify-self-center bg-teal-50 w-14 lg:w-12 xl:w-14 h-14 lg:h-12 xl:h-14 mx-auto rounded-full">
            <FaUsers className="text-teal-600 w-14 lg:w-12 xl:w-14 h-14 lg:h-12 xl:h-14 p-3" />
          </div>
          <div className="self-center justify-self-center">
            <p className="font-bold text-2xl lg:text-xl xl:text-2xl text-center">
              545
            </p>
            <p className="text-sm lg:text-xs xl:text-sm text-gray-600">
              Total Users
            </p>
          </div>
          <div className="col-span-2 flex items-center ml-4">
            <span className="justify-self-end self-center flex items-center gap-1 text-sm lg:text-xs xl:text-sm text-green-600 mr-1">
              <FaArrowUpLong /> 62
            </span>
            <p className="text-sm lg:text-xs xl:text-sm text-gray-500 self-center ml-2 lg:ml-1 xl:ml-2">
              Last Month
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-4 sm:gap-y-4 xl:gap-y-5 w-52 lg:w-44 xl:w-52 px-4 pt-4 pb-3 rounded"
          style={{
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div className="self-center justify-self-center bg-purple-50 w-14 lg:w-12 xl:w-14 h-14 lg:h-12 xl:h-14 mx-auto rounded-full">
            <LiaCommentsSolid className="text-purple-600 w-14 lg:w-12 xl:w-14 h-14 lg:h-12 xl:h-14 p-3" />
          </div>
          <div className="self-center justify-self-center pr-4">
            <p className="font-bold text-2xl lg:text-xl xl:text-2xl text-center">
              375
            </p>
            <p className="text-sm lg:text-xs xl:text-sm text-gray-600 min-w-max">
              Total Comments
            </p>
          </div>
          <div className="col-span-2 flex items-center ml-4">
            <span className="justify-self-end self-center flex items-center gap-1 text-sm lg:text-xs xl:text-sm text-green-600 mr-1">
              <FaArrowUpLong /> 154
            </span>
            <p className="text-sm lg:text-xs xl:text-sm text-gray-500 self-center ml-2 lg:ml-1 xl:ml-2">
              Last Month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
