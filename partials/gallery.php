<section class="section section_gallery js-section" data-frame="gallery">
	<div class="container js-container">
		<div class="gallery js-gallery">
			<div class="gallery__inner js-galleryContainer js-scroll">
				<ul class="gallery__list wow fadeIn" data-wow-delay="0.3s" data-wow-duration="1.2s"></ul>
			</div>
		</div>
	</div>

	<!-- Gallery item template -->
	<script type="text/mustache" id="galleryItemTemplate" data-url="<?php bloginfo('wpurl'); ?>/?json=get_page&slug=gallery">
		<a href="{{id}}" class="gallery__link js-galleryPopup" rel="gallery">
			<span class="gallery__icon">
				<div class="sprite icon icon-zoom-in"></div>
			</span>
			<div class="gallery__img" style="background: url({{{thumb}}}) 50% center no-repeat; background-size: cover;"></div>
		</a>
	</script>

	<!-- Gallery slider item template -->
	<script type="text/mustache" id="gallerySliderItemTemplate">
		<li class="slider__item js-sliderItem" id="photo-s{{id}}" data-id="{{id}}" style="background: url('{{{img}}}'); background-size: cover;">
	</script>
</section>

