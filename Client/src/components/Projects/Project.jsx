import React, { useEffect, useState } from "react";
import Projects from "./Projects";
import axios from "axios";

function Project() {
  const [repoData, setRepoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const base = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
        const url = base ? `${base}/api/projects` : "/api/projects";

        const response = await axios.get(url, { headers: { Accept: "application/json" } });

        const data =
          Array.isArray(response.data)
            ? response.data
            : Array.isArray(response.data?.data)
            ? response.data.data
            : [];

        if (!cancelled) setRepoData(data);
        if (!Array.isArray(data)) {
          console.warn("Unexpected API response:", response.data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to fetch projects:", err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div className="text-white p-6">Loading…</div>;
  if (error) return <div className="text-red-400 p-6">Failed to load projects.</div>;

  const list = Array.isArray(repoData) ? repoData : [];
  console.log(list);
  

  return (
    <div>
      {list.map((item, id) => (
        <Projects key={id} project={item} />
      ))}
      {!list.length && <div className="text-white p-6">No projects.</div>}
    </div>
  );
}

export default Project;