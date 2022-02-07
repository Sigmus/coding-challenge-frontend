<template>
  <div class="autocomplete">
    <input
      v-model="value"
      v-bind:placeholder="placeholder"
      v-bind:autofocus="autofocus"
      @input="onChange"
      @keydown.enter="onEnter"
      @keydown.down="onKeyDown"
      @keydown.up="onKeyUp"
      @keydown.escape="onEscape"
    />

    <ul v-if="isOpen" class="results">
      <li v-if="noResultsFound" class="no-results">No results found</li>
      <li
        v-else
        v-for="(item, i) in results"
        :key="i"
        @click="selectItem(i)"
        @mouseover="onMouseMove(i)"
        @mouseleave="onMouseMove(i)"
        :class="{ active: i === activeIndex }"
      >
        <slot name="item" v-bind:item="item" />
      </li>
    </ul>
  </div>
</template>

<script>
const SEARCH_THRESHOLD = 3;

export default {
  name: "AutoComplete",
  props: {
    name: String,
    placeholder: String,
    autofocus: Boolean,
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },

  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },

  data() {
    return {
      value: "",
      isOpen: false,
      results: [],
      activeIndex: 0,
    };
  },

  computed: {
    noResultsFound() {
      return this.value.length >= SEARCH_THRESHOLD && this.results.length === 0;
    },
  },

  methods: {
    selectItem(index) {
      this.isOpen = false;

      this.$store.commit("selectItem", {
        name: this.name,
        value: this.results[index],
      });

      this.value = this.$store.getters[this.name];
    },

    onEnter() {
      this.selectItem(this.activeIndex);
    },

    onChange() {
      if (this.value.length < SEARCH_THRESHOLD) {
        this.isOpen = false;
        this.results = [];
        return;
      }

      this.isOpen = true;
      const getterName = `${this.name}Filter`;
      // I feel I'm being a bit silly here and that
      // there are simpler ways of doing this.
      this.results = this.$store.getters[getterName](this.value);
    },

    onMouseMove(index) {
      this.activeIndex = index;
    },

    onKeyDown() {
      if (this.activeIndex < this.results.length - 1) {
        this.activeIndex++;
      } else {
        this.activeIndex = 0;
      }
    },

    onKeyUp() {
      if (this.activeIndex > 0) {
        this.activeIndex--;
      } else {
        this.activeIndex = this.results.length - 1;
      }
    },

    onEscape() {
      this.isOpen = false;
    },

    handleClickOutside(ev) {
      if (!this.$el.contains(ev.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>

<style>
.autocomplete {
  width: 100%;
  display: flex;
  flex-direction: column;
}

input {
  padding: 0.75rem 0.5rem;
  margin: 0;
  width: 100%;
  outline: none;
  border-radius: 0;
  border: 1px solid var(--primary-color);
}

.results {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
  border: 1px solid var(--primary-color);
  border-top: none;
}

.results li {
  padding: 0.75rem 0.5rem;
  cursor: pointer;
}

.results li:nth-child(even) {
  background-color: #f8f8f8;
}

.results li.active:not(.no-results) {
  background-color: var(--primary-color);
  color: white;
}
</style>
