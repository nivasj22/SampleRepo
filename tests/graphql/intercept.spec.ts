import { test, expect, Page } from "@playwright/test";

function getQueryOperationName(query: string): string | null {
  const match = query.match(/query\s+(\w+)/);
  return match ? match[1] : null;
}

function hasOperationName(query: string, operationName: string): boolean {
  return (getQueryOperationName(query) === operationName);
}

const getLaunches = {
  data: {
    query: `query Launches($pageSize: Int, $after: String) {
  launches(pageSize: $pageSize, after: $after) {
    cursor
    hasMore
    launches {
      site
      id
    }
  }
}`, variables: { "pageSize": 2, "after": " " }
  }
}

const mockGrpahql = async (page: Page) => {
  await page.route("**/graphql", async (route) => {
    const body = route.request().postDataJSON();
    const query = body.query;
    console.log("Post JSON Query: ", query);

    if (hasOperationName(query, 'Launches')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            "launches": {
              "cursor": "1603553460",
              "hasMore": true,
              "launches": [
                {
                  "site": "KSC LC 39A",
                  "id": "110"
                },
                {
                  "site": "CCAFS SLC 40",
                  "id": "109"
                }
              ]
            }
          }
        })
      })
      return
    }
    await route.continue()
  })
}

test("Intercept GraphQL Response", async ({ browser }) => {
  const page = await browser.newPage();
  await mockGrpahql(page);
  console.log("Done Routing");
  const response = await page.evaluate(async () => {
    const res = await fetch("https://apollo-fullstack-tutorial.herokuapp.com/graphql", {
      method: 'POST',
      headers: { contentType: "application/json" },
      body: JSON.stringify({
        query: `query Launches{
    launches {
      site
      id
    }
}`
      })
    })
    return res.json();
  })
  expect(response.data.launches.cursor).toEqual('1603553460');
  expect(response.data.launches.hasMore).toBe(true);
  expect(response.data.launches.launches).toEqual([
    {id: '110', site: 'KSC LC 39A'},
    {id: '109', site: 'CCAFS SLC 40'}
  ]);
});
