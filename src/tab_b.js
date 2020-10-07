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
  page: 'tabB',
  loader: true,
  readMore: false,
  showInfo: true,
  showShare: true,
  showAllCharts: true,
  chartMargin: 40,
  selectedYear: 'all',
  charts: {
    yearsFilter: {
      title: 'Years filter',
      info: ''
    },
    outsidePositions: {
      title: 'N. of MPs / N. of Outside Positions',
      info: ''
    },
    topSectorsIncome: {
      title: 'Top 5 economic sectors / (tot. income value)',
      info: ''
    },
    topSectorsHolding: {
      title: 'Top 5 economic sectors (tot. holding value)',
      info: ''
    },
    incomeValues: {
      title: 'N. of MPs / Income value categories',
      info: ''
    },
    holdingValues: {
      title: 'N. of MPs / holding value categories',
      info: ''
    },
    mainTable: {
      chart: null,
      type: 'table',
      title: 'Table',
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
      window.open('./data/tab_a/finance.csv');
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
  outsidePositions: {
    chart: dc.barChart("#outsidepositions_chart"),
    type: 'bar',
    divId: 'outsidepositions_chart'
  },
  topSectorsIncome: {
    chart: dc.rowChart("#topsectorsincome_chart"),
    type: 'rob',
    divId: 'topsectorsincome_chart'
  },
  topSectorsHolding: {
    chart: dc.rowChart("#topsectorsholding_chart"),
    type: 'row',
    divId: 'topsectorsholding_chart'
  },
  incomeValues: {
    chart: dc.barChart("#incomevalues_chart"),
    type: 'bar',
    divId: 'incomevalues_chart'
  },
  holdingValues: {
    chart: dc.barChart("#holdingvalues_chart"),
    type: 'bar',
    divId: 'holdingvalues_chart'
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
//Clean values
function cleanCurrencyValue(val) {
  val = val.replace("€ ", "");
  val = val.replace("€", "");
  val = val.replace(/\./g,'');
  val = val.replace(",", ".");
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

//Generate random parameter for dynamic dataset loading (to avoid caching)
var randomPar = '';
var randomCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for ( var i = 0; i < 5; i++ ) {
  randomPar += randomCharacters.charAt(Math.floor(Math.random() * randomCharacters.length));
}
//Load data and generate charts
csv('./data/tab_b/interests_and_assets.csv?' + randomPar, (err, declarations) => {
  var mps = [];
  var totInterests = 0;
  //Loop through data to aply fixes and calculations
  _.each(declarations, function (d) {
    //Fix income value
    totInterests ++;
    d.Fin_v_value = cleanCurrencyValue(d.Fin_v_value);
    d.Income_value = cleanCurrencyValue(d.Income_value);
    //Check if mp already exisits in mps array
    var thisMp = _.find(mps, function(mp){ return mp.Surname_name == d.Surname_name; });
    if(!thisMp) {
      //If MP not yet added, add it
      var newMp = {
        Surname_name: d.Surname_name,
        UI: d.UI,
        Former: d.Former,
        Frakcija: d.Frakcija,
        OutsidePositionsNum: 0,
        OutsidePositionsNum2018: 0,
        OutsidePositionsNum2019: 0,
        Income_tot: 0,
        Income_tot2018: 0,
        Income_tot2019: 0,
        Holdings_tot: 0,
        Holdings_tot2018: 0,
        Holdings_tot2019: 0,
        interests: [],
        interests2018: [],
        interests2019: []
      }
      mps.push(newMp);
      thisMp = _.find(mps, function(mp){ return mp.Surname_name == d.Surname_name; });
    }
    //Create interest entry
    var thisInterest = {
      DeclYear: d.DeclYear,
      Interest_Type: d.Interest_Type,
      Entity_name: d.Entity_name,
      Entity_RegNum: d.Entity_RegNum,
      Municipality: d.Municipality,
      Region: d.Region,
      NACE_1: d.NACE_1,
      Specif: d.Specif,
      Position: d.Position,
      Income_type: d.Income_type,
      Income_value: d.Income_value,
      Fin_v: d.Fin_v,
      Fin_v_number: d.Fin_v_number,
      Fin_v_value: d.Fin_v_value
    }
    thisMp.interests.push(thisInterest);
      if(thisInterest.Interest_Type == "Position / Private") {
        thisMp.OutsidePositionsNum ++;
      }
      if(d.Income_value) {
        thisMp.Income_tot += parseFloat(d.Income_value);
      }
      if(d.Fin_v_value) {
        thisMp.Holdings_tot += parseFloat(d.Fin_v_value);
      }
      if(d.DeclYear == 2018) {
        thisMp.interests2018.push(thisInterest);
        if(thisInterest.Interest_Type == "Position / Private") {
          thisMp.OutsidePositionsNum2018 ++;
        }
        if(d.Income_value) {
          thisMp.Income_tot2018 += parseFloat(d.Income_value);
        }
        if(d.Fin_v_value) {
          thisMp.Holdings_tot2018 += parseFloat(d.Fin_v_value);
        }
      }
      if(d.DeclYear == 2019) {
        thisMp.interests2019.push(thisInterest);
        if(thisInterest.Interest_Type == "Position / Private") {
          thisMp.OutsidePositionsNum2019 ++;
        }
        if(d.Income_value) {
          thisMp.Income_tot2019 += parseFloat(d.Income_value);
        }
        if(d.Fin_v_value) {
          thisMp.Holdings_tot2019 += parseFloat(d.Fin_v_value);
        }
      }
  });
  console.log(declarations);
  //Set totals for custom counters
  $('.count-box-interests .total-count2').html(totInterests);

  //Set dc main vars. The second crossfilter is used to handle the travels stacked bar chart.
  var ndxDec = crossfilter(declarations);
  var ndx = crossfilter(mps);
  var searchDimension = ndx.dimension(function (d) {
      var entryString = d.Surname_name;
      return entryString.toLowerCase();
  });

  //CHART 1
  var createOutsidePositionsChart = function() {
    var chart = charts.outsidePositions.chart;
    var dimension = ndx.dimension(function (d) {
      var interestsNum = d.OutsidePositionsNum;
      if(vuedata.selectedYear == 2018) { interestsNum = d.OutsidePositionsNum2018; };
      if(vuedata.selectedYear == 2019) { interestsNum = d.OutsidePositionsNum2019; };
      if(interestsNum >= 10) { return "10+"};
      return interestsNum.toString();
    });
    var group = dimension.group().reduceSum(function (d) {
        return 1;
    });
    var width = recalcWidth(charts.outsidePositions.divId);
    chart
      .width(width)
      .height(380)
      .group(group)
      .dimension(dimension)
      .on("preRender",(function(chart,filter){
      }))
      .margins({top: 0, right: 10, bottom: 20, left: 20})
      //.x(d3.scaleBand().domain(["2017", "2018", "2019"]))
      //.x(d3.scaleLinear())
      .x(d3.scaleBand().domain(["0","1","2","3","4","5","6","7","8","9","10+"]))
      .xUnits(dc.units.ordinal)
      .gap(10)
      .elasticY(true);
      //.ordinalColors(vuedata.colors.default1)
    chart.render();
    chart.on('filtered', function(c) { 
      RefreshTable();
    });
  }

  //CHART 2
  var createTopSectorsIncomeChart = function() {
    function reduceAdd(p, v) {
      var interestsArray = v.interests;
      if(vuedata.selectedYear == 2018) { interestsArray = v.interests2018; }
      if(vuedata.selectedYear == 2019) { interestsArray = v.interests2019; }
      //if (v.interests[0] === "") return p;    // skip empty values
      interestsArray.forEach (function(val, idx) {
        var k = val['NACE_1'];
        var amt = parseFloat(val.Income_value);
        if(!amt || isNaN(amt)) { amt = 0 };
        //console.log(val);
         p[k] = (p[k] || 0) + amt; //increment counts
      });
      return p;
    }
    function reduceRemove(p, v) {
      var interestsArray = v.interests;
      if(vuedata.selectedYear == 2018) { interestsArray = v.interests2018; }
      if(vuedata.selectedYear == 2019) { interestsArray = v.interests2019; }
      //if (v.interests[0] === "") return p;    // skip empty values
      interestsArray.forEach (function(val, idx) {
        var k = val['NACE_1'];
        var amt = parseFloat(val.Income_value);
        if(!amt || isNaN(amt)) { amt = 0 };
        //console.log(val);
         p[k] = (p[k] || 0) - amt; //decrement counts
      });
      return p;
       
    }
    function reduceInitial() {
      return {};  
    }
    var chart = charts.topSectorsIncome.chart;
    var dimension = ndx.dimension(function(d){ 
      if(vuedata.selectedYear == 2018) { return d.interests2018; };
      if(vuedata.selectedYear == 2019) { return d.interests2019; };
      return d.interests;
    });
    var group = dimension.groupAll().reduce(reduceAdd, reduceRemove, reduceInitial).value();
    group.all = function() {
      var newObject = [];
      for (var key in this) {
        if (this.hasOwnProperty(key) && key != "all") {
          newObject.push({
            key: key,
            value: this[key]
          });
        }
      }
      return newObject;
    };
    var width = recalcWidth(charts.topSectorsIncome.divId);
    var charsLength = recalcCharsLength(width);
    chart
      .width(width)
      .height(380)
      .margins({top: 0, left: 0, right: 10, bottom: 20})
      .rowsCap(10)
      .group(group)
      .dimension(dimension)
      .valueAccessor(function(d) { return d.value; })
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
      chart.filterHandler (function (dimension, filters) {
          dimension.filter(null);   
          if (filters.length === 0)
              dimension.filter(null);
          else
              dimension.filterFunction(function (d) {
                  for (var i=0; i < d.length; i++) {
                      if (filters.indexOf(d[i]['NACE_1']) >= 0) return true;
                  }
                  return false;
              });
        RefreshTable();
        return filters; 
      });
  }

  //CHART 3
  var createTopSectorsHoldingChart = function() {
    //return d.Fin_v_value;
    function reduceAdd(p, v) {
      var interestsArray = v.interests;
      if(vuedata.selectedYear == 2018) { interestsArray = v.interests2018; }
      if(vuedata.selectedYear == 2019) { interestsArray = v.interests2019; }
      //if (v.interests[0] === "") return p;    // skip empty values
      interestsArray.forEach (function(val, idx) {
        var k = val['NACE_1'];
        var amt = parseFloat(val.Fin_v_value);
        if(!amt || isNaN(amt)) { amt = 0 };
        //console.log(val);
         p[k] = (p[k] || 0) + amt; //increment counts
      });
      return p;
    }
    function reduceRemove(p, v) {
      var interestsArray = v.interests;
      if(vuedata.selectedYear == 2018) { interestsArray = v.interests2018; }
      if(vuedata.selectedYear == 2019) { interestsArray = v.interests2019; }
      //if (v.interests[0] === "") return p;    // skip empty values
      interestsArray.forEach (function(val, idx) {
        var k = val['NACE_1'];
        var amt = parseFloat(val.Fin_v_value);
        if(!amt || isNaN(amt)) { amt = 0 };
        //console.log(val);
         p[k] = (p[k] || 0) - amt; //decrement counts
      });
      return p;
       
    }
    function reduceInitial() {
      return {};  
    }
    var chart = charts.topSectorsHolding.chart;
    var dimension = ndx.dimension(function(d){ 
      if(vuedata.selectedYear == 2018) { return d.interests2018; };
      if(vuedata.selectedYear == 2019) { return d.interests2019; };
      return d.interests;
    });
    var group = dimension.groupAll().reduce(reduceAdd, reduceRemove, reduceInitial).value();
    group.all = function() {
      var newObject = [];
      for (var key in this) {
        if (this.hasOwnProperty(key) && key != "all") {
          newObject.push({
            key: key,
            value: this[key]
          });
        }
      }
      return newObject;
    };
    var width = recalcWidth(charts.topSectorsHolding.divId);
    var charsLength = recalcCharsLength(width);
    chart
      .width(width)
      .height(380)
      .margins({top: 0, left: 0, right: 10, bottom: 20})
      .group(group)
      .dimension(dimension)
      .valueAccessor(function(d) { return d.value; })
      .rowsCap(10)
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
      chart.filterHandler (function (dimension, filters) {
        dimension.filter(null);   
        if (filters.length === 0)
            dimension.filter(null);
        else
            dimension.filterFunction(function (d) {
                for (var i=0; i < d.length; i++) {
                    if (filters.indexOf(d[i]['NACE_1']) >= 0) return true;
                }
                return false;
            });
        RefreshTable();
        return filters; 
      });
  }

  //CHART 4
  var createIncomeValueChart = function() {
    var chart = charts.incomeValues.chart;
    function calcIncomeGroup(v) {
      if(v == 0) { return "0"};
      if(v <= 500) { return "1-500"};
      if(v <= 5000) { return "501-5000"};
      if(v <= 10000) { return "5001-10000"};
      if(v <= 20000) { return "10001-20000"};
      if(v <= 30000) { return "20001-30000"};
      if(v <= 40000) { return "30001-40000"};
      if(v <= 50000) { return "40001-50000"};
      return "50001+";
    }
    var dimension = ndx.dimension(function (d) {
      if(vuedata.selectedYear == 2018) { return calcIncomeGroup(d.Income_tot2018); };
      if(vuedata.selectedYear == 2019) { return calcIncomeGroup(d.Income_tot2019); };
      return calcIncomeGroup(d.Income_tot);
    });
    var group = dimension.group().reduceSum(function (d) {
        return 1;
    });
    var width = recalcWidth(charts.incomeValues.divId);
    chart
      .width(width)
      .height(390)
      .group(group)
      .dimension(dimension)
      .on("preRender",(function(chart,filter){
      }))
      .margins({top: 0, right: 10, bottom: 20, left: 20})
      //.x(d3.scaleBand().domain(["2017", "2018", "2019"]))
      //.x(d3.scaleLinear())
      .x(d3.scaleBand().domain(["0","1-500","501-5000","5001-10000","10001-20000","20001-30000","30001-40000","40001-50000","50001+"]))
      .xUnits(dc.units.ordinal)
      .gap(10)
      .elasticY(true);
      //.ordinalColors(vuedata.colors.default1)
    chart.render();
    chart.on('filtered', function(c) { 
      RefreshTable();
    });
  }

  //CHART 5
  var createHoldingValueChart = function() {
    var chart = charts.holdingValues.chart;
    function calcIncomeGroup(v) {
      if(v == 0) { return "0"};
      if(v <= 500) { return "1-500"};
      if(v <= 5000) { return "501-5000"};
      if(v <= 10000) { return "5001-10000"};
      if(v <= 20000) { return "10001-20000"};
      if(v <= 30000) { return "20001-30000"};
      if(v <= 40000) { return "30001-40000"};
      if(v <= 50000) { return "40001-50000"};
      return "50001+";
    }
    var dimension = ndx.dimension(function (d) {
      console.log("holding vals " + vuedata.selectedYear);
      if(vuedata.selectedYear == 2018) { return calcIncomeGroup(d.Holdings_tot2018); };
      if(vuedata.selectedYear == 2019) { return calcIncomeGroup(d.Holdings_tot2019); };
      return calcIncomeGroup(d.Holdings_tot);
    });
    var group = dimension.group().reduceSum(function (d) {
        return 1;
    });
    var width = recalcWidth(charts.holdingValues.divId);
    chart
      .width(width)
      .height(390)
      .group(group)
      .dimension(dimension)
      .on("preRender",(function(chart,filter){
      }))
      .margins({top: 0, right: 10, bottom: 20, left: 20})
      //.x(d3.scaleBand().domain(["2017", "2018", "2019"]))
      //.x(d3.scaleLinear())
      .x(d3.scaleBand().domain(["0","1-500","501-5000","5001-10000","10001-20000","20001-30000","30001-40000","40001-50000","50001+"]))
      .xUnits(dc.units.ordinal)
      .gap(10)
      .elasticY(true);
      //.ordinalColors(vuedata.colors.default1)
    chart.render();
    chart.on('filtered', function(c) { 
      RefreshTable();
    });
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
            return d.OutsidePositionsNum;
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 4,
          "defaultContent":"N/A",
          "data": function(d) {
            return "€ " + d.Income_tot.toFixed(2);
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 5,
          "defaultContent":"N/A",
          "data": function(d) {
            return "€ " + d.Holdings_tot.toFixed(2);
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

  //YEARS FILTERS
  $('.year-btn').click(function(){
    $('.year-btn').removeClass('active');
    $(this).addClass('active');
    console.log('clicked');
    if($(this).hasClass('y2018')) {
      vuedata.selectedYear = 2018;
    }
    if($(this).hasClass('y2019')) {
      vuedata.selectedYear = 2019;
    }
    if($(this).hasClass('yall')) {
      vuedata.selectedYear = all;
    }
    console.log(vuedata.selectedYear);
    createOutsidePositionsChart();
    createTopSectorsIncomeChart();
    createTopSectorsHoldingChart();
    createIncomeValueChart();
    createHoldingValueChart();
    //dc.redrawAll();
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
    $('.year-btn.yall').click();
  })
  
  //Render charts
  createTable();
  createOutsidePositionsChart();
  createTopSectorsIncomeChart();
  createTopSectorsHoldingChart();
  createIncomeValueChart();
  createHoldingValueChart();

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
      if (!d.Surname_name) {
        return "";
      } else {
        return d.Surname_name;
      }
    });
    var group = dim.group().reduce(
      function(p,d) {  
        p.nb +=1;
        if (!d.Surname_name) {
          return p;
        }
        p.interests += d.interests.length;
        return p;
      },
      function(p,d) {  
        p.nb -=1;
        if (!d.Surname_name) {
          return p;
        }
        p.interests -= d.interests.length;
        return p;
      },
      function(p,d) {  
        return {nb: 0, interests: 0}; 
      }
    );
    group.order(function(p){ return p.nb });
    var interests = 0;
    var counter = dc.dataCount(".count-box-interests")
    .dimension(group)
    .group({value: function() {
      interests = 0;
      return group.all().filter(function(kv) {
        if (kv.value.nb >0) {
          interests += +kv.value.interests;
        }
        return kv.value.nb > 0; 
      }).length;
    }})
    .renderlet(function (chart) {
      $(".nbinterests").text(interests);
    });
    counter.render();
  }
  drawCustomCounters();
  


  //Window resize function
  window.onresize = function(event) {
    resizeGraphs();
  };
})
