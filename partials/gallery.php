<section class="section section_gallery js-section" data-frame="gallery">
	<div class="container js-container">
		<div class="gallery js-gallery">
			<div class="gallery__inner js-galleryContainer js-scroll">
				<ul class="gallery__list"></ul>
			</div>
		</div>
	</div>

	<script type="text/mustache" id="galleryItemTemplate" data-url="">
		<a href="<?php bloginfo('template_url'); ?>/{{{img}}}" class="gallery__link">
			<span class="gallery__icon">
				<div class="sprite icon icon-zoom-in"></div>
			</span>
			<div class="gallery__img" style="background: url(<?php bloginfo('template_url'); ?>/{{thumb}}) 50% center no-repeat; background-size: cover;"></div>
		</a>
	</script>
</section>