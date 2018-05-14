import {sync as glob} from 'glob'
import { readFileSync, writeFileSync } from 'fs';

const content = glob('./dist/src/**/*.d.ts')
.map(f=>`\n/* ${f} */\n`+readFileSync(f).toString().split('\n')
  .filter(l=>!l.startsWith('import')).join('\n')
)
.join('')+`
import { BrowserWindow, FileFilter, NativeImage } from "electron";
`
writeFileSync('./types/typings.d.ts', content)