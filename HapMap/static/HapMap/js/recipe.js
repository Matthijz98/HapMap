// set the defaild counter value
let count = 10;
let recipe_id = document.getElementById("recipe_id").textContent;
let table = $('#ingredienten');

console.log(table)

function plus(){
    var countEl = document.getElementById("count");
    count++;
    countEl.value = count;
    update_recept()
}

function minus(){
    var countEl = document.getElementById("count");
    if (count > 1) {
        count--;
        countEl.value = count;
        update_recept()
    }
}

function update_recept() {

    table.html('')
    $.getJSON("../ajax_calls/recipe_ingredient/?persons="+count+"&recipe="+ recipe_id ,function(data) {
        $.each(data, function (key, entry) {
            console.log(table)
            table.append($('<tr> <th>'+ entry.name +'</th><td>'+ entry.amount_per_person +'</td><td></td><td>'+ entry.amount_total +'</td></tr>'));
        })
    });
}

function changeCounter(number){
    if (number == ""){
        count = 0;
    }else{
        count = number;
    }
    update_recept();
}

$( document ).ready(function() {
    update_recept();
});