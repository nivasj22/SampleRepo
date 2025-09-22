import test, { expect } from "@playwright/test";

test.describe("API Testing - Basic CRUD Operations", ()=> 
{
    test("Get list of Books", async({request}) => 
    {
        const response = await request.get("/booking");
        console.log(await response.json()); // prints json
        expect(response.status()).toBe(200); //Verifies status code
    })

    test.only("Get Books", async({request}) => 
    {
        const response = await request.get("/booking/787");
        console.log("response: ", await response.json()); //Prints JSON response
        console.log("Status code: ",response.status()); //Prints status code
        console.log("Status code msg: ", response.statusText()); //Prints status code message
        await expect(response.status()).toBe(200);

        const resBody = await response.json();
        await expect(resBody.lastname).toBe("Smith"); //Verifying Response Body fields.
    })

})