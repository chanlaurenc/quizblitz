<template>
  <div id="app">
    <StartScreen v-if="gameState === 'start'" @start="startGame" />
    <QuestionCard
      v-else-if="gameState === 'playing'"
      :question="questions[currentIndex]"
      @answer="handleAnswer"
    />
    <ScoreBoard
      v-else
      :score="score"
      @restart="resetGame"
    />
  </div>
</template>

<script>
import StartScreen from './components/StartScreen.vue'
import QuestionCard from './components/QuestionCard.vue'
import ScoreBoard from './components/ScoreBoard.vue'

export default {
  name: 'App',
  components: { StartScreen, QuestionCard, ScoreBoard },
  data() {
    return {
      currentIndex: 0,
      score: 0,
      gameState: 'start',
      questions: [
        {
          question: "What does CSS stand for?",
          answers: ["Cascading Style Sheets", "Creative Style System", "Computer Style Syntax", "Coloured Screen Sheets"],
          correct: 0
        },
        {
          question: "Which language runs in a web browser?",
          answers: ["Java", "C", "Python", "JavaScript"],
          correct: 3
        },
        {
          question: "What does HTML stand for?",
          answers: ["Hypertext Markup Language", "Hypertext Machine Language", "Hightext Markup Language", "Hyperlink Markup Language"],
          correct: 0
        },
        {
          question: "Which HTML tag is used to link an external stylesheet?",
          answers: ["<script>", "<style>", "<link>", "<css>"],
          correct: 2
        },
        {
          question: "What does 'npm' stand for?",
          answers: ["Node Package Manager", "New Project Manager", "Node Program Module", "Network Package Module"],
          correct: 0
        },
        {
          question: "Which symbol is used for IDs in CSS?",
          answers: [".", "*", "#", "@"],
          correct: 2
        },
        {
          question: "What is the correct Vue directive to bind data to an attribute?",
          answers: ["v-model", "v-bind", "v-on", "v-if"],
          correct: 1
        },
        {
          question: "Which method adds an item to the end of a JavaScript array?",
          answers: ["push()", "pop()", "shift()", "splice()"],
          correct: 0
        },
        {
          question: "What does 'v-model' do in Vue?",
          answers: ["Loops through a list", "Conditionally renders an element", "Two-way binds a form input to data", "Emits an event"],
          correct: 2
        },
        {
          question: "Which Vue directive is used to listen to events?",
          answers: ["v-bind", "v-for", "v-if", "v-on"],
          correct: 3
        }
      ]
    }
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
      this.gameState = 'start'
    }
  }
}
</script>