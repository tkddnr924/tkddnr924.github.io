import logo from "@/public/assets/img/site-logo.svg";
import { IoHomeOutline } from "react-icons/io5";
import { IoBriefcaseOutline } from "react-icons/io5";
import {
  FaRegFileAlt,
  FaFacebook,
} from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";

export const siteSettings = {
  logo: {
    image: logo?.src,
    alt: "Minfo",
    url: "/",
    text: "Minfo",
  },
  headersMenu: [
    {
      id: 1,
      title: "Home",
      selector: "#home",
      url: "/",
      Icon: <IoHomeOutline />,
      notVisibleRoutes: [],
    },
    {
      id: 2,
      title: "About",
      selector: "#about",
      url: "/",
      Icon: <FaRegUser />,
      notVisibleRoutes: [],
    },
    {
      id: 3,
      title: "Service",
      selector: "#service",
      url: "/",
      Icon: <IoBriefcaseOutline />,
      notVisibleRoutes: [],
    },
    {
      id: 5,
      title: "Resume",
      selector: "#resume",
      url: "/",
      Icon: <FaRegFileAlt />,
      notVisibleRoutes: [],
    },
  ],
  socialMedias: [
    {
      id: 1,
      name: "Facebook",
      tooltip: "Share with Facebook",
      Icon: <FaFacebook />,
      url: "https://www.facebook.com/sangwook924",
    },
  ],
  preloader: {
    image: logo?.src,
  },
};
