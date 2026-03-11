<template>
  <div class="question-card">
    <h2 class="question-text">{{ question.question }}</h2>
    <div class="answers">
      <button
        v-for="(answer, index) in question.answers"
        :key="index"
        :class="buttonClass(index)"
        :disabled="selectedAnswer !== null"
        @click="selectAnswer(index)"
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
    },
    selectedAnswer: {
      type: Number,
      default: null
    }
  },
  emits: ['answer'],
  methods: {
    selectAnswer(index) {
      if (this.selectedAnswer !== null) return
      this.$emit('answer', index)
    },
    buttonClass(index) {
      if (this.selectedAnswer === null) return ''
      if (index === this.question.correct) return 'correct'
      if (index === this.selectedAnswer) return 'wrong'
      return ''
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

button:disabled {
  cursor: not-allowed;
  opacity: 0.8;
}
</style>