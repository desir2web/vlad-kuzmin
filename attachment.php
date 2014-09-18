<?php
/**
 * The template for displaying attachments.
 *
 * @package WordPress
 * @subpackage Twenty_Ten
 * @since Twenty Ten 1.0
 */

get_header(); ?>

        <section class="content inside">

            <div class="row nav">
                <div class="container">
                    
                    <div class="span6 offset1 menu clearfix">
                        
                        <ul>
                            <?php
                                $postsI = get_posts("category=4&numberposts=8");
                                if ($postsI) :
                                foreach ($postsI as $post) : setup_postdata ($post);
                                $permalink = get_permalink( $id );
                            ?>

                            <li><a href="<?php echo $permalink; ?>"><?php the_title(); ?></a></li>
                            
                            <?php
                                endforeach;
                                endif;
                            ?>
                        </ul>
                        
                    </div>
                    <div class="span3 offset1">

                        <?php
                            $page_id = 37; 
                            $permalink = get_permalink( $page_id );
                        ?>
                        
                        <a href="<?php echo $permalink; ?>" class="btn btn-red center">Оформить заявку</a>
                        
                    </div>
                    
				</div>
			</div>
            
            <div class="row">
                <div class="container post">
                    
					<div class="span8 offset1">

                        <?php
                        /* Run the loop to output the attachment.
                         * If you want to overload this in a child theme then include a file
                         * called loop-attachment.php and that will be used instead.
                         */
                        get_template_part( 'loop', 'attachment' );
                        ?>

					</div>
                    
				</div>
			</div>
        
        </section>

<?php get_sidebar(); ?>
<?php get_footer(); ?>