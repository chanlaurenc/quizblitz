<template>
  <div class="start-screen">
    <h1>QuizBlitz</h1>
    <p>Test your knowledge — 10 questions, no second chances!</p>
    <button @click="$emit('start')">Play</button>
  </div>
</template>

<script>
export default {
  name: 'StartScreen',
  emits: ['start']
}
</script>