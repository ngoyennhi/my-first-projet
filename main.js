let carousel = document.querySelector('.carousel');
let cells = carousel.querySelectorAll('.carousel__cell');
let cellCount; // cellCount set from cells-range input value
let selectedIndex = 0;
let cellWidth = carousel.offsetWidth;
let cellHeight = carousel.offsetHeight;
let isHorizontal = true;
let rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
let radius, theta;
// console.log( cellWidth, cellHeight );

//Rolate 
function rotateCarousel() {
  let angle = theta * selectedIndex * -1;
  carousel.style.transform = 'translateZ(' + -radius + 'px) ' + 
    rotateFn + '(' + angle + 'deg)';
}

//Back button
let prevButton = document.querySelector('.previous-button');
prevButton.addEventListener( 'click', function() {
  selectedIndex--;
  rotateCarousel();
});

//Next button 
let nextButton = document.querySelector('.next-button');
nextButton.addEventListener( 'click', function() {
  selectedIndex++;
  rotateCarousel();
});

//set up number of image in slide by cellCount 
changeCarousel()

function changeCarousel() {
  //cellCount means that number of image we want to show in slider
  cellCount = 10;
  theta = 360 / cellCount;
  let cellSize = isHorizontal ? cellWidth : cellHeight;
  radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
  for ( let i=0; i < cells.length; i++ ) {
    let cell = cells[i];
    if ( i < cellCount ) {
      // visible cell
      cell.style.opacity = 1;
      let cellAngle = theta * i;
      cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
    } else {
      // hidden cell
      cell.style.opacity = 0;
      cell.style.transform = 'none';
    }
  }
  rotateCarousel();
}

// set initials
onOrientationChange();

function onOrientationChange() {
  // let checkedRadio = document.querySelector('input[name="orientation"]:checked');
  // isHorizontal = checkedRadio.value == 'horizontal';
  isHorizontal = 'horizontal';
  rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
  changeCarousel();
}
