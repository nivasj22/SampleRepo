import {test, expect} from "@playwright/test";

const getLaunch = {
    data: {
        query: `query Launch($launchId: ID!) {
  launch(id: $launchId) {
    id
    isBooked
    rocket {
      id
      name
      type
    }
  }
}`, variables: {"launchId": "109"}
    }
};

const expRes = {
    "launch": {
      "id": "109",
      "isBooked": false,
      "rocket": {
        "id": "falcon9",
        "name": "Falcon 9",
        "type": "FT"
      }
    }
};

test("Get Launch Details", async({request, baseURL}) => {
    const res = await request.post(baseURL as string, getLaunch);
    const resData = await res.json();
    console.log("Response: ", resData);
    await expect(res.status()).toBe(200);
    await expect(resData.data).toEqual(expRes); 
    expect(resData.data.launch.isBooked).toBeFalsy;
    const rocketDetails = await resData.data.launch.rocket;
    expect(rocketDetails.id).toEqual("falcon9");
    expect(rocketDetails.name).toEqual("Falcon 9");
    expect(rocketDetails.type).toEqual("FT");
    console.log("Rocket Details: ", resData.data.launch.rocket);
});