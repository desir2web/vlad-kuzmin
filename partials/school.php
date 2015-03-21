<section class="section section_school js-section" data-frame="school">
    <div class="js-hoverOverlaySchool hover-overlay"></div>
	<div class="container js-container">
		<div class="breadcrumbs js-breadcrumbs">

        </div>
	</div>
</section>

<script type="text/mustache" id="breadcrumbsTemplate">
    <ul class="breadcrumbs__list">
        {{#breadcrumbs}}
            <li class="breadcrumbs__item">
                <a href="{{link}}" class="breadcrumbs__link">
                    {{name}}
                </a>
            </li>
        {{/breadcrumbs}}
    </ul>
</script>
