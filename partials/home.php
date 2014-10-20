<section class="section section_home js-section" data-frame="home">
	<div class="container container_logo">
		<div data-wow-delay="0.5s" class="wow fadeIn icon icon-logo js-logo">
            <img src="<?php bloginfo('template_url'); ?>/img/logo.png" alt="logo">
            <img src="<?php bloginfo('template_url'); ?>/img/logo.gif" alt="logo">
        </div>
		<div class="links">
			<table class="links__list">
				<tbody>
					<tr>
						<td class="links__item wow bounceInUp" data-wow-duration="1.5s" data-wow-delay="0.4s">
							<div class="links__item-inner js-showreelVideoBtn" data-id="0">
								<div class="links__icon">
									<div class="sprite icon icon-showreal"></div>
								</div>
								<div class="links__text">
									<div class="links__text-inner">
										Showreel
									</div>
								</div>
							</div>
						</td>
						<td class="links__item wow bounceInUp" data-wow-duration="1.5s" data-wow-delay="0.5s">
							<div class="links__item-inner js-showProgrammVideoBtn" data-id="1">
								<div class="links__icon">
									<div class="sprite icon icon-bomb"></div>
								</div>
								<div class="links__text">
									<div class="links__text-inner">
										Шоу программы
									</div>
								</div>
							</div>
						</td>
						<td class="links__item wow bounceInUp" data-wow-duration="1.5s" data-wow-delay="0.6s">
							<div class="links__item-inner js-schoolVideoBtn" data-id="2">
								<div class="links__icon">
									<div class="sprite icon icon-boot"></div>
								</div>
								<div class="links__text">
									<div class="links__text-inner">
										Школа танцев
									</div>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- Home video popup -->
	<div class="js-showreelVideoPopup hide">
		<?php
			$page_id = $wpdb->get_var("SELECT ID FROM $wpdb->posts WHERE post_name = 'showreel'");
			$page_data = get_page( $page_id );

			$content = $page_data->post_content;
		?>
		<?php echo apply_filters( 'the_content', $content ); ?>
	</div>
	<div class="js-showProgrammVideoPopup hide">
		<?php
			$page_id = $wpdb->get_var("SELECT ID FROM $wpdb->posts WHERE post_name = 'show-programm'");
			$page_data = get_page( $page_id );

			$content = $page_data->post_content;
		?>
		<?php echo apply_filters( 'the_content', $content ); ?>
	</div>
	<div class="js-schoolVideoPopup hide">
		<?php
			$page_id = $wpdb->get_var("SELECT ID FROM $wpdb->posts WHERE post_name = 'dance-school'");
			$page_data = get_page( $page_id );

			$content = $page_data->post_content;
		?>
		<?php echo apply_filters( 'the_content', $content ); ?>
	</div>
</section>