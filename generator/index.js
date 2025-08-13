import FirecrawlApp from "@mendable/firecrawl-js";
import { z } from "zod";
import fs from "fs";


const app = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY
});

const schema = z.object({
  players: z.array(z.object({
    name: z.string().describe("The name of the player"),
    accountId: z.string().describe("The account ID of the player"),
  }))
});

const scrapeResult = await app.extract([
  'https://trackmania.io/#/clubs/108904/members'
], {
  prompt: "Extract all players in the club as an array called 'players', each with name and account ID (the string after the last slash in the URL).",
  schema: schema
});

if (!scrapeResult.success) {
  throw new Error(`Failed to scrape: ${scrapeResult.error}`)
}

console.log(scrapeResult.data.players);

let output = scrapeResult.data.players;

const playersWithRole = output.map(player => ({
  ...player,
  name: `CTR | ${player.name}`,
  role: player.name === 'LemonLeaf_TM' ? 'Teamleader' : 'TrackMania Player'
}));

fs.writeFileSync(
  "./TMIOmembers.json",
  JSON.stringify(playersWithRole, null, 2), // null, 2 for pretty formatting
  "utf-8"
);

console.log("playersWithRole saved to ./TMIOmembers.json");

