import { FaEnvelope, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col sm:flex-row justify-between font-roboto text-white text-base px-4 py-2 bg-midnight-indigo">
        <p className="text-center mb-2 sm:m-0">
          &copy; 2024 HELLO DEV! All rights reserved.
        </p>
        <div className="flex gap-3 justify-center">
          <a href="mailto:priyav2.bct@gmail.com" className="self-center">
            <FaEnvelope className="w-5 h-5 text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/priya-v2"
            target="_blank"
            rel="noopener noreferrer"
            className="self-center"
          >
            <FaGithub className="w-5 h-5 text-white" />
          </a>
          <a
            href="https://github.com/priya-V2"
            target="_blank"
            rel="noopener noreferrer"
            className="self-center"
          >
            <FaLinkedin className="w-5 h-5 text-white" />
          </a>
          <a
            href="https://x.com/Priya_v2"
            target="_blank"
            rel="noopener noreferrer"
            className="self-center"
          >
            <FaXTwitter className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
}
