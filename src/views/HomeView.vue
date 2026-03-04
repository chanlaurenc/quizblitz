<template>
  <StartScreen @start="goToGame" />
</template>

<script>
import StartScreen from '../components/StartScreen.vue'

export default {
  name: 'HomeView',
  components: { StartScreen },
  methods: {
    goToGame() {
        sessionStorage.setItem('gameStarted', 'true')
        this.$router.push({ name: 'play' })
    }
  }
}
</script>