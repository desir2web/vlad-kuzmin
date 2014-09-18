<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package WordPress
 * @subpackage Twenty_Ten
 * @since Twenty Ten 1.0
 */

get_header(); ?>

<?php get_sidebar(); ?>

<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>

            <div class="row-fluid">
                <div class="container category-title">
					<div class="span9">
                        <h2 class="caption"><?php the_title(); ?></h2>
					</div>
				</div>
                <div class="container post-content">
                    <div class="span8">
                        <?php the_content(); ?>  
                    </div>
                </div>
			</div>

<?php endwhile; ?>

<?php get_footer(); ?>