<html lang="en">
<head>
    <?php include 'gtag.php' ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>IW LV</title>
    <!-- Add twitter and og meta here -->
    <meta property="og:url" content="http://deputatiuzdelnas.lv/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Deputāti uz Delnas - Deputātu deklarācijas" />
    <meta property="og:description" content="Šī ir lietotājam draudzīga datu bāze, kas sniedz ieskatu Saeimas deputātu deklarētajās ārējās interesēs. Uzejot uz infografika vai saraksta zemāk, lietotajs var sarindot, atlasīt un filtrēt deklarētās vērtības." />
    <meta property="og:image" content="http://deputatiuzdelnas.lv/images/thumbnail.png" />
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet">
    <link rel="stylesheet" href="static/tab_b_map.css">
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
              <div class="col-lg-8 chart-col">
                <div class="boxed-container description-container">
                  <h1>Deputāti uz Delnas - Interests map</h1>
                  <p>Lorem ipsum sit dolor amet.</p>
                  <p class="data-source-text">
                    <strong>Datu avots: </strong>
                    <a href="https://www6.vid.gov.lv/VAD" target="_blank">https://www6.vid.gov.lv/VAD</a>, 
                    <a href="http://www.saeima.lv/" target="_blank">http://www.saeima.lv/</a>, 
                    <a href="http://www.lursoft.lv/" target="_blank">http://www.lursoft.lv/</a><br />
                    <strong>Attēlu avots: </strong>
                    <a href="http://www.saeima.lv/" target="_blank">http://www.saeima.lv/</a>
                  </p>
                </div>
              </div>
              <div class="col-lg-4 chart-col">
                <div class="boxed-container chart-container">
                  <chart-header :title="charts.yearsFilter.title" :info="charts.yearsFilter.info" ></chart-header>
                  <div class="years-btn-container">
                    <a class="year-btn" href="./map.php?year=2018" id="y2018">2018</a>
                    <a class="year-btn" href="./map.php?year=2019" id="y2019">2019</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS FIRST ROW -->
          <div class="col-md-12 chart-col">
            <div class="count-type-btn-container">
              <button class="count-type-btn active" id="amtDefault">Number of entries</button>
              <button class="count-type-btn" id="amtIncome">Interests amount</button>
              <button class="count-type-btn" id="amtHoldings">Holdings amount</button>
              <button class="count-type-btn" id="amtIncomeHoldings">Interests & holdings</button>
            </div>
          </div>
          <div class="col-md-9 chart-col">
            <div class="boxed-container chart-container tab_b_map" id="map_chart_container">
              <chart-header :title="charts.map.title" :info="charts.map.info" :chartid="charts.map.id" ></chart-header>
              <div class="chart-inner" id="map_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_b_map_2">
              <chart-header :title="charts.topSectors.title" :info="charts.topSectors.info" ></chart-header>
              <div class="chart-inner" id="topsectors_chart"></div>
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
                      <th class="header">Deputāts</th>
                      <th class="header">Frakcija</th>
                      <th class="header">Interest Type</th>
                      <th class="header">Sector</th>
                      <th class="header">Municipality</th>
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
                <div>{{ selectedElement.Surname_name }} - {{ selectedElement.Interest_Type }}</div>
              </div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    <div class="details-line" v-if="selectedElement.Surname_name"><span class="details-line-title">Name: </span> {{ selectedElement.Surname_name }}</div>
                    <div class="details-line" v-if="selectedElement.Mandate_status"><span class="details-line-title">Mandate status: </span> {{ selectedElement.Mandate_status }}</div>
                    <div class="details-line" v-if="selectedElement.Frakcija"><span class="details-line-title">Frakcija: </span> {{ selectedElement.Frakcija }}</div>
                    <div class="details-line" v-if="selectedElement.DeclYear"><span class="details-line-title">Declaration year: </span> {{ selectedElement.DeclYear }}</div>
                    <div class="details-line" v-if="selectedElement.filed_as"><span class="details-line-title">Filed as: </span> {{ selectedElement.filed_as}}</div>
                    <div class="details-line" v-if="selectedElement.Committees"><span class="details-line-title">Committees: </span> {{ selectedElement.Committees }}</div>
                    <hr />
                    <div class="details-line" v-if="selectedElement.Interest_Type"><span class="details-line-title">Interest type: </span> {{ selectedElement.Interest_Type }}</div>
                    <div class="details-line" v-if="selectedElement.Position"><span class="details-line-title">Position: </span> {{ selectedElement.Position }}</div>
                    <div class="details-line" v-if="selectedElement.Income_type"><span class="details-line-title">Income type: </span> {{ selectedElement.Income_type }}</div>
                    <div class="details-line" v-if="selectedElement.Income_value"><span class="details-line-title">Income value: </span> {{ selectedElement.Income_value }}</div>
                    <div class="details-line" v-if="selectedElement.Holding_type"><span class="details-line-title">Holding type: </span> {{ selectedElement.Income_type }}</div>
                    <div class="details-line" v-if="selectedElement.Holding_value"><span class="details-line-title">Holding value: </span> {{ selectedElement.Holding_value }}</div>
                    <hr />
                    <div class="details-line" v-if="selectedElement.Entity_Type"><span class="details-line-title">Entity type: </span> {{ selectedElement.Entity_Type }}</div>
                    <div class="details-line" v-if="selectedElement.Entity_name"><span class="details-line-title">Entity name: </span> {{ selectedElement.Entity_name }}</div>
                    <div class="details-line" v-if="selectedElement.Entity_RegNum"><span class="details-line-title">Entity RegNum: </span> {{ selectedElement.Entity_RegNum }}</div>
                    <div class="details-line" v-if="selectedElement.Entity_Country"><span class="details-line-title">Entity country: </span> {{ selectedElement.Entity_Country }}</div>
                    <div class="details-line" v-if="selectedElement.Entity_Municipality"><span class="details-line-title">Entity municipality: </span> {{ selectedElement.Entity_Municipality }}</div>
                    <div class="details-line" v-if="selectedElement.Entity_Region"><span class="details-line-title">Entity region: </span> {{ selectedElement.Entity_Region }}</div>
                    <div class="details-line" v-if="selectedElement.Entity_Sector"><span class="details-line-title">Entity sector: </span> {{ selectedElement.Entity_Sector }}</div>
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
              <div class="filter-count">0</div>no <strong class="total-count">0</strong> interesēm
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
      <loader v-if="loader" :text="'Notiek ielāde ...'" />
    </div>

    <script type="text/javascript" src="vendor/js/d3.v5.min.js"></script>
    <script type="text/javascript" src="vendor/js/d3.layout.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/crossfilter.min.js"></script>
    <script type="text/javascript" src="vendor/js/dc.js"></script>
    <script type="text/javascript" src="vendor/js/dc.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/topojson.v1.min.js"></script>
    <script src="static/tab_b_map.js"></script>

 
</body>
</html>