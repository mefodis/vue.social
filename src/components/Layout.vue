<template>
  <div>
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Mini Social</a>
        <div class="ml-auto" v-if="!currentUser">
          <button class="btn btn-outline-success mr-2" @click="showLogin = true">Войти</button>
          <button class="btn btn-outline-primary" @click="showRegister = true">Регистрация</button>
        </div>
        <div class="ml-auto" v-else>
          <span class="mr-3">Здравствуйте, <a href="#" @click="showProfile = true">{{ currentUser.fullName }}</a></span>
          <button class="btn btn-outline-danger" @click="logout">Выйти</button>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <Profile v-if="showProfile" />
      <UsersList v-else />
    </div>

    <footer class="bg-light text-center py-3 mt-4">
      <small>&copy; 2025 Mini Social</small>
    </footer>

    <div class="modal" tabindex="-1" role="dialog" style="display:block" v-if="showLogin">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Вход</h5>
            <button type="button" class="close" @click="showLogin = false"><span>&times;</span></button>
          </div>
          <div class="modal-body">
            <input v-model="loginName" class="form-control" placeholder="ФИО">
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="login">Войти</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" tabindex="-1" role="dialog" style="display:block" v-if="showRegister">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Регистрация</h5>
            <button type="button" class="close" @click="showRegister = false"><span>&times;</span></button>
          </div>
          <div class="modal-body">
            <input v-model="registerName" class="form-control mb-2" placeholder="ФИО">
            <input v-model="registerAge" type="number" class="form-control" placeholder="Возраст">
          </div>
          <div class="modal-footer">
            <button class="btn btn-success" @click="register">Зарегистрироваться</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Profile from './Profile.vue'
import UsersList from './UsersList.vue'

export default {
  components: { Profile, UsersList },
  data() {
    return {
      showLogin: false,
      showRegister: false,
      showProfile: false,
      loginName: '',
      registerName: '',
      registerAge: ''
    }
  },
  computed: {
    ...mapState(['currentUser', 'users'])
  },
  methods: {
    ...mapMutations(['setCurrentUser']),
    ...mapActions(['fetchUsers']),
    login() {
      const user = this.users.find(u => u.fullName === this.loginName)
      if (user) {
        this.setCurrentUser(user)
        this.showLogin = false
      } else {
        alert('Пользователь не найден')
      }
    },
    register() {
      const newUser = {
        id: Date.now(),
        fullName: this.registerName,
        age: this.registerAge,
        friends: []
      }
      this.$axios.post('http://localhost:3000/users', newUser).then(() => {
        this.setCurrentUser(newUser)
        this.fetchUsers()
        this.showRegister = false
      })
    },
    logout() {
      this.setCurrentUser(null)
      this.showProfile = false
    }
  },
  created() {
    this.fetchUsers()
  }
}
</script>
