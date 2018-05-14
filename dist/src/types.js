"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ACTION_TYPE;
(function (ACTION_TYPE) {
    ACTION_TYPE["SELECT_FILES"] = "select-files";
    ACTION_TYPE["SHOW_MESSAGE"] = "show-message";
    ACTION_TYPE["CONFIRM"] = "confirm";
    ACTION_TYPE["SELECT_COLOR"] = "select-color";
    ACTION_TYPE["INPUT"] = "input";
})(ACTION_TYPE = exports.ACTION_TYPE || (exports.ACTION_TYPE = {}));
/** because question properties collides with some electron dialogs options we always use questionToElectronDialogOption to convert a question to a dialog option when we call electron's dialog methods. */
function questionToElectronDialogOption(q) {
    const result = {};
    for (const key in q) {
        result[key] = q[questionToElectronDialogOptionMap[key] ? questionToElectronDialogOptionMap[key] : key];
    }
    return result;
}
exports.questionToElectronDialogOption = questionToElectronDialogOption;
/** map with props of electron dialog options that had been modified cause collided with Question properties. format is QuestionProperty->ModifiedDialogProperty*/
const questionToElectronDialogOptionMap = {
    type: 'dialogType'
};
//# sourceMappingURL=types.js.map