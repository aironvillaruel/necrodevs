// shims-vue.d.ts

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Extend the Navigator interface to include the connection property and old browser prefixes
interface NavigatorConnection {
  connection: NetworkInformation | undefined
  mozConnection: NetworkInformation | undefined
  webkitConnection: NetworkInformation | undefined
}

interface Navigator extends NavigatorConnection {}
