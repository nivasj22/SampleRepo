import {test, expect} from "@playwright/test";
import HomePage from "../pagesClasses/homePage";
import LoginPage from "../pagesClasses/LoginPage";
import DashBoardPage from "../pagesClasses/DashBoardPage";
import ArticlePage from "../pagesClasses/ArticlePage";
import articleData from "../articleDetails.json";

test.describe("Article Create, Update & Delete", ()=> {

    let homePageObj: HomePage;
    let loginPageObj: LoginPage;
    let dashboardPageObj: DashBoardPage;
    let articlePageObj: ArticlePage;

    test.beforeEach("Login to CRUD App", async({page})=>{
        await page.goto("https://conduit-realworld-example-app.fly.dev/");
        homePageObj = new HomePage(page);
        await homePageObj.navigateToLoginPage();

        loginPageObj = new LoginPage(page);
        await loginPageObj.loginwithCreds("jnivas2001@gmail.com", "Nivas@22062001");

        dashboardPageObj = new DashBoardPage(page);
        await (await dashboardPageObj.getUsername()).waitFor();
        expect(await dashboardPageObj.getUsername()).toContainText("NivasJ");
    });

    test('Create Article', async({page})=>
    {
        const randomString = (length: number) => Array.from({length}, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');

        await dashboardPageObj.navigateToNewArticlePage();
        articlePageObj = new ArticlePage(page);
        await articlePageObj.createArticle("Title-"+randomString, "Description-1", "Body-1");
        await articlePageObj.publishBtn.click();
        await (await articlePageObj.verifyCreatedArticle()).waitFor();
        expect((await articlePageObj.verifyCreatedArticle())).toHaveText("Title-"+randomString);

        for(const articleDetail of articleData.articleDetails)
            {
                await articlePageObj.createArticle(articleDetail.articleTitle, articleDetail.articleDescription, articleDetail.articleBody);
                await (await articlePageObj.verifyCreatedArticle()).waitFor();
                expect((await articlePageObj.verifyCreatedArticle())).toHaveText(articleDetail.articleTitle);
                await dashboardPageObj.navigateToNewArticlePage();
            }

        await articlePageObj.editArticleBtn.first().click();
        await articlePageObj.createArticle("Title-"+randomString+"1", "Description-9", "Body-1");
        await articlePageObj.updateBtn.click();
        await (await articlePageObj.verifyCreatedArticle()).waitFor();
        expect((await articlePageObj.verifyCreatedArticle())).toHaveText("Title-"+randomString+"1");
    });

    
});