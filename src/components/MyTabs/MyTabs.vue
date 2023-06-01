<script>
import {HomeFilled} from "@element-plus/icons-vue";

export default {
  name: 'MyTabs',
  components: {HomeFilled},
  data: () => {
    return {
      /* tab 栏的状态 */
      editableTabsValue: 1, //
      tabIndex: 2, //
      editableTabs: [] // 获取 vuex的 数据
    }
  },
  methods: {
    // 点击新增后或移除
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        const newTabName = `${++this.tabIndex}`
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content',
        })
        this.editableTabsValue = newTabName
        this.$store.dispatch('asyncUpTabs', this.editableTabs)
      } else if (action === 'remove') {
        const tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }

        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter((tab) => tab.name !== targetName)
        this.$store.dispatch('asyncUpTabs', this.editableTabs)
      }
    },
    // 点击 tab 选项切换内容
    handleTabsBody(pane) {
        console.log('editableTabsValue', this.editableTabs[this.editableTabsValue - 1].content)
      this.$router.push(this.editableTabs[this.editableTabsValue - 1].content)
    },
  },
  mounted() {
    this.editableTabs = this.$store.state.editableTabs;
    this.editableTabsValue = this.$store.state.editableTabs.length;
  },
  props: ['title'],
}
</script>

<template>
  <!--      -->
  <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="demo-tabs"
      @edit="handleTabsEdit"
      @tab-click="handleTabsBody"
      closable
  >
    <el-tab-pane name="title">
      <template #label>
              <span class="custom-tabs-label" style="display: flex; align-items: center">
                <el-icon><HomeFilled/></el-icon>
                <span style="margin-left: 4px">{{title}}</span>
              </span>
      </template>
    </el-tab-pane>
    <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<style>

</style>
