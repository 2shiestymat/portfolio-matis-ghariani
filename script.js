gsap.registerPlugin(ScrollToPlugin, SplitText, ScrollTrigger);

// Changement de page

document.getElementById("pro1").addEventListener("click", () => {
  window.location.href = "projet1.html";
});

document.getElementById("pro2").addEventListener("click", () => {
  window.location.href = "projet2.html";
});

document.getElementById("pro3").addEventListener("click", () => {
  window.location.href = "projet3.html";
});

document.getElementById("pro4").addEventListener("click", () => {
  window.location.href = "projet4.html";
});

// Navigation navbar

// Detect if a link's href goes to the current page
function getSamePageAnchor(link) {
  if (
    link.protocol !== window.location.protocol ||
    link.host !== window.location.host ||
    link.pathname !== window.location.pathname ||
    link.search !== window.location.search
  ) {
    return false;
  }

  return link.hash;
}

// Scroll to a given hash, preventing the event given if there is one
function scrollToHash(hash, e) {
  const elem = hash ? document.querySelector(hash) : false;
  if (elem) {
    if (e) e.preventDefault();
    gsap.to(window, { scrollTo: elem });
  }
}

// If a link's href is within the current page, scroll to it instead
document.querySelectorAll("a[href]").forEach((a) => {
  a.addEventListener("click", (e) => {
    scrollToHash(getSamePageAnchor(a), e);
  });
});

// Scroll to the element in the URL's hash on load
scrollToHash(window.location.hash);

// animations

console.clear();

gsap.set(".apropos-container", { opacity: 1 });

document.fonts.ready.then(() => {
  let containers = gsap.utils.toArray(".apropos");

  containers.forEach((container) => {
    let text = container.querySelector(".apropos-container");
    let animation;

    SplitText.create(text, {
      type: "words,lines",
      mask: "lines",
      linesClass: "line",
      autoSplit: true,
      onSplit: (instance) => {
        console.log("split");
        return gsap.from(instance.lines, {
          yPercent: 120,
          stagger: 0.1,
          scrollTrigger: {
            trigger: container,
            markers: true,
            scrub: true,
            start: "clamp(top center)",
            end: "clamp(bottom center)",
          },
        });
      },
    });
  });
});
