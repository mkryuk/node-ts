import { browser } from "protractor";
describe("USERS API", () => {
  it("should get all users", () => {
    browser.waitForAngularEnabled(false);
    browser.get("http://localhost:8080/api/users");
    browser.getPageSource()
      .then((body) => {
        expect(body).toBeDefined();
      });
  });
});
