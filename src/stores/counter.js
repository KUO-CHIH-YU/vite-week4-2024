import { ref } from 'vue'
import { defineStore } from 'pinia'

import { useRouter } from 'vue-router'

export const userouter = defineStore('router', () => {
  const router = useRouter()
  console.log(router.options.routes)
  function todoList() {
    router.push('/TodoList')
  }

  function week4() {
    router.push('/week4')
  }
  return { todoList, week4 }
})

export const useCounter = defineStore('counter', () => {
  const token = ref('')
  const setToken = (value) => {
    token.value = value
  }

  const name = ref('')
  const setName = (value) => {
    name.value = value
  }

  const Url = 'https://todolist-api.hexschool.io'

  return { token, setToken, name, setName, Url }
})
