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
import '/scss/main.scss';

import Vue from 'vue';
import Loader from './components/Loader.vue';
import ChartHeader from './components/ChartHeader.vue';
import Pagination from './components/Pagination.vue';


// Data object - is also used by Vue

var vuedata = {
  section: 'tabB',
  page: 'tabB2',
  loader: true,
  readMore: false,
  showInfo: true,
  showShare: true,
  showAllCharts: true,
  chartMargin: 40,
  selectedYear: 'all',
  charts: {
    groups: {
      title: 'Frakcijas',
      info: ''
    },
    age: {
      title: 'Dzimšanas gads',
      info: ''
    },
    gender: {
      title: 'Dzimums',
      info: ''
    },
    status: {
      title: 'Mandāta statuss',
      info: ''
    },
    mainTable: {
      chart: null,
      type: 'table',
      title: 'Saeimas deputāti',
      info: ''
    }
  },
  selectedElement: { "P": "", "Sub": ""},
  filteredData: [],
  pageOfItems: [],
  profileSection: 1,
  modalShowTable: '',
  donationsTableDT: null,
  colors: {
    generic: ["#3b95d0", "#4081ae", "#406a95", "#395a75" ],
    default1: "#3695d8",
    default2: "#449188",
    groups: {
      "Saskaņa": "#ED1B24",
      "Jauno Konservatīvo frakcija": "#384976",
      "Attīstībai/Par!": "#FFDD00",
      "Pie frakcijām nepiederošie deputāti": "#808080",
      "Nacionāla Apvienība VL-TB/LNNK": "#932330",
      "Zaļo un Zemnieku Savienība": "#006538",
      "KPV LV": "#FADADD",
      "Jaunā Vienotība": "#76BC55",
    }
  }
}



//Set vue components and Vue app
Vue.component('pagination', Pagination);
Vue.component('chart-header', ChartHeader);
Vue.component('loader', Loader);


new Vue({
  el: '#app',
  data: vuedata,
  methods: {
    //Share
    downloadDataset: function () {
      window.open('./data/tab_b/groups.csv');
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
    },
    interestType1: function (el) {
      return _.filter(el, function(i){ return i.Interest_Type.indexOf('Position') > -1; });
    },
    interestType2: function (el) {
      return _.filter(el, function(i){ return i.Interest_Type === 'Holding | Commercial Companies'; });
    },
    interestType3: function (el) {
      var allowedTypes = ['Income | Private Sector', 'Income | Private', 'Income | Academia', 'Income | Foreign Institution', 'Income | Self-employment'];
      return _.filter(el, function(i){ return allowedTypes.indexOf(i.Interest_Type) > -1 });
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    showMpPanel: function (mp) {
      this.selectedElement = mp;
      this.profileSection = 1;
      this.clearnDonationsTable();
      $('#detailsModal').modal();
    },
    initDonationsTable: function() {
      if(!$.fn.DataTable.isDataTable('#mp-donations-table')) {
        $('#mp-donations-table').dataTable({
          "bPaginate": false,
          "searching": false,
          "info": false,
          "columnDefs": [
            { "type": "num-fmt", "targets": 2 },
            { "type": "dateDMY", "targets": 3 }
          ]
        });
      }
    },
    clearnDonationsTable: function() {
      $('#mp-donations-table').DataTable().destroy();
    }
  }
});

//Initialize info popovers
$(function () {
  $('[data-toggle="popover"]').popover()
})

//Charts
var charts = {
  groups: {
    chart: dc.rowChart("#groups_chart"),
    type: 'row',
    divId: 'groups_chart'
  },
  age: {
    chart: dc.rowChart("#age_chart"),
    type: 'row',
    divId: 'age_chart'
  },
  gender: {
    chart: dc.pieChart("#gender_chart"),
    type: 'pie',
    divId: 'gender_chart'
  },
  status: {
    chart: dc.pieChart("#status_chart"),
    type: 'pie',
    divId: 'status_chart'
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
    if(charts[c].type == 'row'){
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
  val = val.replace("€ ", "");
  val = val.replace("€", "");
  val = val.replace(/\,/g,'');
  //val = val.replace(/\./g,'');
  //val = val.replace(",", ".");
  return val;
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
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
  "dateDMY-pre": function (date) {
    if(date && date !== "") {
      var dateNum = date.split("/");
      if(dateNum.length > 2) {
        return dateNum[2] + '' + dateNum[1] + '' + dateNum[0];
      }
      return 0;
    }
    return 0;
  },
  "dateDMY-asc": function ( a, b ) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0));
  },
  "dateDMY-desc": function ( a, b ) {
      return ((a < b) ? 1 : ((a > b) ? -1 : 0));
  }
});

function sortFilteredData(a, b) {
  return a.fullname.localeCompare(b.fullname);
  /*
  if (a.fullname < b.fullname){
    return -1;
  }
  if (a.fullname > b.fullname){
    return 1;
  }
  return 0;
  */
}

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
csv('./data/tab_b/groups.csv?' + randomPar, (err, mps) => {
  csv('./data/tab_b/donations.csv?' + randomPar, (err, donations) => {
    csv('./data/tab_b/interests_and_assets.csv?' + randomPar, (err, declarations) => {
      //Loop through data to aply fixes and calculations
      _.each(mps, function (d) {
        d.fullname = d["Deputāts/e"].trim();
        //Get photo path
        var jpgs = ["Kronbergs","Zamurs","Tavars","Bikse"];
        var lastName = d.fullname.split(',')[0].trim();
        d.photoUrl = 'images/photos/'+slugify(lastName)+'.gif';
        if(d.fullname == "Klementjevs, Ivans") {
          d.photoUrl = 'images/photos/Klementjevs_I.gif';
        }
        if(jpgs.indexOf(slugify(lastName)) !== -1) {
          d.photoUrl = 'images/photos/'+slugify(lastName)+'.jpg';
        }
        //Get birth year category
        d.birthYearRange = "19" + d["Dzimšanas gads"][2] + "0 - " + d["Dzimšanas gads"][2] + "9";
        if(d["Dzimšanas gads"][0] == 2) {
          d.birthYearRange = "20" + d["Dzimšanas gads"][2] + "0 - " + d["Dzimšanas gads"][2] + "9";
        }
        //Get donations
        d.donations = [];
        var mpDonations = _.filter(donations, function(x) { return x["Deputāts"].trim() == d.fullname });
        if(mpDonations) {
          d.donations = mpDonations;
        }
        //Mandate Status
        d.mandateStatus = "";
        if(d["Mandāta statuss"] == "Pilntiesīgs mandāts") {
          d.mandateStatus = "Pilntiesīgs mandāts";
        } else {
          d.mandateStatus = "Apstiprināts uz laiku";
        }
        //Get declarations
        d.declarations = {};
        d.declarations.years = [];
        var mpDeclarations = _.filter(declarations, function(x) { return x["Surname_name"].trim() == d.fullname });
        if(mpDeclarations) {
          _.each(mpDeclarations, function (dec) {
            var dYear = dec.DeclYear.toString();
            if(d.declarations.years.indexOf(dYear) == -1) {
              d.declarations.years.push(dYear);
              d.declarations[dYear] = [];
            } 
            d.declarations[dYear].push(dec);
          });
          //Order years 
          d.declarations.years.sort(function(a, b) {
            return parseInt(b) - parseInt(a);
          });
        } else {
          console.log(d);
        }
      });

      //Set dc main vars.
      var ndx = crossfilter(mps);
      var searchDimension = ndx.dimension(function (d) {
          var entryString = d.fullname;
          return entryString.toLowerCase();
      });
      vuedata.filteredData = searchDimension.top(Infinity).sort(sortFilteredData);

      //CHART 1
      var createGroupsChart = function() {
        var chart = charts.groups.chart;
        var dimension = ndx.dimension(function (d) {
          return d['Frakcija'];
        });
        var group = dimension.group().reduceSum(function (d) {
          return 1;
        });
        var filteredGroup = (function(source_group) {
          return {
            all: function() {
              return source_group.top(30).filter(function(d) {
                return (d.value != 0);
              });
            }
          };
        })(group);
        var width = recalcWidth(charts.groups.divId);
        var charsLength = recalcCharsLength(width);
        chart
          .width(width)
          .height(420)
          .margins({top: 0, left: 0, right: 10, bottom: 20})
          .group(filteredGroup)
          .dimension(dimension)
          .colorCalculator(function(d, i) {
            return vuedata.colors.groups[d.key];
          })
          .label(function (d) {
              if(d.key && d.key.length > charsLength){
                return d.key.substring(0,charsLength) + '...';
              }
              return d.key;
          })
          .title(function (d) {
              return d.key + ': ' + d.value.toFixed(2);
          })
          .elasticX(true)
          .xAxis().ticks(4);
          //chart.xAxis().tickFormat(numberFormat);
          chart.render();
      }

      //CHART 2
      var createAgeChart = function() {
        var chart = charts.age.chart;
        var dimension = ndx.dimension(function (d) {
          return d.birthYearRange;
        });
        var group = dimension.group().reduceSum(function (d) {
          return 1;
        });
        var filteredGroup = (function(source_group) {
          return {
            all: function() {
              return source_group.top(30).filter(function(d) {
                return (d.value != 0);
              });
            }
          };
        })(group);
        var width = recalcWidth(charts.age.divId);
        var charsLength = recalcCharsLength(width);
        var order = ["1940 - 49", "1950 - 59", "1960 - 69", "1970 - 79", "1980 - 89", "1990 - 99", "2000 - 09"];
        chart
          .width(width)
          .height(420)
          .margins({top: 0, left: 0, right: 10, bottom: 20})
          .group(filteredGroup)
          .dimension(dimension)
          .ordering(function(d) { return order.indexOf(d.key)})
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
              return d.key + ': ' + d.value.toFixed(2);
          })
          .elasticX(true)
          .xAxis().ticks(4);
          //chart.xAxis().tickFormat(numberFormat);
          chart.render();
      }

      //CHART 3
      var createGenderChart = function() {
        var chart = charts.gender.chart;
        var dimension = ndx.dimension(function (d) {
          return d['Dzimums'];  
        });
        var group = dimension.group().reduceSum(function (d) { return 1; });
        var sizes = calcPieSize(charts.gender.divId);
        chart
          .width(sizes.width)
          .height(sizes.height)
          .cy(sizes.cy)
          .innerRadius(sizes.innerRadius)
          .radius(sizes.radius)
          .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
            var thisKey = d.name;
            if(thisKey.length > 40){
              return thisKey.substring(0,40) + '...';
            }
            return thisKey;
          }))
          .title(function(d){
            var thisKey = d.key;
            return thisKey + ': ' + d.value;
          })
          .label(function (d){
            var percent = d.value / group.all().reduce(function(a, v){ return a + v.value; }, 0);
            percent = percent*100;
            return d.value;
          })
          .dimension(dimension)
          .group(group);
        chart.render();
      }

      //CHART 4
      var createStatusChart = function() {
        var chart = charts.status.chart;
        var dimension = ndx.dimension(function (d) {
          return d.mandateStatus;  
        });
        var group = dimension.group().reduceSum(function (d) { return 1; });
        var sizes = calcPieSize(charts.status.divId);
        chart
          .width(sizes.width)
          .height(sizes.height)
          .cy(sizes.cy)
          .innerRadius(sizes.innerRadius)
          .radius(sizes.radius)
          .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
            var thisKey = d.name;
            if(thisKey.length > 40){
              return thisKey.substring(0,40) + '...';
            }
            return thisKey;
          }))
          .title(function(d){
            var thisKey = d.key;
            return thisKey + ': ' + d.value;
          })
          .label(function (d){
            var percent = d.value / group.all().reduce(function(a, v){ return a + v.value; }, 0);
            percent = percent*100;
            return d.value;
          })
          .dimension(dimension)
          .group(group);
        chart.render();
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
              vuedata.filteredData = searchDimension.top(Infinity).sort(sortFilteredData);
              //RefreshTable();
          }, 250);
        }
      }

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
        vuedata.filteredData = searchDimension.top(Infinity).sort(sortFilteredData);
        //RefreshTable();
      }
      $('.reset-btn').click(function(){
        resetGraphs();
      })
      
      //Render charts
      //createTable();
      createGroupsChart();
      createAgeChart();
      createGenderChart();
      createStatusChart();

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
        vuedata.filteredData = searchDimension.top(Infinity).sort(sortFilteredData);
      });

      //Window resize function
      window.onresize = function(event) {
        resizeGraphs();
      };
    })
  })
})
