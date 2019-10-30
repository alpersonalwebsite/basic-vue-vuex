<template>
  <div>
    <h2>List of Users: {{users.length}}</h2>
    <div v-if="loadingUsers">Loading...</div>
    <User
      v-for="user in users"
      v-bind:user="user"
      v-bind:key="user.user_id"
      v-on:selectedUser="onClickUserInList"
     />
     <br />
     <div v-if="selectedUser">
       You selected: {{ selectedUser }}
     </div>
  </div> 
</template>

<script>
import User from './User'

export default {
  name: 'UserList',
  components: {
    User
  },
  data() {
    return {
      selectedUser: null
    }
  },
  computed: {
    users() {
      return this.$store.getters.getterUsers
    },
    loadingUsers() {
      // eslint-disable-next-line no-console
      console.log('Loading!')
      return this.$store.getters.getterLoadingUsers
    }
  },
  created() {
    this.callActionGetUsers()
  },
  methods: {
    callActionGetUsers() {
      return this.$store.dispatch('getUsers')
    },
    onClickUserInList(user) {
      this.selectedUser = user
      // eslint-disable-next-line no-console
      console.log('List!')
      }
    }
}
</script>

<style scoped>

</style>