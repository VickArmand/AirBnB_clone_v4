$(document).ready(function () {
  const amenityIDList = [];
  const amenity = $('li input[type ="checkbox"]');
  amenity.click(function () {
    $.each(amenity, function (index, value) {
      const nodeval = value.attributes[1].nodeValue;
      const valIndex = amenityIDList.indexOf(nodeval);
      if (value.checked) {
        if (valIndex === -1) {
          amenityIDList.push(nodeval);
        }
      } else {
        if (valIndex > -1) {
          amenityIDList.splice(valIndex, 1);
        }
      }
    });
  });
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
        const url = 'http://0.0.0.0:5001/api/v1/users/' + value.user_id;
        $('section.places').append('<article></article>');
        $('article').last().append('<div class="title_box"></div>');
        $('article').last().append('<div class="information"></div>');
        $('article').last().append('<div class="description"></div>');
        $('div.title_box').last().append('<h2>' + value.name + '</h2>');
        $('div.title_box').last().append('<div class="price_by_night">' + value.price_by_night + '</div>');
        $('div.information').last().append('<div class="max_guest">' + value.max_guest + ' ' + guests + '</div>');
        $('div.information').last().append('<div class="number_rooms">' + value.number_rooms + ' ' + bedrooms + '</div>');
        $('div.information').last().append('<div class="number_bathrooms">' + value.number_bathrooms + ' ' + bathrooms + '</div>');
        $('div.description').last().append(value.description);
      });
    },
    contentType: 'application/json'
  });
});
