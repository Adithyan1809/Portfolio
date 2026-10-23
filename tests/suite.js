import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ [FAIL] ${testName}`);
    if (details) console.error(`    ↳ Details: ${details}`);
    failures.push({ testName, details });
  }
}

console.log('\n======================================================');
console.log('   PORTFOLIO HIGH-LEVEL HEAVY TEST SUITE');
console.log('======================================================\n');

// ─────────────────────────────────────────────────────────────
// SUITE 1: ASSET INTEGRITY & FILE EXISTENCE
// ─────────────────────────────────────────────────────────────
console.log('▶ [SUITE 1/7] Asset Integrity & File Existence');

const publicFiles = [
  'favicon.svg',
  'icons.svg',
  'og-image.svg',
  'profile.webp',
  'resume.pdf',
  'robots.txt'
];

publicFiles.forEach(file => {
  const filePath = path.join(ROOT, 'public', file);
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  assert(exists && size > 0, `Public static asset: ${file}`, exists ? `size: ${size} bytes` : 'File missing from public/');
});

const srcAssets = [
  'resumepilot_ui.webp',
  'project_iris_cctv.webp',
  'mustering_system.webp'
];

srcAssets.forEach(file => {
  const filePath = path.join(ROOT, 'src', 'assets', file);
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  assert(exists && size > 1000, `High-res project screenshot: ${file}`, exists ? `size: ${size} bytes` : 'Asset missing from src/assets/');
});

// Verify Web Audio Synthesizer sound methods
const soundEffectsFile = fs.readFileSync(path.join(ROOT, 'src', 'hooks', 'useSoundEffects.js'), 'utf8');
const soundMethods = [
  'playHover', 'playClick', 'playType', 'playSuccess', 'playError',
  'playTheme', 'playTwinkle', 'playDigital', 'playLaser', 'playPowerUp',
  'playBassDrop', 'playAlien', 'playGlitchPop', 'playReverse'
];
soundMethods.forEach(method => {
  const hasMethod = soundEffectsFile.includes(`${method}:`);
  assert(hasMethod, `Synthetic Web Audio hook exports method: ${method}`);
});

// ─────────────────────────────────────────────────────────────
// SUITE 2: SECTION ID & ANCHOR NAVIGATION INTEGRITY
// ─────────────────────────────────────────────────────────────
console.log('\n▶ [SUITE 2/7] Section ID & Anchor Navigation Integrity');

const expectedSectionIds = [
  'about',
  'projects',
  'skills',
  'experience',
  'research',
  'github',
  'contact'
];

// Check Desktop Home components for section IDs
const desktopComponents = ['About.jsx', 'FeaturedProjects.jsx', 'Skills.jsx', 'Experience.jsx', 'Research.jsx', 'GitHubStats.jsx', 'Contact.jsx'];
const desktopFoundIds = new Set();
desktopComponents.forEach(comp => {
  const compPath = path.join(ROOT, 'src', 'components', comp);
  if (fs.existsSync(compPath)) {
    const text = fs.readFileSync(compPath, 'utf8');
    const matches = text.matchAll(/id=["']([a-zA-Z0-9_-]+)["']/g);
    for (const m of matches) desktopFoundIds.add(m[1]);
  }
});

expectedSectionIds.forEach(id => {
  assert(desktopFoundIds.has(id), `Desktop section exists: #${id}`, `id="${id}" not found in desktop components`);
});

// Check Mobile Home for section IDs
const mobileHomePath = path.join(ROOT, 'src', 'mobile', 'MobileHome.jsx');
const mobileHomeText = fs.existsSync(mobileHomePath) ? fs.readFileSync(mobileHomePath, 'utf8') : '';
const mobileFoundIds = new Set();
const mobileMatches = mobileHomeText.matchAll(/id=["']([a-zA-Z0-9_-]+)["']/g);
for (const m of mobileMatches) mobileFoundIds.add(m[1]);

expectedSectionIds.forEach(id => {
  assert(mobileFoundIds.has(id), `Mobile section exists: #${id}`, `id="${id}" not found in MobileHome.jsx`);
});

// ─────────────────────────────────────────────────────────────
// SUITE 3: ROUTE & PARAMETER COVERAGE
// ─────────────────────────────────────────────────────────────
console.log('\n▶ [SUITE 3/7] Route & Parameter Resolution');

const routes = [
  '/',
  '/projects/resumepilot',
  '/projects/project-iris',
  '/projects/mustering-system'
];

const desktopAppText = fs.readFileSync(path.join(ROOT, 'src', 'DesktopApp.jsx'), 'utf8');
const mobileAppText = fs.readFileSync(path.join(ROOT, 'src', 'mobile', 'MobileApp.jsx'), 'utf8');

routes.forEach(route => {
  assert(desktopAppText.includes(`path="${route}"`), `DesktopApp route configured: ${route}`);
});

assert(desktopAppText.includes('path="*"'), 'DesktopApp 404 wildcard route configured');
assert(mobileAppText.includes('path="/"'), 'MobileApp root route configured');
assert(mobileAppText.includes('path="/projects/:id"'), 'MobileApp dynamic case study route configured (/projects/:id)');

// Check that all case study IDs in Desktop match Mobile CASE_STUDIES dictionary
const mobileCaseStudyText = fs.readFileSync(path.join(ROOT, 'src', 'mobile', 'MobileCaseStudy.jsx'), 'utf8');
const caseStudyIds = ['resumepilot', 'project-iris', 'mustering-system'];
caseStudyIds.forEach(id => {
  assert(mobileCaseStudyText.includes(`'${id}':`), `MobileCaseStudy contains definition for '${id}'`);
});

// ─────────────────────────────────────────────────────────────
// SUITE 4: SECURITY & EXTERNAL LINK HYGIENE
// ─────────────────────────────────────────────────────────────
console.log('\n▶ [SUITE 4/7] Security & External Link Hygiene');

function checkFileSecurity(fullPath) {
  const content = fs.readFileSync(fullPath, 'utf8');
  
  // Check for raw secret patterns
  const secretMatches = content.match(/(sk-[a-zA-Z0-9]{20,}|ghp_[a-zA-Z0-9]{20,}|AKIA[0-9A-Z]{16})/g);
  assert(!secretMatches, `No hardcoded API secrets in ${path.relative(ROOT, fullPath)}`, secretMatches ? secretMatches.join(', ') : '');

  // Check external links with target="_blank" have rel="noreferrer" or rel="noopener noreferrer"
  const targetBlankMatches = [...content.matchAll(/<a\s+[^>]*target=["']_blank["'][^>]*>/gi)];
  targetBlankMatches.forEach(tagMatch => {
    const tag = tagMatch[0];
    const hasRel = /rel=["'][^"']*(noopener|noreferrer)[^"']*["']/i.test(tag);
    assert(hasRel, `Link has rel security attribute: ${tag.substring(0, 60)}... in ${path.relative(ROOT, fullPath)}`);
  });

  // Check no insecure http:// links
  const insecureHttp = [...content.matchAll(/href=["']http:\/\/(?!localhost|127\.0\.0\.1)[^"']+["']/gi)];
  assert(insecureHttp.length === 0, `No insecure http:// links in ${path.relative(ROOT, fullPath)}`, insecureHttp.map(m => m[0]).join(', '));
}

function scanDirForExternalLinks(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.git') {
      scanDirForExternalLinks(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.html'))) {
      checkFileSecurity(fullPath);
    }
  }
}
scanDirForExternalLinks(path.join(ROOT, 'src'));
checkFileSecurity(path.join(ROOT, 'index.html'));

// ─────────────────────────────────────────────────────────────
// SUITE 5: DATA CONSISTENCY & FACTS VERIFICATION
// ─────────────────────────────────────────────────────────────
console.log('\n▶ [SUITE 5/7] Data Consistency & Facts Verification');

// Verify squad size consistency (11 engineers led)
const filesCheckingSquad = [
  path.join(ROOT, 'src', 'components', 'About.jsx'),
  path.join(ROOT, 'src', 'components', 'Experience.jsx'),
  path.join(ROOT, 'src', 'mobile', 'MobileHome.jsx'),
  path.join(ROOT, 'src', 'mobile', 'MobileCaseStudy.jsx')
];

filesCheckingSquad.forEach(file => {
  const text = fs.readFileSync(file, 'utf8');
  const has6Engineers = /6\s*engineers?/i.test(text);
  assert(!has6Engineers, `No outdated "6 engineers" in ${path.basename(file)}`);
  const has11Engineers = /11\s*engineers?/i.test(text);
  assert(has11Engineers, `Contains verified "11 engineers" in ${path.basename(file)}`);
});

// Verify Age (21)
const aboutText = fs.readFileSync(path.join(ROOT, 'src', 'components', 'About.jsx'), 'utf8');
assert(aboutText.includes("I'm <strong>21</strong>"), 'About.jsx states age 21 correctly');

// ─────────────────────────────────────────────────────────────
// SUITE 6: ACCESSIBILITY & SEO COMPLIANCE
// ─────────────────────────────────────────────────────────────
console.log('\n▶ [SUITE 6/7] Accessibility & SEO Compliance');

const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
assert(indexHtml.includes('<html lang="en">'), 'HTML has lang="en"');
assert(indexHtml.includes('<meta name="viewport"'), 'HTML has viewport meta tag');
assert(indexHtml.includes('<meta name="description"'), 'HTML has meta description');
assert(indexHtml.includes('<meta property="og:title"'), 'HTML has og:title meta tag');
assert(indexHtml.includes('<title>'), 'HTML has <title> tag');
assert(indexHtml.includes('<meta name="theme-color"'), 'HTML has theme-color meta tag');

// Check images have alt attributes in src/components
function checkImageAltTags(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== 'dist') {
      checkImageAltTags(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.jsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const imgTags = [...content.matchAll(/<img\s+[^>]*>/gi)];
      imgTags.forEach(m => {
        const tag = m[0];
        const hasAlt = /alt=(["'][^"']*["']|\{[^}]+\})/i.test(tag);
        assert(hasAlt, `Image has alt attribute in ${path.basename(fullPath)}: ${tag.substring(0, 45)}...`);
      });
    }
  }
}
checkImageAltTags(path.join(ROOT, 'src'));

// ─────────────────────────────────────────────────────────────
// SUITE 7: PRODUCTION BUILD VERIFICATION
// ─────────────────────────────────────────────────────────────
console.log('\n▶ [SUITE 7/7] Production Build Integrity');

const distDir = path.join(ROOT, 'dist');
assert(fs.existsSync(distDir), 'dist/ directory exists from production build');
if (fs.existsSync(distDir)) {
  const distHtml = path.join(distDir, 'index.html');
  assert(fs.existsSync(distHtml) && fs.statSync(distHtml).size > 1000, 'dist/index.html generated and valid');
  
  const distAssets = path.join(distDir, 'assets');
  assert(fs.existsSync(distAssets), 'dist/assets directory exists');
  
  const assetFiles = fs.readdirSync(distAssets);
  const jsBundles = assetFiles.filter(f => f.endsWith('.js'));
  const cssBundles = assetFiles.filter(f => f.endsWith('.css'));
  assert(jsBundles.length > 0, `JavaScript chunks generated (${jsBundles.length} chunks)`);
  assert(cssBundles.length > 0, `CSS bundles generated (${cssBundles.length} stylesheets)`);
}

// ─────────────────────────────────────────────────────────────
// SUMMARY
// ─────────────────────────────────────────────────────────────
console.log('\n======================================================');
console.log(`TOTAL TESTS: ${totalTests}`);
console.log(`PASSED:      ${passedTests}`);
console.log(`FAILED:      ${failedTests}`);
console.log('======================================================\n');

if (failedTests > 0) {
  console.error('FAILURES SUMMARY:');
  failures.forEach(f => console.error(` - ${f.testName}: ${f.details}`));
  process.exit(1);
} else {
  console.log('🎉 ALL HEAVY SYSTEM TESTS PASSED CLEANLY!\n');
  process.exit(0);
}
