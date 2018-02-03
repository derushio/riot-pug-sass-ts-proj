import Vue from "vue";
import axios from "axios";

Vue.component("list-item", {
  props: ["item"],
  template: "<li>{{ item.name }}</li>",
});
Vue.component("weapon", {
  props: ["item"],
  template: "<li>{{ item.name }}<br><small class='pl-3'><small class='text-success'>{{ item.subWeapon }}</small>" +
    " <small class='text-danger'>{{ item.special }}</small></small></li>",
});

axios.get("resources/json/data.json")
  .then((res) => {
    const app = new Vue({
      computed: {
        seenCategories() { return this.selection === "category"; },
        seenSubWeapons() { return this.selection === "subWeapon"; },
        seenSpecials() { return this.selection === "special"; },
      },
      data: {
        categories: res.data.categories,
        selectedCategory: 1,
        selectedSpecial: 3,
        selectedSubWeapon: 1,
        selectedWeapons: [3],
        selection: "weapon",
        specials: res.data.specials,
        subWeapons: res.data.subWeapons,
        weapons: res.data.weapons,
      },
      el: "#app",
      methods: {
        randomize() {
          switch (this.selection) {
            case "weapon":
              this.selectedWeapons = [1 + Math.floor(Math.random() * this.weapons.length)];
              break;
            case "category":
              this.selectedCategory = 1 + Math.floor(Math.random() * this.categories.length);
              this.selectedWeapons = this.weapons
                  .filter((e) => e.category === this.categories[this.selectedCategory - 1].name)
                  .map((e) => e.id);
              break;
            case "subWeapon":
              this.selectedSubWeapon = 1 + Math.floor(Math.random() * this.subWeapons.length);
              this.selectedWeapons = this.weapons
                  .filter((e) => e.subWeapon === this.subWeapons[this.selectedSubWeapon - 1].name)
                  .map((e) => e.id);
              break;
            case "special":
              this.selectedSpecial = 1 + Math.floor(Math.random() * this.specials.length);
              this.selectedWeapons = this.weapons
                  .filter((e) => e.special === this.specials[this.selectedSpecial - 1].name)
                  .map((e) => e.id);
              break;
          }
        },
      },
    });
  });
