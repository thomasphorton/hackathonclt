var map, pointarray, heatmap;

$(function(){ 

  var taxiData = [];
  
  $.each(customers, function(){
  
    $this = $(this);
  
    if (weighted != '') {
      taxiData.push({
        location: new google.maps.LatLng($this[0].HOUSE_LATITUDE, $this[0].HOUSE_LONGITUDE), 
        weight: $this[0][weighted] 
      });
    } else {
      taxiData.push({
        location: new google.maps.LatLng($this[0].HOUSE_LATITUDE, $this[0].HOUSE_LONGITUDE)
      });
    }
  });
  
  function initialize() {
  
    styles = [
    {
      "stylers": [
        { "invert_lightness": true },
        { "saturation": -93 },
        { "hue": "#e500ff" },
        { "lightness": -10 },
        { "gamma": 0.93 },
        { "weight": 0.4 }
      ]
    }
  ]
  
    var mapOptions = {
      zoom: 12,
      center: new google.maps.LatLng(stores[2].LATITUDE, stores[2].LONGITUDE),
      mapTypeId: google.maps.MapTypeId.ROADMAP,  
      styles: styles
    };
  
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
  
    $.each(stores, function(){
      var myLatlng = new google.maps.LatLng($(this)[0].LATITUDE, $(this)[0].LONGITUDE);
      storeTitle = 'Store #' + $(this)[0].STORE;
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: storeTitle
      });
    });
    
    myLatlng = new google.maps.LatLng(35.335468,-80.825021);
    
    var newStore = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Proposed Store #1'
    });
    
    var iconFile = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';
    
    newStore.setIcon(iconFile);
    
    var pointArray = new google.maps.MVCArray(taxiData);
  
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: pointArray
    });
  
    heatmap.setMap(map);
    setup();
  }
  
  function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
  }
  
  function changeGradient() {
    var gradient = [
      'rgba(0, 255, 0, 0)',
      'rgba(0, 255, 0, 1)',
    ]
    heatmap.setOptions({
      gradient: heatmap.get('gradient') ? null : gradient
    });
  }
  
  function changeRadius() {
    heatmap.setOptions({radius: heatmap.get('radius') ? null : 20});
  }
  
  function dis() {
    heatmap.setOptions({dissipating: heatmap.get('dissipating') ? false : true});
  }
  
  function changeOpacity() {
    heatmap.setOptions({opacity: heatmap.get('opacity') ? null : 1});
  }
  
  function setup() {
    heatmap.setOptions({ 
      maxIntensity: 100,
      opacity: 0.9
    });
  }
  
  google.maps.event.addDomListener(window, 'load', initialize);
  
  var controlsToggle = $('.controls-toggle');
  var controlsWrap = $('.controls-wrap');
  
  controlsToggle.click(function() {
    controlsWrap.slideToggle();
  });

});