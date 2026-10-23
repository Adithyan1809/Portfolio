import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.resolve(__dirname, '../src/content/posts');
const publicDir = path.resolve(__dirname, '../public');
const outputFile = path.join(publicDir, 'rss.xml');

function parseFrontmatter(rawContent, filename) {
  const slug = filename.replace(/\.md$/, '');
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  
  const metadata = {
    slug,
    title: slug.replace(/-/g, ' '),
    date: new Date().toISOString(),
    excerpt: '',
    tags: [],
  };

  if (!match) return metadata;

  const [, frontmatterBlock] = match;
  frontmatterBlock.split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    } else if (value.startsWith('[') && value.endsWith(']')) {
      try {
        value = JSON.parse(value);
      } catch {
        value = value.slice(1, -1).split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
      }
    }
    metadata[key] = value;
  });

  return metadata;
}

function escapeXml(unsafe) {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRss() {
  if (!fs.existsSync(postsDir)) {
    console.log('[RSS] No posts directory found.');
    return;
  }

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  const posts = files
    .map((file) => {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      return parseFrontmatter(content, file);
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const siteUrl = 'https://adithyanp.me';
  const lastBuildDate = new Date().toUTCString();

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const categories = (post.tags || [])
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join('');

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      ${categories}
    </item>`;
    })
    .join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Adithyan Prakash — AI &amp; ML Engineering Notes</title>
    <link>${siteUrl}/blog</link>
    <description>Deep dives on production computer vision, distributed systems, edge inference, and deterministic LLM agents.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, rssFeed.trim(), 'utf-8');
  console.log(`[RSS] Successfully generated ${posts.length} posts to ${outputFile}`);
}

generateRss();
