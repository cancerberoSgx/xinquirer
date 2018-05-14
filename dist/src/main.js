"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("hard-rejection/register");
const p_map_series_1 = __importDefault(require("p-map-series"));
const actionManager_1 = require("./actions/actionManager");
const createWindow_1 = require("./createWindow");
const types_1 = require("./types");
class InquirerImpl {
    constructor(actions) {
        this.started = false;
        this.actions = actions;
    }
    getBrowserWindow() {
        if (!this.window) {
            throw new Error('You must call start() before getBrowserWindow()');
        }
        else {
            return this.window;
        }
    }
    async start() {
        this.window = await createWindow_1.createWindow();
        this.started = true;
        return;
    }
    stop() {
        if (this.window) {
            this.window.close();
        }
        return Promise.resolve();
    }
    async prompt(questions) {
        if (!this.started) {
            throw new Error('start() must be called before prompt()');
        }
        const results = await p_map_series_1.default(questions, async (question) => {
            const action = this.actions.find(a => a.type === question.type);
            if (!action) {
                throw new Error('Action type not supported: ' + JSON.stringify(question));
            }
            let invalid = 'first time is never valid';
            let answer;
            do {
                answer = await action.execute(this, question);
                invalid = false;
                if (question.validate && question.validate.predicate) {
                    invalid = await question.validate.predicate(answer);
                    if (invalid) { //typeof invalid === 'string') {
                        await this.showInvalidMessage(invalid, question.validate.msgConfig);
                    }
                }
            } while (invalid);
            return answer;
        });
        return results;
    }
    showInvalidMessage(message, dialogOptions) {
        if (dialogOptions) {
            dialogOptions.message = message;
        }
        const finalDialogOptions = Object.assign({}, {
            title: 'Invalid Selection',
            message: message,
            type: 'error'
        }, dialogOptions || {});
        return this.prompt([
            {
                id: 'justAMessage',
                type: types_1.ACTION_TYPE.SHOW_MESSAGE,
                dialog: finalDialogOptions,
                message: message,
            }
        ]);
    }
}
exports.create = () => {
    const instance = new InquirerImpl(actionManager_1.getAllActions());
    return instance;
};
//# sourceMappingURL=main.js.map