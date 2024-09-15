import { Browser, Page, chromium } from "playwright";

export class BasePage {
  browser: Browser | null = null;
  page: Page | null = null;

  async init(): Promise<void> {
    this.browser = await chromium.launch({ headless: false }); 
    const context = await this.browser.newContext(); 
    this.page = await context.newPage(); 
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close(); 
    }
  }

  async navigateTo(url: string): Promise<void> {
    if (this.page) {
      await this.page.goto(url); 
    }
  }

  async verifyUrl(expectedUrl: string): Promise<void> {
    if (this.page) {
      const currentUrl = this.page.url();
      if (currentUrl !== expectedUrl) {
        throw new Error(
          `URL mismatch: expected ${expectedUrl} but got ${currentUrl}`
        );
      }
    }
  }


}
