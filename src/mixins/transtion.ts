import { Component, Vue, Watch } from 'vue-property-decorator';
import {Route} from 'vue-router';

@Component
export default class TranstionRouteMixins extends Vue {

  public transitionName: string = 'slide-left';


  @Watch('$route', {immediate: true})
  public onRouteChanged(val: Route, oldVal: Route) {
    // console.log(val, oldVal);
    if (oldVal && val && val.meta && oldVal.meta && val.meta.depth && oldVal.meta.depth) {
      this.transitionName = val.meta.depth > oldVal.meta.depth ? 'slide-left' : 'slide-right';
    } else {
      this.transitionName = 'slide-left';
    }
  }
}
