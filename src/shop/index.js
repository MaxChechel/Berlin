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
  const splittWords = new SplitType(
    ".wave-text, .shop-items_content h4, .shop-items_content p, .section_info-shop h2, .section_info-shop p",
    {
      types: "lines, words",
    }
  );

  wrapLines(".shop-items_content .line");
  wrapLines(".section_info-shop .line");

  let mm = gsap.matchMedia();

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

  function pageLoadDesktop() {
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
        ".centered_image",
        {
          opacity: 1,
          y: "0%",
          scale: 0.99,
          duration: 1.5,
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
  function pageLoadMobile() {
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
        ".centered_image",
        {
          opacity: 1,
          y: "0%",
          scale: 0.99,
          duration: 1.5,
        },
        "<20%"
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
        ".section_info-shop .line",
        {
          opacity: 1,
          duration: 1.4,
          rotateZ: 0,
          transformOrigin: "left top",
          y: "0%",
          ease: "power4.out",
          stagger: { each: 0.05 },
        },
        "<30%"
      );
  }

  //Info shop reveal desktop
  mm.add("(min-width: 700px)", () => {
    const infoShopTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section_info-shop",
        start: "top 60%",
        end: "top 40%",
      },
    });

    infoShopTl.to(
      ".section_info-shop .line",
      {
        opacity: 1,
        duration: 1.4,
        rotateZ: 0,
        transformOrigin: "left top",
        y: "0%",
        ease: "power4.out",
        stagger: { each: 0.05 },
      },
      0
    );
  });

  //2 col component reveal
  const twoColReveal = document.querySelectorAll(".shop-items_component");

  twoColReveal.forEach((el) => {
    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 60%",
        end: "top 40%",
      },
    });
    revealTl
      .to(el.querySelector(".shop-image"), {
        opacity: 1,
        y: "0%",
        scale: 0.99,
        duration: 1.4,
      })
      .to(
        el.querySelectorAll(".shop-items_content .line"),
        {
          opacity: 1,
          duration: 1.2,
          rotateZ: 0,
          transformOrigin: "left top",
          y: "0%",
          ease: "power4.out",
          stagger: { each: 0.05 },
        },
        0
      );
  });
});
