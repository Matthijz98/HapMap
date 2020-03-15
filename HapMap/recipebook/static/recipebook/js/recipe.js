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
    $.getJSON("../ajax_calls/recipe_ingredient/?persons="+count+"&recipe="+ recipe_id, function(data) {
        $.each(data, function (key, entry) {
            table.append($('<tr> <th>'+ entry.name +'</th><td>'+ parseFloat(entry.amount_per_person).toFixed(2) + " " + entry.unit +'</td><td>'+ entry.allergies +'</td><td>'+ parseFloat(entry.amount_total).toFixed(2) + " " + entry.unit+'</td></tr>'));
        })
    });
}

function changeCounter(id, number){
    console.log(number)
    if (isNaN(number)){
        count = 0
        $('#count').addClass('is-invalid')
    }else {
        count = number;
        $('#count').removeClass('is-invalid')
    }
    update_recept();
}

$( document ).ready(function() {
    update_recept();
});

//
// Allergie stuff
//
let allergies = false
let footer = $('#cardfooter')
let default_input = $('#default-input')
let allergie_input = $('.allerieform')
let allergieoptionbutton = $('#allergieoptionbutton')

function updateAllergie() {
    allergies = {}
    $('.allergie-input').each(function(index) {
        if (isNaN(this.value)) {
            $('#' + this.id).addClass('is-invalid')
        } else {
            $('#' + this.id).removeClass('is-invalid')
            allergies[this.id] = this.value
        }

    })
    allergies['recipe'] = recipe_id
    $.getJSON('../ajax_calls/recipe_ingredient/allergie/?' + $.param(allergies), function(data) {
        table.empty();
        table.append(
            $.map(data, function(entry, key) {
                table.append('' +
                    '<tr class="table-primary"> ' +
                        '<th>' + entry.name + '</th>' +
                        '<td>' + parseFloat(entry.amount_per_person).toFixed(2) + " " + entry.unit + '</td>' +
                        '<td></td>' +
                        '<td>' + parseFloat(entry.amount_total).toFixed(2) + " " + entry.unit + '</td>' +
                    '</tr>'+
                    (entry.alternatives != '' ? '<td colspan="4" class="zeropadding">' +
                        '<div class="card alt-allergie-card" style="margin: 0 !important;">' +
                            '<div class="card-header alt-header">Alternatief</div>' +
                                '<div class="card card-body alt-allergie-card">' +
                                    '<table class="table table-striped zeromargin">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Voor allergie</th>' +
                                                '<th scope="col">Ingredient</th>\n' +
                                                '<th scope="col">hoeveelheid p.p.</th>\n' +
                                                '<th scope="col">Allergieën</th>\n' +
                                                '<th scope="col">hoeveelheid totaal</th>' +
                                                '</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                    '<tbody>' +
                                    $.map(entry.alternatives, function(entry, key) {
                                        return'<tr>' +
                                                '<td>' + entry.for_allergie + '</td> ' +
                                                '<th>' + entry.name + '</th>' +
                                                '<td>' + parseFloat(entry.amount_per_person).toFixed(2) + " " + entry.unit + '</td>' +
                                                '<td></td>' +
                                                '<td>' + parseFloat(entry.amount_total).toFixed(2) + " " + entry.unit + '</td>' +
                                            '</tr>'
                                    }) +
                                    '</tbody>' +
                                    '</table>' +
                            '</div>' +
                        '</div>' +
                    '</td>': '')
                )
            })
        )
    })
}


function enableallergie() {
    if(allergies == false) {
        footer.append($('' +
                    '<div class="input-group row allerieform id="noallergie">\n' +
                    '          <label class="col-sm-3 col-form-label">Geen allergie</label>' +
                                '<input id="noallergie_input" type="text" class="form-control allergie-input" value="10" onkeyup="updateAllergie()">\n' +
                    '            <div class="invalid-feedback">\n' +
                    '                Not a valid number.\n' +
                    '            </div>\n' +
                    '        </div>'));
        allergieoptionbutton.html("Hide allergie option")
        $.getJSON("../ajax_calls/allergies/?recipe=" + recipe_id, function (data) {
            $.each(data, function (key, entry) {
                footer.append($('' +
                    '<div class="input-group row allerieform id="'+ entry.allgerie.allergie_name.toLowerCase() +'">\n' +
                    '<label class="col-sm-3 col-form-label">' + entry.allgerie.allergie_name + '</label>'+
                    '<input id="' + entry.allgerie.allergie_name.toLowerCase() + '" type="text" class="form-control allergie-input" value="10" onkeyup="updateAllergie()">\n' +
                    '            <div class="invalid-feedback">\n' +
                    '                Not a valid number.\n' +
                    '            </div>\n' +
                    '        </div>'));
            })
        });
        default_input.hide()
        allergies = true;
    }else{
        $('.allerieform').remove();
        default_input.show();
        allergies = false;
        allergieoptionbutton.html("Show allergy options")
        update_recept()
    }
}