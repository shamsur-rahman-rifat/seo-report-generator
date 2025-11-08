import React from "react";
import html2pdf from "html2pdf.js";

const SeoReport = ({ data }) => {
  const downloadPDF = () => {
    const element = document.getElementById("report-content");

    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${data.website}-SEO-Report.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf().set(opt).from(element).save();
  };

  const scoreColors = {
    performance: "#28a745",
    seo: "#17a2b8",
    accessibility: "#ffc107",
  };

  return (
    <div className="container my-5">
      <style>
        {`
          /* ✅ Responsive Styles */
          @media (max-width: 992px) {
            .scores-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            .opportunities-grid {
              grid-template-columns: repeat(1, 1fr) !important;
            }
          }

          @media (max-width: 576px) {
            .scores-grid {
              grid-template-columns: 1fr !important;
            }
            .section-title {
              font-size: 18px !important;
            }
            .report-title {
              font-size: 22px !important;
            }
            .metric-table th, 
            .metric-table td {
              font-size: 12px !important;
              padding: 8px !important;
            }
            #report-content {
              padding: 20px !important;
            }
          }
        `}
      </style>

      <div
        id="report-content"
        style={{
          backgroundColor: "white",
          padding: "40px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2
          className="report-title"
          style={{
            textAlign: "center",
            color: "#0d6efd",
            fontWeight: "bold",
            marginBottom: "16px",
            fontSize: "28px",
          }}
        >
          SEO & Performance Report
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#6c757d",
            marginBottom: "40px",
            fontSize: "14px",
          }}
        >
          Website analyzed: <strong>{data.website}</strong>
        </p>

        {/* SCORES SECTION */}
        <section style={{ marginBottom: "40px", pageBreakInside: "avoid" }}>
          <h3
            className="section-title"
            style={{
              borderBottom: "2px solid #dee2e6",
              paddingBottom: "8px",
              marginBottom: "24px",
              color: "#6c757d",
              fontWeight: "600",
              fontSize: "20px",
            }}
          >
            Overall Scores
          </h3>

          <div
            className="scores-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {[
              {
                label: "Performance",
                value: data.performance,
                color: scoreColors.performance,
              },
              { label: "SEO", value: data.seo, color: scoreColors.seo },
              {
                label: "Accessibility",
                value: data.accessibility,
                color: scoreColors.accessibility,
              },
            ].map((score, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <h5
                  style={{
                    marginBottom: "16px",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#212529",
                  }}
                >
                  {score.label}
                </h5>
                <div
                  style={{
                    backgroundColor: "#e9ecef",
                    borderRadius: "8px",
                    height: "24px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: score.color,
                      width: `${score.value}%`,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "14px",
                      transition: "width 0.3s ease",
                    }}
                  >
                    {score.value}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* METRICS SECTION */}
        <section style={{ marginBottom: "40px", pageBreakInside: "avoid" }}>
          <h3
            className="section-title"
            style={{
              borderBottom: "2px solid #dee2e6",
              paddingBottom: "8px",
              marginBottom: "24px",
              color: "#6c757d",
              fontWeight: "600",
              fontSize: "20px",
            }}
          >
            Key Metrics
          </h3>
          <table
            className="metric-table"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #dee2e6",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    borderBottom: "2px solid #dee2e6",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Metric
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    borderBottom: "2px solid #dee2e6",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Largest Contentful Paint (LCP)", value: data.metrics.lcp },
                { label: "First Contentful Paint (FCP)", value: data.metrics.fcp },
                { label: "Total Blocking Time (TBT)", value: data.metrics.tbt },
                { label: "Cumulative Layout Shift (CLS)", value: data.metrics.cls },
                { label: "Speed Index", value: data.metrics.speedIndex },
              ].map((metric, i) => (
                <tr
                  key={i}
                  style={{
                    backgroundColor: i % 2 === 0 ? "white" : "#f8f9fa",
                  }}
                >
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #dee2e6",
                      fontSize: "14px",
                    }}
                  >
                    {metric.label}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #dee2e6",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {metric.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* OPPORTUNITIES SECTION */}
        <section style={{ marginBottom: "40px", pageBreakInside: "avoid" }}>
          <h3
            className="section-title"
            style={{
              borderBottom: "2px solid #dee2e6",
              paddingBottom: "8px",
              marginBottom: "24px",
              color: "#6c757d",
              fontWeight: "600",
              fontSize: "20px",
            }}
          >
            Top Optimization Opportunities
          </h3>

          <div
            className="opportunities-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
            }}
          >
            {data.opportunities.map((op, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  pageBreakInside: "avoid",
                }}
              >
                <h5
                  style={{
                    color: "#0d6efd",
                    fontWeight: "600",
                    marginBottom: "8px",
                    fontSize: "15px",
                  }}
                >
                  🚀 {op.title}
                </h5>
                {op.savings > 0 && (
                  <span
                    style={{
                      display: "inline-block",
                      backgroundColor: "#28a745",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    ~{op.savings} ms savings
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* DIAGNOSTICS SECTION */}
        {data.diagnostics && data.diagnostics.length > 0 && (
          <section style={{ marginBottom: "40px", pageBreakInside: "avoid" }}>
            <h3
              className="section-title"
              style={{
                borderBottom: "2px solid #dee2e6",
                paddingBottom: "8px",
                marginBottom: "24px",
                color: "#6c757d",
                fontWeight: "600",
                fontSize: "20px",
              }}
            >
              Additional Diagnostics
            </h3>
            <div
              style={{
                border: "1px solid #dee2e6",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {data.diagnostics.map((d, i) => (
                <div
                  key={i}
                  style={{
                    padding: "16px",
                    borderBottom:
                      i < data.diagnostics.length - 1
                        ? "1px solid #dee2e6"
                        : "none",
                    backgroundColor: i % 2 === 0 ? "white" : "#f8f9fa",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "600",
                      marginBottom: "4px",
                      fontSize: "14px",
                    }}
                  >
                    {d.title}
                  </div>
                  <small style={{ color: "#6c757d", fontSize: "12px" }}>
                    Additional optimization opportunities available.
                  </small>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* DOWNLOAD BUTTON */}
      <div className="text-center mt-4">
        <button
          onClick={downloadPDF}
          className="btn btn-lg btn-primary shadow-sm px-4"
        >
          📄 Download Report as PDF
        </button>
      </div>
    </div>
  );
};

export default SeoReport;
