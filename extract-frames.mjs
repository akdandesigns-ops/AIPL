import ffmpegStatic from 'ffmpeg-static';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoPath = path.join(__dirname, 'public', 'drone-shot.mp4');
const outDir = path.join(__dirname, 'public', 'drone-frames');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Extracting frames using ffmpeg at', ffmpegStatic);
console.log('Output dir:', outDir);

try {
  execFileSync(ffmpegStatic, [
    '-i', videoPath,
    '-vf', 'fps=30',
    '-q:v', '2',
    path.join(outDir, 'frame_%04d.jpg')
  ], { stdio: 'inherit' });
  console.log('Done!');
} catch (e) {
  console.error('Failed to extract:', e.message);
}
