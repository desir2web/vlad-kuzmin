<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 * @subpackage Twenty_Ten
 * @since Twenty Ten 1.0
 */

get_header(); ?>

        <section class="content inside">

<?php get_sidebar(); ?>
            
            <div class="row">
                <div class="container post">
                    
					<div class="span8 offset1">
						<h2>Ошибка 404</h2>
						<p>Такого адреса нет :(</p>
						<p>Но не отчаивайтесь! Попробуйте перейти на <a href="<?php bloginfo( 'wpurl' ); ?>">главную страницу</a>.</p>
					</div>
                    
				</div>
			</div>
        
        </section>

<?php get_footer(); ?>