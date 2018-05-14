module.exports = {
  src: [
    './dist/src/types.d.ts',
    './dist/src/index.d.ts',
    './dist/src/actions/showMessage.d.ts',
    './dist/src/actions/selectFiles.d.ts',
    './dist/src/actions/confirm.d.ts',
    './dist/src/actions/selectColor.d.ts',
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
