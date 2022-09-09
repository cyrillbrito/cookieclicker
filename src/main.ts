import fs from 'fs/promises';
import { bulkDownloadFile, downloadFile, httpGet } from './downloader.js';

const OUTPUT_DIR = 'docs/'

const BASE_URL = 'https://orteil.dashnet.org/cookieclicker/';

const FOLDERS = [
  'img/',
  'loc/',
  'snd/',
];

const FILES = [
  'index.html',
  'style.css',
  'base64.js',
  'excanvas.compiled.js',
  'main.js',
  'minigameGarden.js',
  'minigameGrimoire.js',
  'minigamePantheon.js',
  'minigameMarket.js',
];


await downloadFiles();
await copyExternalFiles();
await downloadMods();


async function downloadFiles(): Promise<void> {

  await cleanDirectory(OUTPUT_DIR);

  // Grabs the all the file links excluding the parent folder redirect
  const anchorHrefRegex = /\[(?!PARENTDIR).*?\]"><\/td><td><a href="(.*?)"/gm;

  for (const folder of FOLDERS) {

    await fs.mkdir(OUTPUT_DIR + folder);

    const html = await httpGet(BASE_URL + folder);
    const allMatches = html.matchAll(anchorHrefRegex);
    for (const match of allMatches) {
      FILES.push(folder + match[1]);
    }
  }

  await bulkDownloadFile(BASE_URL, OUTPUT_DIR, FILES);
}

async function copyExternalFiles(): Promise<void> {

  console.log('Copying external files');

  await cleanDirectory(OUTPUT_DIR + 'external');

  const files = await fs.readdir('src/external');
  for (const file of files) {
    await fs.copyFile('src/external/' + file, OUTPUT_DIR + 'external/' + file);
  }
}

async function cleanDirectory(path: string): Promise<void> {
  try { await fs.rm(path, { recursive: true }); } catch { }
  await fs.mkdir(path);
}

async function downloadMods(): Promise<void> {
  console.log("Downloading mods");
  await cleanDirectory(OUTPUT_DIR + 'mods');
  downloadFile('https://cookiemonsterteam.github.io/CookieMonster/dist/CookieMonster.js', OUTPUT_DIR + 'mods/CookieMonster.js');
}
