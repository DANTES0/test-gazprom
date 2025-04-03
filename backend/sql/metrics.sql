SELECT 
    metrics.id AS metric_id,
    metrics.datetime,
    metrics.cpu_utilization,
    metrics.memory_utilization,
    metrics.disk_utilization,
    nodes.id AS node_id,
    nodes.caption AS node_caption,
    nodes.status AS node_status,
    nodes.interface AS node_interface,
    nodes.admin AS node_admin
FROM metrics
INNER JOIN nodes ON metrics.node_id = nodes.id;