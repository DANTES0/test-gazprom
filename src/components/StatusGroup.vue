<script setup lang="ts">
import type { GroupType } from '@/Interfaces/groupType'
import { useGroupStore } from '@/stores/groupStore'
import { computed, ref, watch } from 'vue'

const groupStore = useGroupStore()

const uniqueGroups = ref<string[]>([])
const selectedGroup = computed({
  get: () => groupStore.selectedGroup,
  set: (value) => groupStore.setSelectedGroup(value),
})

const worstNode = computed(() => getWorstStatus(nodes.value))

function getWorstStatus(nodes: GroupType[]): GroupType | null {
  if (nodes.length === 0) {
    return null
  }

  const worstNode = nodes.reduce((worst, node) => {
    return node.node_status_id > worst.node_status_id ? node : worst
  })

  return worstNode
}
function handleGroupClick(groupCaption: string): void {
  selectedGroup.value = groupCaption
}

const nodes = computed(() => {
  if (groupStore.selectedNode) {
    return [groupStore.selectedNode]
  }
  if (groupStore.selectedGroup) {
    return groupStore.getNodesByGroup(groupStore.selectedGroup)
  }
  return []
})

watch(groupStore, () => {
  uniqueGroups.value = groupStore.getUniqueGroups()
})
</script>

<template>
  <div class="content-block">
    <div class="content-block-wrapper">
      <h1 style="">
        Статус:
        {{
          selectedGroup
            ? 'группа ' + selectedGroup
            : 'нода ' + groupStore.selectedNode?.node_caption
        }}
      </h1>
      <div class="p-20">
        Статус сервиса:
        <span :style="{ color: `${worstNode?.node_status_color}` }">{{
          worstNode?.node_status_description
        }}</span>
      </div>
      <div class="pl-20">
        <table>
          <thead>
            <tr>
              <td>Статус ноды</td>
              <td>Название ноды</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(node, index) in nodes" :key="index">
              <td :style="{ color: `${node.node_status_color}` }">
                {{ node.node_status_description }}
              </td>
              <td>
                {{ node.node_caption }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1>Общая информация:</h1>
      <div class="p-20">
        Статус сервиса:
        <span :style="{ color: `${worstNode?.node_status_color}` }">{{
          worstNode?.node_status_description
        }}</span>
      </div>

      <h1>Группы:</h1>
      <div class="group-list p-20">
        <div
          v-for="(group, index) in uniqueGroups"
          :key="index"
          @click="handleGroupClick(group)"
          class="group-list-item"
          :style="{
            fontWeight:
              groupStore.selectedNode?.group_caption === group || selectedGroup === group
                ? 'bold'
                : 'normal',
            color:
              groupStore.selectedNode?.group_caption === group || selectedGroup === group
                ? '#0079c2'
                : 'black',
          }"
        >
          {{ group }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
