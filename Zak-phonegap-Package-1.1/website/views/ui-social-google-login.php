<?php require dirname(__FILE__) . '/../includes/google-login-part1.php'; ?>
<!DOCTYPE html>
<html class=" ">

<head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
  <title>Zak Mobile App : Login</title>
  <meta content="Zak Mobile App" name="description" />
  <meta content="themepassion" name="author" />

  
<!-- CORE JS FRAMEWORK - START -->
<script src="../modules/app/js/jquery.min.js"></script>

<script src="../assets/js/variables.js"></script>
<script src="../modules/acl/acl.js"></script>

<script src="../assets/js/account.js" type="text/javascript"></script>
<script src="../modules/app/app.js"></script>
<!-- CORE JS FRAMEWORK - END -->

<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">






<!-- CORE CSS FRAMEWORK - START -->
<link href="../assets/css/preloader.css" type="text/css" rel="stylesheet"
  media="screen,projection" />

<link href="../modules/app/plugins/materializecss/materialize.min.css" type="text/css"
  rel="stylesheet" media="screen,projection" />
<link href="../modules/app/fonts/mdi/materialdesignicons.min.css" type="text/css" rel="stylesheet"
  media="screen,projection" />
<link href="../modules/app/plugins/perfect-scrollbar/perfect-scrollbar.css" type="text/css"
  rel="stylesheet" media="screen,projection" />


<!-- CORE CSS FRAMEWORK - END -->

<!-- OTHER SCRIPTS INCLUDED ON THIS PAGE - START -->
<!-- OTHER SCRIPTS INCLUDED ON THIS PAGE - END -->

<!-- CORE CSS TEMPLATE - START -->


<link href="../assets/css/style.css" type="text/css" rel="stylesheet" media="screen,projection"
  id="main-style" />
<script src="../assets/js/global_style.js"></script>  <!-- CORE CSS TEMPLATE - END -->

  <script type="text/javascript">

  </script>

</head>
<!-- END HEAD -->

<!-- BEGIN BODY -->


<body class=" web loginpage isfullscreen  html" data-theme="" data-header="light"
  data-footer="dark" data-header_align="center" data-menu_type="left" data-menu="light" data-menu_icons="on"
  data-footer_type="left" data-site_mode="light" data-footer_menu="show" data-footer_menu_style="light">
          <div class="ajaxloader-background preloader-background">
          <div class="preloader-wrapper">
            <div id="preloader"></div>
          </div>
        </div>
        <div class="preloader-background apploader-background">
          <div class="preloader-wrapper">
            <div id="preloader"></div>
          </div>
        </div>


        <div class="scroll">
          <div class="refresh">

          </div>
        </div>
        <div class="reloading z-depth-2"><i class="mdi mdi-refresh"></i></div>


        <!-- 

        <div class='p2r-example' data-orientation="all"></div> -->

  <div class="container login-area">
    <div class="section">
    </div>
  </div>

  <script src="../modules/app/plugins/materializecss/materialize.js"></script>
<script src="../modules/app/plugins/perfect-scrollbar/perfect-scrollbar.min.js"></script>
<script src="../modules/app/plugins/pull-to-refresh/jquery.p2r.min.js"></script>
  <script type="text/javascript" src="../cordova.js"></script>

  <!-- Fetch Data from Rest API calls -->
  <script type="text/javascript" src="../assets/js/functions.js"></script>
  <script type="text/javascript" src="../modules/access/js/access.js"></script>
  <script type="text/javascript" src="../modules/access/js/login.js"></script>
  <script type="text/javascript" src="../modules/access-oauth/js/oauth.js"></script>

  <?php require dirname(__FILE__) . '/../includes/google-login-part2.php'; ?>


</body>

</html>