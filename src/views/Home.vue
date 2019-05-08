<template>
  <div class="home">
    <router-view/>
    <mu-container>
      <mu-bottom-nav>
        <mu-bottom-nav-item title="home" icon="restore" to="personal"></mu-bottom-nav-item>
        <mu-bottom-nav-item title="course" icon="favorite" to="course"></mu-bottom-nav-item>
        <!-- <mu-bottom-nav-item title="Nearby" icon="location_on"></mu-bottom-nav-item> -->
      </mu-bottom-nav>
    </mu-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  private active: number = 0;
}
</script>
