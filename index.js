

// create responsive page that loads to all screen sizes.
// Page contain Plage Logo, text field, submit (search) button,area that will
//   show search results

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
let result;
 let page; // used in load next page
// Reset default form behavior & calls show result
$('.js-search-form').on('submit', function(event){
    event.preventDefault();
    let searchRequest  = $(".search-text-field").val();
    getDataFromApi(searchRequest, function (data){
   result = data;
    showSearchResults();
    page = result.nextPageToken;
   } )
   
  });

  //load next batch  (NOT WORKINg)
  $('#load-more-videos').on('click', function(event){
      let searchRequest  = $(".search-text-field").val();
       getDataFromApi(searchRequest, function (data){
       result = data;
       showSearchResults();
       page = result.nextPageToken;
      
  }) 
  });
// function that pulls search results. submits search request
function getDataFromApi(searchTerm, callback) {
    console.log(page);
    const query = {
      q: searchTerm,
      key: 'AIzaSyDFTWYdlQDBnJkoLoucEOBenpdnNCYy3wA',
      part: 'snippet',
      fields: 'nextPageToken,items(snippet(thumbnails),id)' , 
      maxResults: 6,
      pageToken: page,
    }
    $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
  }
 
// function that retrever url of 6 images(thumbs) of the videos linked to the video it self.
function showSearchResults(){
    let filterdResult = result.items.map(function (data){
        return `<a href="http://www.youtube.com/watch?v=${data.id.videoId}"><img src="${data.snippet.thumbnails.default.url}"/><a>`
    })
    $(".js-search-results").html(filterdResult);
 }

