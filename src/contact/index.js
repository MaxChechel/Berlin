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
  const splittWords = new SplitType(".wave-text, h1", {
    types: "lines, words",
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
        onComplete: pageLoadTl,
      });
  }
  loaderSimple();

  function pageLoadTl() {
    const heroLoadTl = gsap.timeline();

    heroLoadTl
      .to(".wave-text .word", {
        opacity: 1,
        duration: 1,
        y: "0%",
        rotateX: 0,
        transformOrigin: "center center",
        ease: "power4.out",
      })
      .to(".wave-title-container", {
        delay: 0.2,
        "--col2": "1fr",
        duration: 3,
        ease: "power4.out",
      })
      .to(
        " h1 .line",
        {
          opacity: 1,
          duration: 0.6,
          rotateZ: 0,
          transformOrigin: "left bottom",
          y: "0%",
        },
        "<20%"
      )
      .to(
        ".contact_content-text span",
        {
          opacity: 1,
          duration: 1,
          stagger: { each: 0.025 },
        },
        "<50%"
      )
      .to(
        ".navbar1_component",
        {
          opacity: 1,
          y: "0%",
          duration: 1,
        },
        "<0%"
      )
      .to(
        ".footer_logo-link",
        {
          y: "0%",
          opacity: 1,
          ease: "power4.inOut",
          duration: 1.8,
        },
        "<0%"
      );
  }
});
