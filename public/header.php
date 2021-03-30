<nav class="navbar navbar-expand-lg navbar-light" id="iw-nav">
  <a class="navbar-brand" href="./" target="_blank"><img src="./images/delna_logo.png" alt="" /> </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav navbar-left mr-auto">
      <li class="nav-item" :class="{active: page == 'tabB2'}">
        <a href="./" class="nav-link" :class="{active: page == 'tabB2'}">Deputātu datu bāze</a>
      </li>
      <li class="nav-item" :class="{active: section == 'tabA'}">
        <a href="./financing.php" class="nav-link" :class="{active: section == 'tabA'}">Politisko partiju finansēšana</a>
      </li>
      <li class="nav-item" :class="{active: page == 'tabB'}">
        <a href="./declarations.php" class="nav-link" :class="{active: page == 'tabB'}">Deputātu amatpersonas deklarācijas</a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a href="./mps.php" class="nav-link" :class="{active: page == 'tabB2'}">Data hub</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Citas versijas
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="https://www.integritywatch.eu/" target="_blank">Eiropas Savienība</a>
			<a class="dropdown-item" href="https://www.integritywatch.fr/" target="_blank">Francija</a>
			<a class="dropdown-item" href="https://www.integritywatch.gr/" target="_blank">Grieķija</a>
			<a class="dropdown-item" href="http://www.soldiepolitica.it/" target="_blank">Itālija</a>
			<a class="dropdown-item" href="https://manoseimas.lt/" target="_blank">Lietuva</a>
			<a class="dropdown-item" href="https://www.integritywatch.nl/" target="_blank">Nīderlande</a>
			<a class="dropdown-item" href="http://varuhintegritete.transparency.si/" target="_blank">Slovēnija</a>
			<a class="dropdown-item" href="https://integritywatch.es/" target="_blank">Spānija</a>
			<a class="dropdown-item" href="https://openaccess.transparency.org.uk/" target="_blank">Apvienotā Karaliste</a>
			<a class="dropdown-item" href="https://integritywatch.cl/" target="_blank">Čīle</a>
        </div>
      </li>
      <li class="nav-item">
        <a href="./about.php" class="nav-link">Par projektu</a>
      </li>
    </ul>
    <a class="navbar-brand navbar-brand2" href="https://delna.lv/lv/" target="_blank"><img src="./images/ti_logo.png" alt="" /></a>
  </div>
</nav>