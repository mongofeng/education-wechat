<template>
  <div class="sign">
    <canvas 
      ref="canvas"
      :width="width"
      :height="height"
      :style="style"></canvas>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Sign extends Vue {
  public $refs!: {
    canvas: any,
  };

  public supportsPassive = false;
  // devRatio = window.devicePixelRatio  ? parseInt(window.devicePixelRatio.toString()) : 1 // 获取设备像素比
  public devRatio =  1; // 获取设备像素比

  public isSupportTouch = ('ontouchstart' in document);
  public events = ('ontouchstart' in window) ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];

  public width: number = 100;
  public height: number = 100;

  public ctx: any = null;
  public canvas: any = null;

  public mouseX = 0;
  public mouseY = 0;


  get style() {
    return {
      width: `${this.width / this.devRatio}px`,
      height: `${this.height / this.devRatio}px`,
    };
  }


  get eventOpt() {
    return this.supportsPassive ? {passive: false} : false;
  }


  public mounted() {
    this.checkSupportsPassive();
    this.initCanvas();
  }

  public checkSupportsPassive() {
    try {
    const opts = Object.defineProperty({}, 'passive', {
      get: () => {
        console.log('suport passive');
        this.supportsPassive = true;
      },
    });
    window.addEventListener('test', () => {
      console.log('test');
    }, opts);
  } catch (e) {
    console.log(e);
  }
  }


  public initCanvas() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    this.width = width * this.devRatio;
    this.height = height * this.devRatio;

    this.canvas = this.$refs.canvas;
    this.ctx = this.$refs.canvas.getContext('2d');


    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeWidth = 8;
    this.ctx.lineWidth = 8;

    this.canvas.addEventListener(this.events[0], this.startEventHandler, this.eventOpt);
  }


  public startEventHandler(event: Event) {
    event.preventDefault();
    this.ctx.beginPath(); // 每次都是一个新路径,不写会和上个字的最后一笔连起来
    this.canvas.addEventListener(this.events[1], this.moveEventHandler, this.eventOpt );
    this.canvas.addEventListener(this.events[2], this.endEventHandler, this.eventOpt );
  }

   public moveEventHandler(event: any) {
    event.preventDefault();
    const coverPos = this.canvas.getBoundingClientRect();
    const evt = this.isSupportTouch ? event.touches[0] : event;
    this.mouseX = evt.clientX - coverPos.left;
    this.mouseY = evt.clientY - coverPos.top;

    // console.log(coverPos, this.mouseX, this.mouseY)
    this.ctx.lineTo(// 使用lineTo将移动过的坐标绘制成线
      this.mouseX,
      this.mouseY,
    );
    this.ctx.stroke(); // 绘制
}
 public endEventHandler(event: Event) {
  event.preventDefault();
  // 抬起手指时取消move和end事件的监听
  this.canvas.removeEventListener(this.events[1], this.moveEventHandler, false);
  this.canvas.removeEventListener(this.events[2], this.endEventHandler, false);
}

}
</script>
<style lang="scss" scoped>

</style>

