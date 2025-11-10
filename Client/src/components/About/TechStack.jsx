import React from "react";
import { Link } from "react-router";

function TechStack() {
  return (
    <>
      {/* i am using tailwind css */}

      <div className="h-full w-full flex flex-col text-white justify-center items-center gap-10 p-10">
        <div className="info text-center max-w-4xl space-y-4">
          <h1 className="text-4xl font-bold mb-2">Tech Stack</h1>

          <p>Here are some of the technologies and tools I work with:</p>

          <ul className="list-disc list-inside space-y-2 text-left">
            <li>
              <span className="font-semibold">Front-End:</span> React, Tailwind
              CSS, HTML5, CSS3, JavaScript (ES6+)
            </li>
            <li>
              <span className="font-semibold">Back-End:</span> Node.js,
              Express.js, RESTful APIs
            </li>
            <li>
              <span className="font-semibold">Database:</span> MongoDB, Mongoose
            </li>
            <li>
              <span className="font-semibold">Version Control:</span> Git,
              GitHub
            </li>
            <li>
              <span className="font-semibold">Deployment & Hosting:</span>{" "}
              Vercel, Netlify, Heroku
            </li>
            <li>
              <span className="font-semibold">Other Tools:</span> Postman, VS
              Code, Linux
            </li>
          </ul>
          <div className="pt-6">
            <p className="mb-4">
              You can check out me using these skills in my projects.
            </p>
            <Link
              to="/projects"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default TechStack;
