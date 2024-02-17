$(document).ready(function () {
  const amenityIDList = [];
  const stateIDList = [];
  const cityIDList = [];
  const amenity = $('div.amenities li input[type ="checkbox"]');
  const state = $('div.locations ul li h2 input[type ="checkbox"]');
  const city = $('div.locations ul li ul li input[type ="checkbox"]');
  function populatechecked (event) {
    $.each(event.data.DomObject, function (index, value) {
      const nodeval = value.attributes[1].nodeValue;
      const valIndex = event.data.classVariable.indexOf(nodeval);
      if (value.checked) {
        if (valIndex === -1) {
          event.data.classVariable.push(nodeval);
        }
      } else {
        if (valIndex > -1) {
          event.data.classVariable.splice(valIndex, 1);
        }
      }
    });
  }
  amenity.click({ DomObject: amenity, classVariable: amenityIDList }, populatechecked);
  state.click({ DomObject: state, classVariable: stateIDList }, populatechecked);
  city.click({ DomObject: city, classVariable: cityIDList }, populatechecked);
  $.get('http://0.0.0.0:5001/api/v1/status/', function (responseData) {
    if (responseData.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      if ($('div#api_status').hasClass('available')) {
        $('div#api_status').removeClass('available');
      }
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    success: function (responseData, textStatus) {
      $.each(responseData, function (index, value) {
        const bathrooms = value.number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom';
        const bedrooms = value.number_rooms > 1 ? 'Bedrooms' : 'Bedroom';
        const guests = value.max_guest > 1 ? 'Guests' : 'Guest';
        const url = 'http://0.0.0.0:5001/api/v1/places/' + value.id + '/reviews';
        $('section.places').append('<article></article>');
        $('article').last().append('<div class="title_box"></div>');
        $('article').last().append('<div class="information"></div>');
        $('article').last().append('<div class="description"></div>');
        $('article').last().append('<div class="reviews"><h2></h2><ul></ul></div>');
        $('div.title_box').last().append('<h2>' + value.name + '</h2>');
        $('div.title_box').last().append('<div class="price_by_night">' + value.price_by_night + '</div>');
        $('div.information').last().append('<div class="max_guest">' + value.max_guest + ' ' + guests + '</div>');
        $('div.information').last().append('<div class="number_rooms">' + value.number_rooms + ' ' + bedrooms + '</div>');
        $('div.information').last().append('<div class="number_bathrooms">' + value.number_bathrooms + ' ' + bathrooms + '</div>');
        $('div.description').last().append(value.description); 
        $.get(url, function (responseData) {
          console.log(responseData.length);
          const reviews = responseData.length > 1 ? 'Reviews' : 'Review';
          $('div.reviews').last().append('<h2>' + responseData.length + ' ' + reviews + '</h2>');
          $.each(responseData, function (index, value) {
            $.get('http://0.0.0.0:5001/api/v1/users/' + value.user_id,
            function (index, user) {
              $('div.reviews ul').last().append('<li><h3>From' + user.first_name + ' ' + user.last_name + ' the ' + value.created_at + '</h3></li>');
	    });
            $('div.reviews ul li').last().append('<p>' + value.text + '<p></li>');
	  });
          $('div.reviews').last().append(value.description);
	});
      });
    },
    contentType: 'application/json'
  });
  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: amenityIDList, states: stateIDList, cities: cityIDList }),
      success: function (responseData, textStatus) {
        console.log(responseData);
      },
      contentType: 'application/json'
    });
  });
});
