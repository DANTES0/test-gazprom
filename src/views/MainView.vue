<script setup lang="ts">
import MetricsInterfaceAdminApplication from '@/components/MetricsInterfaceAdminApplication.vue'
import NodesLists from '@/components/NodesLists.vue'
import StatusGroup from '@/components/StatusGroup.vue'
</script>

<template>
  <div class="wrapper">
    <StatusGroup />

    <NodesLists />

    <MetricsInterfaceAdminApplication />
  </div>
</template>
