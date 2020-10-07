<html lang="en">
<head>
    <?php include 'gtag.php' ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>IW LV</title>
    <!-- Add twitter and og meta here -->
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet">
    <link rel="stylesheet" href="static/tab_b.css">
</head>
<body>
    <div id="app" class="tabB">   
      <?php include 'header.php' ?>
      <div class="container-fluid dashboard-container-outer">
        <div class="row dashboard-container">
          <!-- ROW FOR INFO AND SHARE -->
          <div class="col-md-12">
            <div class="row">
              <!-- INFO -->
              <div class="col-md-8 chart-col" v-if="showInfo">
                <div class="boxed-container description-container">
                  <h1>Lorem Ipsum</h1>
                  <p>This is a user-friendly database that provides a unique overview of private interests of Latvian MPs.<br />
                    By simply clicking on the graphs or the list below users can rank, sort and filter private interests. <a href="./about.php">Read more</a>.</p>
                  <i class="material-icons close-btn" @click="showInfo = false">close</i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container">
              <chart-header :title="charts.yearsFilter.title" :info="charts.yearsFilter.info" ></chart-header>
              <div class="years-btn-container">
                <button class="year-btn y2018">2018</button>
                <button class="year-btn y2019">2019</button>
                <button class="year-btn yall active">All years</button>
              </div>
            </div>
          </div>
          <div class="col-md-8"></div>
          <!-- CHARTS FIRST ROW -->
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container tab_b_1">
              <chart-header :title="charts.outsidePositions.title" :info="charts.outsidePositions.info" ></chart-header>
              <div class="chart-inner" id="outsidepositions_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container tab_b_2">
              <chart-header :title="charts.topSectorsIncome.title" :info="charts.topSectorsIncome.info" ></chart-header>
              <div class="chart-inner" id="topsectorsincome_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container tab_b_3">
              <chart-header :title="charts.topSectorsHolding.title" :info="charts.topSectorsHolding.info" ></chart-header>
              <div class="chart-inner" id="topsectorsholding_chart"></div>
            </div>
          </div>
          <div class="col-md-6 chart-col">
            <div class="boxed-container chart-container tab_b_4">
              <chart-header :title="charts.incomeValues.title" :info="charts.incomeValues.info" ></chart-header>
              <div class="chart-inner" id="incomevalues_chart"></div>
            </div>
          </div>
          <div class="col-md-6 chart-col">
            <div class="boxed-container chart-container tab_b_5">
              <chart-header :title="charts.holdingValues.title" :info="charts.holdingValues.info" ></chart-header>
              <div class="chart-inner" id="holdingvalues_chart"></div>
            </div>
          </div>
          <!-- TABLE -->
          <div class="col-12 chart-col">
            <div class="boxed-container chart-container chart-container-table">
              <chart-header :title="charts.mainTable.title" :info="charts.mainTable.info" ></chart-header>
              <div class="chart-inner chart-table">
                <table class="table table-hover dc-data-table" id="dc-data-table">
                  <thead>
                    <tr class="header">
                      <th class="header">Nr</th> 
                      <th class="header">Surname, Name</th>
                      <th class="header">Parliamentary Group</th>
                      <th class="header">N. Outside positions</th>
                      <th class="header">Holding value</th>
                      <th class="header">Income Value</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- DETAILS MODAL -->
      <div class="modal" id="detailsModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <div class="modal-title">
                <div>{{ selectedElement.Surname_name }}</div>
              </div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    <div class="details-line" v-if="selectedElement.Frakcija"><span class="details-line-title">Frakcija: </span> {{ selectedElement.Frakcija }}</div>
                    <div class="details-line"><span class="details-line-title">Outside positions: </span> {{ selectedElement.OutsidePositionsNum }}</div>
                    <div class="details-line"><span class="details-line-title">Interests:</span></div>
                    <table class="interests-table">
                      <thead>
                        <tr>
                          <th>Year</th>
                          <th>Type</th>
                          <th>Entity</th>
                          <th>Income Type / Fin_v</th>
                          <th>Income Value / Fin_v_val</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="i in selectedElement.interests">
                          <td>{{ i.DeclYear }}</td>
                          <td>{{ i.Interest_Type }}</td>
                          <td>{{ i.Entity_name }}</td>
                          <td v-if="i.Income_type !== ''">{{ i.Income_type }}</td>
                          <td v-else>{{ i.Fin_v }}</td>
                          <td v-if="i.Income_type !== ''">{{ i.Income_value }}</td>
                          <td v-else>{{ i.Fin_v_value }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Bottom bar -->
      <div class="container-fluid footer-bar">
        <div class="row">
          <div class="footer-col col-12 col-sm-12 footer-counts">
            <div class="dc-data-count count-box">
              <div class="filter-count">0</div>of <strong class="total-count">0</strong> Mps
            </div>
            <div class="count-box count-box-interests">
              <div class="filter-count nbinterests">0</div>of <strong class="total-count2">0</strong> interests
            </div>
            <div class="footer-input">
              <input type="text" id="search-input" placeholder="Meklēt">
              <i class="material-icons">search</i>
            </div>
          </div>
        </div>
        <!-- Reset filters -->
        <button class="reset-btn"><i class="material-icons">settings_backup_restore</i><span class="reset-btn-text">Reset</span></button>
        <div class="footer-buttons-right">
          <button @click="downloadDataset"><i class="material-icons">cloud_download</i></button>
          <button class="btn-twitter" @click="share('twitter')"><img src="./images/twitter.png" /></button>
          <button class="btn-fb" @click="share('facebook')"><img src="./images/facebook.png" /></button>
        </div>
      </div>
      <!-- Loader -->
      <loader v-if="loader" :text="'Loading ...'" />
    </div>

    <script type="text/javascript" src="vendor/js/d3.v5.min.js"></script>
    <script type="text/javascript" src="vendor/js/d3.layout.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/crossfilter.min.js"></script>
    <script type="text/javascript" src="vendor/js/dc.js"></script>
    <script type="text/javascript" src="vendor/js/dc.cloud.js"></script>
    <script src="static/tab_b.js"></script>

 
</body>
</html>