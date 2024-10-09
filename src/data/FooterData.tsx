type Link = {
  text: string;
  url: string;
};

type ListItem = {
  text: string;
};

type FooterSection = {
  id: string;
  title: string;
  links?: Link[]; // Tùy chọn, vì không phải tất cả các mục đều có liên kết
  lists?: ListItem[]; // Tùy chọn, vì không phải tất cả các mục đều có danh sách
};
type SocialLink = {
  id: string;
  site_name: string;
  site_icon: string;
  site_url: string;
};

const footerData: FooterSection[] = [
  {
    id: "f_need_help",
    title: "Cần Giúp Đỡ",
    links: [
      { text: "Liên Hệ", url: "/contact" },
      { text: "Theo Dõi Đơn Hàng", url: "/track_order" },
      { text: "Trả Hàng & Hoàn Tiền", url: "/returns_refunds" },
      { text: "Câu Hỏi Thường Gặp", url: "/faqs" },
      { text: "Tuyển Dụng", url: "/career" },
    ],
  },
  {
    id: "f_company",
    title: "Công Ty",
    links: [
      { text: "Về Chúng Tôi", url: "/contact" },
      { text: "Blog Souvi", url: "/blog" },
      { text: "Hợp Tác", url: "/collaboration" },
      { text: "Truyền Thông", url: "/media" },
    ],
  },
  {
    id: "f_more_info",
    title: "Thông Tin Thêm",
    links: [
      { text: "Điều Khoản & Điều Kiện", url: "/tac" },
      { text: "Chính Sách Bảo Mật", url: "/privacy" },
      { text: "Chính Sách Giao Hàng", url: "/shipping" },
      { text: "Sơ Đồ Trang", url: "/sitemap" },
    ],
  },
  {
    id: "f_location",
    title: "Địa Điểm",
    lists: [
      { text: "SouVi@gmail.com" },
      { text: "Đường Highland, Đường A04, Số 4014" },
      { text: "Thành Phố Hồ Chí Minh, Việt Nam" },
      { text: "Điện Thoại: +000 999 8888" },
    ],
  },
];
const socialLinksData: SocialLink[] = [
  {
    id: "social_link_1",
    site_name: "facebook",
    site_icon: "bi bi-facebook",
    site_url: "www.facebook.com",
  },
  {
    id: "social_link_2",
    site_name: "instagram",
    site_icon: "bi bi-instagram",
    site_url: "www.instagram.com",
  },
  {
    id: "social_link_3",
    site_name: "twitter",
    site_icon: "bi bi-twitter",
    site_url: "www.twitter.com",
  },
  {
    id: "social_link_4",
    site_name: "linkedin",
    site_icon: "bi bi-linkedin",
    site_url: "www.linkedin.com",
  },
];

export { footerData, socialLinksData };
