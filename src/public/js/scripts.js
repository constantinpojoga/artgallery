 $('#artist-about-btn').on('click', function() {
    $('.artist-about-page').toggle();
  })

var menu       = ['home', 'artists', 'items', 'login', 'register'],
    splitedUrl = document.URL.split('/'),
    last       = splitedUrl[splitedUrl.length-1];

function clearActiveMenu() {
  menu.forEach(function(val) {
    $('li#' + val).removeClass('active');
  });
}

function newActiveMenu() {
  clearActiveMenu();
  if (last === '') { 
    $('li#home').addClass('active'); 
  } else {
    $('li#' + menu[menu.indexOf(last)]).addClass('active');
  }
}

if (menu.indexOf(last) !== -1 || last === '') {
  console.log('found new url', last)
  newActiveMenu();
}


