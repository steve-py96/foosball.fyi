import { nanoid } from 'nanoid';
import { access, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export {};

const [staticLocationName] = process.argv.slice(2).map((item) => item.toLowerCase());
const configYamlContent = `
name: LOCATION_NAME # the locations name
type: location # can be location (some pub / sports club), city, region or country
default_locale: DEFAULT_LOCALE # the locales are created via files, f.e. create en.mdx for locale en
google_maps_link: GOOGLE_MAPS_LINK # insert link which appears at google maps when pressing share (looks like https://maps.app.goo.gl/...)
`.trimStart();
const locationsPath = join(process.cwd(), 'src/content/locations');
const exists = (path: string) =>
  access(path)
    .then(() => true)
    .catch(() => false);
const generateNotExistingId = async (): Promise<string> => {
  const id = nanoid().toLowerCase();

  if (await exists(join(locationsPath, id))) return generateNotExistingId();

  return id;
};

const newLocationPath = join(locationsPath, staticLocationName ?? (await generateNotExistingId()));

if (await exists(newLocationPath)) {
  console.error(`location ${newLocationPath} already exists!`);
  process.exit(1);
}

await mkdir(newLocationPath);
await writeFile(join(newLocationPath, '_config.yaml'), configYamlContent, { encoding: 'utf-8' });
