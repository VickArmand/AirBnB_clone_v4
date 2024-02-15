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
});
