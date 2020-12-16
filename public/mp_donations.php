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
    <meta property="og:title" content="Deputati Uz Delnas - Politisko partiju finansēšana - Saeimas deputātu ziedojumi un biedru naudas maksājumi" />
    <meta property="og:description" content="Šī ir lietotājam draudzīga datu bāze, kas piedāva gūt ieskatu Saeimas deputātu privātajos ziedojumos un biedru naudās, kas veikti politiskajām partijām. Uzejot uz infografika vai saraksta zemāk lietotājs var sarindot, atlasīt un filtret ziedojumus." />
    <meta property="og:image" content="http://deputatiuzdelnas.lv/images/thumbnail.png" />
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet">
    <link rel="stylesheet" href="static/tab_a3.css">
</head>
<body>
    <div id="app" class="tabA">   
      <?php include 'header.php' ?>
      <div class="container-fluid dashboard-container-outer">
        <div class="row dashboard-container">
          <!-- ROW FOR INFO AND SHARE -->
          <div class="col-md-12">
            <div class="row">
              <!-- INFO -->
              <div class="col-lg-8 chart-col">
                <!-- SUBSECION MENU -->
                <div class="section-btn-container">
                  <a href="./" class="section-btn">Privātie ziedojumi</a>
                  <a href="./party_member_fees.php" class="section-btn">Biedru nauda</a>
                  <a href="./mp_donations.php" class="section-btn active">Saeimas deputātu ziedojumi</a>
                  <a href="./party_expenditures.php" class="section-btn">Partiju izdevumi</a>
                </div>
                <div class="boxed-container description-container">
                  <h1>Deputati Uz Delnas - Politisko partiju finansēšana - Saeimas deputātu ziedojumi un biedru naudas maksājumi</h1>
                  <p>Šī ir lietotājam draudzīga datu bāze, kas piedāva gūt ieskatu Saeimas deputātu privātajos ziedojumos un biedru naudās, kas veikti politiskajām partijām. Uzejot uz infografika vai saraksta zemāk lietotājs var sarindot, atlasīt un filtret ziedojumus.</p>
                </div>
              </div>
              <div class="col-lg-4 chart-col">
                <div class="data-source-box">
                  <div class="data-source-title">Datu avots:</div>
                  <a href="https://www.knab.gov.lv/lv/db/donations/" target="_blank">https://www.knab.gov.lv/lv/db/donations/</a><br />
                  <a href="https://www.knab.gov.lv/lv/db/subscriptions/" target="_blank">https://www.knab.gov.lv/lv/db/subscriptions/</a>
                </div>
                <div class="boxed-container chart-container">
                  <chart-header :title="charts.yearsFilter.title" :info="charts.yearsFilter.info" ></chart-header>
                  <div class="years-btn-container">
                    <button class="year-btn" id="y2018" :disabled="dataYears.indexOf('2018') == -1">2018</button>
                    <button class="year-btn" id="y2019" :disabled="dataYears.indexOf('2019') == -1">2019</button>
                    <button class="year-btn" id="y2020" :disabled="dataYears.indexOf('2020') == -1">2020</button>
                    <button class="year-btn active" id="yall">Visi gadi</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS FIRST ROW -->
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_a_3">
              <chart-header :title="charts.groups.title" :info="charts.groups.info" ></chart-header>
              <div class="chart-inner" id="groups_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_a_2">
              <chart-header :title="charts.donationsType.title" :info="charts.donationsType.info" ></chart-header>
              <div class="chart-inner" id="donationstype_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_a_1">
              <chart-header :title="charts.topRecipients.title" :info="charts.topRecipients.info" ></chart-header>
              <div class="chart-inner" id="toprecipients_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_a_2">
              <chart-header :title="charts.donationsPerYear.title" :info="charts.donationsPerYear.info" ></chart-header>
              <div class="chart-inner" id="donationsperyear_chart"></div>
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
                      <th class="header">Veids</th>
                      <th class="header">Vērtība</th>
                      <th class="header">Saņēmējs</th>
                      <th class="header">Datums</th>
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
                <div>{{ selectedElement['Dāvinātājs'] }} - {{ selectedElement['Vērtība'] }}</div>
              </div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    /
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
              <div class="filter-count nbdonors">0</div>no <strong class="total-count">0</strong> ziedojumiem
            </div>
            <div class="count-box count-box-vertiba">
              <div class="filter-count nbvertiba">0</div>no <strong class="total-count-vertiba">0</strong>
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
    <script src="static/tab_a3.js"></script>

 
</body>
</html>