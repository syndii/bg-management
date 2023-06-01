<template>
  <div class="page">
    <h1>{{ title }}</h1>
    <div>
      <slot name="header"></slot>
    </div>
    <div class="page-container">
      <slot></slot>
    </div>
    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyPage',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 12px;
  color: white;
  font-size: 24px;
}
.page {
  display: flex;
  flex-direction: column;
  height: 100%;

  .page-container {
    height: 0;
    flex: 1;
    display: flex;
  }
}
</style>
