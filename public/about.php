<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>About</title>
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet">
    <link rel="stylesheet" href="static/about.css">
</head>
<body>
    <?php include 'header.php' ?>

    <div id="app">    
      <div class="container">
        <div class="panel-group" id="accordion">
          <!-- BLOCK 1 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">1. Par “Deputāti uz Delnas” rīku</a>
              </h1>
            </div>
            <div id="collapse1" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>Deputāti uz Delnas ir interaktīvs digitāls rīks kas ļauj sabiedrībai, medijiem, nevalstiskajam sektoram, kā arī citiem interesentiem, apskatīt datus un informāciju par politisko partiju finansēšanu Latvijā un Saeimas deputātu interēšu un aktivu deklarācijām.</p>  
                <p>Deputāti uz Delnas ir lietotājam draudzīgs, tas vienkopus integrē datus no dažādām valdības interneta vietnēm un datu bāzēm un tādējādi palielina iespējas pilsoniskajai sabiedrībai iesaistīties ievēlēto Saeimas deputātu atklātības un atbildības uzraudzīšanā.</p>
                <p>Deputāti uz Delnas piedāvā datus par divām interešu jomām:</p>
                <ul>
                  <li><strong>Politisko partiju finansēšana</strong> - šajā sadaļā ir pieejami rīki, kas ļauj apskatīt privātpersonu un 13. Saeimā ievēlēto deputātu veiktos maksājumus (ziedojumus) politiskajām partijām, biedru naudas apjomu, kā arī politisko partiju deklarētos izdevumus laika periodā no 2018. līdz 2019.gadam.</li>
                  <li><strong>Saeimas deputātu deklarācijas</strong> – šajā sadaļā ir iespējams apskatīt pašreizējā Saeimā ievēlēto deputātu deklarētās amatus, kapitālas daļas, akcijas un ienākumus, kas ir gūti privātajā sektorā, nevalstiskajā sektorā, akadēmiskajās aprindās, valsts uzņēmumos, starptautiskajās institūciju, kā arī esot pašnodarbinātas personas statusā. Drīzumā Delna arī pievienos jaunus datus, kas ļaus aplūkot Saeimas deputātu deklarētos amatus un ienākumus, kas ir gūti publiskajā sektorā.</li>
                </ul>
                <p>Paralēli šim, Delna arī izstrādā “Saeimas deputātu datu bāzi”, kurā lietotāji varēs iegūt datus un informāciju par konkrētu deputātu. Delna plāno arī publicēt jaunus datus un izveidot jaunas sadaļas atbilstoši lietotāju atsauksmēm un datu pieejamībai.</p> 
                <p>Rīkā ietvertās vizualizācijas ir pilnībā interaktīvas. Noklikšķinot uz konkrētiem diagrammas elementiem vai datiem, pārējā informācija automātiski pielāgojas lietotāja izvēlei. Tehnoloģiskos risinājumus rīkam (D3.js) izstrādāja <i>New York Times</i> ar mērķi vienkāršot un sabiedrībai padarīt pieejamas sarežģītas datu kopas.</p>  
                <p>Šo projektu finansē Eiropas Savienības Iekšējās drošības fonds – Policija. Saturs atspoguļo tikai autoru viedokli un ir tikai viņu atbildība. Eiropas Komisija neuzņemas nekādu atbildību par publikācijā ietvertās informācijas izmantošanu.</p>
                <div class="about-eu-funding">
                  <img class="logo" src="./images/flag_yellow_low.jpg" />
                  <p style="font-family: Arial">Šo projektu līdzfinansēja un atbalstīja Kultūras ministrija</p>
                  <img class="about-logo2" src="./images/about-logo2.png" />
                </div>
                <p>Website design and development:<br />
                <a href="http://www.chiaragirardelli.net">Chiara Girardelli</a><br /></p>
              </div>
            </div>
          </div>
          <!-- BLOCK 2 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">2. Disclaimers / Atsauces</a>
              </h1>
            </div>
            <div id="collapse2" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>Deputāti uz Delnas izmanto datus, kas ir publiski pieejami atbilstoši <a href="https://likumi.lv/ta/id/36189-politisko-organizaciju-partiju-finansesanas-likums" target="_blank">Politisko organizāciju (partiju) finansēšanas likumam</a> un likumam “<a href="https://likumi.lv/ta/id/61913-par-interesu-konflikta-noversanu-valsts-amatpersonu-darbiba" target="_blank">Par interešu konflikta novēršanu valsts amatpersonu darbībā</a>”.</p>
                <p>Galvenās avoti, no kuriem rīks ņem informāciju, ir <a href="https://www.knab.gov.lv/lv/db/" target="_blank">Partiju finanšu datubāze</a>, kuru uztur Korupcijas novēršanas un apkarošanas birojs (KNAB), un <a href="https://www6.vid.gov.lv/VAD" target="_blank">Valsts amatpersonu deklarāciju datu bāze</a>, kuru uztur Valsts ieņēmumu dienests (VID). Papildus tam dati ir gūti arī, apmeklējot Saeimas mājas lapu un privāto kompāniju reģistrus (Lursoft, Firmas.lv).</p> 
                <p>Ņemot vērā, ka šīs datu bāzes nav pieejamas mašinlasāmā formātā un nevar tikt izmantotas reāllaikā, Delna iegūst attiecīgo informāciju, “attīra” to un apkopo funkcionālajās datu kopās. Delna regulāri atjaunina informāciju un publicē jaunākos datus (papildus skat. 4. un 5. sadaļu).</p>
                <p>Par datu un informācijas pareizību ir atbildīgas valsts amatpersonas un/vai politiskās partijas, kas sagatavo un iesniedz informāciju reģistrēšanai, kā arī institūcijas, kas šo informāciju tālāk publicē. Ņemot vērā, ka Delna informāciju iegūst manuāli un pēc tam “attīra”, pieļaujam, ka dažos gadījumos informācija var nebūt 100% precīza.</p> 
                <p>Delna iesaka informāciju rūpīgi salīdzināt ar pirmavotu (KNAB, VID un citu institūciju  interneta vietnēm) pirms tālākas publicēšanas. Gadījumos, kad ieraugāt neprecizitātes informācijā vai nepilnības rīka darbībā, lūgums sazināties ar Delnu, rakstot uz e-pastu <a href="mailto:deputatiuzdelnas@delna.lv">deputatiuzdelnas@delna.lv</a>.</p>
              </div>
            </div>
          </div>
          <!-- BLOCK 3 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">3. Pamatinformācija</a>
              </h1>
            </div>
            <div id="collapse3" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>Deputāti uz Delnas  ir daļa no plašāka projekta ar nosaukumu <i>“Integrity Watch: Digital Tools to Fight Political Corruption in Europe”</i>, ko finansē Eiropas Komisija un vada starptautiskās pretkorupcijas organizācijas <i>Transparency International</i> sekretariāts un <i>Transparency International EU</i> birojs Briselē (TI EU).</p>
                <p>Projekta ietvaros ir paredzēts attīstīt uz datiem balstītus digitālus rīkus astoņās Eiropas Savienības valstīs, arī Latvijā. Kā pamudinājums ES valstīm iesaistīties projektā bija TI EU 2015. gadā publicētais rīks “<i>Integrity Watch</i>”, kurš bija veidots ar mērķi uzraudzīt Eiropas Parlamenta deputātu un ES komisāru privātās intereses un lobēšanas sanāksmes.</p>  
                <p>Izmantojot Latvijas digitālo rīku Deputāti uz Delnas, lietotāji varēs piekļūt arī “Integrity Watch EU” digitālajam rīkam un citiem projekta partneru (Francija, Grieķija, Itālija, Lietuva, Nīderlande, Spānija un Slovēnija) plānotajiem nacionālajiem rīkiem, kā ari tiem, kas bija izstrādāti jau pirms projekta sākuma tādās valstīs kā  Lielbritānija, Polija un Čīle.</p>
              </div>
            </div>
          </div>
          <!-- BLOCK 4 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse4">4. Vairāk par politisko partiju finansēšanas sadaļā</a>
              </h1>
            </div>
            <div id="collapse4" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>Saskaņā ar Likumu par politisko organizāciju (partiju) finansēšanu Latvijas politiskajām partijām un koalīcijām ir pienākums ziņot par saņemtajiem ziedojumiem un biedru naudām, iesniedzot informāciju KNAB elektronisko datu ievades sistēmā. Turklāt politiskajām partijām ir jāiesniedz arī finanšu deklarācijas ar informāciju par saviem ienākumiem un izdevumiem katra gada beigās, kā arī pēc Saeimas, pašvaldību un Eiropas Parlamenta vēlēšanām. No politiskajam partijām saņemto informāciju KNAB pārbauda un publicē politisko partiju finansēšanas datubāzē.</p> 
                <p>Politisko partiju finansēšanas sadaļā var atrast informāciju par: <strong>privātajiem ziedojumiem, biedru naudām, 13.Saeimas deputātu ziedojumiem un politisko partiju izdevumiem</strong>. Šobrīd datu bāzē ir iekļauti dati par 2018. un 2019. gadu, bet tuvākajā laika tiks pievienoti dati arī par iepriekšējiem gadiem.</p>
                <p><strong>Privātie ziedojumi</strong>. Šeit ir pieejama informācija par visiem privātajiem ziedojumiem, kas veikti Latvijas politiskajām organizācijām, ieskaitot ziedotāju vārdus. Digitālais rīks ļauj:</p>
                <ul>
                <li>salīdzināt politisko organizāciju (partiju) kopējos ienākumus, kas saņemti no privātiem ziedojumiem;</li>
                <li>redzēt kopējo privāto ziedojumu apjomu dažādos gados;</li>
                <li>apskatīt ziedojuma veidu;</li>
                <li>lielākos donorus. Rīks arī ļauj apskatīt informāciju par visiem privātajiem ziedotājiem, sakārtojot tos pēc ziedojuma datuma, ziedotāja vārda un politiskās organizācijas, kas tos ir saņēmusi.</li>
                </ul>
                <p><strong>Biedru naudas</strong>. Šeit ir publicēta informācija par veiktajām biedru naudām (arī maksātāju vārdi) Latvijas politiskajām organizācijām. Digitālais rīks ļauj:</p>
                <ul>
                <li>salīdzināt politisko organizāciju (partiju) kopējos ieņēmumus, kas gūti no biedru naudām;</li>
                <li>apskatīt kopējos ieņēmumus no biedru naudām pa gadiem;</li>
                <li>redzēt, kuri biedri maksā vairāk un kuri mazāk. Rīks ļauj informāciju par biedru naudu maksājumiem sakārtot pēc datuma, biedra vārda un politiskās organizācijas, kas saņēmusi maksājumu.</li>
                </ul>
                <p><strong>13.Saeimas deputātu ziedojumi.</strong> Šeit var atrast informāciju par visiem ziedojumiem un biedru naudām, ko politiskajām organizācijām (partijām) ir veikuši 13. Saeimā ievēlētie deputāti (arī tie, kuri deputāta amatu ir atstājuši uz laiku vai pavisam) Digitālais rīks ļauj:</p>
                <ul>
                <li>salīdzināt Saeimas deputātu vai deputātu grupu veikto ziedojumu vai maksājumu kopējo summu;</li> 
                <li>saņemto ziedojumu kopējo summu no dažādām politiskajām organizācijām (partijām);</li> 
                <li>redzēt deputātu kopējās iemaksas pa gadiem;</li>
                <li>apskatīt kopējo ziedojumu summu;</li>
                <li>deputātus, kas ir veikuši lielākos ziedojumus. Rīks ļauj informāciju par visiem deputātu ziedojumiem sakārtot pēc ziedojuma datuma, ziedotāja vārda un politiskās organizācijas (partijas), kas saņēmusi maksājumu.</li> 
                </ul>
                <p><strong>Politisko organizāciju (partiju) izdevumi</strong>. Šis rīks ļauj izpētīt 20 Latvijas politisko partiju ar visaugstākajiem ienākumiem izdevumus no 2018.gada līdz 2019.gadam. Digitālais rīks ļauj:</p>
                <ul>
                <li>salīdzināt politisko partiju kopējos izdevumus;</li> 
                <li>redzēt kopējos izdevumus pa gadiem;</li> 
                <li>salīdzināt dažādu izdevumu kopējo vērtību.</li>
                </ul>
                <p><strong>Lielziedotāju indikators</strong> ļauj identificēt tās personas, kuru kopējais ziedojumu vai biedra naudas apmērs kalendāra gada ietvaros sasniedz vai pārsniedz Politisko organizāciju (partiju) finansēšanas likumā noteikto 5 minimālo mēnešalgu slieksni.</p>
                <p>Indikators ne vien papildina Top 10 maksātāju infografiku, ļaujot identificēt lielākos partiju ziedotājus, bet arī palīdz identificēt tās personas, kuras, sasniedzot likumā noteikto maksājumu limitu, varētu būt motivētas, turpmākos maksājumos nelikumīgi izmantot starpniekus.</p>
                <h3>Informācijas atjaunošana un precizitāte</h3>
                <p>Delna manuāli iegūst informāciju KNAB datu bāzē, lai katra mēneša beigās atjauninātu datus digitālajā rīkā. Par datu un informācijas pareizību ir atbildīgas politiskās partijas, kas ziņo par ziedotājiem un iesniedz deklarācijas KNAB, kā arī KNAB, kas tālāk šo informāciju publicē savā datu bāzē.</p>
                <p>Ņemot vērā, ka Delna manuāli iegūst un “attīra” datus, lai padarītu tos lietotājam draudzīgus, ir iespējams, ka informācija nebūs 100% precīza. Pirms informācijas tālākas publicēšanas iesakām informāciju pārbaudīt  KNAB datu bāzē. Gadījumos, kad ieraugāt neprecizitātes informācijā lūgums sazināties ar Delnu, rakstot uz e-pastu <a href="deputatiuzdelnas@delna.lv">deputatiuzdelnas@delna.lv</a>.</p>
              </div>
            </div>
          </div>
          <!-- BLOCK 5 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse5">5. Vairāk par valsts amatpersonu deklarāciju sadaļā</a>
              </h1>
            </div>
            <div id="collapse5" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>Likums “Par interešu konflikta novēršanu valsts amatpersonu darbībā” uzliek par pienākumu valsts amatpersonām iesniegt deklarācijas, norādot tajās informāciju par interesēm un finanšu ieguldījumiem, par citiem amatiem, ko valsts amatpersona ieņem papildus valsts amatpersonas amatam, kustamo un nekustamo mantu, par piederošajām kapitāla daļām vai akcijām komercsabiedrības, piederošajiem finanšu instrumenti, skaidras un bezskaidras naudas uzkrājumiem, pārskata periodā gūtajiem ienākumiem, parādsaistībām, darījumiem virs noteiktā sliekšņa un informāciju par laulātajiem un ģimenes locekļiem.</p>
                <p>Deklarācijas tiek iesniegtas VID, kas pārbauda iesniegtās informācijas pareizību, salīdzinot to ar savām datu bāzēm, piemēram, nodokļu reģistru. VID deklarācijas tālāk pārpublicē savā vietnē, un publicē tikai publiskojamo daļu, uz kuru neattiecas Vispārīgo datu aizsardzības regula (vairāk informācijas skatīt Regulā).</p>
                <p>Pašlaik digitālajā rīkā par Interešu un aktīvu deklarāciju ir izveidota apakšsadaļa, kuras mērķis ir sniegt visaptverošu pārskatu par 13.Saeimas deputātu “ārējām interesēm” (tām, kas nav saistītas ar amatpersonas amatu). Drīzumā plānojam pievienot vēl divas jaunas apakšsadaļas, kurās būs pieejama informācija par deputātu amatiem un ienākumiem, kas saistīti ar publisko sektoru, un ar informāciju par deputātu aktīviem un pasīviem.</p>
                <p><strong>“Ārējās intereses”</strong>. Šajā apakšnodaļā iekļauta informācija par:</p>
                <ul>
                <li>amatpersonas citiem amatiem;</li>
                <li>ienākumiem, kas gūti privātajā un nevalstiskajā sektorā, valsts akadēmiskajās institūcijās, valstij piederošos uzņēmumos un esot pašnodarbinātas personas statusā;</li>
                <li>par piederošajām kapitāla daļām un akcijām komercsabiedrībās Latvijā un ārvalstis.</li>
                </ul>
                <p>Pašlaik informācija ir pieejama par deklarācijām, kas iesniegtas 2018. un 2019. gadā. Tiem deputātiem, kuri parlamentā iekļuva tikai 2019. vai 2020. gadā, informācija tiek ņemta viņu deklarācijām, kas ir iesniegtas esot citos valsts pārvaldes amatos. </p>
                <p>“Ārējo interešu” apakšnodaļā ir iespējams:</p>
                <ul>
                <li>apskatīt kopējo interešu skaitu, ko deklarējuši katras parlamentārās grupas deputāti;</li> 
                <li>salīdzināt citur gūtu ienākumu kopējo vērtību;</li>  
                <li>salīdzināt dažādu ienākumu kopējo vērtību;</li> 
                <li>apskatīt kopējo vērtību, kas gūta no piederošajām kapitāla daļām un akcijām dažādos valsts sektoros;</li> 
                <li>redzēt deputātu skaitu, kuriem papildus amatpersonas amatam ir kāds cits amats;</li> 
                <li>apskatīt deputātu ienākumus dažādos finanšu griezumos.</li> 
                </ul>
                <p>Tika noteiktas ar juridiskam personām saistītās tautsaimniecības nozares, pārbaudot to NACE kodu (ES Saimniecisko darbību statistiskā klasifikācija), kas ir iegūts no Latvijas privāto uzņēmumu reģistriem (Lursoft un Firmas.lv). Visas vērtības ārvalstu valūtās tika konvertētas euro pēc Latvijas Centrālās bankas kursa gada beigās, par kuru tika iesniegta deklarācija.</p>
                <p>Apakšnodaļā ir arī pieejama infografika, kurā lietotāji var vizualizēt visas ar konkrēto deputātu saistītās “ārējās intereses”, informāciju var sakārtot pēc deputāta vārda, Saeimas grupas, deputāta citiem amatiem, ārējiem ienākumiem un ienākumiem, kas gūti no piederošajām kapitāla daļām un akcijām dažādos.</p>
                <h3>Informācijas atjaunošana un precizitāte</h3>
                <p>Delna atjaunina Interešu un ienākumu deklarācijas sadaļu pēc tam, kad deklarācijas par konkrēto gadu ir publicētas VID tīmekļa vietnē (parasti laikā no nākamā gada aprīļa līdz maijam).</p>
                <p>Galvenā atbildība par informācijas pareizību gulstas uz deputātu, kurš iesniedza deklarāciju, kā arī VID, kurš to pārbaudīja pirms publicēšanas. Ņemot vērā, ka Delna informāciju iegūst manuāli un pēc tam “attīra”, pieļaujam, ka dažos gadījumos informācija var nebūt 100% precīza. Delna iesaka informāciju rūpīgi salīdzināt ar pirmavotu pirms tālākas publicēšanas. Gadījumos, kad ieraugāt neprecizitātes informācijā vai nepilnības rīka darbībā, lūgums sazināties ar mums, rakstot uz e-pastu <a href="deputatiuzdelnas@delna.lv">deputatiuzdelnas@delna.lv</a>.</p> 
              </div>
            </div>
          </div>
          <!-- CONTACTS -->
          <div class="panel panel-default panel-static">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a href="#">6. Kontaktinformācija</a>
              </h2>
            </div>
            <div id="contact" class="panel-collapse">
              <div class="panel-body">
              <p>
              Lai iegūtu vairāk informācijas par digitālo rīku “Deputāti uz Delnas” vai pieprasītu datus mašīnlasāmā formātā, lūgums sazināties ar mums, rakstot uz <a href="mailto:deputatiuzdelnas@delna.lv">deputatiuzdelnas@delna.lv</a>.
              </p>
            </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <script src="static/about.js"></script>
</body>
</html>