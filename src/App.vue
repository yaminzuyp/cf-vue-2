<template>
  <div class="chat-container">
    <div class="chat-box">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="bubble"
      >
        {{ msg.content }}
      </div>
    </div>

    <div class="input-area">
      <input
        v-model="input"
        @keyup.enter="sendMessage"
        placeholder="Tulis pesan..."
      />
      <button @click="sendMessage">Kirim</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const input = ref('')
const messages = ref([])

const fetchMessages = async () => {
  const res = await fetch('/api/messages')
  const data = await res.json()
  messages.value = data.messages.reverse()
}

const sendMessage = async () => {
  if (!input.value.trim()) return
  await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: input.value }),
  })
  input.value = ''
  await fetchMessages()
}

onMounted(fetchMessages)
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
  padding: 1rem;
}

.chat-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

.bubble {
  background-color: #d1e7dd;
  padding: 10px 15px;
  border-radius: 15px;
  align-self: flex-start;
  max-width: 80%;
  word-break: break-word;
}

.input-area {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  padding: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
}
</style>
