<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="innerIcon" />
  </svg>
</template>
  
<script  setup >
import { computed ,defineProps} from "vue";
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});

// #icon-abc
const innerIcon = computed(() => `#icon-${props.icon}`);
</script>
  <style scoped lang="scss">
.svg-icon {
  overflow: hidden;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>