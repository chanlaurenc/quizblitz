<template>
  <div class="score-board">
    <h1>Game Over</h1>
    <p>You scored {{ score }} out of 10</p>
    <button @click="$emit('restart')">Play Again</button>
  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  props: {
    score: {
      type: Number,
      required: true
    }
  },
  emits: ['restart']
}
</script>