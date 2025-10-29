const app = Vue.createApp({
  data() {
    return {
      // contient la liste complete de fichier json
      projects: [],
      photos: [
        { src: "img/export-1.jpg" },
        { src: "img/export-2.jpg" },
        { src: "img/export-3.jpg" },
        { src: "img/export-4.jpg" },
      ],
      // ici quon stock les donne du projet de l'id coresspondant a l'url
      selectedProject: null,
    };
  },
  mounted() {
    // recupere les parametres de l'url
    const urlParams = new URLSearchParams(window.location.search);
    // extraire la valeur du parametre id de l'url
    const projectId = urlParams.get("id");

    // charger la liste des projets depuis fichier json
    fetch("projects.json")
      .then((data) => data.json()) // Convertir les données au format désiré
      .then((result) => {
        this.projects = result; // stock le tout dans projects
        if (projectId) {
          // trouver le projet correspondant a l'id de l'url
          const found = this.projects.find((p) => p.id === projectId);
          if (found) {
            // si projet correspondant trouver, place les donnes dans selectedProject
            this.selectedProject = found;
            console.log("Projet trouvé :", found);
          } else {
            console.warn("Aucun projet trouvé pour l'id :", projectId);
          }
        }
      });
  },
});

app.component("photo-gallery", {
  // reçoit le tableau
  props: ["images"],
  data() {
    return {
      // Galerie est cachée au départ
      showGallery: false,
      // index de l'image actuellement afficher (donc invisible)
      currentIndex: 0,
    };
  },
  computed: {
    currentImage() {
      // retourne l'image actuellement afficher et utilise les images reçues
      return this.images[this.currentIndex];
    },
  },
  methods: {
    // Ouvre la galerie
    openGallery(index = 0) {
      this.currentIndex = index; // Ouvre l'index
      this.showGallery = true;
    },
    // ferme la galerie
    closeGallery() {
      this.showGallery = false;
    },
    // passse a l'image suivante
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    // passse a l'image precedente
    prevImage() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
  },
  // Partie visuelle de la composante vu (se qui s'affiche dans html)
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

// Fonction pour faire defiler la page jusqua un element correspondant à un # (hash)
function scrollToHash(hash, e) {
  const elem = hash ? document.querySelector(hash) : false;
  if (elem) {
    if (e) e.preventDefault();
    gsap.to(window, { scrollTo: elem });
  }
}

// Si un lien href est dans la page courante, scroll la a la palce
document.querySelectorAll("a[href]").forEach((a) => {
  a.addEventListener("click", (e) => {
    scrollToHash(getSamePageAnchor(a), e);
  });
});

// scroll jusqua l'element qui a un hash
scrollToHash(window.location.hash);

// Animation de mon nom et prenom
// dure 1 seconde
const titre = document.querySelector(".elementacceuil");
gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } }).from(titre, {
  opacity: 0, // // Commence invisible
  scale: 0.8, // nom apparaît avec un effet scale
});
