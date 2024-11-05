import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto mb-8 p-3 text-center">
        <div>
          <h1 className="text-3xl font font-semibold text-center my-7">
            About Me
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Hello! I'm Priya Vasudevan, and this blog is a personal project
              where I share my thoughts and ideas on web development. As a
              passionate developer, I aim to create a welcoming space for
              beginners eager to learn the essentials of web development. Here,
              you'll find a wide range of resources designed to help you get
              started and understand what to study to build a solid foundation
              in web development.
            </p>
            <p>
              This blog features weekly articles and tutorials that cover
              fundamental topics like HTML, CSS, JavaScript, and popular
              frameworks. I’m constantly exploring and learning new
              technologies, so you can expect fresh content and insights
              regularly!
            </p>
            <p>
              I also encourage you to leave comments, share your thoughts, and
              engage with other readers. You can like and reply to other
              people's comments to build a supportive community of learners
              where we all grow and improve together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
