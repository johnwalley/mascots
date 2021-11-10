import anime from "animejs/lib/anime.es";
import React, { useEffect, useRef } from "react";

import { Mascot } from "./Mascot";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Mascot",
  component: Mascot,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const progress = useRef(null!);

  useEffect(() => {
    progress.current = anime({
      targets: "progress",
      value: 100,
      duration: 5000,
      easing: "linear",
      autoplay: false,
    });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Mascot {...args} />
    </div>
  );
};

export const Neutral = Template.bind({});
Neutral.args = {};
