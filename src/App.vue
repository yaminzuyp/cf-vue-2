<template>
  <main>
    <h1>Simple Chat</h1>
    <div class="chat-container">
      <div v-for="msg in messages" :key="msg.id" class="bubble other">
        {{ msg.content }}
      </div>
    </div>
    <form @submit.prevent="sendMessage">
      <input v-model="input" type="text" placeholder="Type your message..." required />
      <button type="submit">Send</button>
    </form>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const messages = ref([])
const input = ref('')

async function loadMessages() {
  const res = await fetch('/api/messages')
  const data = await res.json()
  messages.value = data.messages
}

async function sendMessage() {
  const content = input.value.trim()
  if (!content) return
  messages.value.unshift({ content })
  input.value = ''
  await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  })
}

onMounted(() => {
  loadMessages()
})
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
  margin: 1rem 0;
}
.bubble {
  padding: 10px;
  border-radius: 16px;
  background: #f0f0f0;
}
</style>

