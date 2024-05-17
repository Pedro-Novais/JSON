export function convert_id_to_integer(priority) {

    if (priority == "priority-one" || priority == "priority-one-edit") {
        
        return 1

    }
    else if (priority == "priority-two" || priority == "priority-two-edit") {
        
        return 2

    }
    else if (priority == "priority-three" || priority == "priority-three-edit") {
        
        return 3

    }

}