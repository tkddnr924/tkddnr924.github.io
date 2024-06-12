"use client";

import Typewriter from "typewriter-effect";

const TypeWriterComp = ({
  skillsData = ["Web Developer", "Photographer", "Web Designer"],
}) => {
  return (
    <Typewriter
      options={{
        strings: skillsData,
        autoStart: true,
        loop: true,
        delay: 20,
      }}
      className="custom-typewriter"
    />
  );
};

export default TypeWriterComp;
