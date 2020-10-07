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
    <link rel="stylesheet" href="static/tab_a.css">
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
              <div class="col-md-8 chart-col" v-if="showInfo">
                <div class="boxed-container description-container">
                  <h1>Lorem Ipsum</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu rutrum libero. Duis id maximus sem. Morbi ullamcorper ipsum sed turpis iaculis, non aliquam libero lacinia. Etiam sagittis volutpat lectus vitae molestie. Proin lacinia dui quis feugiat sagittis. Quisque maximus odio at dapibus interdum. Integer eu nisl ex. Nullam lobortis condimentum sapien. Phasellus scelerisque magna elit, in feugiat mi maximus ut. <a href="./about.php">Read more</a>.</p>
                  <i class="material-icons close-btn" @click="showInfo = false">close</i>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS FIRST ROW -->
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_a_1">
              <chart-header :title="charts.topRecipients.title" :info="charts.topRecipients.info" ></chart-header>
              <div class="chart-inner" id="toprecipients_chart"></div>
            </div>
          </div>
          <div class="col-md-6 chart-col">
            <div class="boxed-container chart-container tab_a_2">
              <chart-header :title="charts.donationsPerYear.title" :info="charts.donationsPerYear.info" ></chart-header>
              <div class="chart-inner" id="donationsperyear_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_a_3">
              <chart-header :title="charts.topDonors.title" :info="charts.topDonors.info" ></chart-header>
              <div class="chart-inner" id="topdonors_chart"></div>
            </div>
          </div>
          <div class="col-md-8 chart-col">
            <div class="boxed-container chart-container tab_a_4">
              <chart-header :title="charts.bubble.title" :info="charts.bubble.info" ></chart-header>
              <div class="chart-inner" id="bubble_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container tab_a_5">
              <chart-header :title="charts.amtCategory.title" :info="charts.amtCategory.info" ></chart-header>
              <div class="chart-inner" id="amtcategory_chart"></div>
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
                      <th class="header">Partija</th>
                      <th class="header">Veids</th>
                      <th class="header">Vērtība</th>
                      <th class="header">Nekustamais īpašums</th>
                      <th class="header">Datum</th>
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
                    Lorem Ipsum
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
            <div class="dc-data-count count-box count-box-donors">
              <div class="filter-count nbdonors">0</div>no <strong class="total-count">0</strong> donori
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
    <script src="static/tab_a.js"></script>

 
</body>
</html>