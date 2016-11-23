

///var with URL
var youtube_URL = 'https://www.googleapis.com/youtube/v3/search';



//key = AIzaSyCvVYG8RGDz-ZAC-I8crgNV2cCDzDgS8rc


///function to get data
function getDataFromApi(query, parseYoutubeAPIData){
	console.log('get data from api called');
	///why didnt this work
/*	var settings = {
		url: youtube_URL,
		parameters: {
			part: 'snippet',
			key: 'AIzaSyCvVYG8RGDz-ZAC-I8crgNV2cCDzDgS8rc',
			q: query,
		},
		dataType: 'json',
		type: 'GET',
		success: displayYoutubeSearchData
	}; 
	$.ajax(settings);*/
	var data = {
		part: 'snippet',
		key: 'AIzaSyCvVYG8RGDz-ZAC-I8crgNV2cCDzDgS8rc',
		q: query,
	}
	$.getJSON(youtube_URL, data, parseYoutubeAPIData)
} 



//function to display data/ videos
function displayYoutubeSearchData(title, url, videoURL){
	console.log('display youtubesearch data called');


	///loop through all of the items in the object and display each of the following
	//$('.js-video-thumbnail').text(title);
	$('.js-video-thumbnail').append("<img src="+url+"></url>");
	//$('.js-video-thumbnail').append("<video><source src="+videoURL+"></video>")
}



///function to parse through API data:
function parseYoutubeAPIData(data){
	console.log(data);
	console.log('parse data called');
	data.items.forEach(function(item){
		var title= item.snippet.title;
		var url= item.snippet.thumbnails.default.url;
		console.log(title);
		//createVideoURL(item);
		displayYoutubeSearchData(title, url);
	});
}

///potential function to render videos
function createVideoURL(item){
	var videoID = item.id.videoId;
	var videoURL = 'www.youtube.com/watch?v='+videoID;
	console.log(videoURL);
	return videoURL;
}

///potential function to play videos

//clear the items
function clearThumbnails(){
	$('.js-video-thumbnail').empty();
}



///event listener upon submit to call the get data function
function watchSubmit(){
	console.log('event listener called');
	$('.js-search-form').submit(function(e){
		console.log('submit function called');
		e.preventDefault();
		var query = $(this).find('.js-query').val();
		clearThumbnails();
		getDataFromApi(query, parseYoutubeAPIData);
	});
}



///on doc ready
$(function(){
	watchSubmit();
});