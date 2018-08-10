let btnSearch =document.getElementById('btn-search');

btnSearch.addEventListener('click', (e) => {
  let foodsContainer=document.getElementById('div-foods-container');
  let region = document.getElementById('select-region');
  let optionRegion = region[region.selectedIndex].value;
  let range = document.getElementById('select-rango')
  let optionRange = range[range.selectedIndex].value;


  fetch('model/sities.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (sities) {
   
        console.log(sities);
        for (const sitie of sities) {
          if (sitie.type==optionRegion) {
            viewListSities(sitie,foodsContainer);}
        }
     
    });
  

})

 