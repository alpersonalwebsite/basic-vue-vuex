<template>
  <div>
    <!-- Four states, not two. Previously the heading rendered "List of Users: 0"
         above a "Loading..." div, and a failed request showed the same thing
         permanently, because the store had no error to report and its loading flag
         never cleared. -->
    <div v-if="loadingUsers">Loading...</div>
    <div v-else-if="usersError" class="error">
      <p>Could not load users: {{ usersError }}</p>
      <p>
        This demo reads from
        <a href="https://github.com/alpersonalwebsite/node-express-postgresql">
          node-express-postgresql</a>. Start it locally, or point
        <code>VUE_APP_API_URL</code> at your own endpoint. See the README.
      </p>
      <button v-on:click="callActionGetUsers">Retry</button>
    </div>
    <div v-else-if="!users.length">No users returned.</div>
    <div v-else>
      <h2>List of Users: {{ users.length }}</h2>
      <User
        v-for="user in users"
        v-bind:user="user"
        v-bind:key="user.id"
        v-bind:selectedUserData="selectedUserData"
        v-on:selectedUser="onClickUserInList"
      />
    </div>
    <br />
    <div v-if="selectedUserData">
      You selected: {{ selectedUserData.firstname }} {{ selectedUserData.lastname }}
    </div>
  </div>
</template>

<script>
import User from "./User";

export default {
  name: "UserList",
  components: {
    User
  },
  data() {
    return {
      // Local component state, deliberately: which row is highlighted matters to this
      // list and to nothing else. The user data itself is in the store because more
      // than one component would want it. Knowing which is which is most of what
      // using Vuex well amounts to.
      selectedUserData: null
    };
  },
  computed: {
    users() {
      return this.$store.getters.getterUsers;
    },
    loadingUsers() {
      return this.$store.getters.getterLoadingUsers;
    },
    usersError() {
      return this.$store.getters.getterUsersError;
    }
  },
  created() {
    this.callActionGetUsers();
  },
  methods: {
    callActionGetUsers() {
      return this.$store.dispatch("getUsers");
    },
    onClickUserInList(user) {
      this.selectedUserData = user;
    }
  }
};
</script>

<style scoped>
.error {
  color: #b00020;
}
</style>
