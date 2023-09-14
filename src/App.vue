<template>
  <div class="app">
    <!-- App content goes here -->
    <div class="sidebar-wrapper" v-if="isLoggedIn">
      <Sidebar  />
    </div>
    <div class="main-content" v-if="isLoggedIn">
      <router-view></router-view>
    </div>
    <router-view v-if="!isLoggedIn"></router-view>
   
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      loggedIn: false
    };
  },
  computed: {
    // Example of a computed property to determine if user is logged in
    isLoggedIn() {
      const currentRoute = this.$route;
      if (currentRoute.path === '/login' || currentRoute.path === '/register') {
        this.loggedIn = false;
      } else {
        this.loggedIn = true;
      }
      return this.loggedIn;
    }
  },
}
</script>



<style lang="scss">
:root {
  --primary: #4ade80;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 20vw;
  }
  .sidebar-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: var(--sidebar-width);
    background: var(--dark-alt);
    z-index: 100;
  }
  
  .main-content { 
    flex: 1;
    width: 100vw- var(--sidebar-width);
    padding: 2rem;
    margin-left: var(--sidebar-width);
  }
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
  }
  body {
  background: var(--light);
  }
.app{
  display: flex;
 
}

 </style>