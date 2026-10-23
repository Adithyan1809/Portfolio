/**
 * Utility to load and parse markdown blog posts with frontmatter.
 * Vite automatically bundles all markdown files in ./posts/*.md.
 */

// Import all raw markdown files eagerly
const postModules = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true });

/**
 * Parses simple frontmatter between triple dashes:
 * ---
 * key: value
 * tags: ["a", "b"]
 * ---
 * body...
 */
function parseFrontmatter(rawContent, filePath) {
  const slug = filePath.split('/').pop().replace(/\.md$/, '');
  
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  
  if (!match) {
    return {
      slug,
      title: slug.replace(/-/g, ' '),
      date: new Date().toISOString().split('T')[0],
      readTime: '3 min read',
      tags: ['General'],
      excerpt: '',
      content: rawContent.trim(),
    };
  }

  const [, frontmatterBlock, content] = match;
  const metadata = { slug, content: content.trim() };

  frontmatterBlock.split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    // Strip wrapping quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    // Parse arrays: ["A", "B"]
    else if (value.startsWith('[') && value.endsWith(']')) {
      try {
        value = JSON.parse(value);
      } catch {
        value = value.slice(1, -1).split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
      }
    }

    metadata[key] = value;
  });

  metadata.type = metadata.type || 'Deep Dive';

  return metadata;
}

/**
 * Get all blog posts sorted by date (newest first).
 */
export function getAllPosts() {
  const posts = Object.entries(postModules).map(([path, raw]) => parseFrontmatter(raw, path));
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get a specific post by its slug.
 */
export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

/**
 * Get list of unique tags across all posts with frequency count.
 */
export function getAllTags() {
  const posts = getAllPosts();
  const counts = {};
  posts.forEach((post) => {
    (post.tags || []).forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return Object.entries(counts).map(([name, count]) => ({ name, count }));
}
