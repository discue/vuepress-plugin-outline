import { getDirname, path } from '@vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

export default () => {
  return () => {
    return {
      name: '@discue/vuepress-plugin-outline',
      clientConfigFile: path.resolve(__dirname, './client.js')
    }
  }
}
