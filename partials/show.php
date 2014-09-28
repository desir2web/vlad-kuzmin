<section class="section section_show js-section" data-frame="show">
	<div class="container js-container">
		<div class="vlad wow vladInUp" data-wow-duration="0.5s" data-wow-delay="0.5s">
			<ul class="vlad__list">
				<li class="vlad__item vlad__item_left wow vladInLeft" data-wow-duration="0.5s" data-wow-delay="0.8s">
					<img src="<?php bloginfo('template_url'); ?>/img/vlad_left.png" alt="" class="vlad__img">
				</li>
				<li class="vlad__item">
					<img src="<?php bloginfo('template_url'); ?>/img/vlad_main.png" alt="" class="vlad__img">
				</li>
				<li class="vlad__item vlad__item_right wow vladInRight" data-wow-duration="0.5s" data-wow-delay="1.1s">
					<img src="<?php bloginfo('template_url'); ?>/img/vlad_right.png" alt="" class="vlad__img">
				</li>
			</ul>
		</div>
		<div class="links links_show">
			<table class="links__list">
				<tbody>
					<tr>
						<td class="links__item wow bounceInUp" data-wow-delay="1.1s">
							<div class="links__item-inner js-showPhotoSliderBtn">
								<div class="links__icon">
									<div class="sprite icon icon-photo"></div>
								</div>
								<div class="links__text">
									<div class="links__text-inner">
										Фото
									</div>
								</div>
							</div>
						</td>
						<td class="links__item wow bounceInUp" data-wow-delay="1.3s">
							<div class="links__item-inner">
								<div class="links__icon">
									<div class="sprite icon icon-video"></div>
								</div>
								<div class="links__text">
									<div class="links__text-inner">
										Видео
									</div>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- Show photos -->
	<div class="js-galleryPopupData hide">
		<?php
			$page_id = $wpdb->get_var("SELECT ID FROM $wpdb->posts WHERE post_name = 'show-photo'");
			$page_data = get_page( $page_id );

			$content = $page_data->post_content;
		?>
		<?php echo apply_filters( 'the_content', $content ); ?>
	</div>
</section>