import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export {};

/*
  why creating this extra step to store contributors instead of just using https://api.github.com/repos/steve-py96/foosball.fyi/contributors???

  => that list doesn't include issuers (aka possible non-coders) which also should be considered contributors..
*/

interface RelevantUserData {
  login: string;
  html_url: string;
  avatar_url: string;
}

const { GITHUB_USER } = process.env;
const [GITHUB_USER_ARG] = process.argv.slice(2);
const USERNAME = GITHUB_USER ?? GITHUB_USER_ARG;

if (!USERNAME) {
  console.error('❌ no username env/arg variable provided!');
  process.exit(1);
}

const contributorFilePath = join(process.cwd(), 'CONTRIBUTORS.json');
const { login, html_url, avatar_url } = await fetch(`https://api.github.com/users/${USERNAME}`).then(
  (res) => res.json() as unknown as Promise<RelevantUserData>
);

const contributors = JSON.parse(await readFile(contributorFilePath, { encoding: 'utf-8' })) as Array<RelevantUserData>;

if (contributors.some((user) => user.login === login)) {
  console.error(`❌ User ${login} already exists in the contributors!`);
  process.exit(1);
}

contributors.push({
  login,
  html_url,
  avatar_url,
});

await writeFile(contributorFilePath, JSON.stringify(contributors, null, 2), { encoding: 'utf-8' });

console.log(`🎉 added contributor ${login} successfully`);
