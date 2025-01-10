import React, { useEffect, useRef } from "react";
import './Dashboard.css'

const Dashboards = () => {
    const iframeRefs = useRef([]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch("http://127.0.0.1:5000/check-changes")
                .then((response) => response.json())
                .then((data) => {
                    if (data.changed) {
                        updateRelevantIframes(data.tables);
                    }
                })
                .catch((error) => console.error("Error checking changes:", error));
        }, 5000); // Quét mỗi 5 giây
    
        return () => clearInterval(interval);
    }, []);
    
    const updateRelevantIframes = (changedTables) => {
        // Map bảng thay đổi tới các biểu đồ tương ứng
        const tableToChartMapping = {
            post: [0, 2, 3, 4, 5],
            user: [1, 3],
        };
    
        // Xác định các biểu đồ cần tải lại
        const chartsToReload = new Set();
        changedTables.forEach((table) => {
            const charts = tableToChartMapping[table];
            if (charts) {
                charts.forEach((chartIndex) => chartsToReload.add(chartIndex));
            }
        });
    
        // Tải lại các iframe tương ứng
        chartsToReload.forEach((index) => {
            const iframe = iframeRefs.current[index];
            if (iframe) {
                iframe.src = ""; // Reset src để tải lại iframe
                iframe.src = iframe.dataset.src; // Gán lại URL từ data-src
            }
        });
    };

    return (
        <div className="chart">
            <div id="chart-1" className="dashboard-container">
                <h3>Biểu đồ Tỉ lệ phần trăm của mỗi loại phòng trong tổng số bài đăng</h3>
                <iframe
                    ref={(el) => (iframeRefs.current[0] = el)}
                    data-src="https://wired-comic-monkfish.ngrok-free.app/superset/explore/p/eJAgjoNzoN8/?standalone=1&height=400"
                    width="600"
                    height="400"
                    seamless
                    frameBorder="0"
                    scrolling="no"
                    src="https://wired-comic-monkfish.ngrok-free.app/superset/explore/p/eJAgjoNzoN8/?standalone=1&height=400"
                ></iframe>
            </div>
            <div id="chart-2" className="dashboard-container">
                <h3>Biểu đồ theo dõi người dùng đăng ký theo ngày</h3>
                <iframe
                    ref={(el) => (iframeRefs.current[1] = el)}
                    data-src="https://wired-comic-monkfish.ngrok-free.app/superset/explore/p/9vozdORg2yk/?standalone=1&height=400"
                    width="600"
                    height="400"
                    seamless
                    frameBorder="0"
                    scrolling="no"
                    src="https://wired-comic-monkfish.ngrok-free.app/superset/explore/p/9vozdORg2yk/?standalone=1&height=400"
                ></iframe>
            </div>
            <div id="chart-3" className="dashboard-container">
                <h3>Biều đồ số lượng bài đăng theo từng thể loại</h3>
                <iframe
                    ref={(el) => (iframeRefs.current[2] = el)}
                    data-src="https://wired-comic-monkfish.ngrok-free.app/superset/explore/p/bAWX7ewzLwE/?standalone=1&height=400"
                    width="600"
                    height="400"
                    seamless
                    frameBorder="0"
                    scrolling="no"
                    src="https://wired-comic-monkfish.ngrok-free.app/superset/explore/p/bAWX7ewzLwE/?standalone=1&height=400"
                ></iframe>
            </div>
            <div id="chart-4" className="dashboard-container">
                <h3>Biểu đồ Top 5 người có số bài đăng nhiều nhất</h3>
                <iframe
                    ref={(el) => (iframeRefs.current[3] = el)}
                    data-src="https://wired-comic-monkfish.ngrok-free.app/superset/explore/p/mGoBovwzyn1/?standalone=1&height=400"
                    width="600"
                    height="400"
                    seamless
                    frameBorder="0"
                    scrolling="no"
                    src="https://wired-comic-monkfish.ngrok-free.app/superset/explore/p/mGoBovwzyn1/?standalone=1&height=400"
                ></iframe>
            </div>
            <div id="chart-5" className="dashboard-container">
                <h3>Biểu đồ theo dõi diện tích cho thuê từng thể loại</h3>
                <iframe
                    ref={(el) => (iframeRefs.current[4] = el)}
                    data-src="https://wired-comic-monkfish.ngrok-free.app/superset/explore/p/Jd0Xm5LX6G5/?standalone=1&height=400"
                    width="600"
                    height="400"
                    seamless
                    frameBorder="0"
                    scrolling="no"
                    src="https://wired-comic-monkfish.ngrok-free.app/superset/explore/p/Jd0Xm5LX6G5/?standalone=1&height=400"
                ></iframe>
            </div>
            <div id="chart-6" className="dashboard-container">
                <h3>Biểu đồ theo dõi giá từng thể loại</h3>
                <iframe
                    ref={(el) => (iframeRefs.current[5] = el)}
                    data-src="https://wired-comic-monkfish.ngrok-free.app/superset/explore/p/V2eBeL8zp8x/?standalone=1&height=400"
                    width="600"
                    height="400"
                    seamless
                    frameBorder="0"
                    scrolling="no"
                    src="https://wired-comic-monkfish.ngrok-free.app/superset/explore/p/V2eBeL8zp8x/?standalone=1&height=400"
                ></iframe>
            </div>
        </div>
    );
};

export default Dashboards;
