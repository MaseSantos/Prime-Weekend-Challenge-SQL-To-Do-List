let tasks = [];
$(document).ready(function () {
    console.log("JQ");
    getTasks();
    $("#addButton").on("click", addNewTask);
    $("#viewNotDoneTasks").on("click", ".taskDoneButton", changeStatus);
    $("#viewNotDoneTasks").on("click", ".deleteTaskButton", deleteTask);
    $("#viewDoneTasks").on("click", ".taskNotDoneButton", changeStatus);
    $("#viewDoneTasks").on("click", ".deleteTaskButton", deleteTask);
});

function getTasks() {
    console.log('in getTasks');
    $.ajax({
        type: 'GET',
        url: '/task'
    }).then(function (response) {
        console.log('Client GET:', response);
        tasks = response;
        let el = $('#viewNotDoneTasks');
        el.empty();
        let el2 = $('#viewDoneTasks');
        el2.empty();
        let urgencyLevel;
        for (let i = 0; i < response.length; i++) {
            if (Number(response[i].urgency) === 4){
                urgencyLevel = 'ASAP';
            } else if(Number(response[i].urgency) === 3){
                urgencyLevel = 'High';
            } else if(Number(response[i].urgency) === 2){
                urgencyLevel = 'Medium';
            } else{
                urgencyLevel = 'Low';
            }
            if (response[i].done === false){
                el.append(`<tr>
                <td>${response[i].due_date.split("T")[0]}</td>
                <td>${response[i].task_name}</td>
                <td>${response[i].description}</td>
                <td>${urgencyLevel}</td>
                <td><button class="taskDoneButton" data-id=${response[i].id}>
                ✓</button></td>
                <td><button class="deleteTaskButton" data-id=${response[i].id}>
                    Delete</button></td>
                </tr>`)
            } else{
                el2.append(`<tr>
                <td>${response[i].due_date.split("T")[0]}</td>
                <td>${response[i].task_name}</td>
                <td>${urgencyLevel}</td>
                <td><button class="taskNotDoneButton" data-id=${response[i].id}>
                    x</button></td>
                <td><button class="deleteTaskButton" data-id=${response[i].id}>
                    Delete</button></td>
                </tr>`)
            }
        }
    }).catch(function (err) {
        console.log(err);
        alert('Error on Client GET');
    })
}

function addNewTask(){
    console.log("in addButton on click");
    let taskToSend = {
        due_date: $("#dueDateIn").val(),
        task_name: $("#taskNameIn").val(),
        description: $("#descriptionIn").val(),
        urgency: $("#urgencyIn").val(),
        done: false
    };
    $.ajax({
        type: "POST",
        url: "/task",
        data: taskToSend
    })
        .then(function (response) {
            console.log("back from POST Client:", response);
            getTasks();
        })
        .catch(function (err) {
            console.log(err);
            alert("ERROR, check client.js POST");
        });
    clearInputsAfterSend();
}

function clearInputsAfterSend() {
    $("#dueDateIn").val(""),
    $("#taskNameIn").val(""),
    $("#descriptionIn").val(""),
    $("#urgencyIn").val("")
}

function changeStatus(){
    console.log('in Change To Done function!!', $(this).data("id"));
}

function deleteTask() {
    $.ajax({
        type: 'DELETE',
        url: '/task/' + $(this).data("id"),
    }).then( function(response){
        console.log("Task deleted!");
        getTasks();
    }).catch( function(err){
        console.log("Error on Client DELETE");
    })
}
