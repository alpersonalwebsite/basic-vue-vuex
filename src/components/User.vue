<template>
  <div v-on:click="onClickUser">
    {{user.name + ' ' + user.lastname}}
  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: Object
  },
  methods: {
    onClickUser() {
      this.$emit('selectedUser', this.user)
      const current = new Date()
      // eslint-disable-next-line no-console
      console.log('Emiting from User', current.toLocaleTimeString(), current.getMilliseconds())
    }
  }
}
</script>

<style scoped>

</style>