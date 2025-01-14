<template>
  <ClientOnly>
    <Teleport to=".vp-theme-container">
      <Transition name="outline">
        <div v-if="visible"
             class="anchor-right-content">
          <ul>
            <li class="start">
              On this page
            </li>
            <template v-for="(item, index) in headers"
                      :key="index">
              <template v-if="item.children.length > 0">
                <sub-menu :key="item.key"
                          :menu-info="item" />
              </template>
              <template v-else>
                <li :class="['level', 'level-' + item.level, { active: (!route.hash && index == 0) || route.hash === `#${item.slug}` }]"
                    @click="headerClick(item)">
                  {{ item.title }}
                </li>
              </template>
            </template>
          </ul>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
import { usePageData, useRoute, useRouter } from '@vuepress/client';
import { computed, onMounted, ref } from 'vue';
import SubMenu from './sub-menu.vue';

const headers = ref([]);
const router = useRouter();
const route = useRoute();
const page = usePageData()

const isRootPage = computed(() => {
  const { path } = page.value
  return !path || path === '/' || path === '/index' || path === '/index.html'
})

const visible = computed(() => {
  if (isRootPage.value) {
    return false
  }
  return headers.value.length > 0
})

router.afterEach((_to, _from, failure) => {
  if (!failure) {
    refresh()
  }
})

const refresh = () => {
  const page = usePageData();
  headers.value = page.value.headers;
}

const headerClick = (item) => {
  router.push(`#${item.slug}`);
};

onMounted(refresh);
</script>

<style lang="scss">
@media (max-width: 1000px) {
  .anchor-right {
    @apply hidden;
  }

  .sidebar-items {
    .sidebar-item-children {
      .sidebar-item-children {
        @apply block;
      }
    }
  }

  .vp-page {
    @apply pr-0;
  }
}

@media (min-width: 1000px) {
  .anchor-right {
    @apply block;
  }

  .sidebar-items {
    .sidebar-item-children {
      .sidebar-item-children {
        @apply hidden;
      }
    }
  }

  .vp-page {
    @apply pr-64;
  }
}

.anchor-right-content {
  @apply text-lg right-0 fixed overflow-auto w-56;

  top: calc(var(--navbar-height) + 1rem);
  max-height: 84vh;
  // border-left: #eaecef solid 1px;

  ul {
    @apply space-y-2;

    li {
      @apply block;
      padding-top: 1px !important;
      padding-bottom: 1px !important;
      padding-right: 0 !important;

      &.start {
        @apply mb-8 text-lg font-medium text-gray-400
      }
    }
  }

  .level {
    @apply block cursor-pointer no-underline;
    color: #999;
    padding: 4px 12px 4px 0;
    margin-left: -1px;
  }

  .active {
    color: var(--c-text-accent);
    @apply font-medium;

    .menu {
      @apply font-normal;
    }
  }
}

.outline-enter-active,
.outline-leave-active {
  transition: opacity 0.25s ease;
}

.outline-enter-from,
.outline-leave-to {
  opacity: 0;
}
</style>