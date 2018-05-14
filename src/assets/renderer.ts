import {remote} from 'electron'
import { join } from 'path'

const communication = require('electron').remote.require(join(__dirname, '..', 'communication'))
communication.exported1('hello hello there!!!')

