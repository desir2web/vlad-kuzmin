<section class="section section_resume js-section" data-frame="resume">
	<div class="container js-container">
		<article class="article js-article js-scroll">
            <?php
                $page_id = $wpdb->get_var("SELECT ID FROM $wpdb->posts WHERE post_name = 'resume'");
                $page_data = get_page( $page_id );

                $content = $page_data->post_content;
            ?>
            <?php echo apply_filters( 'the_content', $content ); ?>
		</article>
		<div class="btn btn_bottom js-showVideoSliderBtn wow bounceInUp" data-wow-delay="0.65s">
			<div class="sprite icon icon-play"></div>
			<span class="btn__text">
				Демонстрационное видео
			</span>
		</div>
	</div>
</section>