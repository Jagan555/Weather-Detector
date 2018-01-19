// JavaScript Document
function displayLocation(latitude,longitude){
        var request = new XMLHttpRequest();
        var method = 'GET';
		var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function(){
          if(request.readyState == 4 && request.status == 200){
            var data = JSON.parse(request.responseText);
            var address = data.results[0];
			var result = document.getElementById("address");
            result.innerHTML += address.formatted_address;
			}
        };
        request.send();
      };

      var successCallback = function(position){
        var x = position.coords.latitude;
        var y = position.coords.longitude;
        displayLocation(x,y);
		myMap(x,y);
		myWeather(x,y);
      };

      var errorCallback = function(error){
        var errorMessage = 'Unknown error';
        switch(error.code) {
          case 1:
            errorMessage = 'Permission denied';
            break;
          case 2:
            errorMessage = 'Position unavailable';
            break;
          case 3:
            errorMessage = 'Timeout';
            break;
        }
		address.innerHTML = errorMessage;
      };

      var options = {
        enableHighAccuracy: true,
        timeout: 100000000000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(successCallback,errorCallback,options);

	function myMap(latitude,longitude) {
		var mapCanvas = document.getElementById("googleMap");
  		var myCenter = new google.maps.LatLng(latitude,longitude); 
  		var mapOptions = {center: myCenter, zoom: 19};
  		var map = new google.maps.Map(mapCanvas,mapOptions);
  		var marker = new google.maps.Marker({
    		position: myCenter,
    		animation: google.maps.Animation.BOUNCE
  			});
  		marker.setMap(map);
  
    	var myPosition = new google.maps.Circle({
    	center: myCenter,
    	radius: 8,
    	strokeColor: "#0000FF",
    	strokeOpacity: 0.8,
    	strokeWeight: 2,
    	fillColor: "#0000FF",
    	fillOpacity: 0.4
  		});
  		
		myPosition.setMap(map);
  		var infowindow = new google.maps.InfoWindow({
    	content: "<h4>Your are Here</h4>"
  		});
  		infowindow.open(map,marker);

	}
	function myWeather(latitude,longitude){
		//document.getElementById("displayWeather").innerHTML = "Latitude is "+latitude+" And Longitude is "+longitude;
		//var apiKey = "ef062a08a2033bb11b5c7e0864da3b4e";
  		//var baseURL = "http://api.openweathermap.org/data/2.5/weather";
		//var URL =  "baseURL+'?lat='+latitude+'&lon='+longitude+'&APPID='+apiKey";
		$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&APPID=ef062a08a2033bb11b5c7e0864da3b4e",function(json){
            //document.getElementById("weather").innerHTML = (JSON.stringify(json));
			//var JSONData = (JSON.stringify(json));
			//document.getElementById("weather").innerHTML += json.weather[0].description;
			document.getElementById("weatherNow").innerHTML+= json.weather[0].description;
			document.getElementById("CTemp").innerHTML+= (json.main.temp - 273.15);
			//document.getElementById("MinTemp").innerHTML+= (json.main.temp_min - 273.15);
			//document.getElementById("MaxTemp").innerHTML+= (json.main.temp_max - 273.15);
			document.getElementById("wind").innerHTML+= json.wind.speed;
			document.getElementById("pressure").innerHTML+= json.main.pressure;
			//document.getElementById("visibility").innerHTML+= json.visibility;
			document.getElementById("Humidity").innerHTML+= json.main.humidity;
			document.getElementById("Sunrise").innerHTML+= json.sys.sunrise;
			document.getElementById("Sunset").innerHTML+= json.sys.sunset;
			});
		};
