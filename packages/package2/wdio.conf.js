const commonjs = require("vite-plugin-commonjs").default;
const nodePolyfills = require("vite-plugin-node-polyfills");

exports.config = {
  runner: [
    "browser",
    {
      viteConfig: {
        plugins: [
          commonjs(),
          nodePolyfills.nodePolyfills({
            include: ["crypto", "http", "stream", "util"],
          }),
        ],
      },
    },
  ],
  specs: [`./small.spec.js`],
  maxInstances: 10,
  maxInstancesPerCapability: 10,
  injectGlobals: true,
  capabilities: [
    {
      maxInstances: 5,
      browserName: "chrome",
      acceptInsecureCerts: true,
      "wdio:enforceWebDriverClassic": true,
      "goog:chromeOptions": {
        // to run chrome headless the following flags are required
        // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
        args: [
          "--auto-open-devtools-for-tabs",
          "--use-fake-ui-for-media-stream",
          "--use-fake-device-for-media-stream",
          "--disable-infobars",
          "--disable-translate",
          "--ignore-certificate-errors",
          "--no-sandbox",
        ],
      },
    },
  ],
  logLevel: "trace",
  bail: 0,
  waitforTimeout: 1000,
  framework: "mocha",
  specFileRetries: 0,
  specFileRetriesDelay: 0,
  specFileRetriesDeferred: false,
  reporters: ["dot"],
  mochaOpts: {
    ui: "bdd",
    timeout: 10 * 60000,
  },
};
