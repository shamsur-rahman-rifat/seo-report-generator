import { useState } from "react";

const SeoForm = ({ onAnalyze }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return alert("Please enter a website URL");

    let formattedUrl = url.trim();

    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    try {
      new URL(formattedUrl);
      onAnalyze(formattedUrl);
    } catch (error) {
      alert("Please enter a valid website URL");
    }
  };

  return (
    <div className="seo-form-container card p-4 shadow-sm">
      <form
        onSubmit={handleSubmit}
        className="seo-form d-flex flex-column gap-3"
      >
        <input
          type="text"
          placeholder="Enter your website URL (e.g. https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary btn-block">
          Generate Report
        </button>
      </form>

      <p
        className="mt-3 text-muted text-center"
        style={{ fontSize: "0.9rem" }}
      >
        We'll fetch performance, SEO & accessibility data and create a
        professional report for your website.
      </p>
    </div>
  );
};

export default SeoForm;
