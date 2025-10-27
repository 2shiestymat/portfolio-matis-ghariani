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
  },
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
