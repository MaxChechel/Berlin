import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

function wrapLines(selector) {
  document.querySelectorAll(selector).forEach((line) => {
    const wrapEl = document.createElement("div");
    wrapEl.classList = "overflow-hidden";
    line.parentNode.appendChild(wrapEl);
    wrapEl.appendChild(line);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const splittWords = new SplitType(".wave-text, .section_work-hero h1", {
    types: "lines, words",
  });

  wrapLines(".section_work-hero h1 .line");

  function loaderSimple() {
    const loaderWrap = document.querySelector(".loader-page_component");
    const loaderLogo = loaderWrap.querySelector(".loader3_image");

    const loaderTl = gsap.timeline();
    loaderTl
      .to(loaderLogo, {
        delay: 0.2,
        y: "0%",
        opacity: 1,
        duration: 0.8,
        ease: "expo.out",
      })
      .to(loaderLogo, {
        y: "-100%",
        opacity: 0,
        duration: 0.6,
        ease: "expo.in",
      })
      .to(
        ".loader3_background",
        {
          "--loader-second-color": "rgba(242, 151, 237, 0)",
          duration: 0.5,
          ease: "expo.out",
        },
        "<70%"
      )
      .to(
        ".loader3_background",
        {
          y: "-100%",
          duration: 0.6,
          ease: "expo.out",
          onComplete: pageLoadTl,
        },
        "<30%"
      );
  }
  loaderSimple();

  function pageLoadTl() {
    const heroLoadTl = gsap.timeline();

    heroLoadTl
      .to(".wave-text .word", {
        opacity: 1,
        duration: 0.7,
        y: "0%",
        rotateX: 0,
        transformOrigin: "center center",
        ease: "power4.out",
      })
      .to(
        ".wave-title-container",
        {
          //delay: 0.1,
          "--col2": "1fr",
          duration: 2.2,
          ease: "power4.out",
        },
        "<90%"
      )
      .to(
        ".section_work-hero h1 .line",
        {
          opacity: 1,
          duration: 1,
          rotateX: 0,
          transformOrigin: "center center",
          y: "0%",
          ease: "power4.out",
          stagger: { each: 0.025 },
        },
        "<10%"
      )
      .to(
        ".filter_component",
        {
          opacity: 1,
          y: "0%",
          duration: 0.8,
        },
        "<0%"
      )
      .to(
        ".work_item",
        {
          opacity: 1,
          y: "0%",
          duration: 0.8,
          stagger: { each: 0.05 },
        },
        "<30%"
      )
      .to(
        ".navbar1_component",
        {
          opacity: 1,
          y: "0%",
          duration: 0.8,
        },
        "<0%"
      );
  }
});
