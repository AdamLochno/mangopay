import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class GooglePage extends BasePage {
  private url: string;

  constructor() {
    super();
    this.url = "https://www.google.com/maps?hl=en";
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await this.acceptCookies();
  }

  async acceptCookies(): Promise<void> {
    if (this.page) {
      await this.page.click('button[aria-label="Accept all"]');
    } else {
      throw new Error("Page is not initialized.");
    }
  }

  async verifyGoogleMapsPage(): Promise<void> {
    await this.verifyUrl(this.url);
  }

  async typeLocation(location: string): Promise<void> {
    if (this.page) {
      await this.page.fill("input#searchboxinput", location);
    }
  }

  async clickEnter(): Promise<void> {
    if (this.page) {
      await this.page.press("input#searchboxinput", "Enter");
    }
  }
  async clickSearch(): Promise<void> {
    if (this.page) {
      await this.page.press("button#searchbox-searchbutton", "Enter");
    }
  }

  async checkLeftPanel(location: string): Promise<void> {
    if (this.page) {
      await expect(this.page.locator("h1").first()).toHaveText(location);
    }
  }
  async clickDirections(): Promise<void> {
    if (this.page) {
      await this.page.click("button[data-value='Directions']");
    }
  }
  async checkDestination(location: string): Promise<void> {
    if (this.page) {
      const ariaLabel = await this.page
        .locator("div#directions-searchbox-1 input")
        .getAttribute("aria-label");

      if (ariaLabel === null) {
        throw new Error("Attribute aria-label is not present.");
      }
      expect(ariaLabel).toContain(location);
    }
  }

  async typeStartPoint(location: string): Promise<void> {
    if (this.page) {
      await this.page.fill("div#directions-searchbox-0 input", location);
    }
  }

  async checkInformationAboutRoute(): Promise<void> {
    if (this.page) {
      await expect(
        this.page.locator("div#section-directions-trip-0")
      ).toBeVisible();
    }
  }
}
