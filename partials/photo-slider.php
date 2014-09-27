<div class="slider js-photoSlider">
	{{! Overlay }}
	<div class="slider__overlay js-closeBtn"></div>
	{{! Arrows }}
	<div class="arrow arrow_left js-slideLeft js-slideArrow">
		<svg viewBox="0 0 64.347 127.279" class="icon icon-slide-arrow-left">
			<use xlink:href="#slide-arrow-left"></use>
		</svg>
	</div>
	<div class="arrow arrow_right js-slideRight js-slideArrow">
		<svg viewBox="0 0 64.003 127.029" class="icon icon-slide-arrow-right">
			<use xlink:href="#slide-arrow-right"></use>
		</svg>
	</div>
	{{! Content }}
	<div class="slider__inner">
		<ul class="slider__list js-sliderContainer">
			<li class="slider__item js-sliderItem" id="photo-s1">
				<img src="<?php bloginfo('template_url'); ?>/img/photo-1.jpg" alt="" class="slider__img">
			</li>
			<li class="slider__item js-sliderItem"  id="photo-s2">
				<img src="<?php bloginfo('template_url'); ?>/img/photo-1.jpg" alt="" class="slider__img">
			</li>
			<li class="slider__item js-sliderItem"  id="photo-s3">
				<img src="<?php bloginfo('template_url'); ?>/img/photo-1.jpg" alt="" class="slider__img">
			</li>
		</ul>
	</div>
	<div class="slider__close js-closeBtn">
		<div class="sprite icon icon-close"></div>
	</div>
</div>