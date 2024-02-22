import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { Draggable } from "gsap/all";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger, Draggable);

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

  const splittWords = new SplitType(
    ".wave-text, .section_hero-about h1, .about_heading, .section_layout-shop h2, .values-container h4, .section_values h3, .section_values h4, .section_team h3, .section_team .heading-style-h4, .section_jobs h3, .section_clients h3",
    {
      types: "lines, words",
    }
  );
  const splitChars = new SplitType("[data-text-fade-in]", {
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
      );
  }

  //Centered text fade in from opacity 0.05
  const fadeInText = document.querySelectorAll("[data-text-fade-in]");
  fadeInText.forEach((text) => {
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: text,
        start: "top 70%",
        end: "top 40%",
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
      trigger: ".section_layout-shop",
      start: "top 60%",
      end: "top 40%",
    },
  });
  shopTl
    .to(".section_layout-shop img", {
      opacity: 1,
      y: "0%",
      scale: 1,
      duration: 1.4,
    })
    .to(
      ".section_layout-shop p",
      {
        opacity: 1,
        duration: 0.8,
        rotateZ: 0,
        transformOrigin: "left top",
        y: "0%",
      },
      0
    )
    .to(
      ".section_layout-shop h2 .line",
      {
        opacity: 1,
        duration: 0.8,
        rotateZ: 0,
        transformOrigin: "left top",
        y: "0%",
        stagger: { each: 0.025 },
      },
      "<0%"
    )
    .to(
      ".section_layout-shop .button-group",
      {
        opacity: 1,
        duration: 0.8,
      },
      "<80%"
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
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
    });
    document.addEventListener("pointermove", movecursor);
    function movecursor(e) {
      gsap.to(cursor, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
      });
    }
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
    .to(".section_team h3 .word", {
      opacity: 1,
      duration: 0.8,
      rotateZ: 0,
      transformOrigin: "left top",
      y: "0%",
      stagger: { each: 0.025 },
    })
    .to(
      ".section_team .heading-style-h4 .line",
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
  jobsTl
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
        stagger: { each: 0.025, from: "random" },
      },
      "<20%"
    );
});

// const getMousePos = (e) => {
//   return {
//     x: e.clientX,
//     y: e.clientY,
//   };
// };

// // Linear interpolation
// const lerp = (a, b, n) => (1 - n) * a + n * b;

// //Grab mouse position and set it to mouse state
// let mouse = { x: 0, y: 0 };
// window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));

// export default class Cursor {
//   constructor(el) {
//     this.Cursor = el;
//     this.Cursor.style.opacity = 0;

//     this.cursorCnfigs = {
//       x: { previous: 0, current: 0, amt: 0.2 },
//       y: { previous: 0, current: 0, amt: 0.2 },
//     };

//     this.onMouseMoveEv = () => {
//       this.cursorCnfigs.x.previous = this.cursorCnfigs.x.current = mouse.x;
//       this.cursorCnfigs.y.previous = this.cursorCnfigs.y.current = mouse.y;

//       // Set cursor opacity to 1 when hovered on the screen
//       gsap.to(this.Cursor, {
//         duration: 1,
//         ease: "Power3.easeInOut",
//         opacity: 1,
//       });

//       //    requestAnimationFrame
//       requestAnimationFrame(() => this.render());

//       //    Cleanup function
//       window.removeEventListener("mousemove", this.onMouseMoveEv);
//     };
//     //    Assign the mouse function
//     window.addEventListener("mousemove", this.onMouseMoveEv);
//   }

//   render() {
//     this.cursorCnfigs.x.current = mouse.x;
//     this.cursorCnfigs.y.current = mouse.y;
//     for (const key in this.cursorCnfigs) {
//       this.cursorCnfigs[key].previous = lerp(
//         this.cursorCnfigs[key].previous,
//         this.cursorCnfigs[key].current,
//         this.cursorCnfigs[key].amt
//       );
//     }
//     //    setting the cursor x and y to our cursor html element
//     this.Cursor.style.transform = `
//         translateX(${this.cursorCnfigs.x.previous}px)
//         translateY(${this.cursorCnfigs.y.previous}px)
//         `;

//     requestAnimationFrame(() => this.render());
//   }
// }
// const cursor = new Cursor(document.querySelector(".custom-cursor"));
