import React from "react";
import news1 from '../../assets/img/sidebaRight_1.jpg'
import news2 from '../../assets/img/sidebaRight_2.webp'
import news3 from '../../assets/img/sidebaRight_3.webp'
import news4 from '../../assets/img/sidebaRight_4.jpg'
import news5 from '../../assets/img/sidebaRight_5.webp'
import "./News.css";

const newsArticles = [
    {
        id: 1,
        title: "Bất động sản tăng trưởng mạnh trong năm 2025",
        date: "08/01/2025",
        author: "Nguyễn Đăng Hoàng Giang",
        image: news1, 
        excerpt: "Thị trường bất động sản đang chứng kiến sự tăng trưởng vượt bậc nhờ vào các chính sác",
        content: "Nội dung chi tiết của bài viết. Đây là nơi để bạn trình bày thông tin chi tiết của bài báo. Có thể bao gồm phân tích, hình ảnh minh họa, và các biểu đồ."
    },
    {
        id: 2,
        title: "5 xu hướng nhà ở trong năm tới",
        date: "07/01/2025",
        author: "Bùi Quang Đạo",
        image: news2, 
        excerpt: "Cùng tìm hiểu những xu hướng thiết kế nhà ở sẽ dẫn đầu trong năm 2025.",
        content: "Nội dung chi tiết của bài viết thứ hai. Thông tin này được viết theo phong cách chuyên sâu để thu hút người đọc."
    },
    {
        id: 3,
        title: "Những điều cần lưu ý khi mua nhà chung cư",
        date: "06/01/2025",
        author: "Đàm Khắc Thái",
        image: news3, 
        excerpt: "Khi mua nhà chung cư, có rất nhiều yếu tố cần xem xét kỹ lưỡng để tránh các rủi ro.",
        content: "Chi tiết bài viết về các yếu tố cần lưu ý khi mua nhà chung cư."
    },
    {
        id: 4,
        title: "Cách đầu tư bất động sản hiệu quả trong năm 2025",
        date: "05/01/2025",
        author: "Phạm Nhật Minh",
        image: news4, 
        excerpt: "Đầu tư bất động sản luôn là một kênh sinh lời hấp dẫn nếu biết cách tối ưu hóa chiến lược.",
        content: "Hướng dẫn cách đầu tư bất động sản hiệu quả với phân tích thị trường chi tiết."
    },
    {
        id: 5,
        title: "Xu hướng thiết kế nội thất hiện đại",
        date: "04/01/2025",
        author: "Nguyễn Ngọc Bách",
        image: news5, 
        excerpt: "Khám phá các xu hướng thiết kế nội thất hiện đại đang được ưa chuộng nhất hiện nay.",
        content: "Tổng hợp các xu hướng thiết kế nội thất hiện đại và phong cách phù hợp."
    },
    {
        id: 6,
        title: "Chuyển đổi số giá nhà mới nhất 2025",
        date: "06/01/2025",
        author: "Đoàn Phương Hà",
        image: news1, 
        excerpt: "Đầu tư bất động sản luôn là một kênh sinh lời hấp dẫn nếu biết cách tối ưu hóa chiến lược.",
        content: "Khi mua nhà chung cư, có rất nhiều yếu tố cần xem xét kỹ lưỡng để tránh các rủi ro không đáng có."
    }
];


const News = () => {
    return (
        <div className="news-page">
            <h1 className="news-page-title">Tin tức nổi bật</h1>
            <div className="news-list">
                {newsArticles.map((article) => (
                    <div key={article.id} className="news-card">
                        <img src={article.image} alt={article.title} className="news-card-image" />
                        <div className="news-card-content">
                            <h2 className="news-card-title">{article.title}</h2>
                            <p className="news-card-meta">
                                {article.date} - Tác giả: {article.author}
                            </p>
                            <p className="news-card-excerpt">{article.excerpt}</p>
                            <button className="news-card-button">Đọc thêm</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
