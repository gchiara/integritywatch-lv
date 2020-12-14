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


// Data object - is also used by Vue

var vuedata = {
  section: 'tabA',
  page: 'tabA4',
  loader: true,
  readMore: false,
  showInfo: true,
  showShare: true,
  showAllCharts: true,
  chartMargin: 40,
  selectedYear: 'all',
  dataYears: [],
  charts: {
    yearsFilter: {
      title: 'Gadi',
      info: ''
    },
    topSpenders: {
      title: 'Top 20 tērētāji',
      info: 'Infografikā ir redzamas 10 politiskās partijas, kas ir deklarējušas  vislielākos izdevumus izvēlētajā periodā.'
    },
    expendituresType: {
      title: 'Top 10 izdevumu veidi',
      info: 'Infografikā ir redzami 10 izdevumu veido, kuriem ir visaugstākā vērtība.'
    },
    expendituresPerYear: {
      title: 'Izdevumi gadā',
      info: 'Infografikā ir redzami kopējie politisko partiju izdevumi pa gadiem.'
    },
    mainTable: {
      chart: null,
      type: 'table',
      title: 'Politisko partiju izdevumi',
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
      window.open('./data/tab_a/a4.csv');
    },
    share: function (platform) {
      if(platform == 'twitter'){
        var thisPage = window.location.href.split('?')[0];
        var shareText = 'Share text here ' + thisPage;
        var shareURL = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText);
        window.open(shareURL, '_blank');
        return;
      }
      if(platform == 'facebook'){
        var toShareUrl = 'https://integritywatch.lt';
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
  topSpenders: {
    chart: dc.rowChart("#topspenders_chart"),
    type: 'row',
    divId: 'topspenders_chart'
  },
  expendituresType: {
    chart: dc.pieChart("#expenditurestype_chart"),
    type: 'pie',
    divId: 'expenditurestype_chart'
  },
  expendituresPerYear: {
    chart: dc.lineChart("#expendituresperyear_chart"),
    type: 'line',
    divId: 'expendituresperyear_chart'
  },
  mainTable: {
    chart: null,
    type: 'table',
    divId: 'dc-data-table'
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

//Add commas to thousands
function addcommas(x){
  if(parseInt(x)){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return x;
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
  "euro-amount-pre": function (amt) {
    var cleanAmt = parseFloat(amt.trim().replace("  "," ").replace("€ ","").replace(",",""));
    return cleanAmt;
  },
  "euro-amount-asc": function ( a, b ) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0));
  },
  "euro-amount-desc": function ( a, b ) {
      return ((a < b) ? 1 : ((a > b) ? -1 : 0));
  }
});

//Generate random parameter for dynamic dataset loading (to avoid caching)
var randomPar = '';
var randomCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for ( var i = 0; i < 5; i++ ) {
  randomPar += randomCharacters.charAt(Math.floor(Math.random() * randomCharacters.length));
}
//Load data and generate charts
csv('./data/tab_a/a4.csv?' + randomPar, (err, finance) => {
  //Loop through data to aply fixes and calculations
  var totDonors = 0;
  var totVertiba = 0;
  //Loop through data to apply fixes
  _.each(finance, function (d) {
    if(vuedata.dataYears.indexOf(d.Gads) == -1) {
      vuedata.dataYears.push(d.Gads);
    }
    //Convert amount to float
    d.donationAmt = parseFloat(d.Vērtība.trim().replace("  "," ").replace("€ ","").replace(",","")).toFixed(2);
    totVertiba += parseFloat(d.donationAmt);
    //Define amount categories
    d.amtCat = "N/A";
    if(d.donationAmt < 0) { d.amtCat = "negatīvi ziedojumi" }
    else if(d.donationAmt < 1000) { d.amtCat = "0—1000" }
    else if(d.donationAmt < 2500) { d.amtCat = "1000—2500" }
    else if(d.donationAmt < 5000) { d.amtCat = "2500—5000" }
    else if(d.donationAmt < 7500) { d.amtCat = "5000—7500" }
    else if(d.donationAmt < 9500) { d.amtCat = "7500—9500" }
    else if(d.donationAmt >= 9500) { d.amtCat = "9500 +" }
  });
  //Set totals for custom counters
  $('.total-count-vertiba').html(addcommas(totVertiba.toFixed(0)));

  //Set dc main vars. The second crossfilter is used to handle the travels stacked bar chart.
  var ndx = crossfilter(finance);
  var searchDimension = ndx.dimension(function (d) {
      var entryString = d['Partija'] + ' ' + d['Izdevumu Veids'] + ' year_val:' + d['Gads'];
      return entryString.toLowerCase();
  });

  //CHART 1
  var createTopSpendersChart = function() {
    var chart = charts.topSpenders.chart;
    var dimension = ndx.dimension(function (d) {
      return d['Partija'];
    });
    var group = dimension.group().reduceSum(function (d) {
        return d.donationAmt;
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
    var width = recalcWidth(charts.topSpenders.divId);
    var charsLength = recalcCharsLength(width);
    chart
      .width(width)
      .height(600)
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
          return d.key + ': ' + d.value.toFixed(2);
      })
      .elasticX(true)
      .xAxis().ticks(4);
      //chart.xAxis().tickFormat(numberFormat);
      chart.render();
  }

  //CHART 2
  var createExpendituresTypeChart = function() {
    var chart = charts.expendituresType.chart;
    var dimension = ndx.dimension(function (d) {
      console.log(d['Veids']);
      return d['Veids'];  
    });
    var group = dimension.group().reduceSum(function (d) { return d.donationAmt; });
    var sizes = calcPieSize(charts.expendituresType.divId);
    chart
      .width(sizes.width)
      .height(sizes.height)
      .cy(sizes.cy)
      .slicesCap(10)
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
        return percent.toFixed(1) + '%';
      })
      .dimension(dimension)
      .group(group);
      /*
      .colorCalculator(function(d, i) {
        return vuedata.colors.activities[d.key];
      });
      */
    chart.render();
  }

  //CHART 3
  var createExpendituresPerYearChart = function() {
    var chart = charts.expendituresPerYear.chart;
    var dimension = ndx.dimension(function (d) {
      return d['Gads'];
    });
    var group = dimension.group().reduceSum(function (d) {
        return d.donationAmt;
    });
    var width = recalcWidth(charts.expendituresPerYear.divId);
    var charsLength = recalcCharsLength(width);
    chart
      .width(width)
      .height(610)
      .margins({top: 10, left: 30, right: 0, bottom: 20})
      .group(group)
      .dimension(dimension)
      .x(d3.scaleBand())
      .xUnits(dc.units.ordinal)
      .brushOn(true)
      .xAxisLabel('')
      .yAxisLabel('')
      .renderHorizontalGridLines(true)
      //.xUnits(d3.timeMonths)
      .elasticY(true)
      .elasticX(false)
      .title(function (d) {
        return d.key + ': ' + d.value.toFixed(2);
      });
      chart.render();
  }

  //CHART 3
  var createTopDonorsChart = function() {
    var chart = charts.topDonors.chart;
    var dimension = ndx.dimension(function (d) {
      return d['Dāvinātājs'];
    });
    var group = dimension.group().reduceSum(function (d) {
        return d.donationAmt;
    });
    var filteredGroup = (function(source_group) {
      return {
        all: function() {
          return source_group.top(10).filter(function(d) {
            return (d.value != 0);
          });
        }
      };
    })(group);
    var width = recalcWidth(charts.topDonors.divId);
    var charsLength = recalcCharsLength(width);
    chart
      .width(width)
      .height(420)
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
          return d.key + ': ' + d.value.toFixed(2);
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
            return d['Partija'];
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 2,
          "defaultContent":"N/A",
          "data": function(d) {
            return d['Gads'];
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 3,
          "defaultContent":"N/A",
          "data": function(d) {
            return d['Veids'];
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 4,
          "defaultContent":"N/A",
          "data": function(d) {
            return d['Vērtība'];
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

    /*
    $('#dc-data-table tbody').on('click', 'tr', function () {
      var data = datatable.DataTable().row( this ).data();
      vuedata.selectedElement = data;
      $('#detailsModal').modal();
    });
    */
  }

  //YEARS FILTERS
  $('.year-btn').click(function(){
    $('.year-btn').removeClass('active');
    $(this).addClass('active');
    var thisId = $(this).attr('id');
    vuedata.selectedYear = thisId.replace('y','');
    if(thisId == 'yall') {
      searchDimension.filter(function(d) { 
        return true;
      });
    } else {
      searchDimension.filter(function(d) { 
        return d.indexOf('year_val:'+vuedata.selectedYear) !== -1;
      });
    }
    dc.redrawAll();
    RefreshTable();
  });

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
  })
  
  //Render charts
  createTopSpendersChart();
  createExpendituresTypeChart();
  createExpendituresPerYearChart();
  createTable();

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

  //Custom counters
  function drawCustomCounters() {
    var dim = ndx.dimension (function(d) {
      if (!d.id) {
        return "";
      } else {
        return d.id;
      }
    });
    var group = dim.group().reduce(
      function(p,d) {  
        p.nb +=1;
        if (!d.donationAmt) {
          return p;
        }
        p.valueAmt += parseFloat(d.donationAmt);
        return p;
      },
      function(p,d) {  
        p.nb -=1;
        if (!d.donationAmt) {
          return p;
        }
        p.valueAmt -= parseFloat(d.donationAmt);
        return p;
      },
      function(p,d) {  
        return {nb: 0, valueAmt: 0}; 
      }
    );
    group.order(function(p){ return p.nb });
    var valueAmt = 0;
    var counter = dc.dataCount(".count-box-vertiba")
    .dimension(group)
    .group({value: function() {
      valueAmt = 0;
      return group.all().filter(function(kv) {
        if (kv.value.nb >0) {
          valueAmt += +kv.value.valueAmt;
        }
        return kv.value.nb > 0; 
      }).length;
    }})
    .renderlet(function (chart) {
      $(".nbvertiba").text('€ ' + addcommas(valueAmt.toFixed(0)));
    });
    counter.render();
  }
  drawCustomCounters();

  //Window resize function
  window.onresize = function(event) {
    resizeGraphs();
  };
})
