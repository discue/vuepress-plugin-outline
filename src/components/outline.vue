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
    display: none;
  }

  .sidebar-items {
    .sidebar-item-children {
      .sidebar-item-children {
        display: block;
      }
    }
  }

  .vp-page {
    padding-right: 0;
  }
}

@media (min-width: 1000px) {
  .anchor-right {
    display: block;
  }

  .sidebar-items {
    .sidebar-item-children {
      .sidebar-item-children {
        display: none;
      }
    }
  }

  .vp-page {
    padding-right: 16rem;
    /* 64px * 4 */
  }
}

.anchor-right-content {
  right: 0;
  position: fixed;
  overflow: auto;
  width: 14rem;
  /* 56px * 4 */
  top: calc(var(--navbar-height) + 1rem);
  max-height: 84vh;

  ul {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;

    li {
      display: block;
      padding-top: 1px !important;
      padding-bottom: 1px !important;
      padding-right: 0 !important;

      &.start {
        margin-bottom: 2rem;
        font-size: 1.125rem;
        /* 18px */
        font-weight: 500;
        color: #9ca3af;
        /* text-gray-400 */
      }
    }
  }

  .level {
    display: block;
    cursor: pointer;
    text-decoration-line: none;
    color: #999;
    padding: 4px 12px 4px 0;
    margin-left: -1px;
  }

  .active {
    color: var(--c-text-accent);
    font-weight: 500;

    .menu {
      font-weight: 400;
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