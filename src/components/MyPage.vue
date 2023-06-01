<script>
import { defineComponent } from 'vue';
import MyTabs from "../components/MyTabs/MyTabs.vue";

export default defineComponent({
  name: 'MyPage',
  components: {MyTabs},
  props: {
    title: {
      type: String,
      default: '',
    },
  },
});
</script>

<template>
  <div class="page">
    <div>
      <slot name="header"></slot>
    </div>
    <div class="page-container">
      <slot></slot>
    </div>
    <div class="page-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin-bottom: 12px;
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

  .page-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
}
</style>
