// Define the default color combinations
const colorCombinations = [
  {
    background: "linear-gradient(270deg, #AAC98D 0%, #073FD6 100%)",
    svg: "#EFEAE4",
  },
  {
    background: "linear-gradient(270deg, #FFC8C8 0%, #EB5B50 100%)",
    svg: "#EFEAE4",
  },
  {
    background: "linear-gradient(270deg, #D9D9D9 0%, #E5E15C 100%)",
    svg: "#262B30",
  },
];

// Select a random combination from the filtered list
const randomCombination =
  colorCombinations[Math.floor(Math.random() * colorCombinations.length)];

// Apply the background color to .loader3_background and .loader3_image-overlay classes
const backgroundElements = document.querySelectorAll(
  ".loader3_background, .loader3_image-overlay"
);
backgroundElements.forEach((element) => {
  element.style.background = randomCombination.background;
});

// Apply the SVG font color to .loader3_image class
const svgElements = document.querySelectorAll(".loader_image");
svgElements.forEach((element) => {
  element.style.color = randomCombination.svg;
});
