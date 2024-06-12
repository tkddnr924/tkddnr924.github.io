import BrandingIcon from "@/src/components/icons/home/BrandingIcon";
import EmailIcon from "@/src/components/icons/home/EmailIcon";
import LocationIcon from "@/src/components/icons/home/LocationIcon";
import PhoneIcon from "@/src/components/icons/home/PhoneIcon";
import SeoIcon from "@/src/components/icons/home/SeoIcon";
import UiUxIcon from "@/src/components/icons/home/UiUxIcon";
import WebDevIcon from "@/src/components/icons/home/WebDevIcon";
import {
  FaBlog,
  FaBriefcase,
  FaFolderOpen,
  FaGraduationCap,
  FaRegEnvelopeOpen,
} from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import { BiCheckDouble, BiCommentCheck } from "react-icons/bi";

import figmaImage from "@/public/assets/img/skill/figma.svg";
import webflowImage from "@/public/assets/img/skill/webflow.svg";
import tailwindImage from "@/public/assets/img/skill/tailwind.svg";
import htmlImage from "@/public/assets/img/skill/html.svg";
import cssImage from "@/public/assets/img/skill/css.svg";
import jsImage from "@/public/assets/img/skill/js.svg";
import jqueryImage from "@/public/assets/img/skill/jquery.svg";

import partner1Image from "@/public/assets/img/partners/logo1.svg";
import partner2Image from "@/public/assets/img/partners/logo2.svg";
import partner3Image from "@/public/assets/img/partners/logo3.svg";
import partner4Image from "@/public/assets/img/partners/logo4.svg";

import userImage from "@/public/assets/img/user-sidebar-thumb.png";
import userImageLight from "@/public/assets/img/user-sidebar-thumb-light.png";

import portfolioImage1Thumb from "@/public/assets/img/portfolio/portfolio-img1.png";
import portfolioImage1 from "@/public/assets/img/portfolio/portfolio-img1.png";

import portfolioImage2Thumb from "@/public/assets/img/portfolio/portfolio-img2.png";
import portfolioImage2 from "@/public/assets/img/portfolio/portfolio-img2.png";

import portfolioImage3Thumb from "@/public/assets/img/portfolio/portfolio-img3.png";
import portfolioImage3 from "@/public/assets/img/portfolio/portfolio-img3.png";

import portfolioImage4Thumb from "@/public/assets/img/portfolio/portfolio-img4.png";
import portfolioImage4 from "@/public/assets/img/portfolio/portfolio-img4.png";

import projectInner1Image from "@/public/assets/img/blog/article-inner1.png";
import projectInner2Image from "@/public/assets/img/blog/article-inner2.png";

import blog1Thumbnail from "@/public/assets/img/blog/article1.png";
import blog1Image from "@/public/assets/img/blog/article1.png";
import blog2Thumbnail from "@/public/assets/img/blog/article2.png";
import blog2Image from "@/public/assets/img/blog/article2.png";
import blog3Thumbnail from "@/public/assets/img/blog/article3.png";
import blog3Image from "@/public/assets/img/blog/article3.png";

import author1 from "@/public/assets/img/testimonial/author1.png";
import author2 from "@/public/assets/img/testimonial/author2.png";
import { IoHomeOutline } from "react-icons/io5";

export const introduce = {
  iconBox: {
    Icon: <IoHomeOutline className="text-theme" size={14} />,
    title: "INTRODUCE",
  },
  heading: {
    heading1: "I Craft The",
    heading2: "Better than Yesterday",
  },
  desc: (
    <p>
      저는{" "}
      <span className="font-medium text-black dark:text-white/90">
        정보보안 전문가
      </span>{" "}
      입니다. 항상 새로운 기술과 지식을 알아가기 위해 도전합니다.
    </p>
  ),
  jobs: [
    {
      id: 1,
      title: "적극적",
      icon: <BiCheckDouble size={25} className="text-theme mr-1" />,
    },
    {
      id: 2,
      title: "다양한 경험",
      icon: <BiCheckDouble size={25} className="text-theme mr-1" />,
    },
  ],
};

export const partners = [
  {
    imgUrl: partner1Image,
    altText: "Partner Name 1",
    link: "#",
  },
  {
    imgUrl: partner2Image,
    altText: "Partner Name 2",
    link: "#",
  },
  {
    imgUrl: partner3Image,
    altText: "Partner Name 3",
    link: "#",
  },
  {
    imgUrl: partner4Image,
    altText: "Partner Name 4",
    link: "#",
  },
  {
    imgUrl: partner2Image,
    altText: "Partner Name 5",
    link: "#",
  },
  {
    imgUrl: partner4Image,
    altText: "Partner Name 6",
    link: "#",
  },
  {
    imgUrl: partner2Image,
    altText: "Partner Name 7",
    link: "#",
  },
  {
    imgUrl: partner4Image,
    altText: "Partner Name 8",
    link: "#",
  },
  {
    imgUrl: partner2Image?.src,
    altText: "Partner Name 9",
    link: "#",
  },
];

export const technologies = [
  {
    id: 1,
    title: "HTML5 & CSS3",
    skill: "94",
    url: "#",
  },
  {
    id: 2,
    title: "Bootstrap",
    skill: "98",
    url: "#",
  },
  {
    id: 3,
    title: "TailwindCSS",
    skill: "90",
    url: "#",
  },
];

export const userDetails = [
  {
    field: "GitHub",
    value: "github.com/tkddnr924",
  },
  {
    field: "Blog",
    value: "asvv.tistory.com",
  },
  {
    field: "BTLO",
    value: "blueteamlabs.online/public/user/4a94c9cac5f7f675ab4c5c",
  },
];

export const userDetailsSidebar = {
  userImage: userImage,
  userImageLight: userImageLight,
  userName: "안상욱",
  designations: ["정보보안 전문가", "FE 개발자", "BE 개발자"],
  basicInfo: [
    {
      id: 1,
      field: "전화번호",
      value: "010-2971-8061",
    },
    {
      id: 2,
      field: "이메일",
      value: "tkddnr924@naver.com",
    },
    {
      id: 3,
      field: "생년월일",
      value: "1995.09.24",
    },
  ],
  skillsInfo: [
    {
      id: 1,
      name: "Python",
      value: 90,
    },
    {
      id: 2,
      name: "Vue.js",
      value: 80,
    },
    {
      id: 3,
      name: "React.js",
      value: 80,
    },
    {
      id: 4,
      name: "C#",
      value: 60,
    },
  ],
};

export const projectExperiences = [
  {
    title: "Years Of Experience",
    count: 3,
    postFix: true,
  },
  {
    title: "Handled Projects",
    count: 15,
    postFix: true,
  },
  {
    title: "DFIR Experience",
    count: 5,
    postFix: true,
  },
  {
    title: "Awards Won",
    count: 3,
    postFix: false,
  },
];

export const services = {
  servicesHeading: {
    icon: <FaBriefcase className="text-theme" />,
    title: "SERVICES",
    heading: "My",
    coloredHeading: "Services",
    description:
      "",
  },
  servicesData: [
    {
      id: 1,
      number: "01",
      title: "프로그래밍",
      desc: "FE, BE 개발 후 배포까지 진행. 스크립트 개발 등 다양한 프로그래밍",
      icon: <UiUxIcon />,
    },
    {
      id: 2,
      number: "02",
      title: "침해사고 분석 및 대응",
      desc: "디지털 포렌식 아티팩트 분석. 침해사고 분석 대응",
      icon: <WebDevIcon />,
    },
    {
      id: 3,
      number: "03",
      title: "모의해킹 및 취약점 점검",
      desc: "모의해킹, 취약점 점검, 보안 약점 진단, 침투 테스트 등 수행",
      icon: <SeoIcon />,
    },
    {
      id: 4,
      number: "04",
      title: "프로젝트 리딩",
      desc: "다양한 프로젝트 리딩 경험",
      icon: <BrandingIcon />,
    },
  ],
};

export const skills = {
  skillsHeading: {
    icon: <FaGraduationCap className="text-theme" />,
    title: "SKILLS",
    heading: "My",
    coloredHeading: "Advantages",
    description:
      "",
  },
  skillsData: [
    {
      image: figmaImage?.src,
      percent: 90,
      name: "Figma",
    },
    {
      image: webflowImage?.src,
      percent: 85,
      name: "Webflow",
    },
    {
      image: tailwindImage?.src,
      percent: 90,
      name: "Tailwind",
    },
    {
      image: htmlImage?.src,
      percent: 95,
      name: "HTML5",
    },
    {
      image: cssImage?.src,
      percent: 95,
      name: "CSS3",
    },
    {
      image: jsImage?.src,
      percent: 75,
      name: "JavaScript",
    },
    {
      image: jqueryImage?.src,
      percent: 70,
      name: "jQuery",
    },
  ],
};

export const resume = {
  resumeHeading: {
    icon: <FaFolderOpen className="text-theme" />,
    title: "RESUME",
    heading: "Work",
    coloredHeading: "Experience",
    description:
      "",
  },
  resumeData: [
    {
      platform: "(주) 플레인비트",
      duration: "2022.07 - Current",
      position: "연구원",
      description:
        "디지털 포렌식 연구 및 프로그램 개발. 침해사고 분석 및 대응",
    },
    {
      platform: "넷식스솔루션",
      duration: "2021.12 - 2022.06",
      position: "취약점 점검",
      description:
        "공공기관 대상 소스코드 보안 약점 진단, 모의해킹 및 취약점 진단, 침투 테스트 수행",
    },
    {
      platform: "공군 사이버작전센터",
      duration: "2017.11 - 2019.10",
      position: "정보보호병",
      description:
        "인터넷 및 인트라넷 보안 위협 분석 및 대응. 악성코드 분석 및 APT Group 분석. 내부 프로그램 개발",
    },
  ],
};

export const educations = {
  educationsHeading: {
    icon: "",
    title: "",
    heading: "My",
    coloredHeading: "Education",
    description:
      "",
  },
  educationsData: [
    {
      institution: "K-Shield",
      duration: "2016-2017",
      degree: "교육",
      description:
        "AWS 클라우드 인프라 환경에서의 지능형 보안 위협 방어",
    },
    {
      institution: "Best of the Best 5th",
      duration: "2016-2017",
      degree: "특기병트랙",
      description:
        "디지털 포렌식, 네트워크 해킹, 정보 보안 컨설팅 등 다양한 경험. 디지털 포렌식 관련 프로젝트 진행",
    },
    {
      institution: "선문 BIT Academy",
      duration: "2015 - 2016",
      degree: "윈도우 프로그래밍",
      description:
        "윈도우 프로그래밍. C, C++, C# 프로그래밍 및 내부 프로젝트 수행",
    },
    {
      institution: "선문대학교",
      duration: "2015 - 2022",
      degree: "컴퓨터공학과",
      description:
        "컴퓨터 공학과 졸업",
    },
  ],
};

export const portfolio = {
  portfolioHeading: {
    icon: <GrTasks className="text-theme" />,
    title: "PORTFOLIO",
    heading: "Featured ",
    coloredHeading: "Projects",
    description:
      "I design products that are more than pretty. I make them shippable and usable, ttempor non mollit dolor et do aute",
  },
  projectsData: [
    {
      id: 1,
      image: {
        thumbnail: portfolioImage1Thumb?.src,
        image: portfolioImage1?.src,
        thumbnailText1: "Design",
        thumbnailText2: "Specialization",
      },
      type: "Branding",
      title: "Three wine glasses filled with candies",
      slug: "three-wine-glasses-filled-with-candies",
      projectHeading: {
        icon: <GrTasks className="text-theme" />,
        title: "Project Details",
      },
      projectInfo: [
        {
          field: "CLIENT",
          value: "Envato Theme",
        },
        {
          field: "SERVICES:",
          value: "Tips & Tricks, Design",
        },
        {
          field: "DURATION",
          value: "108 hrs",
        },
      ],
      projectDescription: {
        descriptionTitle: "Project Description",
        description:
          "Patent authorities globally are grappling with the challenge of redefining their approach to handling inventions generated not by human ingenuity but by AI. It has sparked considerable debate within the intellectual property community. This analysis initiates a three-part series that delves into the influence of AI on intellectual property rights.",
        descriptionLists: [
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do",
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa",
        ],
        projectImage: [projectInner1Image?.src, projectInner2Image?.src],
      },
    },
    {
      id: 2,
      image: {
        thumbnail: portfolioImage2Thumb?.src,
        image: portfolioImage2?.src,
        thumbnailText1: "Design",
        thumbnailText2: "Specialization",
      },
      type: "Branding",
      title: "Three wine glasses filled with candies",
      slug: "three-wine-glasses-filled-with-candies",
      projectHeading: {
        icon: <GrTasks className="text-theme" />,
        title: "Project Details",
      },
      projectInfo: [
        {
          field: "CLIENT",
          value: "Envato Theme",
        },
        {
          field: "SERVICES",
          value: "Tips & Tricks, Design",
        },
        {
          field: "DURATION",
          value: "108 hrs",
        },
      ],
      projectDescription: {
        descriptionTitle: "Project Description",
        description:
          "Patent authorities globally are grappling with the challenge of redefining their approach to handling inventions generated not by human ingenuity but by AI. It has sparked considerable debate within the intellectual property community. This analysis initiates a three-part series that delves into the influence of AI on intellectual property rights.",
        descriptionLists: [
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do",
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa",
        ],
        projectImage: [projectInner1Image?.src, projectInner2Image?.src],
      },
    },
    {
      id: 3,
      image: {
        thumbnail: portfolioImage3Thumb?.src,
        image: portfolioImage3?.src,
        thumbnailText1: "Design",
        thumbnailText2: "Specialization",
      },
      type: "Branding",
      title: "Three wine glasses filled with candies",
      slug: "three-wine-glasses-filled-with-candies",
      projectHeading: {
        icon: <GrTasks className="text-theme" />,
        title: "Project Details",
      },
      projectInfo: [
        {
          field: "CLIENT",
          value: "Envato Theme",
        },
        {
          field: "SERVICES",
          value: "Tips & Tricks, Design",
        },
        {
          field: "DURATION",
          value: "108 hrs",
        },
      ],
      projectDescription: {
        descriptionTitle: "Project Description",
        description:
          "Patent authorities globally are grappling with the challenge of redefining their approach to handling inventions generated not by human ingenuity but by AI. It has sparked considerable debate within the intellectual property community. This analysis initiates a three-part series that delves into the influence of AI on intellectual property rights.",
        descriptionLists: [
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do",
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa",
        ],
        projectImage: [projectInner1Image?.src, projectInner2Image?.src],
      },
    },
    {
      id: 4,
      image: {
        thumbnail: portfolioImage4Thumb?.src,
        image: portfolioImage4?.src,
        thumbnailText1: "Design",
        thumbnailText2: "Specialization",
      },
      type: "Branding",
      title: "Three wine glasses filled with candies",
      slug: "three-wine-glasses-filled-with-candies",
      projectHeading: {
        icon: <GrTasks className="text-theme" />,
        title: "Project Details",
      },
      projectInfo: [
        {
          field: "CLIENT",
          value: "Envato Theme",
        },
        {
          field: "SERVICES",
          value: "Tips & Tricks, Design",
        },
        {
          field: "DURATION",
          value: "108 hrs",
        },
      ],
      projectDescription: {
        descriptionTitle: "Project Description",
        description:
          "Patent authorities globally are grappling with the challenge of redefining their approach to handling inventions generated not by human ingenuity but by AI. It has sparked considerable debate within the intellectual property community. This analysis initiates a three-part series that delves into the influence of AI on intellectual property rights.",
        descriptionLists: [
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do",
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa",
        ],
        projectImage: [projectInner1Image?.src, projectInner2Image?.src],
      },
    },
  ],
};

export const blogs = {
  blogsHeading: {
    icon: <FaBlog className="text-theme" />,
    title: "BLOG",
    heading: "Latest",
    coloredHeading: "Insights",
    description:
      "I design products that are more than pretty. I make them shippable and usable, ttempor non mollit dolor et do aute",
  },
  blogsData: [
    {
      image: {
        thumbnail: blog1Thumbnail?.src,
        image: blog1Image?.src,
      },
      category: "UI Design",
      date: "03 May 2023",
      title: "Elevate your mornings with perfectly brewed coffee",
      slug: "elevate-your-mornings-with-perfectly-brewed-coffee",
      blogInfo: {
        projectHeading: {
          icon: <FaBlog className="text-theme" />,
          title: "Blog Details",
        },
        projectInfo: [
          {
            field: "POSTED BY",
            value: "Adrinao Smith",
          },
          {
            field: "CATEGORY:",
            value: "Tips & Tricks, Design",
          },
          {
            field: "POSTED ON:",
            value: "Noveber 01, 2023",
          },
        ],
        projectDescription: {
          descriptionTitle: "Cappuccino Bliss",
          description:
            "Patent authorities globally are grappling with the challenge of redefining their approach to handling inventions generated not by human ingenuity but by AI. It has sparked considerable debate within the intellectual property community.",
          descriptionListsTitle: "Benifits of coffee",
          descriptionLists: [
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa",
          ],
          projectImage: [projectInner2Image?.src, projectInner1Image?.src],
        },
      },
    },
    {
      image: {
        thumbnail: blog2Thumbnail?.src,
        image: blog2Image?.src,
      },
      category: "UI Design",
      date: "03 May 2023",
      title: "Mastering the clock: A guide to time management",
      slug: "mastering-the-clock-a-guide-to-time-management",
      blogInfo: {
        projectHeading: {
          icon: <FaBlog className="text-theme" />,
          title: "Blog Details",
        },
        projectInfo: [
          {
            field: "POSTED BY",
            value: "Adrinao Smith",
          },
          {
            field: "CATEGORY:",
            value: "Tips & Tricks, Design",
          },
          {
            field: "POSTED ON:",
            value: "Noveber 01, 2023",
          },
        ],
        projectDescription: {
          descriptionTitle: "Cappuccino Bliss",
          description:
            "Patent authorities globally are grappling with the challenge of redefining their approach to handling inventions generated not by human ingenuity but by AI. It has sparked considerable debate within the intellectual property community.",
          descriptionListsTitle: "Benifits of coffee",
          descriptionLists: [
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa",
          ],
          projectImage: [projectInner2Image?.src, projectInner1Image?.src],
        },
      },
    },
    {
      image: {
        thumbnail: blog3Thumbnail?.src,
        image: blog3Image?.src,
      },
      category: "UI Design",
      date: "03 May 2023",
      title: "Homeward bound: Crafting a productive home office",
      slug: "homeward-bound-crafting-a-productive-home-office",
      blogInfo: {
        projectHeading: {
          icon: <FaBlog className="text-theme" />,
          title: "Blog Details",
        },
        projectInfo: [
          {
            field: "POSTED BY",
            value: "Adrinao Smith",
          },
          {
            field: "CATEGORY:",
            value: "Tips & Tricks, Design",
          },
          {
            field: "POSTED ON:",
            value: "Noveber 01, 2023",
          },
        ],
        projectDescription: {
          descriptionTitle: "Cappuccino Bliss",
          description:
            "Patent authorities globally are grappling with the challenge of redefining their approach to handling inventions generated not by human ingenuity but by AI. It has sparked considerable debate within the intellectual property community.",
          descriptionListsTitle: "Benifits of coffee",
          descriptionLists: [
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa",
          ],
          projectImage: [projectInner2Image?.src, projectInner1Image?.src],
        },
      },
    },
    {
      image: {
        thumbnail: blog1Thumbnail?.src,
        image: blog1Image?.src,
      },
      category: "UI Design",
      date: "03 May 2023",
      title: "Elevate your mornings with perfectly brewed coffee",
      slug: "elevate-your-mornings-with-perfectly-brewed-coffee",
      blogInfo: {
        projectHeading: {
          icon: <FaBlog className="text-theme" />,
          title: "Blog Details",
        },
        projectInfo: [
          {
            field: "POSTED BY",
            value: "Adrinao Smith",
          },
          {
            field: "CATEGORY:",
            value: "Tips & Tricks, Design",
          },
          {
            field: "POSTED ON:",
            value: "Noveber 01, 2023",
          },
        ],
        projectDescription: {
          descriptionTitle: "Cappuccino Bliss",
          description:
            "Patent authorities globally are grappling with the challenge of redefining their approach to handling inventions generated not by human ingenuity but by AI. It has sparked considerable debate within the intellectual property community.",
          descriptionListsTitle: "Benifits of coffee",
          descriptionLists: [
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa",
          ],
          projectImage: [projectInner2Image?.src, projectInner1Image?.src],
        },
      },
    },
    {
      image: {
        thumbnail: blog2Thumbnail?.src,
        image: blog2Image?.src,
      },
      category: "UI Design",
      date: "03 May 2023",
      title: "Mastering the clock: A guide to time management",
      slug: "mastering-the-clock-a-guide-to-time-management",
      blogInfo: {
        projectHeading: {
          icon: <FaBlog className="text-theme" />,
          title: "Blog Details",
        },
        projectInfo: [
          {
            field: "POSTED BY",
            value: "Adrinao Smith",
          },
          {
            field: "CATEGORY:",
            value: "Tips & Tricks, Design",
          },
          {
            field: "POSTED ON:",
            value: "Noveber 01, 2023",
          },
        ],
        projectDescription: {
          descriptionTitle: "Cappuccino Bliss",
          description:
            "Patent authorities globally are grappling with the challenge of redefining their approach to handling inventions generated not by human ingenuity but by AI. It has sparked considerable debate within the intellectual property community.",
          descriptionListsTitle: "Benifits of coffee",
          descriptionLists: [
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa",
          ],
          projectImage: [projectInner2Image?.src, projectInner1Image?.src],
        },
      },
    },
  ],
};

export const testimonials = {
  testimonialsHeading: {
    icon: <BiCommentCheck className="text-theme" />,
    title: "TESTIMONIAL",
    heading: "What",
    coloredHeading: "People Say",
    description:
      "I design products that are more than pretty. I make them shippable and usable, ttempor non mollit dolor et do aute",
  },
  testimonialsData: [
    {
      id: 1,
      image: author1?.src,
      desc: (
        <div className="text-sm md:text-[15px] leading-loose content">
          Working with <span className="font-semibold text-theme">Reddick</span>{" "}
          is a game-changer. Their coding expertise and commitment to quality
          make every project a success.
        </div>
      ),
      name: "Alex Johnson",
      position: "Developer",
    },
    {
      id: 2,
      image: author2?.src,
      desc: (
        <div className="text-sm md:text-[15px] leading-loose content">
          <span className="font-semibold text-theme">Reddick</span> exceeds
          expectations with top-tier coding skills. Reliable, collaborative, and
          a true asset to any project. Highly recommended
        </div>
      ),
      name: "Mily Martin",
      position: "CEO @IT Theme",
    },
    {
      id: 3,
      image: author1?.src,
      desc: (
        <div className="text-sm md:text-[15px] leading-loose content">
          Working with <span className="font-semibold text-theme">Reddick</span>{" "}
          is a game-changer. Their coding expertise and commitment to quality
          make every project a success.
        </div>
      ),
      name: "Alex Johnson",
      position: "Developer",
    },
  ],
};

export const contactInfo = {
  contactInfoHeading: {
    icon: <FaRegEnvelopeOpen className="text-theme" />,
    title: "CONTACT",
    heading: "Contact",
    coloredHeading: "Me.",
    description:
      "I design products that are more than pretty. I make them shippable and usable, ttempor non mollit dolor et do aute",
  },
  contactInfoData: [
    {
      id: 1,
      field: "Location",
      data: "Melbourne Street. No 20",
      Icon: <LocationIcon />,
    },
    {
      id: 2,
      field: "E-mail",
      data: "smith@gmail.com",
      Icon: <EmailIcon />,
    },
    {
      id: 3,
      field: "Phone",
      data: "+976 34 99 99",
      Icon: <PhoneIcon />,
    },
  ],
};
