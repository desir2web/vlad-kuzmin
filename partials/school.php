<section class="section section_school js-section" data-frame="school">
	<div class="container js-container">
		<div class="tabs js-tabs">
			<div class="tabs__navigation">
				<ul class="tabs__navigation-list">

                    <?php
                        $posts = get_posts("category_name=school&orderby=ID&order=ASC");
                        if ($posts) :
                        foreach ($posts as $key => $post) : setup_postdata ($post);
                        $index++;
                        $permalink = get_permalink( $id );

                        $thumbnail = '';
                            if ( has_post_thumbnail( $post->ID ) ) {
                            $thumbnail = wp_get_attachment_url( get_post_thumbnail_id( $post->ID ));
                        }
                    ?>

					<li class="tabs__navigation-item wow bounceInDown">
						<a href="#tab-<?php echo $id; ?>" class="tabs__navigation-link js-tabBtn<?php if ($key == 0) {echo ' active';}?>">
							<img src="<?php echo $thumbnail; ?>" alt="" class="tabs__navigation-img">
						</a>
					</li>

                    <?php
                        endforeach;
                        endif;
                    ?>

				</ul>
			</div>
			<div class="tabs__content wow bounceInDown" data-wow-delay="0.6s">
				<ul class="tabs__content-list">

                    <?php
                        $posts = get_posts("category_name=school");
                        if ($posts) :
                        foreach ($posts as $post) : setup_postdata ($post);
                    ?>

					<li class="tabs__content-item js-tabsContent js-scroll" id="tab-<?php echo $id; ?>">
						<?php the_content(''); ?>
					</li>

                    <?php
                        endforeach;
                        endif;
                    ?>

				</ul>
			</div>
		</div>
	</div>
</section>