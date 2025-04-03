<script setup lang="ts">
import { useGroupStore } from '@/stores/groupStore'
import { useMetricStore } from '@/stores/metricStore'
import { computed, onMounted, ref, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

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

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

function createChart() {
  if (!chartCanvas.value) {
    console.error('Элемент canvas не найден')
    return
  }

  if (metrics.value.length === 0) {
    console.warn('Нет данных для построения графика')
    return
  }

  const labels = metrics.value.map((metric) => metric.datetime)
  const cpuData = metrics.value.map((metric) => metric.cpu_utilization)
  const memoryData = metrics.value.map((metric) => metric.memory_utilization)
  const diskData = metrics.value.map((metric) => metric.disk_utilization)

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Утилизация CPU (%)',
          data: cpuData,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
        {
          label: 'Утилизация Memory (%)',
          data: memoryData,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
        },
        {
          label: 'Утилизация Disk (%)',
          data: diskData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Дата и время',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Значение (%)',
          },
          beginAtZero: true,
          max: 100,
        },
      },
    },
  })
}

watch(metrics, () => {
  createChart()
})

// watch(metricStore, () => {})

watch(
  () => groupStore.selectedNode,
  () => {
    createChart()
  },
)

// onMounted(async () => {
//   createChart()
// })
</script>

<template>
  <div class="content-block">
    <div class="content-block-wrapper">
      <h1>Метрики</h1>
      <div v-show="groupStore.selectedNode">
        <canvas ref="chartCanvas" style="height: 400px"></canvas>
      </div>
      <div v-show="!groupStore.selectedNode">
        <p>Для отображение метрик необходимо выбрать ноду</p>
      </div>

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
              <td>{{ node.interface_caption }}</td>
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

<style scoped>
canvas {
  width: 100%;
}
</style>
