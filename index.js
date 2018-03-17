

// create responsive page that loads to all screen sizes.
// Page contain Plage Logo, text field, submit (search) button,area that will
//   show search results and video player.

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
let result;
// Create JS form taht accepts request.
//   form will contain lable, text field, submit button.

// Reset default form behavior
$('.js-search-form').on('submit', function(event){
    event.preventDefault();
    let searchRequest  = $(".search-text-field").val();
  getDataFromApi(searchRequest, function (data){
      result = data;
      showSearchResults();
   } )
   
  });

// function that accepts and submits search request 




// function that pulls search results.
function getDataFromApi(searchTerm, callback) {
    const query = {
      q: searchTerm,
      key: 'AIzaSyDFTWYdlQDBnJkoLoucEOBenpdnNCYy3wA',
      part: 'snippet',
      fields: 'items(snippet(thumbnails),id)' , 
      maxResults: 6,
    }
    $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
  }
 
// function that retrever url of 6 images(thumbs) of the videos linked to the video it self.
function showSearchResults(){
    let filterdResult = result.items.map(function (data){
       // return  `<img src="${data.snippet.thumbnails.default.url}"/>` + `<a href="http://www.youtube.com/watch?v=${data.id.videoId}" />`
   
        return `<a href="http://www.youtube.com/watch?v=${data.id.videoId}"><img src="${data.snippet.thumbnails.default.url}"/><a>`
    })
    $(".js-search-results").html(filterdResult);
 }




// function that activates each thumb-image 



// function that clears the page. 
