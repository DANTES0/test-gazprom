<script setup lang="ts">
import MainView from './views/MainView.vue'
</script>

<template>
  <MainView />
</template>

<style>
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  font-size: 20px;
}
.content-block {
  width: 640px;
  height: 100vh;
  border-right: 1px solid black;
}
.content-block-wrapper {
  padding: 20px;
}

.group-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.group-list-item {
  cursor: pointer;
}

.group-list-item:hover {
  text-decoration: underline;
}
.admin-info {
  display: flex;
  gap: 24px;
}

h1 {
  font-size: 24px;
}
table {
  font-size: 20px;
  border-collapse: separate;
  text-align: center;
  border-spacing: 0 16px;
}
td {
}
tr {
  padding-top: 10px;
}
/* Стиль для второго столбца */
td:nth-child(2) {
  padding-left: 60px;
}
td:nth-child(3) {
  padding-left: 60px;
}

ul {
  list-style-type: none;
}
li {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
</style>
