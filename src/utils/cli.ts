import Bun from 'bun'; // import { $ } from 'bun' results in undefined currently...

export { getAllContributors };

const getAllContributors = async () =>
  (await Bun.$`git shortlog -sne`.text()) // returns f.e. "2\tuser-xyz <user@mail.com>"
    .trim()
    .split('\n')
    .map((rawLine) => {
      const [, rawUser] = rawLine.split('\t');

      return rawUser!.split(' ')[0];
    });
