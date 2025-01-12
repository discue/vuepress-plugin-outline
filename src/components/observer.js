import { useRouter } from '@vuepress/client'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

export default (selector) => {
    const router = useRouter()
    const visible = ref(false)

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0.0, 0.75],
    }

    function intersectionCallback(entries) {
        entries.forEach((entry) => {
            visible.value = entry.isIntersecting
        })
    }

    const observer = new IntersectionObserver(intersectionCallback, observerOptions)

    function observe() {
        const element = window.document.querySelector(selector)
        observer.observe(element)
    }
    function disconnect() {
        observer.disconnect()
    }

    router.afterEach((() => {
        disconnect()
        nextTick(observe)
    }))


    onMounted(() => {
        nextTick(observe)
    })
    onUnmounted(disconnect)

    return visible
}