<script setup>
import { useRoute, useRouter } from '@vuepress/client';

const router = useRouter();
const route = useRoute();

const props = defineProps({
  menuInfo: {
    type: Object,
  },
  isFirst: {
    type: Boolean,
    default: false,
  }
});

const headerClick = (item) => {
  router.push(`#${item.slug}`);
};

</script>
<template>
  <li :class="[
    'level',
    'level-' + props.menuInfo.level,
    { active: (isFirst && !route.hash) || route.hash === `#${props.menuInfo.slug}` },
  ]"
      @click.prevent="headerClick(props.menuInfo)">
    <div>
      {{ props.menuInfo.title }}
    </div>
    <ul class="menu">
      <template v-for="(item, index) in props.menuInfo.children"
                :key="index">
        <sub-menu v-if="item.children.length > 0 && item.level !== 3"
                  :key="item.key"
                  :menu-info="item"
                  :route="route"
                  :router="router" />

        <li v-else
            :class="['level', 'level-' + item.level]"
            @click.stop="headerClick(item)">
          {{ item.title }}
        </li>
      </template>
    </ul>
  </li>
</template>
