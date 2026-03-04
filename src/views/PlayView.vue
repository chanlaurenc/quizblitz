<template>
  <div>
    <div v-if="gameState === 'playing'">
      <QuestionCard
        :question="questions[currentIndex]"
        @answer="handleAnswer"
      />
      <p>Question {{ currentIndex + 1 }} of {{ questions.length }}</p>
    </div>
    <ScoreBoard
      v-else
      :score="score"
      @restart="resetGame"
    />
  </div>
</template>

<script>
import QuestionCard from '../components/QuestionCard.vue'
import ScoreBoard from '../components/ScoreBoard.vue'

export default {
  name: 'PlayView',
  components: { QuestionCard, ScoreBoard },
  data() {
    return {
      currentIndex: 0,
      score: 0,
      gameState: 'playing',
      questions: [
        {
            question: "How many planets are in our solar system?",
            answers: ["7", "8", "9", "10"],
            correct: 1
        },
        {
            question: "What is the capital city of Australia?",
            answers: ["Sydney", "Melbourne", "Brisbane", "Canberra"],
            correct: 3
        },
        {
            question: "Which element has the chemical symbol 'Au'?",
            answers: ["Silver", "Aluminium", "Gold", "Copper"],
            correct: 2
        },
        {
            question: "How many sides does a hexagon have?",
            answers: ["5", "7", "8", "6"],
            correct: 3
        },
        {
            question: "Who painted the Mona Lisa?",
            answers: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Caravaggio"],
            correct: 1
        },
        {
            question: "What is the longest river in the world?",
            answers: ["Amazon", "Yangtze", "Mississippi", "Nile"],
            correct: 3
        },
        {
            question: "How many strings does a standard guitar have?",
            answers: ["4", "5", "6", "7"],
            correct: 2
        },
        {
            question: "What sport is played at Wimbledon?",
            answers: ["Cricket", "Tennis", "Badminton", "Squash"],
            correct: 1
        },
        {
            question: "Which country is home to the kangaroo?",
            answers: ["New Zealand", "South Africa", "Brazil", "Australia"],
            correct: 3
        },
        {
            question: "How many hours are in a week?",
            answers: ["148", "156", "168", "172"],
            correct: 2
        }
        ]
    }
  },
  mounted() {
    this.startGame()
  },
  methods: {
    startGame() {
      this.currentIndex = 0
      this.score = 0
      this.gameState = 'playing'
    },
    handleAnswer(isCorrect) {
      if (isCorrect) this.score++
      this.currentIndex++
      if (this.currentIndex === this.questions.length) {
        this.gameState = 'end'
      }
    },
    resetGame() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>