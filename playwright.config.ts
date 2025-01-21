import { defineConfig } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env') })

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    [
      'playwright-ctrf-json-reporter',
      {
        buildUrl: process.env.BUILD_URL,
        buildName: process.env.BUILD_NAME,
        buildNumber: process.env.BUILD_NUMBER,
      },
    ],
  ],
  use: { baseURL: process.env.TEST_BASE_URL, trace: 'on-first-retry', screenshot: 'only-on-failure' },
  projects: [{ name: 'chromium', use: { channel: 'chrome' } }],
})
