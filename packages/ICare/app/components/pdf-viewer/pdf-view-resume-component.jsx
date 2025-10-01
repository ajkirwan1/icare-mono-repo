import React, { useState, useEffect, useRef } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// PDF worker setup
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfViewResumeComponent({ caregiverId }) {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(0);
  console.log(caregiverId, "caregiverId in pdf-view-resume-component");

  const fileUrl = "/pdfs/resumes/CV_caregiver_" + caregiverId + ".pdf"; // Example URL, replace with actual URL or prop
  console.log(fileUrl, "fileUrl in pdf-view-resume-component");
  const containerRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    const setWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        setPageWidth(containerWidth);
      }
    };

    setWidth();
    window.addEventListener("resize", setWidth);
    return () => window.removeEventListener("resize", setWidth);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        maxHeight: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
      {fileUrl ? (
        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} style={{
              marginBottom: "2rem",
              width: "100%",
              display: "flex",
              justifyContent: "center"
            }}>
              <Page pageNumber={index + 1} width={pageWidth} />
            </div>
          ))}
        </Document>
      ) : (
        <p>No PDF uploaded.</p>
      )}
    </div>
  );
}
