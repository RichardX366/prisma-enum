#!/usr/bin/env node

const { createSpinner } = require('nanospinner');
const { readFileSync } = require('fs');

const spinner = createSpinner('Creating prisma declarations...').start();
const prismaText = readFileSync(
  './node_modules/.prisma/client/index.d.ts',
  'utf8',
);
console.log(prismaText);
spinner.stop();

process.exit(0);
