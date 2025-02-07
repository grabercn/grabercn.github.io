import React from "react";

const ExternalWebsite = ({ url }) => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={url}
        title="External Website"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
};

export default ExternalWebsite;
