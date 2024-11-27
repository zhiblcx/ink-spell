## Installation

### npm

```bash
npm install @ink-spell/echarts-vue echarts
```

### pnpm

```bash
pnpm add @ink-spell/echarts-vue echarts
```

### yarn

```bash
yarn add @ink-spell/echarts-vue echarts
```

## Props

### 必选参数

- height：**string**

图表的高度，例如：**"100px"**

- data：**Array**

图表的数据，{ label：string，value：number }

例如：**[ { label: 'Mon', value: 222 }]**

### 可选参数

- dark?：**boolean**

图表的暗夜模式

- width?：**string = "100%"**

图表的宽度，例如：**"100px"**

- title?：**string**

图表的主标题

- subtext?：**string**

图表的副标题

- color?：**string** | **Array`<string>`**

图表的调色盘

- label?：**boolean**

是否显示标签

- options?：**Object**

echarts 配置项，[echarts配置项官网](https://echarts.apache.org/zh/option.html#title)

- downloadImg?：**boolean**

是否显示下载图表按钮

- name?：**string**

系列名称

- relyVariable?：any

图表依赖项，这个值发生变化之后，图表响应式更新，主要是用于切换数据

## Usage

### Vue Project

#### Bar

![''](E:\VSC\newLive\ink-spell\packages\echarts\assets\vue-bar.png)

```vue
import { EchartsBar } from '@ink-spell/echarts/vue'

<div class="mt-3">
    <EchartsPie
      height="400px"
      :data="[
        { label: 'Mon', value: 222 },
        { label: 'Tue', value: 200 },
        { label: 'Wed', value: 150 },
        { label: 'www', value: 200 },
      ]"
    />
  </div>
```

#### Line

![''](E:\VSC\newLive\ink-spell\packages\echarts\assets\vue-line.png)

```vue
import { EchartsLine } from '@ink-spell/echarts/vue'

<EchartsLine
  height="400px"
  :data="[
    { label: 'Mon', value: 222 },
    { label: 'Tue', value: 200 },
    { label: 'Wed', value: 150 },
    { label: 'www', value: 200 },
    { label: '221', value: 111 }
  ]"
  label
/>
```

#### Pie

![''](E:\VSC\newLive\ink-spell\packages\echarts\assets\vue-pie.png)

```vue
import { EchartsPie } from '@ink-spell/echarts/vue'

<EchartsPie
  height="400px"
  :data="[
    { label: 'Mon', value: 222 },
    { label: 'Tue', value: 200 },
    { label: 'Wed', value: 150 },
    { label: 'www', value: 200 },
    { label: '221', value: 111 }
  ]"
  label
/>
```

### React Project

---
