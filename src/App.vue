<template>
  <v-app theme="dark">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/books">Books</router-link> |
      <router-link to="/nasapod">Nasa Pic of Day</router-link>
    </nav>
    <v-divider />
    <router-view/>
  </v-app>
</template>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.disable-events {
  pointer-events: none
}
</style>
