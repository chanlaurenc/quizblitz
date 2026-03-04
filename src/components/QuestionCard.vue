<template>
  <div class="question-card">
    <h2 class="question-text">{{ question.question }}</h2>
    <div class="answers">
      <button
        v-for="(answer, index) in question.answers"
        :key="index"
        :disabled="answered"
        :class="{
          correct: answered && index === question.correct,
          wrong: answered && index === selectedIndex && index !== question.correct
        }"
        @click="handleAnswer(index)"
      >
        {{ answer }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  emits: ['answer'],
  data() {
    return {
      answered: false,
      selectedIndex: null
    }
  },
  methods: {
    handleAnswer(index) {
      if (this.answered) return
      this.answered = true
      this.selectedIndex = index
      const isCorrect = index === this.question.correct
      setTimeout(() => {
        this.$emit('answer', isCorrect)
        this.answered = false
        this.selectedIndex = null
      }, 1000)
    }
  }
}
</script>

<style scoped>
.question-card {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem;
  box-shadow: 0 2px 20px rgba(180, 160, 210, 0.15);
}

.question-text {
  font-size: 1.2rem;
  color: #4a4060;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

button {
  padding: 0.85rem 1.25rem;
  background: #f3eeff;
  border: 2px solid #e0d4f5;
  border-radius: 12px;
  color: #6b5f8a;
  font-size: 0.95rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
}

button:hover:not(:disabled) {
  background: #e8daff;
  border-color: #c9b8e8;
}

button.correct {
  background: #d4f5e4;
  border-color: #86d9aa;
  color: #2d7a52;
}

button.wrong {
  background: #fde8e8;
  border-color: #f5a0a0;
  color: #c0392b;
}
</style>