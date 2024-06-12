import BrandingIcon from "@/src/components/icons/home/BrandingIcon";
import SeoIcon from "@/src/components/icons/home/SeoIcon";
import UiUxIcon from "@/src/components/icons/home/UiUxIcon";
import WebDevIcon from "@/src/components/icons/home/WebDevIcon";
import {
  FaBriefcase,
  FaFolderOpen,
} from "react-icons/fa";
import { BiCheckDouble } from "react-icons/bi";

import userImage from "@/public/assets/img/user-sidebar-thumb.png";
import userImageLight from "@/public/assets/img/user-sidebar-thumb-light.png";

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