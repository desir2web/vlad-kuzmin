<?php
/**
 * The loop that displays posts.
 */
?>

<?php /* If there are no posts to display, such as an empty archive page */ ?>
<?php if ( ! have_posts() ) : ?>
	<div id="post-0" class="post error404 not-found">
		<h1 class="entry-title"><?php _e( 'Not Found', 'twentyten' ); ?></h1>
		<div class="entry-content">
			<p><?php _e( 'Apologies, but no results were found for the requested archive. Perhaps searching will help find a related post.', 'twentyten' ); ?></p>
			<?php get_search_form(); ?>
		</div><!-- .entry-content -->
	</div><!-- #post-0 -->
<?php endif; ?>

<?php
	/* Start the Loop.
	 *
	 * In Twenty Ten we use the same loop in multiple contexts.
	 * It is broken into three main parts: when we're displaying
	 * posts that are in the gallery category, when we're displaying
	 * posts in the asides category, and finally all other posts.
	 *
	 * Additionally, we sometimes check for whether we are on an
	 * archive page, a search page, etc., allowing for small differences
	 * in the loop on each template without actually duplicating
	 * the rest of the loop that is shared.
	 *
	 * Without further ado, the loop:
	 */ ?>
<?php while ( have_posts() ) : the_post();
	
	$thumbnail = '';
		if ( has_post_thumbnail( $post->ID ) ) {
		$thumbnail = wp_get_attachment_image( get_post_thumbnail_id( $post->ID ), $size = 'thumbnail', false );
	}
	
?>

                        <div><a href="<?php $permalink = get_permalink( $id ); echo $permalink; ?>" rel="<?php foreach((get_the_category()) as $category) { echo $category->cat_name; }?>"><?php echo $thumbnail; //the_content(''); ?><?php the_title(); ?></a></div>

<?php endwhile; ?>