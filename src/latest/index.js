import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import SplitType from "split-type";

let windowHeight = window.innerHeight;
window.addEventListener("resize", function () {
  windowHeight = window.innerHeight;
});

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

  function underlineTitle(target) {
    target = document.querySelectorAll(target);
    target.forEach((el) => {
      //Target first matched heading
      const heading = el.querySelector("h1, h2, h3, h4, h5, h6");
      //Split heading into lines and words
      const text = new SplitType(heading, { types: "lines, words" });

      //Wrap words into 1 parent span
      text.lines.forEach((line) => {
        const wrapEl = document.createElement("div");
        wrapEl.classList = "overflow-hidden";
        line.parentNode.appendChild(wrapEl);
        wrapEl.appendChild(line);

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
        onComplete: windowHeight > 840 ? pageLoadTl : pageLoadSmallTl,
      });
  }
  loaderSimple();

  function pageLoadTl() {
    const heroLoadTl = gsap.timeline();

    heroLoadTl
      .to(".featured-image", {
        opacity: 1,
        y: "0%",
        scale: 1,
        duration: 1.5,
      })
      .to(
        ".featured-title .text-style-allcaps",
        {
          opacity: 1,
          duration: 0.8,
          rotateZ: 0,
          transformOrigin: "left top",
          y: "0%",
        },
        "<20%"
      )
      .to(
        ".latest-title .line",
        {
          opacity: 1,
          duration: 0.8,
          rotateZ: 0,
          transformOrigin: "left top",
          y: "0%",
          stagger: { each: 0.025 },
        },
        "<20%"
      )
      .to(
        ".image-overlay",
        {
          display: "block",
          duration: 0,
        },
        "<50%"
      )
      .to(
        ".featured-latest-item",
        {
          pointerEvents: "all",
          duration: 0,
        },
        "<"
      )
      .to(
        ".filter_component-dark",
        {
          opacity: 1,
          y: "0%",
          duration: 1,
        },
        "<0%"
      )
      .to(".latest-grid-item", {
        opacity: 1,
        duration: 1,
        stagger: { each: 0.05 },
      })
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
  function pageLoadSmallTl() {
    const heroLoadTl = gsap.timeline();

    heroLoadTl
      .to(".featured-image", {
        opacity: 1,
        y: "0%",
        scale: 1,
        duration: 1.5,
      })
      .to(
        ".featured-title .text-style-allcaps",
        {
          opacity: 1,
          duration: 0.8,
          rotateZ: 0,
          transformOrigin: "left top",
          y: "0%",
        },
        "<20%"
      )
      .to(
        ".latest-title .line",
        {
          opacity: 1,
          duration: 0.8,
          rotateZ: 0,
          transformOrigin: "left top",
          y: "0%",
          stagger: { each: 0.025 },
        },
        "<20%"
      )
      .to(
        ".image-overlay",
        {
          display: "block",
          duration: 0,
        },
        "<50%"
      )
      .to(
        ".featured-latest-item",
        {
          pointerEvents: "all",
          duration: 0,
        },
        "<"
      )
      .to(
        ".filter_component-dark",
        {
          opacity: 1,
          y: "0%",
          duration: 1,
        },
        "<0%"
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

  if (windowHeight < 840) {
    const latestCards = document.querySelectorAll(".latest-grid-item");
    gsap.set([latestCards, ".pagination"], {
      opacity: 0,
    });
    latestCards.forEach((el) => {
      const latestCardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 60%",
          end: "top 40%",
        },
      });
      latestCardsTl.to(el, {
        opacity: 1,
        duration: 1,
      });
    });
    const paginationTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".pagination",
        start: "top 75%",
        end: "top 40%",
      },
    });
    paginationTl.to(".pagination", {
      opacity: 1,
      duration: 1,
    });
  }
});
