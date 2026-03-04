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

<style scoped>
.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  gap: 1rem;
}

h1 {
  font-size: 3rem;
  font-weight: 600;
  color: #7c6fa0;
  letter-spacing: -1px;
}

p {
  color: #b0a8c8;
  font-size: 1.1rem;
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