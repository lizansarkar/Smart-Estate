const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

fs.mkdirSync(path.join(process.cwd(), "public", "properties"), {
  recursive: true,
});

const scenes = [
  ["exterior.jpg", [40, 110, 200], [220, 180, 120]],
  ["lobby.jpg", [15, 25, 40], [80, 110, 180]],
  ["bedroom.jpg", [32, 30, 28], [180, 160, 140]],
  ["bathroom.jpg", [24, 35, 46], [145, 165, 175]],
];

async function generate() {
  for (const [name, c1, c2] of scenes) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="2048" height="1024">
        <defs>
          <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="rgb(${c1[0]},${c1[1]},${c1[2]})" />
            <stop offset="100%" stop-color="rgb(${c2[0]},${c2[1]},${c2[2]})" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)" />
        <ellipse cx="1024" cy="512" rx="680" ry="300" fill="rgba(255,255,255,0.08)" />
        <g fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="4">
          <rect x="220" y="160" width="180" height="680" rx="24" />
          <rect x="450" y="240" width="180" height="520" rx="18" />
          <rect x="700" y="180" width="180" height="640" rx="18" />
          <rect x="930" y="220" width="180" height="560" rx="18" />
          <rect x="1160" y="160" width="180" height="680" rx="18" />
        </g>
        <g fill="rgba(255,255,255,0.16)">
          <circle cx="1024" cy="260" r="140" />
          <circle cx="1500" cy="370" r="110" />
        </g>
      </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 92 })
      .toFile(path.join(process.cwd(), "public", "properties", name));
    console.log("created", name);
  }
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
