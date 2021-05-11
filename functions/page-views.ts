// @ts-nocheck
import "core-js/stable";
import "regenerator-runtime/runtime";
import { Handler, APIGatewayEvent, Context } from "aws-lambda";
import axios from "axios";
import { stringify as buildQueryString } from "querystring";
import { config as loadEnvs } from "dotenv";

loadEnvs();

export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  const query = event.queryStringParameters;

  if (!query.url) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        message:
          "Page url is not passed. Pass `url` value through query string",
      }),
    };
  }

  const url = new URL(query.url);
  const path = url.pathname;

  if (!url.hostname.includes("techdiary.dev")) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: "this is not a techdiary url",
      }),
    };
  }

  const params = buildQueryString({
    site_id: "techdiary.dev",
    period,
    metrics: "visitors,pageviews,visit_duration",
    filters: `event:page==${path}`,
  });
  const api = `https://plausible.io/api/v1/stats/aggregate?${params}`;
  const res = await axios.get(api, {
    headers: {
      Authorization: "Bearer " + process.env.API_TOKEN,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      ...res.data,
    }),
  };
};
