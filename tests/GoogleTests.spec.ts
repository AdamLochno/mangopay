import { test } from "@playwright/test";
import { GooglePage } from "../pages/GooglePage";

let googlePage: GooglePage;

test.describe("Google Maps Tests", () => {
  test.beforeAll(async () => {
    googlePage = new GooglePage();
    await googlePage.init();
    await googlePage.open();
  });

  test.afterAll(async () => {
    // Zamykanie przeglądarki po wszystkich testach
    await googlePage.close();
  });

  test("should search for Paris", async () => {
    //Given a user is on the Google Maps page
    await googlePage.verifyGoogleMapsPage();
    //When the user enters “Paris” in the search box
    await googlePage.typeLocation("Paris");
    //AND clicks “Search”
    await googlePage.clickSearch();
    //Then the left panel should have "Paris" as the headline text
    await googlePage.checkLeftPanel("Paris");
  });

  test("should search for London and check destination", async () => {
    //Given a user is on the Google Maps page
    await googlePage.verifyGoogleMapsPage();
    //When the user enters “Paris” in the search box
    await googlePage.typeLocation("London");
    //AND clicks “Search”
    await googlePage.clickSearch();
    //Then the left panel should have "Paris" as the headline text
    await googlePage.checkLeftPanel("London");
    //When the user clicks the “Directions” button
    await googlePage.clickDirections();
    //Then the destination field should contain "London"
    await googlePage.checkDestination("London");
  });

  test("should search for trip from Paris to London", async () => {
    //Given a user is on the Google Maps page
    await googlePage.verifyGoogleMapsPage();
    //When the user enters “Paris” in the search box
    await googlePage.typeLocation("London");
    //AND clicks “Search”
    await googlePage.clickSearch();
    //Then the left panel should have "Paris" as the headline text
    await googlePage.checkLeftPanel("London");
    //When the user clicks the “Directions” button
    await googlePage.clickDirections();
    //Then the destination field should contain "London"
    await googlePage.checkDestination("London");
    //When the user enters “Paris” in the start point
    await googlePage.typeStartPoint("Paris");
    //AND clicks “Enter”
    await googlePage.clickEnter();
    //Then the user sees information about time, distance to travel
    await googlePage.checkInformationAboutRoute();
  });
});
