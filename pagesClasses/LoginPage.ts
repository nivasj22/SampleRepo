import {Page, Locator} from "@playwright/test";

export default class LoginPage{
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginBtn: Locator;

    constructor(page)
    {
        this.page = page;
        this.emailField = this.page.locator("input[name='email']");
        this.passwordField = this.page.locator("input[name='password']");
        this.loginBtn = this.page.getByRole("button", {name: "Login"});
    }

    async loginwithCreds(username: string, password: string)
    {
        await this.emailField.fill("jnivas2001@gmail.com");
        await this.passwordField.fill("Nivas@22062001");
        await this.loginBtn.click();
    }
}