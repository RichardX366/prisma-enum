#!/usr/bin/env node

const { createSpinner } = require('nanospinner');
const { readFileSync, writeFIleSync, writeFileSync } = require('fs');

const spinner = createSpinner('Creating prisma declarations...').start();
const prismaText = readFileSync(
  './node_modules/.prisma/client/index.d.ts',
  'utf8',
);
writeFileSync(
  './node_modules/prisma-enum/index.d.ts',
  prismaText
    .split(
      '// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275',
    )[1]
    .split('/**')[0],
);
const enumJS = prismaText
  .split('exports.Prisma.ModelName')[0]
  .split('exports.Prisma');
writeFileSync(
  './node_modules/prisma-enum/index.js',
  enumJS[enumJS.length - 1].split('});').slice(1).join('});'),
);
spinner.success();

process.exit(0);
