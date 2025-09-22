import { test, expect, request } from "@playwright/test";
import launchIds from "../../testData/launchIds.json"; //Importing Json file

let token; //Declaring token

const headers = {
    Authorization: token //Declaring headers 
}

const getTokenReq = {
    data: {
        query: `mutation Login($email: String) {
  login(email: $email) {
    token
  }
}`, variables: { "email": "corpdevops@gmail.com" }
    }
}

const mutateBookTripReq = {
    data: {
        query: `mutation BookTrips($launchIds: [ID]!) {
  bookTrips(launchIds: $launchIds) {
    launches {
      site
    }
    message
    success
  }
}`, variables: {"launchIds": [launchIds.launchIds[0], launchIds.launchIds[1]]} //Getting from ext file
    }, headers: headers //Passing Headers
}

const mutuateExpRes = {
    "bookTrips": {
      "launches": [
        {
          "site": "KSC LC 39A"
        },
        {
          "site": "CCAFS SLC 40"
        }
      ],
      "message": "trips booked successfully",
      "success": true
    }
};

//To get Token - Hit the Login API
test.beforeEach("Get Token ID", async({request, baseURL}) => {
    const res = await request.post(baseURL as string, getTokenReq);
    const resData = await res.json();
    console.log("Response: ", resData);
    expect(res.status()).toBe(200);
    token = resData.data.login.token; //Fetching token from response and assigning to variable
    console.log("Token: ", token);
    headers.Authorization = token; //Assigning token to the headers
})

test.only("Book Trips Mutate", async({request, baseURL}) => {
    const res = await request.post(baseURL as string, mutateBookTripReq);
    const resData = await res.json();
    console.log("Book Details Response: ", resData);
    await expect(res.status()).toBe(200);
    await expect(resData.data.bookTrips).toHaveProperty("message", "trips booked successfully");
    await expect(resData.data.bookTrips).toHaveProperty("success", true);
    await expect(resData.data.bookTrips.launches[0].site).toEqual("KSC LC 39A");

})