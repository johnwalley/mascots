import React, { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import styles from "./mascot.module.css";

function clamp(
  value: number,
  min: number = -Infinity,
  max: number = +Infinity
) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Interactive ghosts of centralised liquidity
 */
export const Mascot = ({ ...props }) => {
  const ref = useRef(null!);
  const center = useRef([0, 0]);
  const mouth = useRef(null);

  const handleMouseMove = (ev: MouseEvent) => {
    anime.set("#body", {
      rotateY: clamp((ev.pageX - center.current[0]) / 10, -45, 45),
      rotateX: clamp(-(ev.pageY - center.current[1]) / 10, -45, 45),
      perspective: 400,
      transformOrigin: "56px 153.571px",
    });
  };

  useEffect(() => {
    const callback = function (mutationsList, observer) {
      // Use traditional 'for loops' for IE 11
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          console.log("A child node has been added or removed.");
        } else if (mutation.type === "attributes") {
          console.log(ref.current.style);

          console.log(
            "The " + mutation.attributeName + " attribute was modified."
          );
        }
      }
    };

    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(ref.current, {
      attributes: true,
      childList: false,
      subtree: false,
    });

    // Later, you can stop observing
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = document.getElementById("body");

    const bbox = el.getBoundingClientRect();

    if (bbox) {
      center.current = [bbox.x + bbox.width / 2, bbox.y + bbox.height / 2];
    }

    anime({
      targets: "#body",
      loop: false,
      easing: "linear",
      autoplay: false,
      perspective: 200,
    });

    anime({
      targets: "#eyes",
      easing: "easeOutElastic(1, .8)",
      loop: true,
      transformOrigin: "38px 50px",
      scaleY: [
        { value: 1, duration: 2500, delay: 0 },
        { value: 0, duration: 200, delay: 100 },
        { value: 1, duration: 300, delay: 0 },
      ],
    });

    mouth.current = anime({
      targets: "#mouth",
      easing: "spring(1, 80, 10, 0)",
      loop: false,
      scaleX: [
        { value: 1, duration: 0, delay: 0 },
        { value: 0.4, duration: 0, delay: 500 },
        { value: 1, duration: 300, delay: 100 },
      ],
      scaleY: [
        { value: 1, duration: 0, delay: 0 },
        { value: 3, duration: 0, delay: 500 },
        { value: 1, duration: 300, delay: 100 },
      ],
      autoplay: true,
    });
  }, []);

  useEffect(() => {
    addEventListener("mousemove", handleMouseMove);
    return () => removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={ref} className={styles.root}>
      <svg
        width="112"
        height="215"
        viewBox="0 0 112 215"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.legs}
      >
        <g>
          <path
            d="M48.3643 153.571H43.2734V215H48.3643V153.571Z"
            fill="black"
          />
          <path
            d="M68.7276 153.571H63.6367V215H68.7276V153.571Z"
            fill="black"
          />
        </g>
      </svg>
      <svg
        id="body"
        width="112"
        height="215"
        viewBox="0 0 112 215"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => {
          mouth.current.restart();
        }}
      >
        <g>
          <path
            id="left-arm"
            d="M5.09091 153.571V87.4845L11.9636 80.5737L54.0655 131.252L57.9345 127.976L12.32 72.9976L0 85.3345V153.571H5.09091Z"
            fill="black"
          />
          <path
            id="right-arm"
            d="M112.001 153.571V85.3345L99.681 72.9976L54.0664 127.976L57.9355 131.252L100.037 80.5737L106.91 87.4845V153.571H112.001Z"
            fill="black"
          />
          <path d="M104.364 0H7.63672V153.571H104.364V0Z" fill="white" />
          <g id="eyes">
            <path
              d="M38.1808 46.0713H33.0898V51.1903H38.1808V46.0713Z"
              fill="black"
            />
            <path
              d="M43.2745 51.1904H38.1836V56.3095H43.2745V51.1904Z"
              fill="black"
            />
            <path
              d="M48.3643 56.3096H43.2734V61.4286H48.3643V56.3096Z"
              fill="black"
            />
            <path
              d="M38.1808 56.3096H33.0898V61.4286H38.1808V56.3096Z"
              fill="black"
            />
            <path
              d="M48.3643 46.0713H43.2734V51.1903H48.3643V46.0713Z"
              fill="black"
            />
            <path
              d="M68.7276 46.0713H63.6367V51.1903H68.7276V46.0713Z"
              fill="black"
            />
            <path
              d="M73.8175 51.1904H68.7266V56.3095H73.8175V51.1904Z"
              fill="black"
            />
            <path
              d="M78.9073 56.3096H73.8164V61.4286H78.9073V56.3096Z"
              fill="black"
            />
            <path
              d="M68.7276 56.3096H63.6367V61.4286H68.7276V56.3096Z"
              fill="black"
            />
            <path
              d="M78.9073 46.0713H73.8164V51.1903H78.9073V46.0713Z"
              fill="black"
            />
          </g>
          <g id="mouth" className={styles.mouth}>
            <path
              d="M78.908 71.667H33.0898V76.786H78.908V71.667Z"
              fill="black"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
