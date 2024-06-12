import {
  projectExperiences,
  technologies,
  userDetails,
  userDetailsSidebar,
} from "@/src/staticData/home/home";
import { CiUser } from "react-icons/ci";
import AboutTechnologies from "./AboutTechnologies";
import UserDetail from "./UserDetail";
import ProjectExperience from "./ProjectExperience";

const AboutMe = () => {
  return (
    <div
      data-scroll-index="1"
      id="about"
      className="py-3.5  max-w-content xl:max-2xl:max-w-50rem max-xl:mx-auto xl:ml-auto"
    >
      <div className="px-5 py-8 md:p-8 bg-white dark:bg-nightBlack rounded-2xl about-section lg:p-10 2xl:p-13">
        <div className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wide text-black dark:text-white border lg:px-5 section-name border-platinum dark:border-greyBlack200 rounded-4xl">
          <CiUser className="text-theme" size={14} />
          ABOUT ME
        </div>
        <div className="mt-7 md:mt-10 section-title">
          <h2 className="title text-[32px] md:text-4xl lg:text-5xl font-extralight text-black dark:text-white leading-1.27">
            About <span className="font-semibold text-theme">Me</span>
          </h2>
          <p className="max-w-2xl mt-4 md:mt-6 subtitle">
            정보보안 관련 업무 2년 이상의 경험을 보유하고 있습니다.<br/>
            <span className="text-black dark:text-white">
            모의해킹 및 취약점 점검, 침해사고 분석, 보안 약점 진단, 악성코드 분석
            </span>{" "} 등을 진행했습니다.<br/><br/>
            프로그래밍 개발 관련해 약 3년 이상의 프리랜서 활동을 했습니다.<br/>
            주로{" "}
            <span className="text-black dark:text-white">
              Front-end(Vue.js, React.js) 개발, Back-end(Django, Flask, Fast API) 개발
            </span>{" "} 했으며,<br/> 다양한 환경에서 배포 단계까지 진행했습니다.
          </p>
        </div>
        <div className="mt-6 section-content">
          {/* <div className="inline-flex flex-wrap items-center gap-2 mb-5 text-sm md:gap-4">
            {technologies?.map((tech) => (
              <AboutTechnologies key={tech?.id} {...tech} />
            ))}
          </div> */}

          <ul className="grid mt-4 mb-10 text-sm lg:mt-6 md:grid-cols-2 gap-x-8 gap-y-3">
            {userDetails?.map((singlInfo, i) => (
              <UserDetail key={i} {...singlInfo} />
            ))}
          </ul>

          <ul className="grid grid-cols-2 gap-6 counters md:grid-cols-4 xl:gap-8">
            {projectExperiences?.map((exp, i) => (
              <ProjectExperience key={i} {...exp} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
