<script setup lang="ts">
import type { GroupType } from '@/Interfaces/groupType'
import type { MetricType } from '@/Interfaces/metricType'
import { useGroupStore } from '@/stores/groupStore'
import { useMetricStore } from '@/stores/metricStore'
import { computed, onMounted, ref } from 'vue'
const groupStore = useGroupStore()
const metricStore = useMetricStore()

const allMetrics = ref<MetricType[]>([])
const allNodes = ref<GroupType[]>([])

const nodes = computed(() => {
  if (groupStore.selectedGroup === '') {
    return allNodes.value
  }
  return groupStore.getNodesByGroup(groupStore.selectedGroup)
})

const nodeIds = computed(() => {
  return nodes.value.map((node) => node.node_id)
})

const latestMetrics = computed(() => {
  return metricStore.getLatestMetricsByNodes(nodeIds.value)
})

const metricsForNode = (nodeId: number): MetricType[] => {
  return metricStore.getMetricsByNodeId(nodeId)
}

function handleNodeClick(node: GroupType, metrics: MetricType[]): void {
  groupStore.setSelectedNode(node)
  console.log('Выбранная нода:', node)
  console.log('Метрики ноды:', metrics)
}

function getColor(metric: number): string {
  if (metric <= 85) {
    return 'green'
  } else if (metric <= 95) {
    return 'yellow'
  } else {
    return 'red'
  }
}

onMounted(async () => {
  await metricStore.fetchMetrics()
  await groupStore.fetchGroups()
  allNodes.value = groupStore.groups
  allMetrics.value = metricStore.metrics
  console.log(allMetrics.value)
})
</script>

<template>
  <div class="content-block">
    <div class="content-block-wrapper" style="overflow-y: auto; max-height: 100vh">
      <h1>Ноды</h1>
      <div class="">
        <table>
          <thead>
            <tr>
              <td>Статус</td>
              <td>Название</td>
              <td>Данные метрик</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(node, index) in nodes"
              :key="index"
              @click="handleNodeClick(node, metricsForNode(node.node_id))"
            >
              <td :style="{ color: `${node.node_status_color}` }">
                {{ node.node_status_description }}
              </td>
              <td>{{ node.node_caption }}</td>
              <td>
                <ul>
                  <li>
                    Утилилзация CPU:
                    <span :style="{ color: `${getColor(latestMetrics[index].cpu_utilization)}` }">{{
                      latestMetrics[index].cpu_utilization
                    }}</span>
                  </li>
                  <li>
                    Утилилзация Memory:
                    <span
                      :style="{ color: `${getColor(latestMetrics[index].memory_utilization)}` }"
                      >{{ latestMetrics[index].memory_utilization }}</span
                    >
                  </li>
                  <li>
                    Утилилзация Disk:
                    <span
                      :style="{ color: `${getColor(latestMetrics[index].disk_utilization)}` }"
                      >{{ latestMetrics[index].disk_utilization }}</span
                    >
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
tr:hover {
  background-color: beige;
}
</style>
