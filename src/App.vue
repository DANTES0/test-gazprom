<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <div class="content-block">
      <div class="content-block-wrapper">
        <h1>Статус:</h1>
        <div>Статус сервиса: <span :style="{ color: 'lightgreen' }">UP</span></div>
        <div class="">
          <table>
            <thead>
              <tr>
                <td>Статус ноды</td>
                <td>Название ноды</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i, index) in 5" :key="index">
                <td :style="{ color: 'lightgreen' }">UP</td>
                <td>spb-db-02</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h1>Общая информация:</h1>
        <div>Статус сервиса: <span :style="{ color: 'lightgreen' }">UP</span></div>

        <h1>Группы:</h1>
        <div class="group-list">
          <div class="group-list-item">Санкт-Петербург</div>
          <div class="group-list-item">Москва</div>
          <div class="group-list-item">Новосибирск</div>
          <div class="group-list-item">Красноярск</div>
        </div>
      </div>
    </div>

    <div class="content-block">
      <div class="content-block-wrapper">
        <h1>Ноды</h1>
        <div class="">
          <table>
            <thead>
              <tr>
                <td>Статус</td>
                <td>Название</td>
                <td>Данные метрик</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i, index) in 5" :key="index">
                <td :style="{ color: 'lightgreen' }">UP</td>
                <td>spb-db-02</td>
                <td>
                  <ul>
                    <li>Утилилзация CPU: <span :style="{ color: 'yellow' }">88</span></li>
                    <li>Утилилзация Memory: <span>77</span></li>
                    <li>Утилилзация Disk: <span>65</span></li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="content-block">
      <div class="content-block-wrapper">
        <h1>Метрики</h1>
        <div class=""></div>
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
              <tr v-for="(i, index) in 5" :key="index">
                <td :style="{ color: 'lightgreen' }">UP</td>
                <td>eth0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h1>Администратор:</h1>
        <div class="admin-info">
          <label>Богданов</label>
          <label>Денис</label>
          <a href="mailto:Bogdanov@mail.ru">Bogdanov@mail.ru</a>
        </div>
        <h1>Приложения:</h1>
        <div>MS SQL</div>
      </div>
    </div>
  </div>
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
  padding-left: 80px;
}
td:nth-child(3) {
  padding-left: 80px;
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
