<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/leaderboard">Leaderboard</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'App'
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
</style>