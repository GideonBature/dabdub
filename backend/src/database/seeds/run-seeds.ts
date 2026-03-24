import { AppDataSource } from '../data-source';

async function runSeeds(): Promise<void> {
  await AppDataSource.initialize();
  console.log('Running seeds...');
  // Register seed classes here
  await AppDataSource.destroy();
  console.log('Seeds complete.');
}

runSeeds().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
