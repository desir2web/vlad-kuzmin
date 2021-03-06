<section class="section section_resume js-section" data-frame="resume">
    <div class="js-hoverOverlayResume hover-overlay"></div>
	<div class="container js-container">
		<article class="article js-article js-scroll">
            <?php
                $page_id = $wpdb->get_var("SELECT ID FROM $wpdb->posts WHERE post_name = 'resume'");
                $page_data = get_page( $page_id );

                $content = $page_data->post_content;
            ?>
            <?php echo apply_filters( 'the_content', $content ); ?>
		</article>
        <?php
        $video = get_post_meta($page_id, 'video', true);
        ?>
        <?php if ($video == ""): ?>
            <div></div>
        <?php else: ?>
            <a href="<?php echo $video; ?>" class="btn btn_bottom js-showResumeVideoSliderBtn wow bounceInUp" data-wow-delay="0.65s">
                <span class="sprite icon icon-play"></span>
                <span class="btn__text">
                    Демонстрационное видео
                </span>
            </a>
        <?php endif; ?>
	</div>
</section>
