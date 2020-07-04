$(document).ready(function () {
    console.log("JQ");
    getTasks();
});

function getTasks() {
    console.log('in getTasks');
    $.ajax({
        type: 'GET',
        url: '/task'
    }).then(function (response) {
        console.log('Client GET:', response);
        let el = $('#viewAllTasks');
        el.empty();
        for (let i = 0; i < response.length; i++) {
            el.append(`<tr>
                <td>${response[i].due_date.split("T")[0]}</td>
                <td>${response[i].task_name}</td>
                <td>${response[i].description}</td>
                <td>${response[i].urgency}</td>
                </tr>`)
        }
    }).catch(function (err) {
        console.log(err);
        alert('Error on Client GET');
    })
}