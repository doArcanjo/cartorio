<template>
  <div class="counter" @click="$store.dispatch('incrementAsync')">
    {{ count }}
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      console.log("@ counter vue Counter2:", this.$store.state.Counter)
      return this.$store.state.Counter.count
    }
  }
}
</script>

<style>
.counter {
  cursor: pointer;
  margin: 100px auto;
  border-radius: 3px;
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  font-size: 5rem;
  background-color: #f0f0f0;
  user-select: none;
}
</style>
