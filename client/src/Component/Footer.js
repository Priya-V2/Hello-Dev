export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col sm:flex-row justify-between font-roboto text-white text-base px-4 py-2 bg-midnight-indigo">
        <p className="text-center mb-2 sm:m-0">
          &copy; 2024 HELLO DEV! All rights reserved.
        </p>
        <div className="flex gap-3 justify-center">
          <a href="mailto:priyav2.bct@gmail.com" className="self-center">
            <img src="/images/email.svg" alt="Email icon" className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/priya-v2"
            target="_blank"
            rel="noopener noreferrer"
            className="self-center"
          >
            <img
              src="/images/linkedin.svg"
              alt="Linked-in icon"
              className="w-5 h-5"
            />
          </a>
          <a
            href="https://github.com/priya-V2"
            target="_blank"
            rel="noopener noreferrer"
            className="self-center"
          >
            <img
              src="/images/github.svg"
              alt="GitHub icon"
              className="w-5 h-5"
            />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="self-center"
          >
            <img src="/images/x.svg" alt="Twitter icon" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
