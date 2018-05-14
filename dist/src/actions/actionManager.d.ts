import { Action, Answer, Question } from '../types';
export declare function getAllActions(): Action<any, any>[];
/** third parties can use this to register new action implementations */
export declare function registerAction(action: Action<Question, Answer>): void;
