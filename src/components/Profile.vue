<template>
  <div>
    <h3>Личный кабинет</h3>
    <div class="form-group">
      <label>ФИО</label>
      <input class="form-control" v-model="fullName">
    </div>
    <div class="form-group">
      <label>Возраст</label>
      <input type="number" class="form-control" v-model="age">
    </div>
    <button class="btn btn-primary" @click="save">Сохранить</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      fullName: '',
      age: ''
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mounted() {
    this.fullName = this.currentUser.fullName
    this.age = this.currentUser.age
  },
  methods: {
    ...mapMutations(['setCurrentUser']),
    ...mapActions(['saveCurrentUser']),
    save() {
      this.setCurrentUser({ ...this.currentUser, fullName: this.fullName, age: this.age })
      this.saveCurrentUser().then(() => alert('Сохранено'))
    }
  }
}
</script>
