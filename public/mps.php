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
    <link rel="stylesheet" href="static/tab_b2.css">
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
                  <h1>Deputāti uz Delnas - MPs</h1>
                  <p>Lorem ipsum</p>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS FIRST ROW -->
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container tab_b_1">
              <chart-header :title="charts.groups.title" :info="charts.groups.info" ></chart-header>
              <div class="chart-inner" id="groups_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container tab_b_2">
              <chart-header :title="charts.age.title" :info="charts.age.info" ></chart-header>
              <div class="chart-inner" id="age_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container tab_b_3">
              <chart-header :title="charts.gender.title" :info="charts.gender.info" ></chart-header>
              <div class="chart-inner" id="gender_chart"></div>
            </div>
          </div>

          
          <!-- TABLE -->
          <div class="col-12 chart-col">
            <div class="boxed-container chart-container chart-container-table">
              <chart-header :title="charts.mainTable.title" :info="charts.mainTable.info" ></chart-header>
              <div class="chart-inner chart-table">
                  <!-- MP BOXES -->
                  <div class="mp-boxes-container container-fluid">
                    <div class="row">
                      <div v-for="mp in pageOfItems" class="mp-box col-lg-3 col-md-4 col-sm-6" @click="showMpPanel(mp)">
                        <div class="mp-box-inner">
                          <img :src="mp.photoUrl" />
                          <div class="mp-box-text">
                            <div class="mp-box-name">{{mp.fullname}}</div>
                            <div class="mp-box-group">{{mp.Frakcija}}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="boxes-pagination-container">
                      <pagination :items="filteredData" :page-size="20" @changepage="onChangePage"></pagination>
                    </div>
                  </div>
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
                <div>{{ selectedElement.fullname }}</div>
              </div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Sections buttons -->
            <div class="mp-profile-section-buttons container-fluid">
              <div class="row">
                <div class="mp-profile-section-button col-md-4" @click="profileSection = 1" :class="{ active: profileSection == 1 }">1 - Profils</div>
                <div class="mp-profile-section-button col-md-4" @click="profileSection = 2;initDonationsTable();" :class="{ active: profileSection == 2 }">2 - Ziedojumi politiskajām partijām un to apvienibām</div>
                <div class="mp-profile-section-button col-md-4" @click="profileSection = 3" :class="{ active: profileSection == 3 }">3 - Deputāta valsts amatpersona deklarācijas</div>
              </div>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    <!-- MP panel section 1 -->
                    <div v-show="profileSection == 1" class="mp-profile-section">
                      <div class="row">
                        <div class="col-md-2 mp-profile-section-inner">
                          <img :src="selectedElement.photoUrl" />
                        </div>
                        <div class="col-md-10 mp-profile-section-inner">
                          <div class="details-line"><span class="details-line-title">Vards: </span> {{ selectedElement["Deputāts/e"] }}</div>
                          <div class="details-line" v-if="selectedElement['Dzimums']"><span class="details-line-title">Dzimums: </span> {{ selectedElement["Dzimums"] }}</div>
                          <div class="details-line" v-if="selectedElement['Dzimšanas gads']"><span class="details-line-title">Dzimšanas gads: </span> {{ selectedElement["Dzimšanas gads"] }}</div>
                          <div class="details-line" v-if="selectedElement['Dzīvesvieta']"><span class="details-line-title">Dzīvesvieta: </span> {{ selectedElement["Dzīvesvieta"] }}</div>
                          <div class="details-line" v-if="selectedElement['Izglitība']"><span class="details-line-title">Izglitība: </span> {{ selectedElement["Izglitība"] }}</div>
                          <div class="details-line" v-if="selectedElement['Politiska partija']"><span class="details-line-title">Politiska partija: </span> {{ selectedElement["Politiska partija"] }}</div>
                          <div class="details-line" v-if="selectedElement['Frakcija']"><span class="details-line-title">Frakcija Saeimā: </span> {{ selectedElement["Frakcija"] }}</div>
                          <div class="details-line" v-if="selectedElement['Ievelēts/-a no saraksta']"><span class="details-line-title">Ievelēts /-a no saraksta: </span> {{ selectedElement["Ievelēts/-a no saraksta"] }}</div>
                          <div class="details-line" v-if="selectedElement['Mandāta statuss']"><span class="details-line-title">Mandāta statuss: </span> {{ selectedElement["Mandāta statuss"] }}</div>
                          <div class="details-line" v-if="selectedElement['Darbība 13.Saeimā']"><span class="details-line-title"><a :href="selectedElement['Darbība 13.Saeimā']" target="_blank">Darbība 13. Saeimā</a></span></div>
                          <div class="details-line" v-if="selectedElement['E-pasta adrese']"><span class="details-line-title">E-pasta adrese: </span> {{ selectedElement["E-pasta adrese"] }}</div>
                        </div>
                      </div>
                    </div>
                    <!-- MP panel section 2 -->
                    <div v-show="profileSection == 2" class="mp-profile-section">
                      <div class="row">
                        <div class="col-md-12 mp-profile-section-inner">
                          <div class="mp-profile-section-title">ZIEDOJUMI POLITISKAJĀM PARTIJĀM UN TO APVIENĪBĀM KOPŠ 2018. GADA</div>
                          <div class="mobile-scroll-x" v-if="selectedElement.donations">
                            <table class="interests-table" id="mp-donations-table">
                              <thead>
                                <tr>
                                  <th>Saņēmējs</th>
                                  <th>Ziedojuma veids</th>
                                  <th>Vērtība</th>
                                  <th>Datums</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="i in selectedElement.donations">
                                  <td>{{ i["Saņēmējs"] }}</td>
                                  <td>{{ i["Ziedojuma veids"] }}</td>
                                  <td>{{ i["Vērtība"] }}</td>
                                  <td>{{ i["Datums"] }}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div v-else>/</div>
                        </div>
                      </div>
                    </div>
                    <!-- MP panel section 3 -->
                    <div v-show="profileSection == 3" class="mp-profile-section">
                      <div class="row">
                        <div class="col-md-12 mp-profile-section-inner">
                          <div class="mp-profile-section-title">DEPUTĀTA VALSTS AMATPERSONAS DEKLARĀCIJAS KOPŠ 2018. GADA</div>
                          <div class="mp-profile-section-subtitle">Ārējās interesēs</div>
                          <div v-if="selectedElement.declarations">
                            <div v-for="year in selectedElement.declarations.years" class="mp-profile-year-container">
                              <div class="mp-profile-section-year-title">{{year}}</div>
                              <!-- Interests table 1 -->
                              <div class="details-line details-line-title-table"><span class="details-line-title">A) Amati privātā sektorā, pilsoniskās sabiedrības un akademikās iestādes</span></div>
                              <div class="mobile-scroll-x" v-if="interestType1(selectedElement.declarations[year]).length > 0">
                                <table class="interests-table">
                                  <thead>
                                    <tr>
                                      <th>Amats</th>
                                      <th>Juridiskas personas veids</th>
                                      <th>Juridiskas personas vards</th>
                                      <th>Ekonomikas nozare</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="i in interestType1(selectedElement.declarations[year])">
                                      <td>{{ i.Position }}</td>
                                      <td>{{ i.Entity_Type }}</td>
                                      <td>{{ i.Entity_name }}</td>
                                      <td>{{ i.NACE_1 }}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div style="text-align:left;" v-else>/</div>
                              <!-- Interests table 2 -->
                              <div class="details-line details-line-title-table"><span class="details-line-title">B) Akcijas un kapitāldaļas komercsabiedrībās</span></div>
                              <div class="mobile-scroll-x" v-if="interestType2(selectedElement.declarations[year]).length > 0">
                                <table class="interests-table">
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
                                    <tr v-for="i in interestType2(selectedElement.declarations[year])">
                                      <td>{{ i.Fin_v }}</td>
                                      <td>{{ i.Fin_v_value }}</td>
                                      <td>{{ i.Entity_Type }}</td>
                                      <td>{{ i.Entity_name}}</td>
                                      <td>{{ i.NACE_1 }}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div style="text-align:left;" v-else>/</div>
                              <!-- Interests table 3 -->
                              <div class="details-line details-line-title-table"><span class="details-line-title">C) Ārējie ienākumi</span></div>
                              <div class="mobile-scroll-x" v-if="interestType3(selectedElement.declarations[year]).length > 0">
                                <table class="interests-table">
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
                                    <tr v-for="i in interestType3(selectedElement.declarations[year])">
                                      <td>{{ i.Income_type }}</td>
                                      <td>{{ i.Income_value }}</td>
                                      <td>{{ i.Entity_Type }}</td>
                                      <td>{{ i.Entity_name }}</td>
                                      <td>{{ i.NACE_1 }}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div style="text-align:left;" v-else>/</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
    <script src="static/tab_b2.js"></script>

 
</body>
</html>