import { test, expect } from '@playwright/test';

const taskTests = [
  {
    name: 'Web: Implement user authentication appears in To Do',
    app: 'Web Application',
    column: 'To Do',
    task: 'Implement user authentication',
    tags: ['Feature', 'High Priority']
  },
  {
    name: 'Web: Fix navigation bug appears in To Do',
    app: 'Web Application',
    column: 'To Do',
    task: 'Fix navigation bug',
    tags: ['Bug']
  },
  {
    name: 'Web: Design system updates appears in In Progress',
    app: 'Web Application',
    column: 'In Progress',
    task: 'Design system updates',
    tags: ['Design']
  },
  {
    name: 'Mobile: Push notification system appears in To Do',
    app: 'Mobile Application',
    column: 'To Do',
    task: 'Push notification system',
    tags: ['Feature']
  },
  {
    name: 'Mobile: Offline mode appears in In Progress',
    app: 'Mobile Application',
    column: 'In Progress',
    task: 'Offline mode',
    tags: ['Feature', 'High Priority']
  },
  {
    name: 'Mobile: App icon design appears in Done',
    app: 'Mobile Application',
    column: 'Done',
    task: 'App icon design',
    tags: ['Design']
  }
];

async function login(page) {
  await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');

  await page.getByLabel('Username').fill('admin');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForURL('**/board');
}



test.beforeEach(async ({ page }) => {
  await login(page);
});

for (const tc of taskTests) {
  test(tc.name, async ({ page }) => {
    await page.click(`[role="button"][name="${tc.app}"]`);

    const column = page.locator(`[role="region"][name="${tc.column}"]`);
    const card = column.getByText(tc.task, { exact: true });

    await expect(card).toBeVisible();

    for (const tag of tc.tags) {
      await expect(card.getByText(tag, { exact: true })).toBeVisible();
    }
  });
}