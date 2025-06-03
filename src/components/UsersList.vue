<template>
  <div>
    <h3>Список пользователей</h3>
    <div class="card mb-2" v-for="user in users" :key="user.id">
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <strong>{{ user.fullName }}</strong><br>
          Возраст: {{ user.age }}
        </div>
        <button v-if="currentUser" class="btn" :class="isFriend(user.id) ? 'btn-danger' : 'btn-success'" @click="toggleFriend(user.id)">
          {{ isFriend(user.id) ? 'Убрать из друзей' : 'Добавить в друзья' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['currentUser', 'users']),
    friends() {
      return this.users.filter(u => !this.currentUser || u.id !== this.currentUser.id)
    }
  },
  methods: {
    ...mapActions(['saveCurrentUser']),
    isFriend(id) {
      return this.friends.includes(id)
    },
    toggleFriend(id) {
      this.$store.commit('toggleFriend', id)
      this.saveCurrentUser()
    }
  }
}
</script>