<template>
  <span class="ct-arrow-wrap up"></span>
</template>
<script>
import '../assets/main.css'
export default {
  name: 'Arrow',
  props: {
    width: '40px',
    height: '40px',
    color: '#333',
    direction: {
      type: String,
      default: 'up',
      validator (v) {
        return ['up', 'right', 'down', 'left'].indexOf(v) > -1
      }
    }
  }
}
</script>
<style scoped>
</style>
