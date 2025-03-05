import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['management', 'tabs', 'activeTab', 'scripting'],
    host_permissions: ['<all_urls>'],
  }
});
