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
  section: 'tabA',
  page: 'tabA3',
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
    groups: {
      title: 'Frakcijas',
      info: 'Infografikā ir redzams frakcijas deputātu kopējais maksājumu apjoms politiskajām partijām.'
    },
    donationsType: {
      title: 'Veids',
      info: 'Infografikā ir redzama dažādu finanšu maksājumu kopējā vērtība. '
    },
    donationsPerYear: {
      title: 'Ziedojumi un biedru naudas maksājumi gadā',
      info: 'Infografikā ir redzams deputātu kopējo maksājumu apjoms pa gadiem.'
    },
    topRecipients: {
      title: 'Top 10 saņēmēji',
      info: 'Infografikā ir redzamas 10 politiskās partijas, kas ir saņēmušas vislielākos maksājumus no deputātiem.'
    },
    mainTable: {
      chart: null,
      type: 'table',
      title: 'Deputātu ziedojumi un biedru nauda maksājumi ',
      info: ''
    }
  },
  selectedElement: { "P": "", "Sub": ""},
  modalShowTable: '',
  colors: {
    generic: ["#3b95d0", "#4081ae", "#406a95", "#395a75" ],
    default1: "#3695d8",
    default2: "#449188",
    groups: {
      "Saskaņa": "#ED1B24",
      "Jauno Konservatīvo frakcija": "#384976",
      "Jauno konservatīvo frakcija": "#384976",
      "Attīstībai/Par!": "#FFDD00",
      "Pie frakcijām nepiederošie deputāti": "#808080",
      "Nacionāla Apvienība VL-TB/LNNK": "#932330",
      "Zaļo un Zemnieku Savienība": "#006538",
      "KPV LV": "#FE0000",
      "Jaunā Vienotība": "#76BC55",
      "Neatkarīgie": "#aaaaaa",
      "n/a": "#cccccc",
      "Frakcija PROGRESĪVIE": "#ee3a29",
      "Frakcija LATVIJA PIRMAJĀ VIETĀ": "#9e3039",
      "Frakcija JAUNĀ VIENOTĪBA": "#91c977",
      "Zaļo un Zemnieku savienības frakcija": "#338460",
      "Frakcija “APVIENOTAIS SARAKSTS – Latvijas Zaļā partija, Latvijas Reģionu Apvienība, Liepājas partija”": "#ffa800",
      "Frakcija “Nacionālā apvienība”": "#a94f59",
      "Frakcija “Stabilitātei!”": "#f67c01"
    }
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
      window.open('./data/tab_a/a3.csv');
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
  groups: {
    chart: dc.rowChart("#groups_chart"),
    type: 'row',
    divId: 'groups_chart'
  },
  donationsType: {
    chart: dc.pieChart("#donationstype_chart"),
    type: 'pie',
    divId: 'donationstype_chart'
  },
  topRecipients: {
    chart: dc.rowChart("#toprecipients_chart"),
    type: 'row',
    divId: 'toprecipients_chart'
  },
  donationsPerYear: {
    chart: dc.lineChart("#donationsperyear_chart"),
    type: 'line',
    divId: 'donationsperyear_chart'
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
    var cleanAmt = parseFloat(amt.trim().replace("  "," ").replace("EUR ","").replace("€ ","").replace("€","").replace(",",""));
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
csv('./data/tab_a/a3.csv?' + randomPar, (err, finance) => {
  //Loop through data to aply fixes and calculations
  var totDonors = 0;
  var totVertiba = 0;
  //Loop through data to apply fixes
  _.each(finance, function (d) {
    d.Year = null;
    var splitDate = d['Datums'].split('/');
    if(splitDate.length == 3) {
      d.Year = splitDate[2];
      var dateInt = parseInt(splitDate[2] + splitDate[1] + splitDate[0]);
    }
    d.mandate = '';
    if(dateInt) {
      if(dateInt >= 20221101) {
        d.mandate = 'm14';
      } else if(dateInt < 20221101) {
        d.mandate = 'm13';
      }
    }
    if(d.mandate.replace('m','') !== d.Legislature) { 
      console.log(d);
      console.log('WRONG LEG');
    }
    if(vuedata.dataYears.indexOf(d.Year) == -1) {
      vuedata.dataYears.push(d.Year);
    }
    //Convert amount to float
    d.donationAmt = parseFloat(d.Vērtība.trim().replace("  "," ").replace("EUR ","").replace("€ ","").replace("€","").replace(",","")).toFixed(2);
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
    //Clean parties
    d.partyChart = d['Frakcija'];
    //Flags string
    d['FlagsString'] = '';
    if(d['Flags'].indexOf('above_yearly_limit') > -1) {
      d['FlagsString'] = 'Lielziedotājs';
    }
  });
  //Set totals for custom counters
  $('.total-count-vertiba').html(addcommas(totVertiba.toFixed(0)));

  //Set dc main vars. The second crossfilter is used to handle the travels stacked bar chart.
  var ndx = crossfilter(finance);
  var searchDimension = ndx.dimension(function (d) {
      var entryString = d['Partija'] + ' ' + d['Dāvinātājs'] + ' year_val:' + d['Year'];
      return entryString.toLowerCase();
  });
  var mandateDimension = ndx.dimension(function (d) {
    return d.mandate;
  });
  mandateDimension.filter(function(d) { 
    return d == 'm14';
  });

  //CHART 1
  var createGroupsChart = function() {
    var chart = charts.groups.chart;
    var dimension = ndx.dimension(function (d) {
      return d.partyChart;
    });
    var group = dimension.group().reduceSum(function (d) {
        return d.donationAmt;
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
  var createDonationsTypeChart = function() {
    var chart = charts.donationsType.chart;
    var dimension = ndx.dimension(function (d) {
      return d['Veids'];  
    });
    var group = dimension.group().reduceSum(function (d) { return d.donationAmt; });
    var sizes = calcPieSize(charts.donationsType.divId);
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
  var createTopRecipientsChart = function() {
    var chart = charts.topRecipients.chart;
    var dimension = ndx.dimension(function (d) {
      return d['Partija'];
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
    var width = recalcWidth(charts.topRecipients.divId);
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

  //CHART 4
  var createDonationsPerYearChart = function() {
    var chart = charts.donationsPerYear.chart;
    var dimension = ndx.dimension(function (d) {
      return d['Year'];
    });
    var group = dimension.group().reduceSum(function (d) {
        return d.donationAmt;
    });
    var width = recalcWidth(charts.donationsPerYear.divId);
    var charsLength = recalcCharsLength(width);
    chart
      .width(width)
      .height(410)
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
            return d['Deputāts'];
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 2,
          "defaultContent":"N/A",
          "data": function(d) {
            return d['Frakcija'];
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
          "type": "euro-amount",
          "data": function(d) {
            return d['Vērtība'];
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 5,
          "defaultContent":"N/A",
          "data": function(d) {
            return d['Partija'];
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 6,
          "defaultContent":"N/A",
          "type": "date-eu",
          "data": function(d) {
            return d['Datums'];
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 7,
          "defaultContent":"N/A",
          "data": function(d) {
            return d['FlagsString'];
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

  //MANDATE FILTER
  $('.mandate-btn').click(function(){
    $('.mandate-btn').removeClass('active');
    $(this).addClass('active');
    var thisId = $(this).attr('id');
    vuedata.selectedYear = thisId;
    mandateDimension.filter(function(d) { 
      return d == vuedata.selectedYear;
    });
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
  createDonationsTypeChart();
  createTopRecipientsChart();
  createDonationsPerYearChart();
  createGroupsChart();
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
