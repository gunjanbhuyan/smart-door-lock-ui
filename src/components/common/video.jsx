import React from "react";

const Video = ({ data }) => {
  return (
    <div className="col-md-8 mx-auto mb-4 mt-4">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe title="content" className="embed-responsive-item" src={data} />
      </div>
    </div>
  );
};

export default Video;
