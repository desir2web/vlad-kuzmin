<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 * @subpackage Twenty_Ten
 * @since Twenty Ten 1.0
 */

get_header(); ?>

<?php get_sidebar(); ?>

<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>




<?php
    $thumbnail = '';
        if ( has_post_thumbnail( $post->ID ) ) {
        $thumbnail = wp_get_attachment_url( get_post_thumbnail_id( $post->ID ));
    }
?>
            <div class="row-fluid products">
                
                        <div class="item">
                            <div class="bg-image" style="background: url(<?php echo $thumbnail; ?>) center center no-repeat;">
                                <div class="overlay">
                                    <div class="product-header">
                                        <div class="container post-bc">
                                            <div class="span12">
                                                <?php the_category(', '); ?>
                                            </div>
                                        </div>
                                        <div class="container">
                                            <div class="span9">
                                                <h2 class="caption"><?php the_title(); ?></h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
            <div class="row-fluid">
                <div class="container post-content">
                    <div class="span8">
                        <?php the_content(); ?>  
                    </div>
                </div>
            </div>


<?php endwhile; ?>

<?php get_footer(); ?>