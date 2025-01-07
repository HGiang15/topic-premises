import React, { useEffect, useRef } from "react";

const Dashboards = () => {
  const iframeRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Gọi API để kiểm tra sự thay đổi
      fetch("http://127.0.0.1:5000/check-changes")
        .then((response) => response.json())
        .then((data) => {
          if (data.changed) {
            reloadAllIframes();
          }
        })
        .catch((error) => console.error("Error checking changes:", error));
    }, 5000); // Quét mỗi 5 giây

    // Xóa interval khi component unmount
    return () => clearInterval(interval);
  }, []);

  const reloadAllIframes = () => {
    iframeRefs.current.forEach((iframe) => {
      if (iframe) {
        iframe.src = ""; // Reset src để tải lại iframe
        iframe.src = iframe.dataset.src; // Gán lại URL từ data-src
      }
    });
  };

  return (
    <div className="chart">
      <iframe
        ref={(el) => iframeRefs.current[0] = el}
        data-src="http://54.166.166.166:8088/superset/explore/p/5OyMALdv4x9/?standalone=1&height=400"
        width="600"
        height="400"
        seamless
        frameBorder="0"
        scrolling="no"
        src="http://54.166.166.166:8088/superset/explore/p/5OyMALdv4x9/?standalone=1&height=400"
      ></iframe>
      <iframe
        ref={(el) => iframeRefs.current[1] = el}
        data-src="http://54.166.166.166:8088/superset/explore/p/Bgylyq8lP4O/?standalone=1&height=400"
        width="600"
        height="400"
        seamless
        frameBorder="0"
        scrolling="no"
        src="http://54.166.166.166:8088/superset/explore/p/Bgylyq8lP4O/?standalone=1&height=400"
      ></iframe>
      <iframe
        ref={(el) => iframeRefs.current[2] = el}
        data-src="http://54.166.166.166:8088/superset/explore/p/QZX091w0NoA/?standalone=1&height=400"
        width="600"
        height="400"
        seamless
        frameBorder="0"
        scrolling="no"
        src="http://54.166.166.166:8088/superset/explore/p/QZX091w0NoA/?standalone=1&height=400"
      ></iframe>
    </div>
  );
};

export default Dashboards;