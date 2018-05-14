import { exec, mkdir, rm, cd, cat, cp } from "shelljs";
import { writeFileSync } from "fs";

describe('npm install from client program', () => {
  it('npm init install and run', () => {
    const proj = 'tmp_proj1'
    rm('-rf', proj)
    mkdir ('-p', proj)
    exec('npm pack')
    const version:string = JSON.parse(cat('./package.json')).version
    cd(proj)
    exec('npm init -y')
    exec(`npm i --save ../xinquirer-${version}.tgz`)
    exec('npm i --save-dev typescript')
    // exec('npx tsc --init')
    cp('../spec/assets/npmInstallSpectsconfig.json', './tsconfig.json')
    cp('../spec/assets/npmInstallSpecIndex.ts', './index.ts')
    exec('npx tsc --init')
    console.log('end');
  })
})