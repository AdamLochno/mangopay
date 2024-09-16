import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class GooglePage extends BasePage {
  private url: string;

  constructor() {
    super();
    this.url = "https://www.google.com/maps?hl=en";
  }

  locators = {
    buttonAcceptAll: "button[aria-label='Accept all']",
    inputSearch: "input#searchboxinput",
    buttonSearch: "button#searchbox-searchbutton",
    buttonDirections: "button[data-value='Directions']",
    inputSearchLocationEnd: "div#directions-searchbox-1 input",
    inputSearchLocationStart: "div#directions-searchbox-0 input",
    divRouteInformation: "div#section-directions-trip-0",
  };

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await this.acceptCookies();
  }

  async acceptCookies(): Promise<void> {
    if (this.page) {
      await this.page.click(this.locators.buttonAcceptAll);
    } else {
      throw new Error("Page is not initialized.");
    }
  }

  async verifyGoogleMapsPage(): Promise<void> {
    await this.verifyUrl(this.url);
  }

  async typeLocation(location: string): Promise<void> {
    if (this.page) {
      await this.page.fill(this.locators.inputSearch, location);
    }
  }

  async clickEnter(): Promise<void> {
    if (this.page) {
      await this.page.press(this.locators.inputSearch, "Enter");
    }
  }
  async clickSearch(): Promise<void> {
    if (this.page) {
      await this.page.press(this.locators.buttonSearch, "Enter");
    }
  }

  async checkLeftPanel(location: string): Promise<void> {
    if (this.page) {
      await expect(this.page.locator("h1").first()).toHaveText(location);
    }
  }
  async clickDirections(): Promise<void> {
    if (this.page) {
      await this.page.click(this.locators.buttonDirections);
    }
  }
  async checkDestination(location: string): Promise<void> {
    if (this.page) {
      const ariaLabel = await this.page
        .locator(this.locators.inputSearchLocationEnd)
        .getAttribute("aria-label");

      if (ariaLabel === null) {
        throw new Error("Attribute aria-label is not present.");
      }
      expect(ariaLabel).toContain(location);
    }
  }

  async typeStartPoint(location: string): Promise<void> {
    if (this.page) {
      await this.page.fill(this.locators.inputSearchLocationStart, location);
    }
  }

  async checkInformationAboutRoute(): Promise<void> {
    if (this.page) {
      await expect(
        this.page.locator(this.locators.divRouteInformation)
      ).toBeVisible();
    }
  }
}
