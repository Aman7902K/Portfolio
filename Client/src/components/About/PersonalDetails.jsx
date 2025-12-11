import React from "react";

function PersonalDetails() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row text-white justify-center items-center my-16 md:gap-20 gap-10 p-10">
      <div className="info text-center md:text-left max-w-2xl space-y-4">
        <h1 className="text-4xl font-bold mb-2">Aman Khan</h1>

        <p>
          👋 Hi, I’m <span className="font-semibold">Aman Khan</span> — a
          passionate Full-Stack Web Developer specializing in the MERN stack
          (MongoDB, Express.js, React, Node.js). I love turning ideas into
          scalable, user-friendly web applications with clean code and intuitive
          design.
        </p>

        <p>
          I enjoy working across both front-end and back-end — whether it’s
          crafting responsive interfaces in React and Tailwind or building
          efficient RESTful APIs in Node.js and Express. My focus is always on
          creating performant, maintainable, and impactful solutions.
        </p>

        <p>
          💡 I’m currently exploring advanced concepts like system design,
          authentication, and deployment pipelines to deepen my expertise in
          scalable web systems.
        </p>

        <p>
          When I’m not coding, you’ll find me experimenting with open-source
          tools, optimizing workflows on Linux, or learning new technologies
          that make development smarter and faster.
        </p>

        <p className="font-medium">
          🌱 Currently looking for a{" "}
          <span className="text-green-400">full-time developer role</span> where
          I can contribute to a dynamic team, build meaningful products, and
          continue growing as a developer.
        </p>

        <p>
          📬 <span className="font-semibold">Let’s connect:</span>{" "}
          <a
            href="https://github.com/Aman7902K"
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            GitHub
          </a>{" "}
          •{" "}
          <a
            href="https://linkedin.com/in/aman7902k"
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            LinkedIn
          </a>{" "}
          •{" "}
          <a
            href="mailto:amankhan9034820992@gmail.com"
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            Email Me
          </a>
        </p>
      </div>

      <div className="myImg">
        <img
          src="https://res.cloudinary.com/dpkb89sww/image/upload/v1765393580/Mine_z2yjsu.jpg"
          alt="My Portrait"
          className="rounded-full object-cover shadow-lg h-64 w-64 md:h-72 md:w-72"
        />
      </div>
    </div>
  );
}

export default PersonalDetails;