<template>
  <div class="scoreboard">
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

<style scoped>
.scoreboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  gap: 1rem;
}

h1 {
  font-size: 2.5rem;
  color: #7c6fa0;
  font-weight: 600;
}

p {
  font-size: 1.2rem;
  color: #9b8eb8;
}

button {
  margin-top: 1rem;
  padding: 0.75rem 2.5rem;
  background: #c9b8e8;
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #b8a4d8;
}
</style>