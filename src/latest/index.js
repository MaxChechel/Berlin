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
  function singleUnderlineTitle(el) {
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
    });

    el.addEventListener("mouseenter", () => {
      gsap.to(heading.querySelectorAll(".line"), {
        "--line-width": "100%",
        ease: "power3.out",
        duration: 0.6,
        stagger: { each: 0.1 },
      });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(heading.querySelectorAll(".line"), {
        "--line-width": "0%",
        duration: 0.6,
        stagger: { each: 0.1 },
      });
    });
  }

  function underlineTitle(target) {
    target = document.querySelectorAll(target);
    target.forEach((el) => {
      singleUnderlineTitle(el);
    });
  }

  underlineTitle(".featured-item");
  underlineTitle(".latest-card");

  gsap.set(".latest-grid-item", { opacity: 0 });

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
        onComplete: windowHeight > 640 ? pageLoadTl : pageLoadSmallTl,
      });
  }
  loaderSimple();

  function pageLoadTl() {
    const heroLoadTl = gsap.timeline();

    heroLoadTl
      .to(".featured-item", {
        opacity: 1,
        y: "0%",
        duration: 1.5,
      })
      .to(
        ".latest-home_featured-image-2",
        {
          opacity: 1,
          y: "0%",
          scale: 1,
          duration: 1.5,
        },
        "<10%"
      )
      .to(
        ".featured-item .heading-body-20",
        {
          opacity: 1,
          duration: 0.8,
          rotateZ: 0,
          transformOrigin: "left top",
          y: "0%",
        },
        "<10%"
      )
      .to(
        ".featured-item .heading-body-18",
        {
          opacity: 1,
          duration: 0.8,
          rotateZ: 0,
          transformOrigin: "left top",
          y: "0%",
        },
        "<10%"
      )
      .to(
        ".featured-item_title .line",
        {
          opacity: 1,
          duration: 0.8,
          rotateZ: 0,
          transformOrigin: "left top",
          y: "0%",
          stagger: { each: 0.025 },
        },
        "<10%"
      )
      .to(
        ".featured-item",
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
        ".latest-grid-item",
        {
          opacity: 1,
          duration: 1,
          stagger: { each: 0.05 },
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
      );
  }
  function pageLoadSmallTl() {
    const heroLoadTl = gsap.timeline();

    heroLoadTl
      .to(".featured-item", {
        opacity: 1,
        y: "0%",
        duration: 1.5,
      })
      .to(
        ".latest-home_featured-image-2",
        {
          opacity: 1,
          y: "0%",
          scale: 1,
          duration: 1.5,
        },
        "<10%"
      )
      .to(
        ".featured-item .heading-body-20",
        {
          opacity: 1,
          duration: 0.8,
          rotateZ: 0,
          transformOrigin: "left top",
          y: "0%",
        },
        "<10%"
      )
      .to(
        ".featured-item .heading-body-18",
        {
          opacity: 1,
          duration: 0.8,
          rotateZ: 0,
          transformOrigin: "left top",
          y: "0%",
        },
        "<10%"
      )
      .to(
        ".featured-item_title .line",
        {
          opacity: 1,
          duration: 0.8,
          rotateZ: 0,
          transformOrigin: "left top",
          y: "0%",
          stagger: { each: 0.025 },
        },
        "<10%"
      )
      .to(
        ".featured-item",
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

  if (windowHeight < 640) {
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

  //Mutation observer for new loaded items
  const cardsList = document.querySelector(".latest-grid-list");

  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          // Check if the added node is the type of element you want to animate
          if (
            node.nodeType === 1 &&
            node.classList.contains("latest-grid-item")
          ) {
            //Animations
            const card = node.querySelector(".latest-card");
            singleUnderlineTitle(card);
          }
        });
      }
    }
  });
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsload",
    (listInstances) => {
      console.log("cmsload Successfully loaded!");
      observer.observe(cardsList, {
        childList: true,
        subtree: true,
      });
    },
  ]);
});
