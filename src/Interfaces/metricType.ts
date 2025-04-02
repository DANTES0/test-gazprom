export interface MetricType {
  metric_id: number
  datetime: string
  cpu_utilization: number
  memory_utilization: number
  disk_utilization: number
  node_id: number
  node_caption: string
  node_status: number
  node_interface: number
  node_admin: number
}
