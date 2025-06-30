<template>
  <div>
    <h1>Simple Chat</h1>
    <div class="chat-container">
      <div v-for="msg in messages" :key="msg.id" class="bubble other">
        {{ msg.content }}
      </div>
    </div>
    <form @submit.prevent="sendMessage">
      <input v-model="input" placeholder="Type your message..." required />
      <button type="submit">Send</button>
      <button type="button" @click="deleteAll">Delete All</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const messages = ref([])
const input = ref('')

const loadMessages = async () => {
  const res = await fetch('/api/messages')
  const data = await res.json()
  messages.value = data.messages
}

const sendMessage = async () => {
  if (!input.value.trim()) return
  await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: input.value })
  })
  input.value = ''
  loadMessages()
}

const deleteAll = async () => {
  await fetch('/api/messages', {
    method: 'DELETE'
  })
  messages.value = []
}

onMounted(loadMessages)
</script>

<style>
body {
  font-family: sans-serif;
  max-width: 600px;
  margin: 40px auto;
}
.chat-container {
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
  margin-bottom: 20px;
}
.bubble {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 16px;
  background-color: #f1f0f0;
}
</style>

