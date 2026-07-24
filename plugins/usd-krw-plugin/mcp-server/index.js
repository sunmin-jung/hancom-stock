import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "usd-krw-mcp-server",
  version: "1.0.0",
});

server.tool(
  "get_usd_krw_rate",
  "frankfurter.app에서 USD/KRW 공식 기준환율(ECB, API키 불필요, 하루 1회 갱신)을 가져온다",
  {},
  async () => {
    const response = await fetch("https://api.frankfurter.app/latest?from=USD&to=KRW");
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    const rate = data.rates.KRW;
    const date = data.date;
    return {
      content: [
        {
          type: "text",
          text: `1 USD = ${rate} KRW (기준일: ${date})`,
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
