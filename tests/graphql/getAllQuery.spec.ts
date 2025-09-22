import { test, expect, request } from "@playwright/test";

const getLaunches = {
    data: {
        query: `query ExampleQuery($pageSize: Int, $after: String) {
  launches(pageSize: $pageSize, after: $after) {
    launches {
      id
      site
    }
    cursor
    hasMore
  }
}`, variables: { "pageSize": 3, "after": " " }
    }
};

const expRes = {
    "launches": {
        "launches": [
            {
                "id": "110",
                "site": "KSC LC 39A"
            },
            {
                "id": "109",
                "site": "CCAFS SLC 40"
            },
            {
                "id": "108",
                "site": "VAFB SLC 4E"
            }
        ], 
        "cursor": "1605979020",
        "hasMore": true
    }
}

test("Query to get rocket Launches", async ({ request, baseURL }) => {
    const res = await request.post(baseURL as string, getLaunches);
    const resData = await res.json();
    console.log(resData.data.launches.launches);
    expect(res.status()).toBe(200);
    expect(resData.data).toEqual(expRes);
    const expLaunches = resData.data.launches.launches;
    expect(expLaunches).toHaveLength(3);
    expect(expLaunches[0]).toHaveProperty("site", "KSC LC 39A");;
    expect(resData.data.launches).toHaveProperty("cursor", "1605979020")
});