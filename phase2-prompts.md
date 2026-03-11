**/[Claude Sonnet 4.6]** For Milestone 10, I created the game store with state and getters but the Pinia DevTools panel is blank — no store showing up. What's wrong?

**/[Claude Sonnet 4.6]** Should I commit the temporary useGameStore() fix in main.js or remove it first?

**/[Claude Sonnet 4.6]** Refactor my QuestionCard.vue for Phase 2. It should receive a selectedAnswer prop (Number or null) instead of tracking selection internally. Emit the clicked index instead of true/false. Use a buttonClass(index) method for highlights. Remove the setTimeout because timing is handled by the store.

**/[Claude Sonnet 4.6]** Update my HomeView.vue to call store.startGame() before navigating to /play. My HomeView uses a StartScreen component with @start="goToGame" instead of a direct button.

**/[Claude Sonnet 4.6]** Update my ScoreBoard.vue to accept a total prop and display "You scored X out of Y" instead of hardcoded 10.

**/[Claude Sonnet 4.6]** Add a streak bonus to my Pinia game store. Track streak and bestStreak in state. In submitAnswer(), award a bonus point every 3 correct answers in a row and reset streak on a wrong answer. Also reset both in resetGame(). Display a 🔥 streak message in PlayView when streak is 3 or more.

**/[Claude Sonnet 4.6]** How do I deploy my Vue 3 app to GitHub Pages? I don't have a deploy script set up yet.

**/[Claude Sonnet 4.6]** My GitHub Pages deployment is showing a blank page at chanlaurenc.github.io/quizblitz/ — the nav renders but the home screen content is missing. How do I fix the routing for GitHub Pages?