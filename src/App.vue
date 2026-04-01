<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/leaderboard">Leaderboard</RouterLink>
      <div class="nav-auth">
        <template v-if="store.token">
          <span class="nav-email">{{ store.userEmail }}</span>
          <button @click="store.logout()" class="nav-logout">Log out</button>
        </template>
        <template v-else>
          <RouterLink to="/login">Log in</RouterLink>
          <RouterLink to="/register">Register</RouterLink>
        </template>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<script>
import { useGameStore } from './stores/gameStore.js'

export default {
  name: 'App',
  setup() {
    return { store: useGameStore() }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: #f8f4ff;
  min-height: 100vh;
}

#app {
  max-width: 640px;
  margin: 0 auto;
}

nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 2rem;
  background: #fff;
  border-bottom: 1px solid #e8e0f0;
}

nav a {
  color: #9b8eb8;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 400;
}

nav a.router-link-active {
  color: #7c6fa0;
  font-weight: 600;
}

.nav-auth {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-email {
  font-size: 0.85rem;
  color: #b0a8c8;
}

.nav-logout {
  background: none;
  border: none;
  color: #9b8eb8;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
}

.nav-logout:hover {
  color: #7c6fa0;
}
</style>