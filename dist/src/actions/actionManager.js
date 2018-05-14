"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const confirm_1 = require("./confirm");
const selectFiles_1 = require("./selectFiles");
const showMessage_1 = require("./showMessage");
const selectColor_1 = require("./selectColor");
const input_1 = require("./input");
let actions;
const internalActions = [selectFiles_1.selectFilesAction, showMessage_1.showMessageAction, confirm_1.confirmAction, selectColor_1.selectColorAction, input_1.inputAction];
function getAllActions() {
    if (!actions) {
        actions = internalActions.concat(externalActions);
    }
    return actions;
}
exports.getAllActions = getAllActions;
const externalActions = []; // from third parties
/** third parties can use this to register new action implementations */
function registerAction(action) {
    //TODO: check repeated id
    externalActions.push(action);
}
exports.registerAction = registerAction;
//# sourceMappingURL=actionManager.js.map