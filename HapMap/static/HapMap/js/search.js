function showResult(str) {

    // Select resultcard so data can be inserted later
    let dropdown = $('#resultcard').html('');

    // Check if string is nothing
    if (str.length==0) {
        // is search string is empty clear the dropdown
        dropdown.html('')
        // and hide the result card
        document.getElementById("resultcard").style.display = "none";
    } if (str.length>0){
        // if string is not empty get sjon data and give search string as get variable
        $.getJSON("/ajax_calls/search/?q="+str ,function(data) {
              $.each(data, function (key, entry){
                    // append a link for every result in the json data
                    dropdown.append($('<a href="'+entry.url+'" class="list-group-item list-group-item-action">'+entry.name+'</a>'));
            })
        });
        // un-hide the result card so the results can been
        document.getElementById("resultcard").style.display = "block";
  }


}
