<!DOCTYPE html>
<html lang="ru"<?php if (is_user_logged_in()) { echo ' class="js-isAdmin is-admin"';} ?>>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<title>
    <?php
        global $page, $paged;

        wp_title( '|', true, 'right' );
        bloginfo( 'name' );

        $site_description = get_bloginfo( 'description', 'display' );
        if ( $site_description && ( is_home() || is_front_page() ) )
            echo " | $site_description";
        if ( $paged >= 2 || $page >= 2 )
            echo ' | ' . sprintf( __( 'Page %s', 'twentyten' ), max( $paged, $page ) );
    ?>
    </title>
	<script data-pace-options='{ "ajax": false, "document": true, "elements": ["img"] }' src="<?php bloginfo('template_url'); ?>/js/pace.min.js"></script>
	<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/pace-theme-minimal.css">
	<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/perfect-scrollbar.min.css">
	<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/colorbox.css">
	<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/main.css">
	<!--[if lt IE 9]>
	  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	  <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->

<?php wp_head(); ?>
</head>
<body>
	<div class="loading-fade js-loadingFade" id="loadingFade">
		<ul class="loading-fade__list">
			<li class="loading-fade__item loading-fade__item_up js-loadingItem js-loadingItemLogo"></li>
			<li class="loading-fade__item loading-fade__item_down js-loadingItem"></li>
		</ul>
	</div>
	<script>
		Pace.on('done', function() {
			var $loadingFade = $('#loadingFade');

			$loadingFade.addClass('animated myFadeOut');

			var openSite = function() {
				$loadingFade.find('.js-loadingItem').eq(0).css({
					'transform': 'translate3d(0,-100%,0)',
					'-webkit-transform': 'translate3d(0,-100%,0)'
				});
				$loadingFade.find('.js-loadingItem').eq(1).css({
					'transform': 'translate3d(0,100%,0)',
					'-webkit-transform': 'translate3d(0,100%,0)'
				});
			};

			setTimeout(function() {
				$('.js-loadingItemLogo').append('<img src="<?php bloginfo('template_url'); ?>/img/logo_animation.gif" alt="Влад Кузьмин" class="loading-fade__logo">');
			}, 1000);


			setTimeout(function() {
				$('.pace-inactive').addClass('animated progressFadeOut');
				openSite();
			}, 4700);


		});
	</script>
	<div class="hide">
		<?php include "partials/svg-icons.php"; ?>
		<a href="http://findfood.ru/attaches/product/ovoshi/pomidor.jpg" class="gallery__link" rel="test">
			<span class="gallery__icon">
				<div class="sprite icon icon-zoom-in"></div>
			</span>
			<div class="gallery__img" style="background: url(img/photo-1.jpg) 50% center no-repeat; background-size: cover;"></div>
		</a>
		<a href="<?php bloginfo('template_url'); ?>/img/photo-1.jpg" class="gallery__link" rel="test">
			<span class="gallery__icon">
				<div class="sprite icon icon-zoom-in"></div>
			</span>
			<div class="gallery__img" style="background: url<?php bloginfo('template_url'); ?>/(img/photo-1.jpg) 50% center no-repeat; background-size: cover;"></div>
		</a>
	</div>
	<div class="wrapper js-frame">
		<?php include "partials/header.php"; ?>
		<?php include "partials/arrows.php"; ?>
		<main class="main-content js-framesContainer">
			<div class="color-overlay js-colorOverlay"></div>
			<?php include "partials/home.php"; ?>
			<?php include "partials/resume.php"; ?>
			<?php include "partials/show.php"; ?>
			<?php include "partials/school.php"; ?>
			<?php include "partials/gallery.php"; ?>
			<?php include "partials/news.php"; ?>
			<?php include "partials/contacts.php"; ?>
		</main>
		<?php include "partials/footer.php"; ?>
	</div>
	<?php //include "partials/video-slider.php"; ?>
	<?php include "partials/gallery-photo-slider.php"; ?>
	<?php include "partials/show-photo-slider.php"; ?>

	<script src="<?php bloginfo('template_url'); ?>/vendors/plugins.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/main.js"></script>

<?php wp_footer(); ?>
</body>
</html>