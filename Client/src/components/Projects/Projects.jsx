import React from 'react';
import ImageCrousel from './ImageCrousel';

function Projects({project}) {

  console.log(project);
  
  const title = 
    project.name ??
    (loading ? 'Loading…' : error ? 'Failed to load' : 'No projects');
  const desc = 
    project.desc ??
    (loading ? 'Loading…' : error ? 'Failed to load' : 'No projects');
    const images =
    project.img ??
    (loading ? [] : error ? [] : []);
    console.log(images);
    
    

  return (
    <>
      <div className="topContainer w-full min-h-screen text-white">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-12 flex flex-col gap-8">
          {/* Header */}
          <header className="flex justify-center">
            <h1 className="w-full max-w-4xl text-center text-3xl sm:text-4xl font-semibold tracking-tight">
              <span className="bg-linear-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
          </header>

          {/* Carousel */}
          <section className="flex justify-center">
            <div className="w-full max-w-5xl">
              <ImageCrousel img = {images}/>
            </div>
          </section>

          {/* Content Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Description */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7 shadow-lg shadow-black/20 backdrop-blur">
              <h2 className="text-xl font-semibold mb-3 text-slate-100">Overview</h2>
              <p className="text-slate-300 leading-relaxed">
                {desc}
              </p>
            </div>

            {/* Tech Stack */}
            <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7 shadow-lg shadow-black/20 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4 text-slate-100">Tech Stack Used</h2>
              <ul className="flex flex-wrap gap-2">
                <li className="px-3 py-1 rounded-full bg-slate-800/60 text-slate-200 text-sm border border-white/10">React</li>
                <li className="px-3 py-1 rounded-full bg-slate-800/60 text-slate-200 text-sm border border-white/10">Tailwind CSS</li>
                <li className="px-3 py-1 rounded-full bg-slate-800/60 text-slate-200 text-sm border border-white/10">Node.js</li>
                <li className="px-3 py-1 rounded-full bg-slate-800/60 text-slate-200 text-sm border border-white/10">Express</li>
                <li className="px-3 py-1 rounded-full bg-slate-800/60 text-slate-200 text-sm border border-white/10">MongoDB</li>
              </ul>
            </aside>
          </section>
        </div>
      </div>
    </>
  );
}

export default Projects;