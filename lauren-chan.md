# Quiz 2 Answers
**Name:** Lauren Chan

**Date:** 11 March 2026



## Q1

D) The component should emit an event to the parent requesting the change, and the parent should update its own data in response.



## Q2

The store needs a new state property called `lastAnswerCorrect`, which stores whether the most recent answer was correct. It should be updated inside the `submitAnswer()` action when the user selects an answer.

```js
export const useGameStore = defineStore('game', {
  state: () => ({
    questions: [],
    currentIndex: 0,
    score: 0,
    gameState: 'start',
    lastAnswerCorrect: null
  }),

  actions: {
    submitAnswer(index) {
      this.lastAnswerCorrect = index === this.questions[this.currentIndex].correct

      if (this.lastAnswerCorrect) {
        this.score++
      }

      this.nextQuestion()
    }
  }
})
```
`QuestionCard.vue` should read `lastAnswerCorrect` directly from the store instead of receiving it as a prop from `App.vue`. This avoids prop drilling, where data must be passed through intermediate components just to reach one child. Since `lastAnswerCorrect` is part of the shared game state, it makes more sense for the `useGameStore` to own it so any component can access it directly.



## Q3

C) All component instances that call `useGameStore()` share the same state object in memory, meaning a state change in one component affects all others simultaneously.


## Q4

Part A: The mistake is that `App.vue` does not include `<router-view />`. Even though the router is configured with routes for `/` and `/play`, Vue Router needs a placeholder in the template where it can render the component that matches the current route. In the current template where it can render the component that matches the current route. In the current template, `App.vue` is manually rendering `<GameView v-if="gameState === 'playing'" />`, which bypasses the router entirely. Because `<router-view>` is missing, Vue Router has nowhere to render either `StartScreen` or `GameView`, which results in a blank screen when navigating to `/play`.

Part B: The corrected `App.vue` template should allow the router to control which view is displayed. 
```html
<template>
  <div>
    <h1>QuizBlitz</h1>
    <router-view />
  </div>
</template>
```
`<router-view>` acts as a placeholder where Vue Router renders the component that matches the current route. When the user navigates between routes such as `/` and `/play`, the router dynamically swaps the component displayed inside `<router-view>` without reloading the page.

## Q5

B) Approach B, because `ScoreBoard` only displays data it receives — keeping it decoupled from the store makes it easier to reuse or test in isolation.


## Q6

The error happens because after the last question, `currentIndex` becomes equal to `questions.length`. Array indexes go from `0` to `questions.length - 1`, so `state.questions[state.currentIndex]` returns `undefined`. Then the component tries to read `currentQuestion.text`, which throws an error because undefined does not have a `text` property. I would fix this in `nextQuestion()` rather than in the getter, because the store should avoid creating an invalid state in the first place. Keeping `currentIndex` within a valid range is cleaner and prevents similar bugs elsewhere. 
```js
actions: {
  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++
    } else {
      this.gameState = 'end'
    }
  }
}
```


## Q7

B) Using `index` as `:key` is acceptable here because the answers array for a given question does not change while the component is mounted; the risk of key-related bugs only arises when the list can be reordered or items deleted.


## Q8

**Local file approach**
- Advantage: Using a local `questions.js` file keeps the app simple and reliable. In `startGame()`, the store can load the questions immediately, reset `currentIndex` and `score`, and set `gameState` to `playing` without waiting for a network request. This fits the current architecture well because the quiz always uses the same fixed 10 questions.
- Disadvantage: The questions are static, so updating them requires changing the code and redeploying the app. This makes the quiz less flexible if the developer later wants different categories, randomized content, or teacher-managed question sets.

**Remote API approach**
- Advantage: Fetching from an API would make the app more dynamic. The store could load different question sets without changing the code, and `questions` could be updated externally while still using the same `submitAnswer()` and `nextQuestion()` logic.
- Disadvantage: It adds complexity to a small app. `startGame()` would need async error handling, and the game could fail to start if the request is slow or unsuccessful. The store might also need extra state like loading or error flags.

**My choice and reasoning:** For the current stage of the project, I would choose the local file approach. Since `startGame()` already resets the game and loads a fixed set of questions, keeping `questions` local makes the ap simpler, faster to debug, and more dependable for a classroom assignment.


## Q9

B) `v-show` hides elements with `display: none` but keeps them mounted, so `startGame()` would need to defend against being called while a game is already in progress, and the game state could persist unexpectedly between screen transitions.


## Q10

**`useGameStore.js` changes:** I would add `timeLeft` and `timerId` to the store state, then create timer-related actions so the countdown is controlled by the same place that already controls `currentIndex`, `score`, and `gameState`. The timer should start when the game starts, reset whenever a new question begins, and stop when the user answers or the game ends.
```js
state: () => ({
  questions: [],
  currentIndex: 0,
  score: 0,
  gameState: 'start',
  selectedAnswer: null,
  timeLeft: 15,
  timerId: null
}),

actions: {
  startTimer() {
    clearInterval(this.timerId)
    this.timeLeft = 15
    this.timerId = setInterval(() => {
      this.tick()
    }, 1000)
  },

  tick() {
    this.timeLeft--

    if (this.timeLeft <= 0) {
      clearInterval(this.timerId)
      this.nextQuestion()
    }
  },

  startGame() {
    this.questions = questions
    this.currentIndex = 0
    this.score = 0
    this.gameState = 'playing'
    this.startTimer()
  },

  submitAnswer(index) {
    clearInterval(this.timerId)

    if (index === this.questions[this.currentIndex].correct) {
      this.score++
    }

    this.nextQuestion()
  },

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++
      this.startTimer()
    } else {
      clearInterval(this.timerId)
      this.gameState = 'end'
    }
  },

  resetGame() {
    clearInterval(this.timerId)
    this.questions = []
    this.currentIndex = 0
    this.score = 0
    this.gameState = 'start'
    this.selectedAnswer = null
    this.timeLeft = 15
    this.timerId = null
  }
}
```

**`QuestionCard.vue` changes (template only - to display the countdown):** I would display the countdown in the question card so the player can see how much time is left for the current question.
```html
<template>
  <div class="question-card">
    <p>Time left: {{ store.timeLeft }} seconds</p>
    <h2>{{ question.question }}</h2>

    <button
      v-for="(answer, index) in question.answers"
      :key="index"
      @click="$emit('answer', index)"
    >
      {{ answer }}
    </button>
  </div>
</template>
```

**Why the timer logic belongs in the store, not the component:** The timer logic belongs in the store because it is part of the game's shared state, just like `score`, `currentIndex`, and `gameState`. If the timer were inside `QuestionCard.vue`, it would be tied to that component's lifecycle and could reset or break when the component re-renders or unmounts. Keeping the timer in the store lets actions like `submitAnswer()` and `nextQuestion()` control the countdown consistently, which makes the game flow easier to manage and prevents duplicated timer logic.