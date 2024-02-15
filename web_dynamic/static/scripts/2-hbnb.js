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
});
