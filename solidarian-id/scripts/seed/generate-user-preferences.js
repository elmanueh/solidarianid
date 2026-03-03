const fs = require('fs');
const path = require('path');

// Read the seed file
const seedFile = fs.readFileSync(path.join(__dirname, '../init/postgres/init-02-seed-data.sql'), 'utf-8');

// Extract all user IDs
const userIdPattern = /INSERT INTO public\."tbl_Usuarios".*VALUES \('([a-f0-9-]+)'/g;
const userIds = [];
let match;
while ((match = userIdPattern.exec(seedFile)) !== null) {
  userIds.push(match[1]);
}

console.log(`Found ${userIds.length} users`);

// Define categories and durations
const categories = [
  'pobreza',
  'alimentación',
  'educación',
  'salud',
  'medio ambiente',
  'agua potable',
  'ayuda humanitaria',
  'desarrollo comunitario',
  'derechos humanos',
  'infancia',
  'tercera edad',
  'igualdad de género',
  'vivienda',
  'refugiados',
  'discapacidad',
  'desarrollo sostenible',
  'empleo',
  'cultura',
  'tecnología',
];

const durations = ['short_term', 'medium_term', 'long_term', 'any'];

// Helper to get random items from array
function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Helper to get random int
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate INSERT statements
const inserts = [];
inserts.push('');
inserts.push('-- Data for Name: user_preferences; Type: TABLE DATA; Schema: public; Owner: -');
inserts.push('--');
inserts.push('');

userIds.forEach(userId => {
  const profileType = Math.random() * 100;

  let sdgs, cats, durs, notif;

  if (profileType < 10) {
    // ~10% default values (empty preferences)
    sdgs = '{}';
    cats = '{}';
    durs = '{any}';
    notif = 'true';
  } else {
    // Random SDGs (1-17)
    const sdgCount = profileType < 40 ? randomInt(0, 2) : randomInt(1, 7);

    const selectedSdgs =
      sdgCount > 0
        ? getRandomItems(
            Array.from({ length: 17 }, (_, i) => i + 1),
            sdgCount,
          ).sort((a, b) => a - b)
        : [];

    sdgs = selectedSdgs.length > 0 ? `{${selectedSdgs.join(',')}}` : '{}';

    // Random categories (max 10)
    const catCount = profileType < 40 ? randomInt(0, 2) : randomInt(1, 5);

    const selectedCats = catCount > 0 ? getRandomItems(categories, Math.min(catCount, 10)) : [];

    cats = selectedCats.length > 0 ? `{"${selectedCats.join('","')}"}` : '{}';

    // Random durations (max 4)
    const durCount = profileType < 40 ? 1 : randomInt(1, 2);
    const selectedDurs = getRandomItems(durations, Math.min(durCount, 4));
    durs = `{"${selectedDurs.join('","')}"}`;

    // Random notifications (80% true, 20% false)
    notif = Math.random() < 0.8 ? 'true' : 'false';
  }

  inserts.push(
    `INSERT INTO public.user_preferences (user_id, preferred_sdgs, preferred_categories, duration_preferences, notifications_enabled) VALUES ('${userId}', '${sdgs}', '${cats}', '${durs}', ${notif});`,
  );
});

// Save to file
const outputPath = path.join(__dirname, '../init/postgres/user_preferences_inserts.sql');
fs.writeFileSync(outputPath, inserts.join('\n'), 'utf-8');

console.log(`Generated ${inserts.length} lines`);
console.log(`Saved to ${outputPath}`);
