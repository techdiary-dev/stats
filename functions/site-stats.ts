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
  const { period = "30d" } = event.queryStringParameters;

  const params = buildQueryString({
    site_id: "techdiary.dev",
    period,
    metrics: "visitors,pageviews,visit_duration",
  });

  const api = `https://plausible.io/api/v1/stats/aggregate?${params}`;

  try {
    const res = await axios.get(api, {
      headers: {
        Authorization: "Bearer " + process.env.API_TOKEN,
      },
    });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      },
      body: JSON.stringify({
        ...res.data,
      }),
    };
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};
