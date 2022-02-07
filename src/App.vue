<template>
  <main>
    <div class="header">
      <h1>coding-challenge-frontend</h1>
    </div>

    <ul class="searches">
      <li>
        <AutoComplete name="city" placeholder="Type a city name..." autofocus>
          <template v-slot:item="{ item }">
            <span class="city">{{ item }}</span>
          </template>
        </AutoComplete>

        <p v-if="this.$store.getters.city">
          Selected city: <strong>{{ this.$store.getters.city }}</strong>
        </p>
      </li>

      <li>
        <AutoComplete name="book" placeholder="Type a book title...">
          <template v-slot:item="{ item }">
            {{ item.title }}<br />
            <span class="author">{{ item.author }}</span>
          </template>
        </AutoComplete>

        <p v-if="this.$store.getters.book">
          Selected book: <strong>{{ this.$store.getters.book }}</strong>
        </p>
      </li>
    </ul>
  </main>
</template>

<script>
import store from "./store";
import AutoComplete from "./components/AutoComplete.vue";

export default {
  name: "App",
  store,
  components: {
    AutoComplete,
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  /* https://meyerweb.com/eric/thoughts/2014/06/19/rebeccapurple/ */
  --primary-color: rebeccapurple;
}

body {
  margin: 0;
}

body,
input {
  font-family: Helvetica, Arial, sans-serif;
  color: black;
  font-size: 16px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.header {
  background-color: var(--primary-color);
  padding: 2rem;
}

h1 {
  font-weight: normal;
  color: white;
  margin: 0 auto;
  max-width: 60rem;
  letter-spacing: 0.125rem;
}

.searches {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 auto;
  padding: 2rem;
  max-width: 60rem;
}

.searches li {
  width: 100%;
}

.city {
  text-transform: capitalize;
}

.author {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.75rem;
}

@media screen and (min-width: 40rem) {
  .header {
    text-align: center;
  }

  .searches {
    flex-direction: row;
  }
}
</style>
