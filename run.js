#!/usr/bin/env node

const { createSpinner } = require('nanospinner');
const { readFileSync, writeFIleSync, writeFileSync } = require('fs');

const spinner = createSpinner('Creating prisma declarations...').start();
const prismaTS = readFileSync(
  './node_modules/.prisma/client/index.d.ts',
  'utf8',
);
writeFileSync(
  './node_modules/prisma-enum/index.d.ts',
  prismaTS
    .split(
      '// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275',
    )[1]
    .split('/**')[0],
);
const prismaJS = readFileSync('./node_modules/.prisma/client/index.js', 'utf8');
const enumJS = prismaJS
  .split('exports.Prisma.ModelName')[0]
  .split('exports.Prisma');
writeFileSync(
  './node_modules/prisma-enum/index.js',
  `function makeEnum(x) { return x; }
${enumJS[enumJS.length - 1].split('});').slice(1).join('});')}`,
);
spinner.success();

process.exit(0);
