<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
    v-on="$attrs"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import {
  computed
} from 'vue'

export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const iconName = computed(() => {
      return `#icon-${props.name}`
    })

    const svgClass = computed(() => {
      if (props.name) {
        return 'svg-icon ' + props.name
      }
      return 'svg-icon'
    })
    return {
      iconName,
      svgClass
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
