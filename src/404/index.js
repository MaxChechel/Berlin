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
//Window to top on page refresh
function toPageTop() {
  let isRefreshing = false;
  window.addEventListener("beforeunload", function () {
    isRefreshing = true;
  });
  window.addEventListener("unload", function () {
    if (isRefreshing) {
      window.scrollTo(0, 0);
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  toPageTop();
  const splittWords = new SplitType(".wave-text, h4", {
    types: "lines, words",
  });
  wrapLines("h4 .line");
  gsap.set(".wave-text, h4", { opacity: 1 });
  pageLoadTl();

  function pageLoadTl() {
    const heroLoadTl = gsap.timeline();

    heroLoadTl
      .to(".wave-text .word", {
        delay: 0.5,
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
        "._404-image",
        {
          opacity: 1,
          duration: 1.6,
          rotateZ: 0,
          ease: "power4.out",
          transformOrigin: "left bottom",
        },
        "<10%"
      )
      .to(
        " h4 .line",
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
        ".button",
        {
          opacity: 1,
          duration: 0.6,
          y: "0%",
          ease: "power4out",
        },
        "<5%"
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
