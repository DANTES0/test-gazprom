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
  background-color: #0079c2;
  padding: 20px;
  color: white;
}
table {
  font-size: 20px;
  border-collapse: separate;
  text-align: center;
  border-spacing: 0 16px;
}
tr {
  padding-top: 10px;
}
td:nth-child(2) {
  padding-left: 50px;
}
td:nth-child(3) {
  padding-left: 50px;
}

ul {
  list-style-type: none;
}
li {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.p-20 {
  padding: 20px;
}
.pl-20 {
  padding-left: 20px;
}
.pr-20 {
  padding-right: 20px;
}
</style>
