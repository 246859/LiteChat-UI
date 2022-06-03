<template>
  <svg class="icon">
    <use :href="symbol"></use>
  </svg>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    symbol: String,
  },
  setup(props) {
    const symbol = ref(`#${props.symbol}`)
    return {
      symbol,
    }
  },
})
</script>

<style>
.icon {
  width: 100%;
  height: 100%;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>