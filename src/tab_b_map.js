import jquery from 'jquery';
window.jQuery = jquery;
window.$ = jquery;
require( 'datatables.net' )( window, $ )
require( 'datatables.net-dt' )( window, $ )

import underscore from 'underscore';
window.underscore = underscore;
window._ = underscore;

import '../public/vendor/js/popper.min.js'
import '../public/vendor/js/bootstrap.min.js'
import { csv } from 'd3-request'
import { json } from 'd3-request'

import '../public/vendor/css/bootstrap.min.css'
import '../public/vendor/css/dc.css'
import './scss/main.scss';

import Vue from 'vue';
import Loader from './components/Loader.vue';
import ChartHeader from './components/ChartHeader.vue';


// Data object - is also used by Vue

var vuedata = {
  section: 'tabBmap',
  page: 'tabBmap',
  loader: true,
  readMore: false,
  showInfo: true,
  showShare: true,
  showAllCharts: true,
  chartMargin: 40,
  selectedYear: 'all',
  charts: {
    yearsFilter: {
      title: 'Gadi',
      info: ''
    },
    map: {
      title: 'Map',
      info: 'Map'
    },
    topSectors: {
      title: 'Sectors',
      info: 'Sectors'
    },
    mainTable: {
      chart: null,
      type: 'table',
      title: 'Interests',
      info: ''
    }
  },
  selectedElement: { "P": "", "Sub": ""},
  modalShowTable: '',
  colors: {
    generic: ["#3b95d0", "#4081ae", "#406a95", "#395a75" ],
    default1: "#3695d8",
    default2: "#449188"
  }
}



//Set vue components and Vue app

Vue.component('chart-header', ChartHeader);
Vue.component('loader', Loader);

new Vue({
  el: '#app',
  data: vuedata,
  methods: {
    //Share
    downloadDataset: function () {
      window.open('./data/tab_b/interests_map.csv');
    },
    share: function (platform) {
      if(platform == 'twitter'){
        var thisPage = window.location.href.split('?')[0];
        var shareText = '' + thisPage;
        var shareURL = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText);
        window.open(shareURL, '_blank');
        return;
      }
      if(platform == 'facebook'){
        var toShareUrl = window.location.href.split('?')[0];
        var shareURL = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(toShareUrl);
        window.open(shareURL, '_blank', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250,top=300,left=300');
        return;
      }
    }
  }
});

//Initialize info popovers
$(function () {
  $('[data-toggle="popover"]').popover()
})

//Charts
var charts = {
  map: {
    chart: dc.geoChoroplethChart("#map_chart"),
    type: 'map',
    divId: 'map_chart'
  },
  topSectors: {
    chart: dc.rowChart("#topsectors_chart"),
    type: 'row',
    divId: 'topsectors_chart'
  },
  mainTable: {
    chart: null,
    type: 'table',
    divId: 'dc-data-table'
  }
}

var groups = {
  map: {
    amtDefault: null,
    amtIncome: null,
    amtHoldings: null,
    amtIncomeHoldings: null
  },
  sectorsChart: {
    amtDefault: null,
    amtIncome: null,
    amtHoldings: null,
    amtIncomeHoldings: null
  }
}

//Functions for responsivness
var recalcWidth = function(divId) {
  return document.getElementById(divId).offsetWidth - vuedata.chartMargin;
};
var recalcWidthWordcloud = function() {
  //Replace element if with wordcloud column id
  var width = document.getElementById("party_chart").offsetWidth - vuedata.chartMargin*2;
  return [width, 550];
};
var recalcCharsLength = function(width) {
  return parseInt(width / 8);
};
var calcPieSize = function(divId) {
  var newWidth = recalcWidth(divId);
  var sizes = {
    'width': newWidth,
    'height': 0,
    'radius': 0,
    'innerRadius': 0,
    'cy': 0,
    'legendY': 0
  }
  if(newWidth < 300) { 
    sizes.height = newWidth + 170;
    sizes.radius = (newWidth)/2;
    sizes.innerRadius = (newWidth)/4;
    sizes.cy = (newWidth)/2;
    sizes.legendY = (newWidth) + 30;
  } else {
    sizes.height = newWidth*0.75 + 170;
    sizes.radius = (newWidth*0.75)/2;
    sizes.innerRadius = (newWidth*0.75)/4;
    sizes.cy = (newWidth*0.75)/2;
    sizes.legendY = (newWidth*0.75) + 30;
  }
  return sizes;
};
var resizeGraphs = function() {
  for (var c in charts) {
    var sizes = calcPieSize(charts[c].divId);
    var newWidth = recalcWidth(charts[c].divId);
    var charsLength = recalcCharsLength(newWidth);
    if(charts[c].type == 'map') {
      var newProjection = d3.geoMercator()
        .center([24.2,56.6])
        .scale(newWidth*6)
        .translate([newWidth/2 - 50, 320]);
      if(newWidth <= 558) {
        newProjection = d3.geoMercator()
        .center([24.2,56.6]) 
        .translate([newWidth/2 - 50, 320])
        .scale(newWidth*6);
      } else if(newWidth <= 610) {
        newProjection = d3.geoMercator()
        .center([24.2,56.6])
        .translate([newWidth/2 - 50, 320])
        .scale(newWidth*6);
      }
      charts[c].chart.width(newWidth);
      charts[c].chart.projection(newProjection);
      charts[c].chart.redraw();
    } else if(charts[c].type == 'row'){
      charts[c].chart.width(newWidth);
      charts[c].chart.label(function (d) {
        var thisKey = d.key;
        if(thisKey.indexOf('###') > -1){
          thisKey = thisKey.split('###')[0];
        }
        if(thisKey.length > charsLength){
          return thisKey.substring(0,charsLength) + '...';
        }
        return thisKey;
      })
      charts[c].chart.redraw();
    } else if(charts[c].type == 'bar') {
      charts[c].chart.width(newWidth);
      charts[c].chart.rescale();
      charts[c].chart.redraw();
    } else if(charts[c].type == 'line') {
      charts[c].chart.width(newWidth);
      charts[c].chart.rescale();
      charts[c].chart.redraw();
    } else if(charts[c].type == 'pie') {
      charts[c].chart
        .width(sizes.width)
        .height(sizes.height)
        .cy(sizes.cy)
        .innerRadius(sizes.innerRadius)
        .radius(sizes.radius)
        .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
          var thisKey = d.name;
          if(thisKey == 'Others') {thisKey = 'Citi'}
          if(thisKey.length > charsLength){
            return thisKey.substring(0, charsLength) + '...';
          }
          return thisKey;
        }));
      charts[c].chart.redraw();
    } else if(charts[c].type == 'cloud') {
      charts[c].chart.size(recalcWidthWordcloud());
      charts[c].chart.redraw();
    }
  }
};
//Remove diacritics
function slugify(str) {
  var map = {
      '-' : ' ',
      'a' : 'ā|á|à|ã|â|À|Á|Ã|Â',
      'e' : 'ē|é|è|ê|É|È|Ê',
      'i' : 'ī|í|ì|î|Í|Ì|Î',
      'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
      'u' : 'ū|ú|ù|û|ü|Ú|Ù|Û|Ü',
      'c' : 'č|ç|Ç',
      'n' : 'ņ|ñ|Ñ',
      'S' : 'Š',
      's' : 'š',
      'z' : 'ž',
      'Z' : 'Ž',
      'G' : 'Ģ',
      'g' : 'ģ',
      'C' : 'Č',
      'A' : 'Ā',
      'l' : 'ļ',
      'k' : 'ķ'

  };
  for (var pattern in map) {
      str = str.replace(new RegExp(map[pattern], 'g'), pattern);
  };
  return str;
};
//Add commas to thousands
function addcommas(x){
  if(parseInt(x)){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return x;
}
//Clean values
function cleanCurrencyValue(val) {
  val = val.replace("€", "");
  val = val.replace("$", "");
  val = val.replace(/\,/g,'');
  //val = val.replace(/\./g,'');
  //val = val.replace(",", ".");
  return val.trim();
}
//Custom date order for dataTables
var dmy = d3.timeParse("%d/%m/%Y");
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
  "date-eu-pre": function (date) {
    if(date.indexOf("Cancelled") > -1){
      date = date.split(" ")[0];
    }
      return dmy(date);
  },
  "date-eu-asc": function ( a, b ) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0));
  },
  "date-eu-desc": function ( a, b ) {
      return ((a < b) ? 1 : ((a > b) ? -1 : 0));
  }
});

//Get URL parameters
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//Generate random parameter for dynamic dataset loading (to avoid caching)
var randomPar = '';
var randomCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for ( var i = 0; i < 5; i++ ) {
  randomPar += randomCharacters.charAt(Math.floor(Math.random() * randomCharacters.length));
}
//Load data and generate charts
csv('./data/tab_b/interests_map.csv?' + randomPar, (err, interests) => {
  //csv('./data/tab_b/municipalities_names.csv?' + randomPar, (err, municipalities_names) => {
    //Set year and pre-filter the data accordingly
    if(getParameterByName('year')) {
      vuedata.selectedYear = getParameterByName('year');
    } else {
      vuedata.selectedYear = '2019';
    }
    $("#y"+vuedata.selectedYear).addClass('active');
    interests = _.filter(interests, function(i){ return i.DeclYear.trim() == vuedata.selectedYear; });
    var mps = [];
    var totInterests = 0;
    //Loop through data to aply fixes and calculations
    _.each(interests, function (d) {
      //Fix income value
      d.cleanValues = {
        income: 0,
        holding: 0,
        any: 0
      }
      if(d.Income_value && d.Income_value != "") { 
        d.cleanValues.income = parseFloat(cleanCurrencyValue(d.Income_value));
        d.cleanValues.any = parseFloat(cleanCurrencyValue(d.Income_value) );
      }
      if(d.Holding_value && d.Holding_value != "") { 
        d.cleanValues.holding = parseFloat(cleanCurrencyValue(d.Holding_value));
        d.cleanValues.any = parseFloat(cleanCurrencyValue(d.Holding_value));
      }
      totInterests ++;
    });

    //Set dc main vars.
    var ndx = crossfilter(interests);
    var searchDimension = ndx.dimension(function (d) {
        var entryString = d.Interest_Type + ' ' + d.Entity_Sector + ' ' + d.Surname_name + ' ' + d.Frakcija + ' ' + d.Entity_Municipality + ' ' + d.Entity_Region;
        return entryString.toLowerCase();
    });

    //MAP CHART
    var createMapChart = function() {
      json('./data/lv-municipalities-topojson.json', (err, jsonmap) => {
        /*
        _.each(jsonmap.objects.latvia.geometries, function (d) {
          municipalities_names
          var municipalityNameEntry = _.find(municipalities_names, function(i){ return i.Municipalities_Map_Names == d.properties.name; });
          if(municipalityNameEntry && municipalityNameEntry['Municipalities_Data_Names'] !== "") {
            d.properties.name = municipalityNameEntry['Municipalities_Data_Names'];
          }
        });
        */
        var chart = charts.map.chart;
        var width = recalcWidth(charts.map.divId);
        var dimension = ndx.dimension(function (d) {
          return d.Entity_Municipality;
        });
        var group = dimension.group().reduceSum(function (d) {
          return 1;
        });
        groups.map.amtDefault = group;
        groups.map.amtIncome = dimension.group().reduceSum(function (d) {
          return d.cleanValues.income;
        });
        groups.map.amtHoldings = dimension.group().reduceSum(function (d) {
          return d.cleanValues.holding;
        });
        groups.map.amtIncomeHoldings = dimension.group().reduceSum(function (d) {
          return d.cleanValues.any;
        });
        var dpt = topojson.feature(jsonmap, jsonmap.objects.latvia).features;
        var projection = d3.geoMercator()
          .center([24.2,56.6])
          .scale(width*6)
          .translate([width/2 - 50, 320]);
        var centered;
        function clicked(d) {
        }
        var height = $('#'+charts.map.divId + '_container').height();
        chart
          .width(width)
          .height(height)
          .dimension(dimension)
          .group(group)
          .projection(projection)
          .colors(d3.scaleQuantize().range(["#bdd9f2", "#a6cced", "#97c1e6", "#85aedd", "#6fa6de", "#4588cc", "#2a6bad"]))
          //.colors(d3.scaleQuantize().range(["#dae6ff", "#b3cbff", "#89adfa", "#7b9be0", "#6d8ac7", "#5f78ad", "#516694", "#43557a", "#354361"]))
          .colorDomain([1, 10])
          .colorCalculator(function (d) { return (!d || d == 0) ? '#eee' : chart.colors()(d);})
          .overlayGeoJson(dpt, "region", function (d) { return d.properties.name.toString(); })
          .title(function (d) {
            return d.key + ': ' + d.value + ' interests';
          })
          .on('renderlet', function(chart) {});
        chart.render();
      });
    }


    //CHART 1
    var createTopSectorsChart = function() {
      var chart = charts.topSectors.chart;
      var dimension = ndx.dimension(function (d) {
        return d['Entity_Sector'];
      });
      var group = dimension.group().reduceSum(function (d) {
          return 1;
      });
      groups.sectorsChart.amtDefault = group;
      groups.sectorsChart.amtIncome = dimension.group().reduceSum(function (d) {
        return d.cleanValues.income;
      });
      groups.sectorsChart.amtHoldings = dimension.group().reduceSum(function (d) {
        return d.cleanValues.holding;
      });
      groups.sectorsChart.amtIncomeHoldings = dimension.group().reduceSum(function (d) {
        return d.cleanValues.any;
      });
      var filteredGroup = (function(source_group) {
        return {
          all: function() {
            return source_group.top(20).filter(function(d) {
              return (d.value != 0);
            });
          }
        };
      })(group);
      var width = recalcWidth(charts.topSectors.divId);
      var charsLength = recalcCharsLength(width);
      chart
        .width(width)
        .height(532)
        .margins({top: 0, left: 0, right: 10, bottom: 20})
        .group(filteredGroup)
        .dimension(dimension)
        .colorCalculator(function(d, i) {
          return vuedata.colors.default1;
        })
        .label(function (d) {
            if(d.key && d.key.length > charsLength){
              return d.key.substring(0,charsLength) + '...';
            }
            return d.key;
        })
        .title(function (d) {
            return d.key + ': ' + d.value.toFixed(0) + ' interests';
        })
        .elasticX(true)
        .xAxis().ticks(4);
        //chart.xAxis().tickFormat(numberFormat);
        chart.render();
    }
    
    //TABLE
    var createTable = function() {
      var count=0;
      charts.mainTable.chart = $("#dc-data-table").dataTable({
        "columnDefs": [
          {
            "searchable": false,
            "orderable": false,
            "targets": 0,   
            data: function ( row, type, val, meta ) {
              return count;
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 1,
            "defaultContent":"N/A",
            "data": function(d) {
              return d.Surname_name;
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 2,
            "defaultContent":"N/A",
            "data": function(d) {
              return d.Frakcija;
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 3,
            "defaultContent":"N/A",
            "data": function(d) {
              return d.Interest_Type;
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 4,
            "defaultContent":"N/A",
            "data": function(d) {
              return d.Entity_Sector;
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 5,
            "defaultContent":"N/A",
            "data": function(d) {
              return d.Entity_Municipality;
            }
          }
        ],
        "iDisplayLength" : 25,
        "bPaginate": true,
        "bLengthChange": true,
        "bFilter": false,
        "order": [[ 1, "desc" ]],
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": false,
        "bDeferRender": true,
        "aaData": searchDimension.top(Infinity),
        "bDestroy": true,
      });
      var datatable = charts.mainTable.chart;
      datatable.on( 'draw.dt', function () {
        var PageInfo = $('#dc-data-table').DataTable().page.info();
          datatable.DataTable().column(0, { page: 'current' }).nodes().each( function (cell, i) {
              cell.innerHTML = i + 1 + PageInfo.start;
          });
        });
        datatable.DataTable().draw();

      $('#dc-data-table tbody').on('click', 'tr', function () {
        var data = datatable.DataTable().row( this ).data();
        vuedata.selectedElement = data;
        $('#detailsModal').modal();
      });
    }

    //REFRESH TABLE
    function RefreshTable() {
      dc.events.trigger(function () {
        var alldata = searchDimension.top(Infinity);
        charts.mainTable.chart.fnClearTable();
        charts.mainTable.chart.fnAddData(alldata);
        charts.mainTable.chart.fnDraw();
      });
    }

    //SEARCH INPUT FUNCTIONALITY
    var typingTimer;
    var doneTypingInterval = 1000;
    var $input = $("#search-input");
    $input.on('keyup', function () {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });
    $input.on('keydown', function () {
      clearTimeout(typingTimer);
    });
    function doneTyping () {
      var s = $input.val().toLowerCase();
      searchDimension.filter(function(d) { 
        return d.indexOf(s) !== -1;
      });
      throttle();
      var throttleTimer;
      function throttle() {
        window.clearTimeout(throttleTimer);
        throttleTimer = window.setTimeout(function() {
            dc.redrawAll();
            RefreshTable();
        }, 250);
      }
    }

    //Change count type
    $('.count-type-btn').click(function(){
      var btnId = $(this).attr('id');
      $('.count-type-btn').removeClass('active');
      $(this).addClass('active');
      var amtTypeText = '';
      var newColorDomain = [1, 10];
      if(btnId  == "amtDefault") {
        amtTypeText = 'interests';
        newColorDomain = [1, 10];
      } else {
        amtTypeText = ' €';
        newColorDomain = [1, 10000];
      }
      charts.map.chart
        .group(groups.map[btnId ])
        .colorDomain(newColorDomain)
        .title(function (d) {
          var formattedValue = d.value;
          if(d.value) { formattedValue = d.value.toFixed(0) }
          return d.key + ': ' + formattedValue + ' ' + amtTypeText;
        });
      charts.topSectors.chart
        .group(groups.sectorsChart[btnId])
        .title(function (d) {
          return d.key + ': ' + d.value.toFixed(0) + ' ' + amtTypeText;
        });
      dc.redrawAll();
      RefreshTable();
    })

    //Reset charts
    var resetGraphs = function() {
      for (var c in charts) {
        if(charts[c].type !== 'table' && charts[c].chart.hasFilter()){
          charts[c].chart.filterAll();
        }
      }
      searchDimension.filter(null);
      $('#search-input').val('');
      dc.redrawAll();
      RefreshTable();
    }
    $('.reset-btn').click(function(){
      resetGraphs();
      $('.year-btn.yall').click();
    })
    
    //Render charts
    createTable();
    createMapChart();
    createTopSectorsChart();


    $('.dataTables_wrapper').append($('.dataTables_length'));

    //Hide loader
    vuedata.loader = false;

    //COUNTERS
    //Main counter
    var all = ndx.groupAll();
    var counter = dc.dataCount('.dc-data-count')
      .dimension(ndx)
      .group(all);
    counter.render();
    //Update datatables
    counter.on("renderlet.resetall", function(c) {
      RefreshTable();
    });

    //Window resize function
    window.onresize = function(event) {
      resizeGraphs();
    };
  //});
});
