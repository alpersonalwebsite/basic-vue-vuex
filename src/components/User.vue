<template>
  <div v-on:click="onClickUser">
    <span v-bind:class="isSelected">{{user.name + ' ' + user.lastname}}</span>
  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: Object,
    selectedUserData: Object
  },
  created() {
  // eslint-disable-next-line no-console
  console.log('User')
  },
  methods: {
    onClickUser() {
      // And yes, we expect ids are going to be unique! ;)
      if (this.selectedUserData && this.user.user_id === this.selectedUserData.user_id) return;
      const current = new Date()
      // eslint-disable-next-line no-console
      console.log('Emiting from User', current.toLocaleTimeString(), current.getMilliseconds())
      this.$emit('selectedUser', this.user)
    }
  },
  computed: {
    isSelected: function() {
      return {
        selected: (this.selectedUserData && this.user.user_id === this.selectedUserData.user_id) && true
      }
    }
  }
}
</script>

<style scoped>
  span {
    cursor: pointer;
    width: auto;
  }

  .selected {
    cursor: not-allowed;
    background: lavender;
  }
</style>