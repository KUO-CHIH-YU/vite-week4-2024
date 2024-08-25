<template>
  <!-- ToDo List -->
  <div id="todoListPage" class="bg-half">
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input v-model="addtodo" type="text" placeholder="請輸入待辦事項" />
          <a @click="addtodobtn" href="#">
            <i class="fa fa-plus"></i>
            <!-- <button @click="addtodobtn" type="button">addTodo</button> -->
          </a>
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li>
              <a
                href="#"
                :class="{ active: activeTab === 'all' }"
                @click.prevent="setActiveTab('all')"
                >全部</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ active: activeTab === 'pending' }"
                @click.prevent="setActiveTab('pending')"
                >待完成</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ active: activeTab === 'completed' }"
                @click.prevent="setActiveTab('completed')"
                >已完成</a
              >
            </li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="todo in filteredTodos" :key="todo.id">
                <label class="todoList_label">
                  <input
                    v-model="todo.status"
                    class="todoList_input"
                    type="checkbox"
                    @click="togglestatus(todo.id)"
                  />
                  <span v-if="!todo.edit">{{ todo.content }}</span>
                  <input v-else :value="todo.content" @change="updateTodoEdit($event, todo.id)" />
                </label>
                <a href="#">
                  <i
                    v-if="!todo.edit"
                    @click="editing(todo.id)"
                    class="fa-solid fa-pen-to-square fa-2x"
                  ></i>
                  <i v-else @click="editing(todo.id)" class="fa-solid fa-check fa-2x"></i>
                </a>
                <a href="#">
                  <i @click="del(todo.id)" class="fa fa-times fa-2x"></i>
                </a>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p>{{ todosstatus }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <h1>Todo list</h1>

  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.content }}
      {{ todo.status ? '完成' : '未完成' }}

      <input type="text" placeholder="更新值" @change="updateTodoEdit($event, todo.id)" />

      <button @click="update(todo.id)" type="button">更新</button> |
    </li>
  </ul> -->
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useCounter, userouter } from '@/stores/counter'
const counter = useCounter()
const router = userouter()

const url = counter.Url
const token = counter.token
// const token = document.cookie
//   .split('; ')
//   .find((row) => row.startsWith('todo='))
//   ?.split('=')[1]

onMounted(() => {
  if (token) {
    getTodos()
  } else {
    router.week4()
  }
})

const activeTab = ref('all')
const setActiveTab = (tab) => {
  activeTab.value = tab
}

const todos = ref([])
const todoEdit = ref({})
const addtodo = ref('')
const todosstatus = ref('')

const filteredTodos = computed(() => {
  switch (activeTab.value) {
    case 'pending':
      return todos.value.filter((todo) => !todo.status)
    case 'completed':
      return todos.value.filter((todo) => todo.status)
    case 'all':
    default:
      return todos.value
  }
})

const getTodos = async () => {
  const response = await axios.get(`${url}/todos`, {
    headers: {
      authorization: token
    }
  })
  // console.log(todos.value)
  todos.value = response.data.data
  todos.value.forEach((todo) => {
    todo.edit = false
  })
  todosstatuschange()
}

const todosstatuschange = () => {
  todosstatus.value = `${todos.value.filter((todo) => !todo.status).length} 個未完成項目，
  ${todos.value.filter((todo) => todo.status).length} 個已完成項目`
}

const addtodobtn = async () => {
  try {
    await axios.post(
      `${url}/todos`,
      {
        content: addtodo.value
      },
      {
        headers: { authorization: token }
      }
    )
    // console.log(res.data)
    getTodos()
    addtodo.value = ''
  } catch (error) {
    console.log(error.data)
  }
}

const del = async (id) => {
  try {
    await axios.delete(`${url}/todos/${id}`, {
      headers: { authorization: token }
    })
    getTodos()
  } catch (error) {
    console.log(error.data)
  }
}

const editing = (id) => {
  const todo = todos.value.find((todo) => todo.id === id)
  todo.edit = !todo.edit
  if (!todo.edit && id in todoEdit.value) {
    // console.log(todoEdit.value[id], todo.content)
    if (todoEdit.value[id] != todo.content) {
      update(id)
    }
  }
}

const update = async (id) => {
  // const todo = todos.value.find((todo) => todo.id === id)
  // console.log(id, 'update')
  try {
    await axios.put(
      `${url}/todos/${id}`,
      {
        content: todoEdit.value[id]
      },
      {
        headers: { authorization: token }
      }
    )
    // console.log(res.data)
    getTodos()
  } catch (error) {
    console.log(error.data)
  }
}

const updateTodoEdit = (event, id) => {
  todoEdit.value = { ...todoEdit.value, [id]: event.target.value }
}

const togglestatus = async (id) => {
  try {
    await axios.patch(
      `${url}/todos/${id}/toggle`,
      {},
      {
        headers: { authorization: token }
      }
    )
    // getTodos()
    todosstatuschange()
  } catch (error) {
    console.log(error.data)
  }
}
</script>

<style scoped>
a {
  margin: 0px;
}
.fa.fa-plus {
  color: white;
}
.fa-pen-to-square .fa-times {
  align-items: center;
  display: flex;
}
</style>
