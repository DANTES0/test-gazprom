<script setup lang="ts">
import MetricsInterfaceAdminApplication from '@/components/MetricsInterfaceAdminApplication.vue'
import NodesLists from '@/components/NodesLists.vue'
import StatusGroup from '@/components/StatusGroup.vue'
import { useGroupStore } from '@/stores/groupStore'
import { useMetricStore } from '@/stores/metricStore'
import { onMounted, onUnmounted } from 'vue'

const metricStore = useMetricStore()
const groupStore = useGroupStore()
onMounted(async () => {
  await metricStore.fetchMetrics()
  await groupStore.fetchGroups()
  metricStore.startPolling()
  groupStore.startPolling()
})

onUnmounted(() => {
  metricStore.stopPolling()
  groupStore.stopPolling()
})
</script>

<template>
  <div class="wrapper">
    <StatusGroup />

    <NodesLists />

    <MetricsInterfaceAdminApplication />
  </div>
</template>
