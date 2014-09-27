<section class="section section_gallery js-section" data-frame="gallery">
	<div class="container js-container">
		<div class="gallery js-gallery">
			<div class="gallery__inner js-galleryContainer js-scroll">
				<ul class="gallery__list"></ul>
			</div>
		</div>
	</div>

	<script type="text/mustache" id="galleryItemTemplate" data-url="<?php bloginfo('wpurl'); ?>/?json=get_page&slug=gallery">
		<a href="{{{img}}}" class="gallery__link">
			<span class="gallery__icon">
				<div class="sprite icon icon-zoom-in"></div>
			</span>
			<div class="gallery__img" style="background: url({{{thumb}}}) 50% center no-repeat; background-size: cover;"></div>
		</a>
	</script>
</section>