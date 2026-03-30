<template>
  <div class="play-view">

    <!-- Timer bar -->
    <div class="timer-bar">
      <div
        class="timer-fill"
        :style="{ width: timerPercent + '%' }"
        :class="{ urgent: store.timeLeft <= 5 }"
      ></div>
    </div>

    <!-- Progress indicator -->
    <p class="progress">
      Question {{ store.progress.current }} of {{ store.progress.total }}
    </p>

    <p v-if="store.streak >= 3" class="streak">
      🔥 {{ store.streak }} in a row!
    </p>

    <!-- Question -->
    <QuestionCard
      v-if="store.gameState === 'playing' && store.currentQuestion"
      :question="store.currentQuestion"
      :selectedAnswer="store.selectedAnswer"
      @answer="store.submitAnswer"
    />

    <!-- Score screen -->
    <div v-else-if="store.gameState === 'end'">
      <ScoreBoard
        :score="store.score"
        :total="store.questions.length"
        @restart="handleRestart"
      />
      <div v-if="!store.scoreSubmitted" class="submit-score">
        <input
          v-model="store.playerName"
          placeholder="Enter your name"
          class="name-input"
        />
        <button @click="store.submitScore()" class="submit-btn">Submit Score</button>
      </div>
      <p v-else class="submitted">Score submitted! ✓</p>
    </div>

  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'
import QuestionCard from '../components/QuestionCard.vue'
import ScoreBoard from '../components/ScoreBoard.vue'

export default {
  name: 'PlayView',
  components: { QuestionCard, ScoreBoard },

  setup() {
    const store = useGameStore()
    return { store }
  },

  computed: {
    timerPercent() {
      return (this.store.timeLeft / 15) * 100
    }
  },

  methods: {
    handleRestart() {
      this.store.resetGame()
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.timer-bar {
  width: 100%;
  height: 8px;
  background: #333;
  border-radius: 4px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.timer-fill {
  height: 100%;
  background: #4caf50;
  transition: width 0.9s linear;
}

.timer-fill.urgent {
  background: #e53935;
}

.progress {
  text-align: center;
  color: #aaa;
  margin-bottom: 1rem;
}

.streak {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ff9800;
  margin-bottom: 0.5rem;
}

.submit-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.name-input {
  padding: 0.65rem 1.25rem;
  border: 2px solid #c9b8e8;
  border-radius: 50px;
  font-size: 1rem;
  background: transparent;
  color: #7c6fa0;
  outline: none;
  text-align: center;
  width: 220px;
}

.name-input::placeholder {
  color: #b0a8c8;
}

.submit-btn {
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

.submit-btn:hover {
  background: #b8a4d8;
}

.submitted {
  text-align: center;
  color: #7c6fa0;
  font-weight: 600;
  margin-top: 1rem;
}
</style>