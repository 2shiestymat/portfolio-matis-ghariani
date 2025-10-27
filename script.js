const app = Vue.createApp({
  data() {
    return {
      projects: [],
      photos: [
        { src: "img/export-1.jpg" },
        { src: "img/export-2.jpg" },
        { src: "img/export-3.jpg" },
        { src: "img/export-4.jpg" },
      ],
    };
  },
  mounted() {
    fetch("projects.json")
      .then((data) => data.json())
      .then((result) => (this.projects = result));
  }
});

app.component("photo-gallery", {
  props: ["images"],
  data() {
    return {
      showGallery: false,
      selectedImage: null,
    };
  },
  template: `
    <div>
      <div class="btnjouer">
       <button v-if="!showGallery" @click="showGallery = true" >
        Ouvrir la galerie 
       </button>
      </div>

      <div v-if="showGallery" class="gallery">
        <img 
          v-for="img in images"  
          :src="img.src" 
          @click="selectedImage = img"
        >
      </div>

      <div v-if="selectedImage" class="modal" @click="selectedImage = null">
        <img :src="selectedImage.src" :alt="selectedImage.title">
      </div>
    </div>
  `,
});

app.mount("#app");
 
// Animations Gsap

gsap.registerPlugin(ScrollToPlugin, SplitText, ScrollTrigger);

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

// Animation du header principal nom et portfolio
const titre = document.querySelector(".elementacceuil");
gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } })
  .from(titre,
    { opacity: 0,
       scale: 0.8 // nom apparaît avec un effet scale
    });


