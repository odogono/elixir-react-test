const { spawn } = require('child_process');
const path = require('path');

const tsc = spawn(
  path.join(__dirname, 'node_modules', '.bin', 'tsc'),
  ['--watch', '--noEmit', '--pretty', '--project', '.'],
  { stdio: 'inherit' }
);

tsc.on('error', (err) => {
  console.error('Failed to start TypeScript compiler:', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  tsc.kill();
  process.exit(0);
});
