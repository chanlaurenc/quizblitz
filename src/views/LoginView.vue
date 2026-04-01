<template>
  <div class="auth-view">
    <h1>Log In</h1>

    <div class="auth-form">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="auth-input"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="auth-input"
      />
      <p v-if="error" class="error">{{ error }}</p>
      <button @click="handleLogin" class="auth-btn">Log In</button>
      <p class="switch">
        Don't have an account?
        <RouterLink to="/register" class="auth-link">Register</RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'

export default {
  name: 'LoginView',
  setup() {
    return { store: useGameStore() }
  },
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      this.error = ''
      try {
        await this.store.login(this.email, this.password)
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>

<style scoped>
.auth-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  gap: 1rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 600;
  color: #7c6fa0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 320px;
}

.auth-input {
  width: 100%;
  padding: 0.65rem 1.25rem;
  border: 2px solid #c9b8e8;
  border-radius: 50px;
  font-size: 1rem;
  background: transparent;
  color: #7c6fa0;
  outline: none;
  text-align: center;
  box-sizing: border-box;
}

.auth-input::placeholder {
  color: #b0a8c8;
}

.auth-btn {
  width: 100%;
  padding: 0.65rem 2rem;
  background: #c9b8e8;
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.auth-btn:hover {
  background: #b8a4d8;
}

.error {
  color: #e53935;
  font-size: 0.9rem;
  text-align: center;
}

.switch {
  color: #b0a8c8;
  font-size: 0.9rem;
}

.auth-link {
  color: #c9b8e8;
  font-weight: 600;
  text-decoration: none;
}

.auth-link:hover {
  color: #7c6fa0;
}
</style>