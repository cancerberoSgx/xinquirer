import { exec, mkdir, rm, cd, cat, cp } from "shelljs";
import { writeFileSync } from "fs";

describe('npm install from client program', () => {
  it('npm init install and run', () => {
    const proj = 'tmp_proj1'
    rm('-rf', proj)
    mkdir ('-p', proj)
    expect(exec('npm pack').code).toBe(0)
    const version:string = JSON.parse(cat('./package.json')).version
    cd(proj)
    expect(exec('npm init -y').code).toBe(0)
    expect(exec(`npm i --save ../xinquirer-${version}.tgz`).code).toBe(0)
    expect(exec('npm i --save-dev typescript').code).toBe(0)
    cp('../spec/assets/npmInstallSpectsconfig.json', './tsconfig.json')
    cp('../spec/assets/npmInstallSpecIndex.ts', './index.ts')
    expect(exec('node node_modules/.bin/tsc').code).toBe(0)
    
    console.log('End. You can try executing the compiled app to see if works with : \ncd tmp_proj1 && node_modules/electron/dist/electron index.js');
  })
})