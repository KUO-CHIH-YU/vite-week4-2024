<script setup>
import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { useCounter, userouter } from '@/stores/counter'

import axios from 'axios'
import { ref } from 'vue'

const counter = useCounter()
const router = userouter()

const messagesignOut = ref('')
const signOut = async () => {
  try {
    const res = await axios.post(
      `${counter.Url}/users/sign_out`,
      {},
      {
        headers: { authorization: counter.token }
      }
    )
    // console.log(res.data)

    document.cookie += '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    messagesignOut.value = res.data.message
    counter.setToken('')
    document.cookie = ''
    router.week4()
  } catch (error) {
    messagesignOut.value = '登出失敗' + error.message
    alert(messagesignOut.value)
  }
}
</script>

<template>
  <header class="bg-yellow">
    <div v-if="counter.token !== ''" class="navbar navbar-dark bg-dark ml-auto">
      <div class="container-fluid">
        <a class="navbar-brand">
          <div class="side">
            <img
              class="logoImg"
              src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
              alt=""
            />
          </div>
          <nav>
            <!-- <RouterLink to="/">Home</RouterLink> | -->
            <!-- <RouterLink to="/TodoList">TodoList</RouterLink> | -->

            <a>{{ counter.name + ' welcome!!' }}</a>

            <button @click="signOut" type="button" class="btn btn-light">登出</button>
          </nav>
        </a>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* header {
  line-height: 1.5;
  padding-bottom: 20px;
} */
nav {
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
a {
  color: #bcbcbc;
  font-size: 20px;
  padding-right: 30px;
  align-items: center;
  display: flex;
}
.navbar {
  height: 65px;
}

.navbar-brand {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.side {
  display: flex;
  align-items: center; /* 垂直置中 */
  height: 50px;
}
.logoImg {
  margin-right: auto; /* 靠左 */
  height: inherit;
  background-color: #ffd370;
}
</style>
