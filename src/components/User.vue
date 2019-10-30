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
      this.$emit('clickUser', this.user)
      const current = new Date()
      console.log('Emiting from User', current.toLocaleTimeString(), current.getMilliseconds())
    }
  }
}
</script>

<style scoped>

</style>