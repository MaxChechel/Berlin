import { gsap } from "gsap";
import { Flip } from "gsap/all";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger, Flip);

function wrapLines(selector) {
  document.querySelectorAll(selector).forEach((line) => {
    const wrapEl = document.createElement("div");
    wrapEl.classList = "overflow-hidden";
    line.parentNode.appendChild(wrapEl);
    wrapEl.appendChild(line);
  });
}

function footerReveal() {
  imagesLoaded(".page-wrapper", () => {
    const footerTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer_component",
        start: "top 75%",
        end: "top 50%",
        once: true,
      },
    });
    footerTl.to(".footer_logo-link", {
      y: "0%",
      opacity: 1,
      ease: "power4.inOut",
      duration: 1.8,
    });
  });
}

function pageAnimations() {
  const splittWords = new SplitType(
    "h1, .wave-text, .section_header h2, .section_header p",
    {
      types: "lines, words",
    }
  );

  wrapLines("h1 .line");
  wrapLines(".section_header h2 .line");
  wrapLines(".section_header p .line");

  //Video reveal
  const vidRevealTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".video_component",
      start: "top 60%",
      end: "top 40%",
    },
  });
  vidRevealTl
    .to(".video_lightbox-image", {
      opacity: 1,
      y: "0%",
      scale: 1,
      duration: 1.4,
    })
    .to("#fullscreen-button", { opacity: 1, duration: 0.8 }, "<30%")
    .to("#custom-play-button", { opacity: 1, duration: 0.8 }, "<0%");

  //Heading & cta reveal
  const headingRevealTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_big-title",
      start: "top 60%",
      end: "top 40%",
    },
  });

  headingRevealTl
    .to("h1 .line", {
      opacity: 1,
      duration: 1.4,
      rotateX: 0,
      transformOrigin: "center center",
      y: "0%",
      ease: "power4.out",
      stagger: { each: 0.025 },
    })
    .to(
      ".section_big-title .button",
      {
        opacity: 1,
        duration: 0.6,
        y: "0%",
        ease: "power4out",
      },
      "<20%"
    );

  //Work
  const workRevealTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_work",
      start: "top 60%",
      end: "top 40%",
    },
  });
  workRevealTl
    .to(".wave-text .word", {
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

  //Header
  const headerRevealTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_header",
      start: "top 60%",
      end: "top 40%",
    },
  });

  headerRevealTl
    .to(".section_header h2 .line", {
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
      ".section_header .button",
      {
        opacity: 1,
        duration: 0.6,
        y: "0%",
        ease: "power4out",
      },
      "<2%"
    );
}

//////////////
gsap.defaults({});
// ---- Elements
// Load
const navSpacer = document.querySelector(".nav-spacer");
const spacerTop = document.querySelector(".nav-spacer_top");
const brand = navSpacer.querySelector(".nav-spacer_logo-box");
const wrap = navSpacer.querySelector(".nav-spacer_logo-wrap");
const mask = navSpacer.querySelector(".nav-spacer_logo-mask");
const logo = navSpacer.querySelector(".nav-spacer_logo");
const navLogo = document.querySelector(".navbar1_logo-link");
const navWrap = document.querySelector(".navbar1_logo-wrap");
const navActions = document.querySelector(".navbar1_actions");

const navbar = document.querySelector(".navbar1_component");
const mainWrapper = document.querySelector(".main-wrapper");
// --- Vars
const defaultEase = "power1.inOut";
// ---- Initial initSet
navbar.classList.remove("animate");
const initSet = () => {
  let tl = gsap.timeline();
  tl.set(mainWrapper, {
    height: "100svh",
  });
  tl.set(navSpacer, {
    css: {
      width: "100vw",
      height: "100svh",
    },
  });
  tl.set(brand, { width: "100%" });
  tl.set(wrap, { width: "90vw" });
  tl.set(mask, { width: "21%" });
  tl.set(logo, { width: "90vw" });
  tl.to(mainWrapper, { opacity: 1, ease: defaultEase, duration: 1 }, "+=1");
  tl.to(mask, { width: "auto", ease: "power4.out", duration: 2.6 }, "+=0.5");
  return tl;
};
const clearPros = (el) => {
  gsap.set(el, { clearProps: "all" });
};
// ---- Main Load TL
let mainLoad = gsap.timeline();

function runAnimation() {
  const width = window.innerWidth;
  if (mainLoad) {
    mainLoad.kill();
  }
  mainLoad = gsap.timeline();
  mainLoad.add(initSet());
  // Desktop Version with Scroll
  if (width > 991) {
    mainLoad.to(
      navSpacer,
      {
        height: "auto",
        marginBottom: "2.4em",
        marginTop: "10.4em", // 8em of navbar + 2.4em from bottom of the logo
        ease: "power4.out",
        duration: 2,
      },
      "=+0.25"
    );
    mainLoad.to(
      navActions,
      { opacity: 1, ease: "power3.out", duration: 1 },
      "<"
    );
    mainLoad.set(navLogo, { translateY: "10.4em" });
    mainLoad.set(navWrap, {
      css: {
        width: gsap.getProperty(".nav-spacer_logo-wrap", "width"),
        height: "auto",
        opacity: 1,
      },
    });
    mainLoad.then(initScroll).then(pageAnimations).then(footerReveal);
  }
  // Mobile Version without Scroll
  else {
    mainLoad.set([navWrap, navbar, navActions], { opacity: 1 });
    mainLoad.to(navSpacer, {
      css: {
        width: "auto",
        height: gsap.getProperty(".navbar1_container", "height"),
        opacity: 1,
      },
      ease: defaultEase,
      duration: 1,
    });
    mainLoad.to(
      wrap,
      {
        width: gsap.getProperty(".navbar1_logo-wrap", "width"),
        ease: defaultEase,
        duration: 1,
      },
      "<"
    );
    mainLoad.to(
      logo,
      {
        width: gsap.getProperty(".navbar1_logo-wrap", "width"),
        ease: defaultEase,
        duration: 1,
      },
      "<"
    );
    mainLoad.call(() => {
      navbar.classList.add("animate");
    });
  }
  mainLoad.to(navSpacer, { opacity: 0 });
  mainLoad.to(mainWrapper, {
    height: "auto",
    ease: "power3.out",
    duration: 0.1,
  });
  mainLoad.then(initScroll).then(pageAnimations).then(footerReveal);
}
runAnimation();

function initScroll() {
  let tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: document.querySelector("body"),
      start: "top top",
      endTrigger: ".section_ticker",
      end: `top ${gsap.getProperty(".navbar1_container", "height")}`,
      scrub: 0.5,
      ease: "linear",
    },
  });

  tl1.to(navLogo, { translateY: "2.4em" });
  tl1.to(
    navWrap,
    {
      css: {
        width: gsap.getProperty(".navbar1_logo-link", "width"),
        opacity: 1,
      },
    },
    "<"
  );
  /* Nav Fixed */
  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_ticker",
      start: `top ${gsap.getProperty(".navbar1_container", "height")}`,
      onEnter: () => {
        gsap.set(navbar, {
          position: "absolute",
          top: () => {
            const offsetTop =
              document.querySelector(".section_ticker").getBoundingClientRect()
                .top + window.scrollY;
            const navbarHeight = gsap.getProperty(
              ".navbar1_container",
              "height"
            ); // Adjust '.navbar' if your selector is different
            return offsetTop - navbarHeight;
          },
        });
      },
      onLeave: () => {
        navbar.classList.add("animate");
      },
      onLeaveBack: () => {
        navbar.classList.remove("animate");
        clearPros(navbar);
      },
    },
  });

  function getMaxWidthForBreakpoint() {
    const width = window.innerWidth;
    if (width > 767) {
      return "15rem";
    }
    if (width > 479) {
      return "13rem";
    }

    if (width > 0) {
      return "10rem";
    }
    return "17rem";
  }
}
// ---- Resize Logic
let resizeTimer;
let previousWidth = window.innerWidth;

window.addEventListener("resize", function () {
  let currentWidth = window.innerWidth;
  if (currentWidth !== previousWidth) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      window.location.reload();
    }, 300);
  }
  previousWidth = currentWidth; // Update the previous width for the next resize event
});
