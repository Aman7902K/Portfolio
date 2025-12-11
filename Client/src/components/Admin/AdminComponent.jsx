import React, { useState } from "react";
import axios from "axios";

function AdminComponent() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    desc: "",
    techStack: "",
  });

  const [images, setImages] = useState([]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImage(e) {
    const files = Array.from(e.target.files);
    setImages(files);
    console.log("Selected images:", files);
  }

  function imgSubmit(e) {
    e.preventDefault();

    const url = `/api/projects`;
    console.log("Submitting to:", url);

    const data = new FormData();
    data.append("id", formData.id);
    data.append("name", formData.name);
    data.append("desc", formData.desc);
    data.append("techStack", formData.techStack); // backend expects techStack

    images.forEach((image) => {
      data.append("images", image);
    });

    axios
      .post(url, data)
      .then((res) => {
        console.log("Project uploaded successfully", res.data);

        setFormData({
          id: "",
          name: "",
          desc: "",
          techStack: "",
        });

        setImages([]);
        e.target.reset();
      })
      .catch((err) => {
        console.error("Upload failed", err);
      });
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all";

  const buttonClass =
    "w-full px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all shadow-lg shadow-black/20";

  return (
    <div className="flex justify-center w-full min-h-[80vh] py-8 text-slate-300">
      <div className="w-[80%] max-w-2xl">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-lg shadow-black/20 p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Add New Project
          </h2>

          <form onSubmit={imgSubmit} className="space-y-5">
            
            {/* ID */}
            <div>
              <label className="block text-sm font-medium mb-2">Project ID</label>
              <input
                type="number"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                placeholder="Enter unique project ID"
                className={inputClass}
                required
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter project name"
                className={inputClass}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                placeholder="Enter project description"
                rows="4"
                className={inputClass}
                required
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Images
              </label>
              <input
                type="file"
                onChange={handleImage}
                multiple
                accept="image/*"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:cursor-pointer hover:file:bg-white/15 transition-all"
              />
              {images.length > 0 && (
                <p className="mt-2 text-sm">
                  {images.length} image(s) selected
                </p>
              )}
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Tech Stack Used
              </label>
              <input
                type="text"
                name="techStack"
                value={formData.techStack}
                onChange={handleInputChange}
                placeholder="Eg. React, Node.js, MongoDB"
                className={inputClass}
                required
              />
            </div>

            <button type="submit" className={buttonClass}>
              Upload Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminComponent;
