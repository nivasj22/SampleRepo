import {test, expect} from "@playwright/test";

let token;

const headers = {
    Authorization: token
}

const getTokenReq = {
    data: {
        query: `mutation Login($email: String) {
  login(email: $email) {
    token
  }
}`, variables: {"email": "corpdevops@gmail.com"}
    }
}

const cancelTripReq = {
    data: {
        query: `mutation BookTrips($launchId: ID!) {
  cancelTrip(launchId: $launchId) {
    message
    success
    launches {
      site
    }
  }
}`, variables: {"launchId": "110"}
    }, headers: headers
}

const expRes = {
    "cancelTrip": {
      "message": "trip cancelled",
      "success": true,
      "launches": [
        {
          "site": "KSC LC 39A"
        }
      ]
    }
}

test.beforeEach("Get Token API", async({request, baseURL}) => {
    const res = await request.post(baseURL as string, getTokenReq);
    const resData = await res.json();
    console.log(resData);
    await expect(res.status()).toBe(200);
    token = resData.data.login.token;
    console.log(token);
    headers.Authorization = token;
});

test("CancelTrip Test", async({request, baseURL}) => {
    const res = await request.post(baseURL as string, cancelTripReq);
    const resData = await res.json();
    console.log(resData);
    expect(resData.data.cancelTrip).toHaveProperty("message", "trip cancelled");
    expect(resData.data.cancelTrip).toHaveProperty("success", true);
    expect(resData.data.cancelTrip.launches[0]).toHaveProperty("site", "KSC LC 39A");
})