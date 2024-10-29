<template>
  <div class="flex-box">
    <div class="box text-2xl px-4 py-2">
      <div class="content">Content</div>
    </div>
  </div>
</template>
<style scoped lang="less">
.box {
  display: flex;
  place-content: center;
  place-items: center;
  position: relative;
  border-radius: 20px; /* 与父元素圆角一致 */
  .content {
    z-index: 1; /* 确保内容在伪元素之上 */
  }
}
.box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0.75rem; /* 与父元素圆角一致 */
  padding: 10px; /* 边框大小 */
  background: linear-gradient(153deg, #114357, #f29492); /* 渐变边框 */
  pointer-events: none; /* 使伪元素不影响父元素的交互 */
}
.box::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  inset: 0.2rem;
  border-radius: 0.75rem; /* 与父元素圆角一致 */
  background-color: black;
}
</style>
