import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { Draggable } from "gsap/all";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

imagesLoaded(".page-wrapper", () => {
  const splittWords = new SplitType(
    ".wave-text, .section_hero-about h1, .about_heading, .section_layout-shop h2, .values-container h4, .section_values h3, .section_values h4, .section_team h3, .section_team p.heading-style-h4, .section_jobs h3, .section_clients h3",
    {
      types: "lines, words",
    }
  );
  const splitChars = new SplitType("[data-text-fade-in] span", {
    types: "lines, words, chars",
  });

  wrapLines(".section_hero-about h1 .line");
  wrapLines(".about_heading .line");
  wrapLines(".section_layout-shop h2 .line");
  wrapLines(".values-container h4");
  wrapLines(".section_values h3 .line");
  wrapLines(".section_values h4 .line");
  wrapLines(".section_team .heading-style-h4 .line");

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

  function pageLoad() {
    const heroTl = gsap.timeline();

    heroTl
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
        ".section_hero-about h1 .line",
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
      )
      .to(
        ".centered_image",
        {
          opacity: 1,
          y: "0%",
          scale: 1,
          duration: 1.5,
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
      )
      .to(
        ".section_text",
        {
          opacity: 1,
          duration: 0.6,
        },
        "<0%"
      );
  }

  //Centered text fade in from opacity 0.05
  const fadeInText = document.querySelectorAll("[data-text-fade-in]");
  fadeInText.forEach((text) => {
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: text,
        start: "top 70%",
        end: "bottom 90%",
        scrub: 1.1,
      },
    });
    textTl.to(text.querySelectorAll(".word"), {
      opacity: 1,
      stagger: { amount: 2 },
    });
  });

  //2 col component reveal
  const twoColReveal = document.querySelectorAll(".section_about");

  twoColReveal.forEach((el) => {
    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 60%",
        end: "top 40%",
      },
    });
    revealTl
      .to(el.querySelector(".about_image"), {
        opacity: 1,
        y: "0%",
        scale: 1,
        duration: 1.4,
      })
      .to(
        el.querySelectorAll(".about_heading .line"),
        {
          opacity: 1,
          duration: 0.8,
          rotateZ: 0,
          transformOrigin: "left top",
          y: "0%",
          stagger: { each: 0.025 },
        },
        0
      );
  });

  //Shop
  const shopTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_social",
      start: "top 60%",
      end: "top 40%",
    },
  });
  shopTl
    .to(".section_social h4", {
      opacity: 1,
      duration: 0.8,
      rotateZ: 0,
      transformOrigin: "left top",
      y: "0%",
    })
    .to(
      ".section_social .social_button-row a",
      {
        opacity: 1,
        duration: 0.8,
        rotateX: 0,
        transformOrigin: "left top",
        y: "0%",
        stagger: { each: 0.025 },
      },
      "<20%"
    );

  //Values
  const valuesContainers = document.querySelectorAll(".values-container");
  textIntoView(".section_values h3 .word", ".section_values");
  valuesContainers.forEach((el) => {
    const valuesTl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 60%",
        end: "top 40%",
      },
    });
    valuesTl
      .to(el.querySelector(".values-wave"), {
        x: "0%",
        duration: 0.8,
      })
      .to(
        el.querySelectorAll(".section_values .heading-style-h5"),
        {
          opacity: 1,
          duration: 0.8,
          stagger: { each: 0.1 },
        },
        "<30%"
      )
      .to(
        el.querySelectorAll(".section_values h4 .line"),
        {
          opacity: 1,
          duration: 0.8,
          rotateZ: 0,
          transformOrigin: "left top",
          y: "0%",
          stagger: { each: 0.025 },
        },
        "<20%"
      );
  });

  //Cursor
  const cursor = document.querySelector(".custom-cursor");

  (function () {
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    // Pointer move event to move the cursor
    document.addEventListener("pointermove", moveCursor);

    function moveCursor(e) {
      gsap.to(cursor, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
      });
    }

    // Pointer down event to scale down the cursor
    document.addEventListener("pointerdown", function () {
      gsap.to(cursor, {
        duration: 0.5,
        scale: 0.8,
      });
    });

    // Pointer up event to scale the cursor back to normal
    document.addEventListener("pointerup", function () {
      gsap.to(cursor, {
        duration: 0.5,
        scale: 1,
      });
    });
  })();

  //Team

  const teamSwiper = new Swiper(".team-wrapper.swiper", {
    slidesPerView: "auto",
    loop: true,
    freeMode: true,
  });

  const teamSlider = document.querySelector(".team-wrapper.swiper");
  teamSlider.addEventListener("mouseenter", function () {
    cursor.classList.add("is-active");
  });
  teamSlider.addEventListener("mouseleave", function () {
    cursor.classList.remove("is-active");
  });

  textIntoView(".section_team h3 .word", ".section_team");
  const teamTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_team",
      start: "top 60%",
      end: "top 40%",
    },
  });
  teamTl
    .to(".section_team h3 .line", {
      opacity: 1,
      duration: 0.8,
      rotateZ: 0,
      transformOrigin: "left top",
      y: "0%",
      stagger: { each: 0.025 },
    })
    .to(
      ".section_team p.heading-style-h4 .line",
      {
        opacity: 1,
        duration: 0.8,
        rotateZ: 0,
        transformOrigin: "left top",
        y: "0%",
        stagger: { each: 0.025 },
      },
      "<50%"
    );

  //Jobs

  const jobsTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_jobs",
      start: "top 60%",
      end: "top 40%",
    },
  });
  jobsTl
    .to(".section_jobs h3 .word", {
      opacity: 1,
      duration: 0.8,
      rotateZ: 0,
      transformOrigin: "left top",
      y: "0%",
      stagger: { each: 0.025 },
    })
    .to(
      ".accordion_wrap",
      {
        opacity: 1,
        duration: 0.8,
        y: "0%",
        stagger: { each: 0.05 },
      },
      "<30%"
    );

  //Clients
  const clientsTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_clients",
      start: "top 50%",
      end: "top 40%",
    },
  });
  clientsTl
    .to(".section_clients h3 .word", {
      opacity: 1,
      duration: 0.8,
      rotateZ: 0,
      transformOrigin: "left top",
      y: "0%",
      stagger: { each: 0.025 },
    })
    .to(
      ".client-grid h5",
      {
        opacity: 1,
        duration: 0.8,
        stagger: { each: 0.015, from: "random" },
      },
      "<20%"
    );
});
