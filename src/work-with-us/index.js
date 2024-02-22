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
  const splittWords = new SplitType(".wave-text, .section_work-hero h1", {
    types: "lines, words",
  });

  wrapLines(".section_work-hero h1 .line");

  function underlineTitle(target) {
    target = document.querySelectorAll(target);
    target.forEach((el) => {
      //Target first matched heading
      const heading = el.querySelector("h1, h2, h3, h4, h5, h6");
      //Split heading into lines and words
      const text = new SplitType(heading, { types: "lines, words" });
      //Wrap words into 1 parent span
      text.lines.forEach((line) => {
        const wrapperSpan = document.createElement("span");
        const words = line.querySelectorAll(".word");
        words.forEach((word) => {
          wrapperSpan.appendChild(word);
        });
        line.innerHTML = "";
        line.appendChild(wrapperSpan);
      });

      el.addEventListener("mouseenter", () => {
        gsap.to(heading.querySelectorAll(".line span"), {
          "--line-width": "100%",
          ease: "power3.out",
          duration: 0.6,
          stagger: { each: 0.1 },
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(heading.querySelectorAll(".line span"), {
          "--line-width": "0%",
          duration: 0.6,
          stagger: { each: 0.1 },
        });
      });
    });
  }

  underlineTitle(".featured-container");

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
        duration: 0.6,
        y: "0%",
        rotateX: 0,
        transformOrigin: "center center",
        //stagger: { each: 0.05 },
      })
      .to(".wave-title-container", {
        delay: 0.2,
        "--col2": "1fr",
        duration: 3,
        ease: "power4.out",
      })
      .to(
        ".section_work-hero h1 .line",
        {
          opacity: 1,
          duration: 0.6,
          rotateX: 0,
          transformOrigin: "center center",
          y: "0%",
          stagger: { each: 0.025 },
        },
        "<20%"
      )
      .to(
        ".filter_component",
        {
          opacity: 1,
          y: "0%",
          duration: 1,
        },
        "<0%"
      )
      .to(
        ".work_item",
        {
          opacity: 1,
          y: "0%",
          duration: 1,
          stagger: { each: 0.05 },
        },
        "<30%"
      )
      .to(
        ".navbar1_component",
        {
          opacity: 1,
          y: "0%",
          duration: 1,
        },
        "<0%"
      );
  }
});