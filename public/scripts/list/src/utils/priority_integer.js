export function convert_id_to_integer(priority) {

    if (priority == "priority-one" || priority == "priority-one-edit" || priority == "priorityOne") {
        
        return 1

    }
    else if (priority == "priority-two" || priority == "priority-two-edit" || priority == "priorityTwo") {
        
        return 2

    }
    else if (priority == "priority-three" || priority == "priority-three-edit" || priority == "priorityTrhee") {
        
        return 3

    }

}