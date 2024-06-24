import { PriorityActions, PriorityHover } from "./utils/actions_priority.js"

export class AddPriority {

    constructor() {

        new PriorityActions('.choose-priority')
        new PriorityHover('.choose-priority')

    }
}