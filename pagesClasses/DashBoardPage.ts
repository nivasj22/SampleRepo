import {Page, Locator} from "@playwright/test";

export default class DashBoardPage{
    readonly page: Page;
    readonly usernameField: Locator;
    readonly newArticleLink: Locator;

    constructor(page)
    {
        this.page = page;
        this.usernameField = this.page.locator("div.nav-link");
        this.newArticleLink = this.page.getByRole("link", {name: "New Article"});
    }

    async getUsername(): Promise<Locator> 
    {
        return this.usernameField;
    }

    async navigateToNewArticlePage()
    {
        await this.newArticleLink.click();
    }

}