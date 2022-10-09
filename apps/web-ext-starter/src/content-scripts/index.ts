// IIFE
(() => {
  // Dependency injection
  console.log("in content script");
  document.body.style.border = "5px solid red";
})();

export {};
