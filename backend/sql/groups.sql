SELECT 
    groups.id AS group_id,
    groups.caption AS group_caption,
    nodes.id AS node_id,
    nodes.caption AS node_caption,
    nodes.status AS node_status_id,
    statuses_nodes.color AS node_status_color,
    statuses_nodes.description AS node_status_description,
    interfaces.id AS interface_id,
    interfaces.caption AS interface_caption,
    interfaces.status AS interface_status_id,
    statuses_interfaces.color AS interface_status_color,
    statuses_interfaces.description AS interface_status_description,
    applications.id AS application_id,
    applications.caption AS application_caption,
    users.id AS admin_id,
    users.firstname AS admin_firstname,
    users.lastname AS admin_lastname,
    users.email AS admin_email
FROM groups
JOIN groups_nodes ON groups.id = groups_nodes.group_id
JOIN nodes ON groups_nodes.node_id = nodes.id
LEFT JOIN interfaces ON nodes.interface = interfaces.id
LEFT JOIN statuses AS statuses_nodes ON nodes.status = statuses_nodes.id
LEFT JOIN statuses AS statuses_interfaces ON interfaces.status = statuses_interfaces.id
LEFT JOIN nodes_applications ON nodes.id = nodes_applications.node_id
LEFT JOIN applications ON nodes_applications.application_id = applications.id
LEFT JOIN users ON nodes.admin = users.id;
