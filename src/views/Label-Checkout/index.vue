<template>
  <div class="flex-box">
    <label class="flex justify-center items-center relative">
      <input type="checkbox" class="toggle opacity-0 h-0 w-0" />
      <span
        class="slider box-border absolute rounded-md bg-white border-2 border-blue-700 shadow-1 shadow-blue-400 transition-all duration-300 w-12 h-6 top-0 before:absolute before:content-[''] before:w-6 before:h-6 before:rounded-lg before:bg-white before:-left-1 before:-top-1 before:border-2 before:border-blue-700 before:shadow-1 before:shadow-blue-400 before:transition-all before:duration-300"
      ></span>
      <span
        class="label relative w-14 h-6 cursor-pointer before:absolute before:content-['你'] before:top-0 before:-left-full before:underline before:decoration-solid before:decoration-2 before:underline-offset-2 before:text-gray-200 before:text-2xl after:absolute after:content-['我'] after:top-0 after:-right-full after:decoration-solid after:decoration-2 after:underline-offset-2 after:text-gray-200 after:text-2xl"
      ></span>
    </label>
  </div>
</template>
<style scoped lang="less">
.toggle:checked + .slider {
  background-color: #40a9ff;
}

.toggle:checked + .slider:before {
  transform: translateX(26px);
}

.toggle:checked ~ .label:before {
  text-decoration: none;
}

.toggle:checked ~ .label::after {
  text-decoration: underline;
}
</style>
