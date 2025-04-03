import type { GroupType } from '@/Interfaces/groupType'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGroupStore = defineStore('groups', () => {
  const groups = ref<GroupType[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const selectedGroup = ref<string>('')
  const selectedNode = ref<GroupType | null>(null)
  const fetchGroups = async (): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('http://localhost:23456/api/groups')
      if (!response.ok) {
        throw new Error(`Ошибка при получении групп, статус: ${response.status}`)
      }
      groups.value = await response.json()
    } catch (err: Error | any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  const getUniqueGroups = (): string[] => {
    return [...new Set(groups.value.map((group) => group.group_caption))]
  }

  const getNodesByGroup = (groupCaption: string): GroupType[] => {
    return groups.value.filter((group) => group.group_caption === groupCaption)
  }

  const setSelectedGroup = (groupCaption: string): void => {
    selectedNode.value = null
    selectedGroup.value = groupCaption
  }

  const setSelectedNode = (node: GroupType): void => {
    selectedGroup.value = ''
    selectedNode.value = node
  }

  let intervalId: number | null = null

  const startPolling = (): void => {
    if (intervalId !== null) return
    intervalId = setInterval(async () => {
      try {
        await fetchGroups()
        console.log('Метрики обновлены:', groups.value)
      } catch (error) {
        console.error('Ошибка при обновлении метрик:', error)
      }
    }, 15000)
  }

  const stopPolling = (): void => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  return {
    groups,
    loading,
    error,
    fetchGroups,
    getUniqueGroups,
    getNodesByGroup,
    selectedGroup,
    setSelectedGroup,
    selectedNode,
    setSelectedNode,
    startPolling,
    stopPolling,
  }
})
