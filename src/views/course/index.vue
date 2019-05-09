<template>
  <div class="education-warper bg">
    <mu-container>
      <mu-paper :z-depth="1">
        <mu-data-table :loading="loading" :columns="columns" :data="list">
          <template slot-scope="scope">
            <td>{{scope.row.name}}</td>
            <td class="is-right">{{scope.row.calories}}</td>
            <td class="is-right">{{scope.row.fat}}</td>
            <td class="is-right">{{scope.row.carbs}}</td>
          </template>
        </mu-data-table>
      </mu-paper>
    </mu-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Course extends Vue {
  private loading: boolean = false;

  private columns: any[] = [
    { title: 'Dessert (100g serving)', name: 'name' },
    { title: 'Calories', name: 'calories', align: 'center' },
    { title: 'Fat (g)', name: 'fat', align: 'center' },
    { title: 'Carbs (g)', name: 'carbs', align: 'center' },
  ];

  private list: any[] = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: 1,
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      iron: 1,
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16.0,
      carbs: 23,
      protein: 6.0,
      iron: 7,
    },
  ];
}
</script>
<style lang="scss">
.demo-text {
  padding: 16px;
  background: #fff;
  p {
    margin: 8px 0;
  }
}
</style>