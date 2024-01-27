var rest_names = [];

// const form = document.getElementById('recommend');
// const sub_btn = document.getElementById('submit-btn');
// const myInput = document.getElementById('myInput');
const table = document.getElementById('top-table');
const form = document.querySelectorAll('form.autocomplete');
const myInput = document.querySelectorAll('input.myInput');
const sub_btn = document.querySelectorAll('button.submit-btn');



fetch('/api/restaurants')
.then(function (response) {
  return response.json();
}).then(function (restaurants) {
  rest_names = restaurants;
}).catch(function (err){
  console.log(err);
});


for( let i=0; i<sub_btn.length; i++){
  sub_btn[i].addEventListener('click', function(e) {
    e.preventDefault();
    if (myInput[i].value == "") {
      console.log("enter");
      return;
    }
    else if (!rest_names.includes(myInput[i].value)){
      myInput[i].value = "";
      return;
    }
    form[i].submit();
  });
}




function autocomplete(inp) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items text-dark");
        this.parentNode.appendChild(a);

        let recom_length = 10;
        for (i = 0; i < rest_names.length; i++) {
          if (rest_names[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            recom_length--;
            b = document.createElement("DIV");

            b.innerHTML = "<strong>" + rest_names[i].substr(0, val.length) + "</strong>";
            b.innerHTML += rest_names[i].substr(val.length);

            b.innerHTML += '<input type="hidden" value="' + rest_names[i] + '">';

            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            
            if(recom_length < 0){
              break;
            }
            a.appendChild(b);
          }
        }
    });

    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {

          currentFocus++;

          addActive(x);
        } else if (e.keyCode == 38) { //up

 
          currentFocus--;

          addActive(x);
        } else if (e.keyCode == 13) {

          e.preventDefault();
          if (currentFocus > -1) {

            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {

      if (!x) return false;

      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);

      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {

      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {

      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

for( let i = 0; i < myInput.length; i++){
  autocomplete(myInput[i]);  
}

