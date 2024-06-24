export function remove_task(){
    
    const tasks = document.querySelectorAll('.tasks')

        tasks.forEach(task => {

             task.remove()
        });
}