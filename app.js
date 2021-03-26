const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movies');


populateUI();

let totalPrice = +movieSelect.value;

const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

const updateSelectedCount = () => {
    const isSelected = document.querySelectorAll('.row .seat.selected');

    //Copy selected seats into arr, map arr, return new array od indexes

const seatsIndex = [...isSelected].map(seat => [...seats].indexOf(seat));

localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const isSelectedCount = isSelected.length;

    count.innerText = isSelectedCount;
    total.innerText = isSelectedCount * totalPrice;
    
};

//get Data from localStorage and populate UI
function populateUI () {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats', ));
   if(selectedSeats != null && selectedSeats.length > 0){
       seats.forEach((seat, index) => {
           if(selectedSeats.indexOf(index) > -1){
               seat.classList.add('selected');
           }
       })
   }
   const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
   if(selectedMovieIndex != null){
       movieSelect.selectedIndex = selectedMovieIndex;
   }
}

movieSelect.addEventListener('change', e => {
    totalPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount()
})

container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

//Initial count and total set
updateSelectedCount();