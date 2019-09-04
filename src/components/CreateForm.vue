<template>
  <div class="input-form">
    <input type="input" v-model="inputtingItem" />
    <button @click="handleCreateTodo">Add</button>
    <div v-show="open">加载中。。。</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "create-form",
  data: function() {
    return {
      inputtingItem: ""
    };
  },
  methods: {
    handleCreateTodo: function() {
      this.$store.dispatch("postTodos", {
        status: "active",
        content: this.inputtingItem
      });
    }
  },
  computed: {
    ...mapState(["open"])
  }
};
</script>

<style scoped>
</style>
