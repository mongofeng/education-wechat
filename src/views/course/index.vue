<template>
  <div class="education-warper bg warp-direction">
    <mu-card-header title="课程中心" class="bg-white mb20"></mu-card-header>

    <div class="warp-direction__scroller">
      <mu-expansion-panel :expand="true">
        <div slot="header">Panel 1</div>
        <div class="demo-paper">
          <div>上午</div>
          <div>暂无课程</div>
        </div>

        <div class="demo-paper">
          <div>上午</div>
          <div>英语、数学</div>
          <div>12:00 - 13:00</div>
        </div>

        <div class="demo-paper">
          <div>上午</div>
          <div>暂无课程</div>
        </div>
      </mu-expansion-panel>

      <mu-expansion-panel :expand="true">
        <div slot="header">Panel 2</div>
        <div class="demo-paper">
          <div>上午</div>
          <div>英语、数学</div>
          <div>12:00 - 13:00</div>
        </div>

        <div class="demo-paper">
          <div>中午</div>
          <div>英语、数学</div>
          <div>12:00 - 13:00</div>
        </div>

        <div class="demo-paper">
          <div>晚上</div>
          <div>英语、数学</div>
          <div>12:00 - 13:00</div>
        </div>
      </mu-expansion-panel>

      <mu-expansion-panel :expand="true">
        <div slot="header">Panel 3</div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
      </mu-expansion-panel>
    </div>
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
.demo-paper {
  display: table-cell;
  height: 100px;
  width: 100px;
  margin: 20px;
  text-align: center;
}
</style>