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
              <div class="col-lg-8 chart-col">
                <div class="boxed-container description-container">
                  <h1>Deputāti uz Delnas - Deputātu deklarācijas</h1>
                  <p>Šī ir lietotājam draudzīga datu bāze, kas sniedz ieskatu Saeimas deputātu deklarētajās ārējās interesēs. Uzejot uz infografika vai saraksta zemāk, lietotajs var sarindot, atlasīt un filtrēt deklarētās vērtības.</p>
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
                    <a class="year-btn" href="./declarations.php?year=2018" id="y2018">2018</a>
                    <a class="year-btn" href="./declarations.php?year=2019" id="y2019">2019</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS FIRST ROW -->
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_b_1">
              <chart-header :title="charts.groups.title" :info="charts.groups.info" ></chart-header>
              <div class="chart-inner" id="groups_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_b_2">
              <chart-header :title="charts.topSectorsIncome.title" :info="charts.topSectorsIncome.info" ></chart-header>
              <div class="chart-inner" id="topsectorsincome_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_b_3">
              <chart-header :title="charts.incomeType.title" :info="charts.incomeType.info" ></chart-header>
              <div class="chart-inner" id="incometype_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_b_4">
              <chart-header :title="charts.topSectorsHolding.title" :info="charts.topSectorsHolding.info" ></chart-header>
              <div class="chart-inner" id="topsectorsholding_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container tab_b_5">
              <chart-header :title="charts.outsidePositions.title" :info="charts.outsidePositions.info" ></chart-header>
              <div class="chart-inner" id="outsidepositions_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container tab_b_6">
              <chart-header :title="charts.incomeValues.title" :info="charts.incomeValues.info" ></chart-header>
              <div class="chart-inner" id="incomevalues_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container tab_b_7">
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
                      <th class="header">Deputāts</th>
                      <th class="header">Frakcija</th>
                      <th class="header">Ārējo amatu skaits</th>
                      <th class="header">Akciju un Kapitāldaļu kopējā Vērtība</th>
                      <th class="header">Ārējo ienākumu kopējā Vērtība</th>
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
                  <div class="col-md-8">
                    <div class="details-line"><span class="details-line-title">Deputāta mandāta statusa: </span> {{ selectedElement.Mandate_status }}</div>
                    <div class="details-line" v-if="selectedElement.Frakcija"><span class="details-line-title">Frakcija: </span> {{ selectedElement.Frakcija }}</div>
                    <div class="details-line" v-if="selectedElement.DeclYear"><span class="details-line-title">Deklarācijas gads: </span> {{ selectedElement.DeclYear }}</div>
                    <div class="details-line" v-if="selectedElement.filed_as"><span class="details-line-title">Deklarācija izsniegta kā: </span> {{ selectedElement.filed_as }}</div>
                    <div class="details-line" v-if="selectedElement.Committees"><span class="details-line-title">Saeimas komisijas deklarācijas gadā </span> {{ selectedElement.Committees }}</div>
                    <div class="details-line details-line-title-table"><span class="details-line-title">A) Amati privātajā sektorā, pilsoniskās sabiedribas un akadēmiskajās iestādēs</span></div>
                  </div>
                  <div class="col-md-4">
                    <img :src="selectedElement.photoUrl" />
                  </div>
                  <div class="col-md-12">
                    <table class="interests-table" v-if="interestType1(selectedElement).length > 0">
                      <thead>
                        <tr>
                          <th>Amats</th>
                          <th>Juridiskas personas veids</th>
                          <th>Juridiskas personas vards</th>
                          <th>Ekonomikas nozare</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="i in interestType1(selectedElement)">
                          <td>{{ i.Position }}</td>
                          <td>{{ i.Entity_Type }}</td>
                          <td>{{ i.Entity_name }}</td>
                          <td>{{ i.NACE_1 }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div style="text-align:left;" v-else>/</div>
                    <div class="details-line details-line-title-table"><span class="details-line-title">B) Akcijas un kapitāldaļas komercsabiedrībās</span></div>
                    <table class="interests-table" v-if="interestType2(selectedElement).length > 0">
                      <thead>
                        <tr>
                          <th>Kapitāla veids</th>
                          <th>Vertība</th>
                          <th>Juridiskas personas veids</th>
                          <th>Juridiskas personas vards</th>
                          <th>Ekonomikas nozare</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="i in interestType2(selectedElement)">
                          <td>{{ i.Fin_v }}</td>
                          <td>{{ i.Fin_v_value }}</td>
                          <td>{{ i.Entity_Type }}</td>
                          <td>{{ i.Entity_name}}</td>
                          <td>{{ i.NACE_1 }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div style="text-align:left;" v-else>/</div>
                    <div class="details-line details-line-title-table"><span class="details-line-title">C) Ārējie ienākumi</span></div>
                    <table class="interests-table" v-if="interestType3(selectedElement).length > 0">
                      <thead>
                        <tr>
                          <th>Ienākuma veids</th>
                          <th>Vertība</th>
                          <th>Juridiskas personas veids</th>
                          <th>Juridiskas personas vards</th>
                          <th>Ekonomikas nozare</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="i in interestType3(selectedElement)">
                          <td>{{ i.Income_type }}</td>
                          <td>{{ i.Income_value }}</td>
                          <td>{{ i.Entity_Type }}</td>
                          <td>{{ i.Entity_name }}</td>
                          <td>{{ i.NACE_1 }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div style="text-align:left;" v-else>/</div>
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
              <div class="filter-count">0</div>no <strong class="total-count">0</strong> deputātiem
            </div>
            <div class="count-box count-box-interests">
              <div class="filter-count nbinterests">0</div>no <strong class="total-count2">0</strong> interesēm
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
    <script src="static/tab_b.js"></script>

 
</body>
</html>