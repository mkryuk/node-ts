import { browser, by, element } from "protractor";
describe("Main page", () => {
  it("should get main page content", () => {
    browser.waitForAngularEnabled(false);
    browser.get("http://localhost:8080/");
    browser.getPageSource()
      .then((body) => {
        expect(body).toBeDefined();
      });
    const result = element(by.id("mainview")).getText();
    expect(result).toContain("Hello");
  });
});
