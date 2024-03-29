<template>
  <div class="com-page">
    <div class="grid">
      <div
        v-for="item of svgIconList"
        :key="item"
        @click="handleClipboard(item)"
      >
        <div class="icon-item">
          <ComSvgIcon
            :name="item.replace(/icon\-/g, '')"
            class="icon disabled"
          />
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import svgIcons from 'virtual:svg-icons-names'

defineOptions({
  name: 'IconPage'
})
const svgIconList = reactive(svgIcons)

const generateIconCode = (symbol) => {
  return `<SvgIcon name="${symbol.replace(/icon-/g, '')}"></SvgIcon>`
}

const handleClipboard = (text) => {
  const txa = document.createElement('textarea')
  txa.value = generateIconCode(text)
  document.body.appendChild(txa)
  txa.select()
  document.execCommand('copy')
  document.body.removeChild(txa)
  showToast('复制成功')
}
</script>

<style scoped>
.com-page {
  padding: 20px;
}
.grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
}
.icon-item {
  margin: 20px;
  height: 85px;
  text-align: center;
  width: 100px;
  float: left;
  font-size: 30px;
  color: #24292e;
  cursor: pointer;
}
span {
  display: block;
  font-size: 16px;
  margin-top: 10px;
}
.disabled {
  pointer-events: none;
}
</style>
