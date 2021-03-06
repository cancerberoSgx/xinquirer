module.exports = {
  src: [
    './dist/src/index.d.ts',
  ],
  "mode": 'modules',
  'includeDeclarations': true,
  'tsconfig': './tsconfig.json',
  'out': './docs',
  'excludePrivate': true,
  'excludeProtected': true,
  'excludeExternals': true,
  'readme': 'README.md',
  'name': 'xinquirer'
}
