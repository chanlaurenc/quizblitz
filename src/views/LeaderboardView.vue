<template>
  <div class="leaderboard">
    <h1>Leaderboard</h1>

    <p v-if="loading" class="status">Loading scores...</p>

    <p v-else-if="error" class="status error">Could not load scores. Is the server running?</p>

    <ol v-else-if="scores.length > 0" class="scores-list">
      <li v-for="entry in scores" :key="entry._id" class="score-entry">
        <span class="name">{{ entry.playerName }}</span>
        <span class="score">{{ entry.score }} / {{ entry.totalQuestions }}</span>
      </li>
    </ol>

    <p v-else class="status">No scores yet. Be the first to play!</p>

    <RouterLink to="/" class="back-link">← Back to home</RouterLink>
  </div>
</template>

<script>
export default {
  name: 'LeaderboardView',
  data() {
    return {
      scores: [],
      loading: true,
      error: false
    }
  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:3000/api/scores')
      if (!response.ok) throw new Error('Server error')
      this.scores = await response.json()
    } catch (err) {
      this.error = true
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.leaderboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  max-width: 500px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  font-weight: 600;
  color: #7c6fa0;
  margin-bottom: 2rem;
}

.scores-list {
  width: 100%;
  padding: 0;
  list-style: none;
  counter-reset: ranking;
}

.score-entry {
  counter-increment: ranking;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.25rem;
  margin-bottom: 0.75rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(124, 111, 160, 0.1);
}

.score-entry::before {
  content: counter(ranking);
  font-weight: 700;
  color: #c9b8e8;
  font-size: 1.1rem;
  min-width: 1.5rem;
}

.name {
  flex: 1;
  font-weight: 600;
  color: #5a5080;
}

.score {
  font-weight: 700;
  color: #7c6fa0;
  background: #f0ebfa;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.95rem;
}

.status {
  color: #b0a8c8;
  font-size: 1rem;
  margin: 2rem 0;
}

.error {
  color: #e53935;
}

.back-link {
  margin-top: 2rem;
  color: #c9b8e8;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.back-link:hover {
  color: #7c6fa0;
}
</style>