import { BuilderTasks } from "./src/builderTasks.js"
import { AddTask } from "./src/addTasks.js"
import { AddPriority } from "./src/addPriority.js"
import { mark_header } from "../utils/markHeader.js"

export class InteractorList {

    constructor() {
   
        mark_header('list')
        new AddTask()
        new AddPriority()
        new BuilderTasks()

    }
}