import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const splittWords = new SplitType(" h1", {
    types: "lines, words",
  });
  const splitChars = new SplitType("[data-text-fade-in]", {
    types: "lines, words, chars",
  });

  wrapLines("h1 .line");

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
      .to(loaderWrap, {
        delay: 0.4,
        opacity: 0,
        duration: 0.6,
        onComplete: pageLoad,
      });
  }
  loaderSimple();

  function wrapLines(selector) {
    document.querySelectorAll(selector).forEach((line) => {
      const wrapEl = document.createElement("div");
      wrapEl.classList = "overflow-hidden";
      line.parentNode.appendChild(wrapEl);
      wrapEl.appendChild(line);
    });
  }

  function pageLoad() {
    const heroTl = gsap.timeline();

    heroTl
      .to("#category-text", {
        opacity: 1,
        duration: 1,
        y: "0%",
        ease: "power4.out",
      })
      .to(
        " h1 .line",
        {
          opacity: 1,
          duration: 1.4,
          rotateX: 0,
          transformOrigin: "center center",
          y: "0%",
          ease: "power4.out",
          stagger: { each: 0.025 },
        },
        "<10%"
      )
      .to(
        "#date-text",
        {
          opacity: 1,
          duration: 1,
          y: "0%",
          ease: "power4.out",
        },
        "<30%"
      )
      .to(
        ".blog-post-header_image",
        {
          opacity: 1,
          y: "0%",
          scale: 1,
          duration: 1.5,
        },
        "<20%"
      )
      .to(
        ".navbar1_component",
        {
          opacity: 1,
          y: "0%",
          duration: 1,
        },
        "<"
      );
  }
});
