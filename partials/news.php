<section class="section section_news js-section" data-frame="news">
	<div class="container js-container js-newsView">
		<div class="news js-news">
			<div class="news__frame js-newsFrame">
				<div class="news__container js-newsContainer js-scroll">
					<ul class="news__list js-newsPage"></ul>
				</div>
			</div>
		</div>

		<div class="btn btn_bottom js-showNewsArchiveBtn" data-url="<?php bloginfo('wpurl'); ?>">
			<span class="btn__text">
				Архив
			</span>
		</div>
	</div>

	<script type="text/mustache" id="newsItemTemplate" data-url="<?php bloginfo('wpurl'); ?>">
		<div class="news__date js-newsDate">
			{{#important}}
				<img src="<?php bloginfo('template_url'); ?>/img/red-date.svg" alt="" class="news__red-date">
			{{/important}}
			<svg viewBox="0 0 80 114" class="icon icon-news-date">
				<use xlink:href="#news-date"></use>
			</svg>
			<div class="news__day-number">{{dayNumber}}</div>
			<div class="news__month">{{month}}</div>
		</div>
		<table>
			<tbody>
				<tr>
					<td>
						<p class="news__text js-newsText" data-content="{{content}}">
							{{title_plain}}
						</p>
					</td>
				</tr>
			</tbody>
		</table>
	</script>

	<script type="text/mustache" id="newsArchiveItemTemplate">
		<a href="{{link}}" class="news__link js-newsArchiveBtn">
			<span class="news__date">
				<svg viewBox="0 0 80 114" class="icon icon-news-date">
					<use xlink:href="#news-date"></use>
				</svg>
				<span class="news__year">{{year}}</span>
				<span class="news__month">{{month}}</span>
			</span>
		</a>
	</script>
</section>