import { SelectFilesQuestion, SelectFilesAnswer } from "./actions/selectFiles";
import { ShowMessageQuestion, ShowMessageAnswer } from "./actions/showMessage";
import { BrowserWindow, FileFilter, NativeImage } from "electron";
// import { AllQuestionTypes } from "./actions/actionManager";

/**
 * Similar API to inquirer.js. Differences: start() must be called before promot() and answers format is sightly different (array of {id, value} objects). 
 */
export interface Inquirer {
  /** will open a new hidden window that will be hosting next prompts calls so they are faster. User can call stop any time to close the app window */
  start(): Promise<void>

  /** Destroys the electron main window that was hosting all prompts interactions */
  stop(): Promise<void>

  getBrowserWindow(): BrowserWindow

  /** 
   * array of questions that will be presented to the user in order and serially. 
   * When all are answered return the array of answers (questions and answers will have the common if property) 
   */
  prompt(questions: Array<Question>): Promise<Answer[]>
  // prompt(questions: Array<Question>): Promise<Answer[]>

}

export enum ACTION_TYPE {
  SELECT_FILES = 'select-files',
  SHOW_MESSAGE = 'show-message',
  CONFIRM = "confirm", 
  SELECT_COLOR = "select-color",
  INPUT='input'
}

export interface Question {
  id: string
  type: ACTION_TYPE
  /**
   * Validate the answer, if not valid return a string with a hint explaining the user why. 
   * If valid return false. You can return a promise resolved with the same semantic for main the validation async
   */
  validate?: QuestionValidate
}
export interface QuestionValidate {
  predicate: (answer: Answer) => false | string | Promise<false | string>
  msgConfig?: ShowMessageQuestion
}

export interface Action<Q extends Question, A extends Answer> {
  type: ACTION_TYPE // TODO: for supporting  external actions we should leave this to string
  execute: (host: Inquirer, question: Q) => Promise<Answer>
}

export interface Answer {
  id: string
  value?: any
}



// electron types
export interface OpenDialogOptions {
  title?: string;
  defaultPath?: string;
  /**
   * Custom label for the confirmation button, when left empty the default label will
   * be used.
   */
  buttonLabel?: string;
  filters?: FileFilter[];
  /**
   * Contains which features the dialog should use. The following values are
   * supported:
   */
  properties?: Array<'openFile' | 'openDirectory' | 'multiSelections' | 'showHiddenFiles' | 'createDirectory' | 'promptToCreate' | 'noResolveAliases' | 'treatPackageAsDirectory'>;
  /**
   * Message to display above input boxes.
   */
  message?: string;
  /**
   * Create when packaged for the Mac App Store.
   */
  securityScopedBookmarks?: boolean;
}



export interface MessageBoxOptions {
  /**
   * Can be "none", "info", "error", "question" or "warning". On Windows, "question"
   * displays the same icon as "info", unless you set an icon using the "icon"
   * option. On macOS, both "warning" and "error" display the same warning icon.
   */
  dialogType?: string; // CHANGED FROM ORIGINAL because it collided with Question.type!!!
  /**
   * Array of texts for buttons. On Windows, an empty array will result in one button
   * labeled "OK".
   */
  buttons?: string[];
  /**
   * Index of the button in the buttons array which will be selected by default when
   * the message box opens.
   */
  defaultId?: number;
  /**
   * Title of the message box, some platforms will not show it.
   */
  title?: string;
  /**
   * Content of the message box.
   */
  message: string;
  /**
   * Extra information of the message.
   */
  detail?: string;
  /**
   * If provided, the message box will include a checkbox with the given label. The
   * checkbox state can be inspected only when using callback.
   */
  checkboxLabel?: string;
  /**
   * Initial checked state of the checkbox. false by default.
   */
  checkboxChecked?: boolean;
  icon?: NativeImage;
  /**
   * The index of the button to be used to cancel the dialog, via the Esc key. By
   * default this is assigned to the first button with "cancel" or "no" as the label.
   * If no such labeled buttons exist and this option is not set, 0 will be used as
   * the return value or callback response. This option is ignored on Windows.
   */
  cancelId?: number;
  /**
   * On Windows Electron will try to figure out which one of the buttons are common
   * buttons (like "Cancel" or "Yes"), and show the others as command links in the
   * dialog. This can make the dialog appear in the style of modern Windows apps. If
   * you don't like this behavior, you can set noLink to true.
   */
  noLink?: boolean;
  /**
   * Normalize the keyboard access keys across platforms. Default is false. Enabling
   * this assumes & is used in the button labels for the placement of the keyboard
   * shortcut access key and labels will be converted so they work correctly on each
   * platform, & characters are removed on macOS, converted to _ on Linux, and left
   * untouched on Windows. For example, a button label of Vie&w will be converted to
   * Vie_w on Linux and View on macOS and can be selected via Alt-W on Windows and
   * Linux.
   */
  normalizeAccessKeys?: boolean;
}



/** because question properties collides with some electron dialogs options we always use questionToElectronDialogOption to convert a question to a dialog option when we call electron's dialog methods. */
export function questionToElectronDialogOption(q: Question): any {
  const result: any = {}
  for (const key in q) {
    result[key] = (q as any)[questionToElectronDialogOptionMap[key] ? questionToElectronDialogOptionMap[key] : key]
  }
  return result
}
/** map with props of electron dialog options that had been modified cause collided with Question properties. format is QuestionProperty->ModifiedDialogProperty*/
const questionToElectronDialogOptionMap: any = {
  type: 'dialogType'
}