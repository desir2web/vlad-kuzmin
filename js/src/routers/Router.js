var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Router.App = Backbone.Router.extend({
	routes: {
		'': 'home',
		'home': 'home',
		'resume': 'resume',
		'show': 'show',
		'schools': 'schools',
		'schools/:id': 'school',
		'schools/:id/teachers': 'schoolTeachers',
		'schools/:id/teachers/:id': 'schoolTeacher',
		'schools/:id/photo': 'schoolPhoto',
		'schools/:id/schedule': 'schoolSchedule',
		'schools/:id/video': 'schoolVideo',
		'gallery': 'gallery',
		'news': 'news',
		'contacts': 'contacts',
		'*path': 'home'
	},
	activeFrame: 0,
	isActiveMenuItemSet: false,
	breadcrumbsTemplate: $('#breadcrumbsTemplate').html(),
	resetWow: function () {
		$('.animated').not('.pace, .js-loadingFade').removeClass('animated');
		new WOW().init();
	},
	setActiveFrame: function (frame) {
		console.time('Router setActiveFrame');
		App.appView.$('.js-menuLink').removeClass('active');
		var $activeMenuLink = App.appView.$('.js-menuLink[data-id="' + frame + '"]'),
			self = this;
		$activeMenuLink.addClass('active');

		if (!this.isActiveMenuItemSet) {
			setTimeout(function () {
				$activeMenuLink.trigger('click');
			}, 300);
			this.isActiveMenuItemSet = true;
		}

		// WOW css animation init
		this.resetWow();

		App.appView.$('.js-framesContainer').css({
			'-webkit-transform': 'translate3d(' + -frame * App.appView.frameWidth + 'px, 0, 0)',
			'-moz-transform': 'translate3d(' + -frame * App.appView.frameWidth + 'px, 0, 0)',
			'-ms-transform': 'translate3d(' + -frame * App.appView.frameWidth + 'px, 0, 0)',
			'transform': 'translate3d(' + -frame * App.appView.frameWidth + 'px, 0, 0)',
			'-webkit-transition': '-webkit-transform ' + App.appView.animationSpeed / 1000 + 's',
			'-moz-transition': '-moz-transform ' + App.appView.animationSpeed / 1000 + 's',
			'-ms-transition': '-ms-transform ' + App.appView.animationSpeed / 1000 + 's',
			'transition': 'transform ' + App.appView.animationSpeed / 1000 + 's'
		});

		this.navigate(App.Routes[frame].route, {
			trigger: false
		});

		self.setOverlayColor(frame);

		// Close all accordions
		var $accordionBtn = App.appView.$('.js-accordionBtn'),
			$accordion = App.appView.$('.js-accordion'),
			$content = $accordion.find('.js-accordionContent'),
			$plus = $accordion.find('.js-accordionPlus'),
			$minus = $accordion.find('.js-accordionMinus');

		$accordionBtn.removeClass('expanded');
		$content.slideUp('fast');
		$plus.show();
		$minus.hide();

		console.info('Set route: ' + App.Routes[frame].route + ' #' + frame);
		console.timeEnd('Router setActiveFrame');
	},
	getRouteId: function (routeName) {
		var pageId = null;
		_.find(App.Routes, function (route, i) {
			if (route.route === routeName) {
				pageId = i;
				return route;
			}
		});

		return pageId;
	},
	setOverlayColor: function (frame) {
		App.appView.$('.js-colorOverlay').css({
			'background-color': App.Routes[frame].color,
			'background': 'url(' + App.Routes[frame].img + ')'
		});
	},
	setBreadcrumbs: function () {
		console.info('Add crumb');

		var $breadcrumbs = App.appView.$('.js-breadcrumbs'),
			crumbsArray = Backbone.history.fragment.split('/'),
			schoolId = crumbsArray[1],
			teacherId = crumbsArray[3];

		App.breadcrumbsCollection.reset();

		console.log(crumbsArray[1]);

		_.each(crumbsArray, function (crumb, index) {
			switch (index) {
			case 0:
				App.breadcrumbsCollection.add({
					name: 'Школы танцев',
					link: '#schools'
				});
				break;
			case 1:
				App.breadcrumbsCollection.add({
					name: 'Школа №' + schoolId,
					link: '#schools/' + schoolId
				});
				break;
			case 2:
				if (crumb === 'photo') {
					App.breadcrumbsCollection.add({
						name: 'Фото школы №' + schoolId,
						link: '#schools/' + schoolId + '/photo'
					});
				}
				if (crumb === 'video') {
					App.breadcrumbsCollection.add({
						name: 'Видео школы №' + schoolId,
						link: '#schools/' + schoolId + '/video'
					});
				}
				if (crumb === 'schedule') {
					App.breadcrumbsCollection.add({
						name: 'Расписание школы №' + schoolId,
						link: '#schools/' + schoolId + '/schedule'
					});
				}
				if (crumb === 'teachers') {
					App.breadcrumbsCollection.add({
						name: 'Преподаватели',
						link: '#schools/' + schoolId + '/teachers'
					});
				}
				break;
			case 3:
				App.breadcrumbsCollection.add({
					name: 'Преподаватель №' + teacherId,
					link: '#schools/' + schoolId + '/teachers/' + teacherId
				});
				break;
			}
		});
		var breadcrumbsData = {
			breadcrumbs: App.breadcrumbsCollection.toJSON()
		};
		var rendered = Mustache.render(this.breadcrumbsTemplate, breadcrumbsData);
		$breadcrumbs.html(rendered);
	},
	home: function () {
		var id = this.getRouteId('home');
		this.setActiveFrame(id);
		App.appView.currentFrame = id;

		// Replay logo animation
		var $logoAnimation = App.appView.$('.js-logoAnimation'),
			gifUrl = $logoAnimation.data('url');
		$logoAnimation.attr('src', gifUrl);
	},
	resume: function () {
		var id = this.getRouteId('resume');
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
	},
	show: function () {
		var id = this.getRouteId('show');
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
	},
	schools: function () {
		var id = this.getRouteId('schools'),
			crumb = {
				link: App.Routes[id].route,
				name: 'Школы танцев'
			};

		this.setBreadcrumbs();
		this.setActiveFrame(id);
		App.appView.currentFrame = id;

		console.log('all schools');
	},
	school: function (schoolId) {
		var id = this.getRouteId('schools'),
			crumb = {
				link: App.Routes[id].route + '/' + schoolId,
				name: 'School #' + schoolId
			};


		this.setBreadcrumbs();


		this.setActiveFrame(id);
		App.appView.currentFrame = id;
		// Set route
		this.navigate(App.Routes[id].route + '/' + schoolId, {
			trigger: false
		});
		console.log('current school is: ' + schoolId);
	},
	schoolPhoto: function (schoolId) {
		var id = this.getRouteId('schools');
		this.setActiveFrame(id);
		this.setBreadcrumbs();
		App.appView.currentFrame = id;
		// Set route
		this.navigate(App.Routes[id].route + '/' + schoolId + '/photo', {
			trigger: false
		});
		console.log('Photo of school number: ' + schoolId);
	},
	schoolSchedule: function (schoolId) {
		var id = this.getRouteId('schools');
		this.setBreadcrumbs();
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
		// Set route
		this.navigate(App.Routes[id].route + '/' + schoolId + '/schedule', {
			trigger: false
		});
		console.log('Schedule of school number: ' + schoolId);
	},
	schoolVideo: function (schoolId) {
		var id = this.getRouteId('schools');
		this.setBreadcrumbs();
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
		// Set route
		this.navigate(App.Routes[id].route + '/' + schoolId + '/video', {
			trigger: false
		});
		console.log('Video of school number: ' + schoolId);
	},
	schoolTeachers: function (schoolId) {
		var id = this.getRouteId('schools');
		this.setBreadcrumbs();
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
		// Set route
		this.navigate(App.Routes[id].route + '/' + schoolId + '/teachers', {
			trigger: false
		});
		console.log('Teachers of school number: ' + schoolId);
	},
	schoolTeacher: function (schoolId, teacherId) {
		var id = this.getRouteId('schools');
		this.setBreadcrumbs();
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
		// Set route
		this.navigate(App.Routes[id].route + '/' + schoolId + '/teachers/' + teacherId, {
			trigger: false
		});
		console.log('Teacher: ' + teacherId + ' of school number: ' + schoolId);
	},
	gallery: function () {
		var id = this.getRouteId('gallery');
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
	},
	news: function () {
		var id = this.getRouteId('news');
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
	},
	contacts: function () {
		var id = this.getRouteId('contacts');
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
	}
});
