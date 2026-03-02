<template>
  <div class="question-card">
    <h2>{{ question.question }}</h2>
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
button {
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 10px;
  cursor: pointer;
}
button.correct {
  background-color: green;
  color: white;
}
button.wrong {
  background-color: red;
  color: white;
}
button:disabled {
  cursor: not-allowed;
}
</style>