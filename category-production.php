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
                <div class="container post-list">
                    <div class="span12">
                        <?php while ( have_posts() ) : the_post();
                            $permalink = get_permalink( $id ); 
                            $thumbnail = '';
                                if ( has_post_thumbnail( $post->ID ) ) {
                                $thumbnail = wp_get_attachment_url( get_post_thumbnail_id( $post->ID ));
                            }
                        ?>
                        
                        <a href="<?php echo $permalink; ?>" class="post-link">
                            <div class="post-item">
                                <div class="bg-image" style="background: url(<?php echo $thumbnail; ?>) center center no-repeat;">
                                    <div class="overlay">
                                        <div class="post-tablecell">
                                            <span><?php the_title(); ?></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>


                        <?php endwhile; ?>
                    </div>
                </div>
			</div>

<?php get_footer(); ?>