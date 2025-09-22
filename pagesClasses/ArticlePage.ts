import {Page, Locator} from "@playwright/test";

export default class ArticlePage{
    readonly page: Page;
    readonly articleTitle: Locator;
    readonly articleDesc: Locator;
    readonly articleBody: Locator;
    readonly publishBtn: Locator;
    readonly createArticleTitle: Locator;
    readonly editArticleBtn: Locator;
    readonly updateBtn: Locator;

    constructor(page)
    {
        this.page = page;
        this.articleTitle = this.page.locator("input[name='title']");
        this.articleDesc = this.page.locator("input[name='description']");
        this.articleBody = this.page.locator("textarea[name='body']");
        this.publishBtn = this.page.getByRole("button", {name: "Publish Article"});
        this.createArticleTitle = this.page.locator("div.container>h1");
        this.editArticleBtn = this.page.getByRole("link", {name: " Edit Article"});
        this.updateBtn = this.page.getByRole("button", {name: "Update Article"});
    }

    async createArticle(title: string, description: string, body: string)
    {
        await this.articleTitle.fill(title);
        await this.articleDesc.fill(description);
        await this.articleBody.fill(body);
    }

    async verifyCreatedArticle(): Promise<Locator>
    {
        return await this.createArticleTitle;
    }

}