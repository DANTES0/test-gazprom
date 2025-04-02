<script setup lang="ts">
import { useGroupStore } from '@/stores/groupStore'
import { useMetricStore } from '@/stores/metricStore'
import { computed } from 'vue'

const groupStore = useGroupStore()
const metricStore = useMetricStore()
const nodes = computed(() => {
  if (groupStore.selectedNode) {
    return [groupStore.selectedNode]
  }
  if (groupStore.selectedGroup) {
    return groupStore.getNodesByGroup(groupStore.selectedGroup)
  }
  return []
})

const nodeIds = computed(() => {
  return nodes.value.map((node) => node.node_id)
})

const metrics = computed(() => {
  return metricStore.getMetricsByNodeIds(nodeIds.value)
})
</script>

<template>
  <div class="content-block">
    <div class="content-block-wrapper">
      <h1>Метрики</h1>
      <div class=""></div>
      <h1>Интерфейс</h1>
      <div class="">
        <table>
          <thead>
            <tr>
              <td>Статус</td>
              <td>Название</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(node, index) in nodes" :key="index">
              <td :style="{ color: `${node.interface_status_color}` }">
                {{ node.interface_status_description }}
              </td>
              <td>{{ node.node_caption }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1>Администратор:</h1>
      <div class="admin-info" v-for="(node, index) in nodes" :key="index">
        <label>{{ node.admin_lastname }}</label>
        <label>{{ node.admin_firstname }}</label>
        <a :href="`mailto:${node.admin_email}`">{{ node.admin_email }}</a>
      </div>
      <h1>Приложения:</h1>
      <div v-for="(node, index) in nodes" :key="index">{{ node.application_caption }}</div>
    </div>
  </div>
</template>

<style scoped></style>
