import bcrypt from 'bcryptjs';

/**
 * Usage:  npx tsx scripts/hash-password.ts <your-password>
 * Copies a bcrypt hash to stdout. Paste it into .env as ADMIN_PASSWORD_HASH=...
 */
async function main() {
  const pwd = process.argv[2];
  if (!pwd) {
    console.error('Usage: npx tsx scripts/hash-password.ts <password>');
    process.exit(1);
  }
  const hash = await bcrypt.hash(pwd, 12);
  console.log(hash);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
