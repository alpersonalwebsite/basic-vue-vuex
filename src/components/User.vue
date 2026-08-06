<template>
  <div v-on:click="onClickUser">
    <span v-bind:class="{ selected: isSelected }">
      {{ user.firstname }} {{ user.lastname }}
    </span>
  </div>
</template>

<script>
export default {
  name: "User",
  props: {
    // Was `user: Object` / `selectedUserData: Object`: a declared prop with nothing
    // asserted about it. `user` is required; `selectedUserData` is legitimately null
    // until something is clicked, so it is optional with an explicit default.
    user: {
      type: Object,
      required: true
    },
    selectedUserData: {
      type: Object,
      default: null
    }
  },
  computed: {
    // Was `{ selected: (this.selectedUserData && ...) && true }`, where the `&& true`
    // did nothing and the expression evaluated to null rather than false when nothing
    // was selected. A plain boolean, with the class binding doing the object part.
    isSelected() {
      return (
        !!this.selectedUserData && this.user.id === this.selectedUserData.id
      );
    }
  },
  methods: {
    onClickUser() {
      // Re-selecting the same row is a no-op, which is what the .selected style's
      // cursor: not-allowed is telling the reader.
      if (this.isSelected) return;
      this.$emit("selectedUser", this.user);
    }
  }
};
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
