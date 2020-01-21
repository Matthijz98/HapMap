// set the defaild counter value
let count = 10;
let recipe_id = document.getElementById("recipe_id").textContent;
let table = $('#ingredienten');
let countEl = document.getElementById("count");

function plus(){
    count++;
    countEl.value = count;
    update_recept()
}

function minus(){
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
            table.append($('<tr> <th>'+ entry.name +'</th><td>'+ parseFloat(entry.amount_per_person).toFixed(2) + " " + entry.unit +'</td><td></td><td>'+ parseFloat(entry.amount_total).toFixed(2) + " " + entry.unit+'</td></tr>'));
        })
    });
}

function changeCounter(number){
    if (isNaN(number)){
        count = 0
        $('#count').addClass('is-invalid')
    }else if(count = ' '){
        count = 0
        $('#count').removeClass('is-invalid')
    }else{
        count = number;
        $('#count').removeClass('is-invalid')
    }
    update_recept();
}

$( document ).ready(function() {
    update_recept();
});