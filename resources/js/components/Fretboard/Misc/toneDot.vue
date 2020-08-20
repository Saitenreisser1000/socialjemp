<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="dot"
      :style="{'backgroundColor':'#CD5C5C', 'borderRadius':'50%' }"
      :elevation="hover ? 20 : 4"
      :class="{'dotClicked': dotInfo.isActive, 'isFocused': dotInfo.isFocused}"
      @click="onClick"
    ></v-card>
  </v-hover>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "toneDot",
  props: ["dotInfo"],
  data() {
    return {
      editable: false,
    };
  },

  methods: {
    ...mapActions(["addDot", "removeDot", "removeOthersFocus"]),
    onClick() {
      //no jemp
      if (isEditable) {
        if (!this.dotInfo.isActive) {
          this.addActiveJemp();
          this.removeOthersFocus(this.dotInfo);
          this.dotInfo.isActive = true;
        }
        //not focused anymore
        else if (this.dotInfo.isFocused) {
          this.dotInfo.isFocused = false;
        }
        //now focused this others unfocused - this has at least on active jemp
        else {
          this.removeOthersFocus(this.dotInfo);
        }
      }
    },
    addActiveJemp() {
      this.addDot(this.dotInfo);
    },
    removeActiveJemp() {
      this.removeDot(this.dotInfo);
    },
  },
};
</script>

<style scoped>
.dot {
  position: absolute;
  opacity: 0;
  top: 5px;
  height: 30px;
  width: 30px;
  background-color: #cd5c5c;
  border-radius: 50%;
}
.dot:hover {
  opacity: 0.6;
}
.dotClicked {
  opacity: 1 !important;
}
.isFocused {
  background-color: brown;
}
</style>
