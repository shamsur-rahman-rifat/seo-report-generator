import { useState } from "react";
import axios from "axios";
import SeoForm from "./components/SeoForm";
import SeoReport from "./components/SeoReport";

function App() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (url) => {
    setLoading(true);
    setError(null);
    setReportData(null);

    const apiKey = import.meta.env.VITE_PAGESPEED_API_KEY;

    try {
      const res = await axios.get(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
          url
        )}&key=${apiKey}&category=performance&category=seo&category=accessibility`
      );

      const data = res.data.lighthouseResult;
      const categories = data.categories;
      const audits = data.audits;

      // Extract scores
      const performance = Math.round(categories.performance.score * 100);
      const seo = Math.round(categories.seo.score * 100);
      const accessibility = Math.round(categories.accessibility.score * 100);

      // Extract key metrics
      const metrics = {
        lcp: audits["largest-contentful-paint"].displayValue,
        fcp: audits["first-contentful-paint"].displayValue,
        tbt: audits["total-blocking-time"].displayValue,
        cls: audits["cumulative-layout-shift"].displayValue,
        speedIndex: audits["speed-index"].displayValue,
      };

      // Extract top opportunities
      const opportunities = Object.values(audits)
        .filter((audit) => audit.details && audit.details.type === "opportunity")
        .sort((a, b) => b.details.overallSavingsMs - a.details.overallSavingsMs)
        .slice(0, 10)
        .map((audit) => ({
          title: audit.title,
          savings: Math.round(audit.details.overallSavingsMs),
        }));

      // Extract diagnostics
      const diagnostics = Object.values(audits)
        .filter((audit) => audit.details && audit.details.type === "diagnostic")
        .slice(0, 10)
        .map((audit) => ({
          title: audit.title,
          savings: Math.round(audit.details.overallSavingsMs),
        }));

      setReportData({
        website: url,
        performance,
        seo,
        accessibility,
        metrics,
        opportunities,
        diagnostics,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Please check the URL or your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h1 className="display-5">SEO Report Generator</h1>
        <p className="text-muted">Analyze your website and generate a professional SEO audit report instantly.</p>
      </div>

      {!reportData && !loading && <SeoForm onAnalyze={handleAnalyze} />}

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Analyzing website... ⏳</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {reportData && (
        <div className="mt-5">
          <SeoReport data={reportData} />
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setReportData(null)}
            >
              Analyze Another Website
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
