<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="this.$store.state.user.loggedIn === true" to="/home"> Home | </router-link> 
      <!-- <router-link v-if="this.$store.state.user.loggedIn === true" to="/account"> Account |</router-link>  -->
      <!-- <router-link v-if="this.$store.state.user.loggedIn === true" to="/login"> Sign in |</router-link>  -->
      <router-link v-if="this.$store.state.user.loggedIn === true" to="/saved-courses"> Saved </router-link> 
    </div>
    <router-view />

  </div>
</template>

<script type="text/javascript">
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 10%;
}

#nav {
  padding: 30px;
  background-color: white;
  border-radius: 15px;
  filter: drop-shadow(5px 5px 5px #F2F2F2);
  margin-bottom: 2rem;

}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #1D5EEF;

}

html {
  background-color: #F6F7FB;
}
body {
  margin: 0px;
}
</style>
