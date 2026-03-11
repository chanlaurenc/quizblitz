<template>
  <StartScreen @start="goToGame" />
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'
import StartScreen from '../components/StartScreen.vue'

export default {
  name: 'HomeView',
  components: { StartScreen },

  setup() {
    return { store: useGameStore() }
  },

  methods: {
    goToGame() {
      this.store.startGame()
      this.$router.push({ name: 'play' })
    }
  }
}
</script>