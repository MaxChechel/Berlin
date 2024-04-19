import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);
let mm = gsap.matchMedia();
document.addEventListener("DOMContentLoaded", () => {
  const splittWords = new SplitType(
    " h1, .wave-title-container h3, .section_header h3, .section_header p",
    {
      types: "lines, words",
    }
  );

  wrapLines("h1 .line");
  wrapLines(".section_header h3 .line");
  wrapLines(".section_header p .line");

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
        onComplete: () => {
          // Desktop
          mm.add("(min-width: 700px)", () => {
            pageLoadDesktop();
          });
          //Mobile
          mm.add("(max-width: 699px)", () => {
            pageLoadMobile();
          });
        },
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

  function pageLoadDesktop() {
    const heroTl = gsap.timeline();

    heroTl
      .to(".header5_background-image", {
        opacity: 1,
        scale: 1,
        duration: 1.5,
      })
      .to(
        "#client-name",
        {
          opacity: 1,
          duration: 1,
          y: "0%",
          ease: "power4.out",
        },
        "<20%"
      )
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
        ".navbar1_component",
        {
          opacity: 1,
          y: "0%",
          duration: 1,
        },
        "<"
      );
  }

  function pageLoadMobile() {
    const heroTl = gsap.timeline();

    heroTl
      .to(".header5_background-image", {
        opacity: 1,
        scale: 1,
        duration: 1.5,
      })
      .to(
        "#client-name",
        {
          opacity: 1,
          duration: 1,
          y: "0%",
          ease: "power4.out",
        },
        "<20%"
      )
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
        ".section_header h3 .line",
        {
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          y: "0%",
          rotateZ: 0,
          transformOrigin: "left bottom",
          stagger: { each: 0.025 },
        },
        "<20%"
      )
      .to(
        ".section_header p .line",
        {
          opacity: 1,
          duration: 2,
          ease: "power4.out",
          stagger: { each: 0.025 },
        },
        "<20%"
      )
      .to(
        ".section_header .headerwork_what-we-did",
        {
          opacity: 1,
          duration: 0.6,
          y: "0%",
          ease: "power4out",
        },
        "<2%"
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

  //Quote
  const quotes = document.querySelectorAll("[data-animate-quote]");
  quotes.forEach((quote) => {
    if (quote) {
      const splittWords = new SplitType(quote.querySelector("h4"), {
        types: "lines, words",
      });
      const lines = quote.querySelectorAll("h4 .line");
      const quoteHeading = quote.querySelector("#quote-heading");

      quote.querySelectorAll("h4 .line").forEach((line) => {
        const wrapEl = document.createElement("div");
        wrapEl.classList = "overflow-hidden";
        line.parentNode.appendChild(wrapEl);
        wrapEl.appendChild(line);
      });

      const textIntoViewtl = gsap.timeline({
        scrollTrigger: {
          trigger: quote,
          start: "top 60%",
          end: "top 40%",
        },
      });
      textIntoViewtl
        .to(quoteHeading, {
          opacity: 1,
          duration: 1,
          y: "0%",
          ease: "power4.out",
        })
        .to(
          lines,
          {
            opacity: 1,
            duration: 1.4,
            rotateX: 0,
            transformOrigin: "center center",
            y: "0%",
            ease: "power4.out",
            stagger: { each: 0.025 },
          },
          "<20%"
        );
    }
  });

  mm.add("(min-width: 700px)", () => {
    //Header
    const headerRevealTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section_header",
        start: "top 60%",
        end: "top 40%",
      },
    });

    headerRevealTl
      .to(".section_header h3 .line", {
        opacity: 1,
        duration: 1.4,
        ease: "power4.out",
        y: "0%",
        rotateZ: 0,
        transformOrigin: "left bottom",
        stagger: { each: 0.025 },
      })
      .to(
        ".section_header p .line",
        {
          opacity: 1,
          duration: 2,
          ease: "power4.out",
          stagger: { each: 0.025 },
        },
        "<20%"
      )
      .to(
        ".section_header .headerwork_what-we-did",
        {
          opacity: 1,
          duration: 0.6,
          y: "0%",
          ease: "power4out",
        },
        "<2%"
      );
  });

  //Images
  const images = document.querySelectorAll(".gallery_image");
  images.forEach((image) => {
    const imgRevealTl = gsap.timeline({
      scrollTrigger: {
        trigger: image.closest("div"),
        start: "top 60%",
        end: "top 40%",
      },
    });
    imgRevealTl.to(image, {
      opacity: 1,
      y: "0%",
      scale: 1,
      duration: 1.4,
    });
  });

  //Video reveal
  const videos = document.querySelectorAll(".video_lightbox-image");
  videos.forEach((video) => {
    const vidRevealTl = gsap.timeline({
      scrollTrigger: {
        trigger: video.closest("div"),
        start: "top 60%",
        end: "top 40%",
      },
    });
    vidRevealTl
      .to(video, {
        opacity: 1,
        y: "0%",
        scale: 1,
        duration: 1.4,
      })
      .to(
        video.querySelector("#fullscreen-button"),
        { opacity: 1, duration: 0.8 },
        "<30%"
      )
      .to(
        video.querySelector("#custom-play-button"),
        { opacity: 1, duration: 0.8 },
        "<0%"
      );
  });

  //Work
  const workRevealTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_work",
      start: "top 60%",
      end: "top 40%",
    },
  });
  workRevealTl
    .to(".wave-title-container h3 .word", {
      opacity: 1,
      duration: 0.6,
      y: "0%",
      rotateX: 0,
      transformOrigin: "center center",
    })
    .to(".wave-title-container", {
      delay: 0.2,
      "--col2": "1fr",
      duration: 2,
      ease: "power4.out",
    })
    .to(
      ".work_item",
      {
        opacity: 1,
        y: "0%",
        duration: 1,
        ease: "power4.out",
        stagger: { each: 0.075 },
      },
      0.6
    )
    .to(
      ".section_work .button",
      {
        opacity: 1,
        duration: 0.6,
        y: "0%",
        ease: "power4out",
      },
      "<10%"
    );
});
