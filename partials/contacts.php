<section class="section section_contacts js-section" data-frame="contacts">
	<div class="container js-container">
		<div class="contacts">
			<p class="contacts__text wow bounceInDown" data-wow-delay="1.5s" data-wow-duration="1.5s">
				По вопросам сотрудничества,<br>организации и проведения мастер классов:
			</p>
			<div class="contacts__container">
				<div class="contacts__phone wow bounceInLeft" data-wow-delay="1.8s">
					<div class="contacts__phone-text">
						<div class="sprite icon icon-phone"></div>
						<?php if ( is_active_sidebar( 'tel' ) ) : ?>
                            <?php dynamic_sidebar( 'tel' ); ?>
                        <?php endif; ?>
					</div>
				</div>
				<div class="contacts__aim wow fadeIn" data-wow-delay="2.3s" data-wow-duraion="1.5s">
					<svg viewBox="0 0 80 159" class="icon icon-aim">
						<use xlink:href="#aim"></use>
					</svg>
					<div class="contacts__aim-text">
						или
					</div>
				</div>
				<div class="contacts__email wow bounceInRight" data-wow-delay="2.1s">
					<a href="mailto:<?php $admin_email = get_site_option( 'admin_email' ); echo $admin_email; ?>" class="contacts__email-text">
						<div class="sprite icon icon-mail"></div>
						<?php $admin_email = get_site_option( 'admin_email' ); echo $admin_email; ?>
					</a>
				</div>
			</div>
			<div class="contacts__motto wow fadeIn" data-wow-delay="0.5s" data-wow-duration="1.5s">
				<img src="<?php bloginfo('template_url'); ?>/img/lets-do-it-together.png" alt="lets do it together" class="contacts__motto-img">
				<div class="contacts__motto-text">
					Let's do it together!
				</div>
			</div>
		</div>
	</div>
</section>