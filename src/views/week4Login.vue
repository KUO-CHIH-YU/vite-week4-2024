<template>
  <div class="conatiner loginPage">
    <div class="side">
      <img
        class="logoImg"
        src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
        alt=""
      />
      <img
        class="d-m-n"
        src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
        alt="workImg"
      />
    </div>

    <div v-if="loginPage">
      <!-- login_page -->
      <form class="formControls" action="index.html">
        <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
        <label class="formControls_label" for="email">Email</label>
        <input
          v-model="SingInemail"
          class="formControls_input"
          type="text"
          id="email"
          placeholder="請輸入 email"
          required
        />
        <span v-if="!SingInemail">此欄位不可留空</span>
        <label class="formControls_label" for="pwd">密碼</label>
        <input
          v-model="SingInpwd"
          class="formControls_input"
          type="password"
          id="pwd"
          placeholder="請輸入密碼"
          required
        />
        <button @click="singIn" class="formControls_btnSubmit" type="button">登入</button>
        <a @click.prevent="tologinPage" class="formControls_btnLink" href="#">註冊帳號</a>
      </form>
    </div>
    <div v-else>
      <!-- sign up -->
      <form class="formControls" action="index.html">
        <h2 class="formControls_txt">註冊帳號</h2>
        <label class="formControls_label" for="email">Email</label>
        <input
          v-model="SingUpemail"
          class="formControls_input"
          type="text"
          id="email"
          name="email"
          placeholder="請輸入 email"
          required
        />
        <label class="formControls_label" for="name">您的暱稱</label>
        <input
          v-model="nickname"
          class="formControls_input"
          type="text"
          name="name"
          id="name"
          placeholder="請輸入您的暱稱"
        />
        <label class="formControls_label" for="pwd">密碼</label>
        <input
          v-model="SingUppwd"
          class="formControls_input"
          type="password"
          id="pwd"
          placeholder="請輸入密碼"
          required
        />
        <label class="formControls_label" for="pwd">再次輸入密碼</label>
        <input
          @change="pwsverify"
          v-model="pwd2"
          class="formControls_input"
          type="password"
          id="pwd2"
          placeholder="請再次輸入密碼"
          required
        />
        <span>{{ pwderror }}</span>
        <input @click="singUp" class="formControls_btnSubmit" type="button" value="註冊帳號" />
        <!-- <button @click="singUp" type="button">註冊</button> -->
        <!-- <p>{{ messageSignUp }}</p> -->
        <a @click.prevent="tologinPage" class="formControls_btnLink" href="#">登入</a>
      </form>
    </div>
  </div>

  <!-- <div v-if="verify">
    <h2>驗證</h2>
    <input v-model="token" type="text" placeholder="Token" /> |
    <button @click="checkout" type="button">驗證</button>
    <p>{{ messagecheckout }}</p>
  </div> -->
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useCounter, userouter } from '@/stores/counter'
const counter = useCounter()
const router = userouter()

const url = counter.Url
const loginPage = ref(true)
const SingUpemail = ref('smart@gmail.com')
const SingUppwd = ref('smartsmart')
const pwd2 = ref('smartsmart')
const pwderror = ref('')
const nickname = ref('smart')
const messageSignUp = ref('')

const tologinPage = () => {
  loginPage.value = !loginPage.value
}

const pwsverify = () => {
  if (SingUppwd.value != pwd2.value) {
    pwderror.value = '密碼輸入不一致'
  } else {
    pwderror.value = ''
  }
}

//註冊
const singUp = async () => {
  if (pwderror.value != '') {
    return
  }
  try {
    const res = await axios.post(`${url}/users/sign_up`, {
      email: SingUpemail.value,
      password: SingUppwd.value,
      nickname: nickname.value
    })
    // console.log(res.data)
    messageSignUp.value = '註冊成功. UID: ' + res.data.uid
    singUpsucess(messageSignUp)
  } catch (error) {
    pwderror.value = error.response.data.message
    // console.log(error)
  }
}
const singUpsucess = (messageSignUp) => {
  alert('註冊成功', messageSignUp.value)
  loginPage.value = true
}

// 登入
const SingInemail = ref('smart@gmail.com')
const SingInpwd = ref('smartsmart')
// const messageSignIn = ref('')

const singIn = async () => {
  try {
    const res = await axios.post(`${url}/users/sign_in`, {
      email: SingInemail.value,
      password: SingInpwd.value
    })

    // messageSignIn.value = 'token: ' + res.data.token
    counter.setToken(res.data.token)
    counter.setName(res.data.nickname)
    router.todoList()
  } catch (error) {
    alert(error.response.data.message)
    // messageSignIn.value = '錯誤'
  }
}
</script>
