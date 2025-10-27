const app = Vue.createApp({
  data() {
    return { projects: [] };
  },
  mounted() {
    fetch("projects.json")
      .then((data) => data.json())
      .then((result) => (this.projects = result));
  },
});
app.mount("#app");
