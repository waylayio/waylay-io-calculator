/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var billing = {
		requestCharge: 0.0000001,
		chargeGBSecond: 0.00002,
		taskTransitions: 0.000025,
		taskLogCost: 5,
		networkEgress: parseFloat(0.15/10000000),
		messages: parseFloat(0.3/1000000),
		assets: parseFloat(0.2/1000),
		alarms: parseFloat(1/10000),
		metricsScanned: parseFloat(0.06/100000),
		metricsStored: parseFloat(25/15000000),
		dbResourceSizeCost: 25,
		objectDbSizeCost: 25,
		objectReads: 0.15,
		objectWrites: 0.15,
		mlCost: 1,
		mqttBroker: 100,
		mqttDevice: 0.2,
		coupon: 0
	}

	var settings = {
			parallax: true,
		// Parallax factor (lower = more intense, higher = less intense).
			parallaxFactor: 20
	};

	skel.breakpoints({
		xlarge: '(max-width: 1800px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var $window = $(window),
			$body = $('body'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Touch?
			if (skel.vars.mobile) {

				// Turn on touch mode.
					$body.addClass('is-touch');

				// Height fix (mostly for iOS).
					window.setTimeout(function() {
						$window.scrollTop($window.scrollTop() + 1);
					}, 0);

			}

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Header.

			// Parallax background.

				// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
					if (skel.vars.browser == 'ie'
					||	skel.vars.mobile)
						settings.parallax = false;

				if (settings.parallax) {

					skel.on('change', function() {

						if (skel.breakpoint('medium').active) {

							$window.off('scroll.strata_parallax');
							$header.css('background-position', 'top left, center center');

						}
						else {

							$header.css('background-position', 'left 0px');

							$window.on('scroll.strata_parallax', function() {
								$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
							});

						}

					});

				}

		// Main Sections: Two.

			// Lightbox gallery.
				$window.on('load', function() {

					$('#two').poptrox({
						caption: function($a) { return $a.next('h3').text(); },
						overlayColor: '#2c2c2c',
						overlayOpacity: 0.85,
						popupCloserText: '',
						popupLoaderText: '',
						selector: '.work-item a.image',
						usePopupCaption: true,
						usePopupDefaultStyling: false,
						usePopupEasyClose: false,
						usePopupNav: true,
						windowMargin: (skel.breakpoint('small').active ? 0 : 50)
					});

				});

				function calculateCost() {
					var result = {
							totalCost: 0
					};

					var numberOfExecutions = $('#number-executions').val() || 0
					var executedEstimationTime = $('#executed-estimation-time').val() || 0
					var memory = $('#memory').val() || 0
					var taskTransitions = $('#task-transitions').val() || 0
					var taskLogs = $('#task-logs').val() || 0
					var messages = $('#messages').val() || 0
					var alarms = $('#alarms').val() || 0
					var assets = $('#assets').val() || 0
					var devices = $('#devices').val() || 0
					var metricsStored = $('#metrics-stored').val() || 0
					var metricsScanned = $('#metrics-scanned').val() || 0
					var ml = $('#ml').val() || 0
					var resourceDbSize = $('#resource-db').val() || 0
					var objectDbSize = $('#object-db').val() || 0
					var objectReads = $('#object-reads').val() || 0
					var objectWrites = $('#object-writes').val() || 0
					var mqtt = $('input[type=radio][name=mqtt]:checked').val();

					if(mqtt == 'true'){
							result.brokerCost = parseFloat(billing.mqttBroker)
					}


					var billableRequests = numberOfExecutions;
					var requestCost = billableRequests * (billing.requestCharge);
					result.requestCost = parseFloat(requestCost);
			
					var totalComputeInSeconds = numberOfExecutions * (executedEstimationTime / 1000);
					var totalComputeGBSeconds = totalComputeInSeconds * (memory/1024);

					var billableCompute = totalComputeGBSeconds * billing.chargeGBSecond;
					result.executionCost = parseFloat(billableCompute);
			
					var billableTaskTransitions = parseFloat(taskTransitions) * billing.taskTransitions
					result.taskTransitionsCost = parseFloat(billableTaskTransitions)

					var billableTaskLogs = parseFloat(taskLogs) * billing.taskLogCost
					result.taskLogCost = parseFloat(billableTaskLogs)

					var billableMessages = messages * billing.messages;
					result.messagesCost = parseFloat(billableMessages);
			
					var billableAlarms = alarms * billing.alarms;
					result.alarmsCost = parseFloat(billableAlarms);
			
					var billableAssets = assets * billing.assets;
					result.assetsCost = parseFloat(billableAssets);

					var billableDevices = devices * billing.mqttDevice;
					result.devicesCost = parseFloat(billableDevices);

					var billableML = ml * billing.mlCost;
					result.mlCost = parseFloat(billableML);

					var billableResouceDbSize = resourceDbSize * billing.dbResourceSizeCost;
					result.resourceDbSizeCost = parseFloat(billableResouceDbSize);

					var billableObjectDbSize = objectDbSize * billing.objectDbSizeCost;
					result.objectDbSizeCost = parseFloat(billableObjectDbSize);

					var billableObjectReads = objectReads * billing.objectReads;
					result.objectReadsCost = parseFloat(billableObjectReads);

					var billableObjectWrites = objectWrites * billing.objectWrites;
					result.objectWritesCost = parseFloat(billableObjectWrites);

					var billableMetricsStored = metricsStored * billing.metricsStored;
					result.metricsStoredCost = parseFloat(billableMetricsStored);

					var billableMetricsScanned = metricsScanned * billing.metricsScanned
					result.metricsScannedCost = parseFloat(billableMetricsScanned);

			
					result.totalCost = Object.values(result).reduce((a, b) => a + b);
					if (result.totalCost > billing.coupon) {
						 result.totalCost -= parseFloat(billing.coupon);
					} else if (result.totalCost < billing.coupon) {
						 result.totalCost = 0
					}

					return result;
				}

			function Update() {
				var result = calculateCost();
				if (result.totalCost !== undefined) {
						$('#total-cost').text(parseFloat(result.totalCost).toFixed(1));
				}

			}
			$('.myClass').on('input propertychange paste', function(result, value) {
				Update();
			});
	});

})(jQuery);
