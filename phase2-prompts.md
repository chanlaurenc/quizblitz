**/[Claude Sonnet 4.6]** For Milestone 10, I created the game store with state and getters but the Pinia DevTools panel is blank — no store showing up. What's wrong?

**/[Claude Sonnet 4.6]** Should I commit the temporary useGameStore() fix in main.js or remove it first?

**/[Claude Sonnet 4.6]** Refactor my QuestionCard.vue for Phase 2. It should receive a selectedAnswer prop (Number or null) instead of tracking selection internally. Emit the clicked index instead of true/false. Use a buttonClass(index) method for highlights. Remove the setTimeout because timing is handled by the store.

**/[Claude Sonnet 4.6]** Update my HomeView.vue to call store.startGame() before navigating to /play. My HomeView uses a StartScreen component with @start="goToGame" instead of a direct button.