import type { MetricType } from '@/Interfaces/metricType'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMetricStore = defineStore('metrics', () => {
  const metrics = ref<MetricType[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const fetchMetrics = async (): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('http://localhost:23456/api/metrics')
      if (!response.ok) {
        throw new Error(`Ошибка при получении групп, статус: ${response.status}`)
      }
      metrics.value = await response.json()
      const data = await response.json()
      metrics.value = data
    } catch (err: Error | any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getMetricsByNodeId = (nodeId: number): MetricType[] => {
    return metrics.value.filter((metric) => metric.node_id === nodeId)
  }

  const getMetricsByNodeIds = (nodeIds: number[]): MetricType[] => {
    return metrics.value.filter((metric) => nodeIds.includes(metric.node_id))
  }

  const getLatestMetricsByNodes = (nodeIds: number[]): MetricType[] => {
    const latestMetrics: MetricType[] = []
    nodeIds.forEach((nodeId) => {
      const nodeMetrics = metrics.value.filter((metric) => metric.node_id === nodeId)
      if (nodeMetrics.length > 0) {
        const latestMetric = nodeMetrics.reduce((latest, current) => {
          return new Date(current.datetime) > new Date(latest.datetime) ? current : latest
        })
        latestMetrics.push(latestMetric)
      }
    })
    return latestMetrics
  }

  let intervalId: number | null = null

  const startPolling = (): void => {
    if (intervalId !== null) return

    intervalId = setInterval(async () => {
      try {
        await fetchMetrics()
        console.log('Метрики обновлены:', metrics.value)
      } catch (error) {
        console.error('Ошибка при обновлении метрик:', error)
      }
    }, 60000)
  }

  const stopPolling = (): void => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  return {
    metrics,
    loading,
    error,
    fetchMetrics,
    getMetricsByNodeId,
    getMetricsByNodeIds,
    getLatestMetricsByNodes,
    startPolling,
    stopPolling,
  }
})
