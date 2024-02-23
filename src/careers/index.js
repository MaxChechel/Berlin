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

function textIntoView(selector, trigger) {
  const textIntoViewtl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: "top 60%",
      end: "top 40%",
    },
  });
  textIntoViewtl.to(selector, {
    opacity: 1,
    duration: 0.8,
    rotateZ: 0,
    transformOrigin: "left top",
    y: "0%",
    stagger: { each: 0.025 },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const splittWords = new SplitType(
    ".wave-text, h1, .positions_content h2, .section_positions h3, .positions-items h4, .careers_component .positions_content p, [data-positions='text']",
    {
      types: "lines, words",
    }
  );

  wrapLines("h1 .line");
  wrapLines(".positions_content h2 .line");
  wrapLines(".section_positions h3 .line");
  wrapLines(".positions-items h4 .line");

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
          duration: 0.8,
          rotateZ: 0,
          transformOrigin: "left bottom",
          y: "0%",
          stagger: { each: 0.025 },
        },
        "<10%"
      )
      .to(
        ".positions_content h2 .line",
        {
          opacity: 1,
          duration: 0.8,
          rotateZ: 0,
          transformOrigin: "left bottom",
          y: "0%",
          stagger: { each: 0.025 },
        },
        "<20%"
      )
      .to(
        ".careers_component .positions_content:first-child p .line",
        {
          opacity: 1,
          duration: 1.6,
          ease: "power4.out",
          stagger: { each: 0.025 },
        },
        "<10%"
      )
      .to(
        ".careers_component .positions_content:last-child p .line",
        {
          opacity: 1,
          duration: 1.6,
          ease: "power4.out",
          stagger: { each: 0.025 },
        },
        "<10%"
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

  textIntoView(".section_positions h3 .line", ".section_positions");

  //Job positions
  const jobPosts = document.querySelectorAll(".positions-items");
  jobPosts.forEach((el) => {
    const heading = el.querySelectorAll("h4 .line");
    const subHeading = el.querySelector('[data-positions="subheading"]');
    const text = el.querySelectorAll('[data-positions="text"] .line');
    const question = el.querySelector('[data-positions="question"]');
    const contact = el.querySelector('[data-positions="contact"]');

    const jobPostsTl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 60%",
        end: "top 40%",
      },
    });
    jobPostsTl
      .to(heading, {
        opacity: 1,
        duration: 0.8,
        rotateZ: 0,
        transformOrigin: "left bottom",
        y: "0%",
        stagger: { each: 0.025 },
      })
      .to(
        subHeading,
        {
          opacity: 1,
          duration: 0.8,
        },
        "<50%"
      )
      .to(
        text,
        {
          opacity: 1,
          duration: 2,
          ease: "power4.out",
          stagger: { each: 0.025 },
        },
        "<10%"
      )
      .to(
        question,
        {
          opacity: 1,
          duration: 0.8,
        },
        "<10%"
      )
      .to(
        contact,
        {
          opacity: 1,
          duration: 0.8,
        },
        "<10%"
      );
  });
});
