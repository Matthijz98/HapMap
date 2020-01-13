// set the defaild counter value
let count = 10;
let recipe_id = document.getElementById("recipe_id").textContent;
let table = $('#ingredienten');

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
    table.empty();
    $.getJSON("../ajax_calls/recipe_ingredient/?persons="+count+"&recipe="+ recipe_id ,function(data) {
        $.each(data, function (key, entry) {
            table.append($('<tr> <th>'+ entry.name +'</th><td>'+ parseFloat(entry.amount_per_person).toFixed(2) + " " + entry.unit +'</td><td></td><td>'+ entry.amount_total + " " + entry.unit+'</td></tr>'));
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