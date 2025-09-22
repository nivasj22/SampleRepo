import {Page, Locator} from "@playwright/test";

export default class HomePage{
    //Declare all the elements/Locators
    readonly page: Page;
    readonly homeLink: Locator;
    readonly loginLink: Locator;
    readonly signupLink: Locator;
    readonly globalBtn: Locator;

    constructor(page){
        this.page = page;
        this.homeLink = this.page.getByRole("link", {name: "Home"});
        this.loginLink = this.page.getByRole("link", {name: "Login"});
        this.signupLink = this.page.getByRole("link", {name: "Sign up"});
        this.globalBtn = this.page.getByRole("button", {name: "Global Feed"});
    }

    //Actions
    async navigateToHomepage()
    {
       await this.homeLink.click();
    }
    async navigateToLoginPage()
    {
       await this.loginLink.click();
    }
    async navigateToSignupPage()
    {
       await this.signupLink.click();
    }
}