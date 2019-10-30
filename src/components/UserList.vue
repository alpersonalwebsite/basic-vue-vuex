<template>
  <div>
    <h2>List of Users: {{users.length}}</h2>
    <User
      v-for="user in users"
      v-bind:user="user"
      v-bind:key="user.user_id"
      v-on:clickUser="onClickUserInList"
     />
  </div> 
</template>

<script>
//import { } from 'vuex'
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
  //...mapState(['users']),

  //...mapGetters(['getterLoadingUsers', 'getterUsers'])
  users() {
    return this.$store.getters.getterUsers
  }
},
created() {
  this.callActionGetUsers()
},
methods: {
   // ...mapActions(['getUsers']),
   callActionGetUsers() {
    return this.$store.dispatch('getUsers')
   },
    onClickUserInList(user) {
      this.$emit('clickUserInList', user)
      //const current = new Date()
      //console.log('Emiting from UserList', current.toLocaleTimeString(), current.getMilliseconds())
    }
  }
}
</script>

<style scoped>

</style>