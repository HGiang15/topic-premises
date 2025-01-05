import React, { useState, useRef } from "react";

const Dashboards = () => {
  return (
    <div className="manage-info">
      <iframe
        width="600"
        height="400"
        seamless
        frameBorder="0"
        scrolling="no"
        src="http://3.88.5.5:8088/superset/explore/p/w9QMon3vyqD/?standalone=1&height=400"
      ></iframe><iframe
      width="600"
      height="400"
      seamless
      frameBorder="0"
      scrolling="no"
      src="http://3.88.5.5:8088/superset/explore/p/wPaM1XqvoLr/?standalone=1&height=400"
    >
    </iframe>
      <iframe
        width="600"
        height="400"
        seamless
        frameBorder="0"
        scrolling="no"
        src="http://3.88.5.5:8088/superset/explore/p/BgylyJ50P4O/?standalone=1&height=400"
      ></iframe>

    </div>
  );
};

export default Dashboards;
