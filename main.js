

///var with URL
var youtube_URL = 'https://www.googleapis.com/youtube/v3/search';



//key = AIzaSyCvVYG8RGDz-ZAC-I8crgNV2cCDzDgS8rc


///function to get data
function getDataFromApi(query, parseYoutubeAPIData){
	console.log('get data from api called');
	var settings = {
		url: youtube_URL,
		data: {
			part: 'snippet',
			key: 'AIzaSyCvVYG8RGDz-ZAC-I8crgNV2cCDzDgS8rc',
			q: query,
		},
		dataType: 'json',
		type: 'GET',
		success: parseYoutubeAPIData
	}; 
	$.ajax(settings);
	/*var data = {
		part: 'snippet',
		key: 'AIzaSyCvVYG8RGDz-ZAC-I8crgNV2cCDzDgS8rc',
		q: query,
	}
	$.getJSON(youtube_URL, data, parseYoutubeAPIData)*/
} 



//function to display data/ videos
function displayYoutubeSearchData(title, url, videoURL){
	console.log('display youtubesearch data called');

	$('.js-video-thumbnail').append("<a href=http://"+videoURL+"><img src="+url+"></img></a>");
}



///function to parse through API data:
function parseYoutubeAPIData(data){
	console.log(data);
	console.log('parse data called');
	data.items.forEach(function(item){
		var title= item.snippet.title;
		var url= item.snippet.thumbnails.default.url;
		var videoID = item.id.videoId;
		var videoURL = 'www.youtube.com/watch?v='+videoID;
		console.log(title);

		displayYoutubeSearchData(title, url, videoURL);
	});
}

///potential function to render videos
function createVideoURL(item, videoURL){
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