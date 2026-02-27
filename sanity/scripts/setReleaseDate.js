/**
 * Patches a film document's releaseDate safely via the CLI client.
 * Uses your Sanity project's configured projectId/dataset from sanity.cli.ts/json.
 */

const {getCliClient} = require('sanity/cli');

const FILM_ID = 'e00a60af-a2d2-4ff5-b3cf-f59f7299e500';
const RELEASE_DATE = '29 July 1989';

async function main() {
  const client = getCliClient({apiVersion: '2022-06-01'});

  const before = await client.getDocument(FILM_ID);
  console.log('Before:', { _id: before?._id, title: before?.title, releaseDate: before?.releaseDate });

  const updated = await client
    .patch(FILM_ID)
    .set({ releaseDate: RELEASE_DATE })
    .commit({ autoGenerateArrayKeys: true });

  console.log('After:', { _id: updated?._id, title: updated?.title, releaseDate: updated?.releaseDate });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
