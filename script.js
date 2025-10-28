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
      selectedProject: null,
    };
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("id");

    fetch("projects.json")
      .then((data) => data.json())
      .then((result) => {
        this.projects = result
        if (projectId) {
          const found = this.projects.find(p => p.id === projectId);
          if (found) {
            this.selectedProject = found;
            console.log("✅ Projet trouvé :", found);
          } else {
            console.warn("❌ Aucun projet trouvé pour l'id :", projectId);
          }
        }
        
    });
  },

  
  methods: {}
});

app.component("photo-gallery", {
  props: ["images"],
  data() {
    return {
      showGallery: false,
      currentIndex: 0,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    },
  },
  methods: {
    openGallery(index = 0) {
      this.currentIndex = index;
      this.showGallery = true;
    },
    closeGallery() {
      this.showGallery = false;
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
  },
  template: `
    <div>
      <!-- Bouton d'ouverture -->
      <div class="btnjouer">
        <button @click="openGallery()">Ouvrir la galerie</button>
      </div>

      <!-- Galerie plein écran -->
      <div v-if="showGallery" class="fullscreen-gallery">
        <span class="close" @click="closeGallery">&times;</span>

        <!-- Flèches de navigation -->
        <span class="prev" @click="prevImage">&#10094;</span>
        <span class="next" @click="nextImage">&#10095;</span>

        <!-- Image affichée -->
        <img :src="currentImage.src" class="fullscreen-image">
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
gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } }).from(titre, {
  opacity: 0,
  scale: 0.8, // nom apparaît avec un effet scale
});
