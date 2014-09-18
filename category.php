<?php
/**
 * The template for displaying Category Archive pages.
 *
 * @package WordPress
 * @subpackage Twenty_Ten
 * @since Twenty Ten 1.0
 */

get_header(); ?>

<?php get_sidebar(); ?>

            <div class="row-fluid">
                <div class="container category-title">
					<div class="span8">
                        <h2 class="caption"><?php single_cat_title(''); ?></h2>
                        <div class="description">
                            <?php echo category_description(); ?>  
                        </div>
					</div>
				</div>
                <div class="container post-list-news">
                    <div class="span12">
                        <?php while ( have_posts() ) : the_post();
                            $permalink = get_permalink( $id ); 
                            $thumbnail = '';
                                if ( has_post_thumbnail( $post->ID ) ) {
                                $thumbnail = wp_get_attachment_url( get_post_thumbnail_id( $post->ID ));
                            }
                            $categories = get_the_category();
                            $separator = ' ';
                            $output = '';
                            if($categories){
                                foreach($categories as $category) {
                                    $output .= $category->slug.$separator;
                                }
                            }
                        ?>
                        
                        <div class="post-single">
                            <div class="link"><a href="<?php echo $permalink; ?>" class="<?php echo trim($output, $separator); ?>"><?php the_title(); ?></a></div>
                            <div class="date"><?php echo get_the_date(); ?></div>
                        </div>

                        <?php endwhile; ?>
                    </div>
                </div>
			</div>

<?php get_footer(); ?>