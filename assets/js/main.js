/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
		$.urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (results==null) {
	       return null;
	    }
	    return decodeURI(results[1]) || 0;
	}
	function splitCamelCaseToString(s) {
		    return s.split(/(?=[A-Z])/).map(function(p) {
		        return p.charAt(0).toUpperCase() + p.slice(1);
		    }).join(' ');
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
	  $("#dialog").dialog({
	    autoOpen : false, 
	    modal : true, 
	    show : "blind", 
	    hide : "blind",
	    minWidth: 600
	  });
			$("#wizard1").steps({
    transitionEffect: "slideLeft",
    autoFocus: true,
    stepsOrientation: 'vertical',
    onFinished: function (event, currentIndex) {
    	window.location.href = "#costtable"
  		}
  	});
			$("#wizard2").steps({
    enableFinishButton: false, 
    enablePagination: false, 
    enableAllSteps: true,
    stepsOrientation: 'vertical'
			});
			$( "#tabs" ).tabs();
			$('#more-info').hide();

			 $('#volume1').text('More than ' + discounts[0][0] + "$")
    $('#discount1').text('' + discounts[0][1] * 100 + '%')
    $('#volume2').text('More than ' + discounts[1][0] + "$")
    $('#discount2').text('' + discounts[1][1] * 100 + '%')
    $('#volume3').text('More than ' + discounts[2][0] + "$")
    $('#discount3').text('' + discounts[2][1] * 100 + '%')

			if($.urlParam('wizard')){
				$('#simul-messages').val($.urlParam('messages'))
			 $('#simul-devices').val($.urlParam('devices'))
				recalc()
			} else {
					$('#number-executions').val($.urlParam('functions'))
					$('#executed-estimation-time').val($.urlParam('function_time') || 100)
					$('#task-transitions').val($.urlParam('steps'))
					$('#messages').val($.urlParam('messages'))
			  $('#assets').val($.urlParam('devices'))
			  $('#devices').val($.urlParam('devices'))
			  $('#alarms').val($.urlParam('alarms'))
					update()
			}
					
			

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

				function recalc() {
						var simDevices = parseFloat($('#simul-devices').val()) || 0
						var simMessages = parseFloat($('#simul-messages').val()) || 0
						var simReactive = parseFloat($('#simul-reactive').val()) || 0
						var simPolling = parseFloat($('#simul-polling').val()) || 0
						var simBYOML = parseFloat($('#simul-byoml').val()) || 0
						var simQuery = parseFloat($('#simul-query').val()) || 0
						$('#assets').val(simDevices)

						if(simDevices && simMessages) {
							const messages = simDevices*simMessages * 24 * 30
							const THR = 0.15  //how often it would trigger
							const NUM_SENSORS = 3 // average number of polling sensors in one task
							const POLLING = 96 //15 minutes polling per day
							const METRICS_PAYLOAD = 3 // average number of metrics in payload
							const Q_POINTS = 200 // average number of metrics scanned in one API call
							const PAYLOAD_BYTES = 100 // average payload size
							const LOGS_CONST = 1000000 // 1 milion executions per GB
							const RESOURCE_BYTES = 500 // average meta size
							var reactiveFunctions = simReactive * messages * THR
							var pollingFunctions = simPolling * simDevices * NUM_SENSORS * POLLING * 30
							var byomlPFunctions = simBYOML * simDevices * NUM_SENSORS * POLLING * 30
							var byomlTime = simBYOML * simDevices * POLLING * 30 * 0.5 / 60
							var metricsScanned = simQuery * Q_POINTS * 30 * simDevices + simBYOML * simDevices * POLLING * 30 
							var payloadDb = parseFloat(simDevices * PAYLOAD_BYTES * 100 / 1024 / 1024 / 1024).toFixed(3)
							var resourceDb = parseFloat(simDevices * RESOURCE_BYTES / 1024 / 1024 / 1024).toFixed(3)
							var taskLogs = parseFloat(simDevices * PAYLOAD_BYTES * 100 / 1024 / 1024 / 1024).toFixed(3)
							var executions = reactiveFunctions + pollingFunctions + byomlPFunctions
							var taskLogs = executions / LOGS_CONST 
							var mqtt = $('input[type=radio][name=mqtt1]:checked').val();
							if(mqtt == 'true'){
									$('#devices').val(simDevices)
									$('input[type=radio][name=mqtt]').filter('[value=true]').prop('checked', true)
									$('input[type=radio][name=mqtt]').filter('[value=false]').prop('checked', false)
							} else {
								$('#devices').val('0')
									$('input[type=radio][name=mqtt]').filter('[value=true]').prop('checked', false)
									$('input[type=radio][name=mqtt]').filter('[value=false]').prop('checked', true)
							}
							$('#messages').val(messages)
							$('#payload-db').val(payloadDb) 
							$('#resource-db').val(resourceDb)
							$('#metrics-stored').val(messages * METRICS_PAYLOAD)
							$('#number-executions').val(executions)
							$('#executed-estimation-time').val(150)
							$('#task-transitions').val(reactiveFunctions + pollingFunctions + byomlPFunctions) 
							$('#ml').val(parseFloat(byomlTime).toFixed(1))
							$('#metrics-scanned').val(metricsScanned)
							$('#task-logs').val(parseFloat(taskLogs).toFixed(2)) 
						} else {
							$('input[type=radio][name=mqtt]').filter('[value=true]').prop('checked', false)
							$('input[type=radio][name=mqtt]').filter('[value=false]').prop('checked', true)						
							$('#messages').val(0)
							$('#payload-db').val(0) 
							$('#resource-db').val(0)
							$('#metrics-stored').val(0)
							$('#metrics-scanned').val(0)
						}
						update()
				}

				function recalcUseCase() {
						var lpwanDevices = parseFloat($('#useCase-lpwan-devices').val()) || 0
						var simReactive = parseFloat($('#useCase-stream-rules').val()) || 0
						var simPolling = parseFloat($('#useCase-polling-rules').val()) || 0
						var simBYOML = parseFloat($('#useCase-byoml').val()) || 0
						var simQuery = 10
						var lpwanMessages = lpwanDevices * 4 * 24 * 30 //4 per hour per LPWAN

						var ot_assets = parseFloat($('#useCase-assets').val()) || 0
						var ot_polling = parseFloat($('#useCase-polling').val()) || 0
						var ot_messages = (ot_assets * 86400 * 24 * 30) // every second new message
						simPolling += ot_polling
						simDevices = ot_assets + lpwanDevices

						var api_tasks = parseFloat($('#useCase-tasks').val()) || 0

						const messages = lpwanMessages + ot_messages
						const THR = 0.15  //how often it would trigger
						const NUM_SENSORS = 3 // average number of polling sensors in one task
						const POLLING = 96 //15 minutes polling per day
						const API_POLLING = 24 //Once an hour
						const METRICS_PAYLOAD = 3 // average number of metrics in payload
						const PAYLOAD_BYTES = 100 // average payload size
						const LOGS_CONST = 1000000 // 1 milion executions per GB
						const RESOURCE_BYTES = 500 // average meta size
						const Q_POINTS = 200 // average number of metrics scanned in one API call

						var reactiveFunctions = simReactive * messages * THR
						var webscripts = lpwanMessages * 2 //transformers too
						var pollingFunctions = simPolling * simDevices * NUM_SENSORS * POLLING * 30 + api_tasks * API_POLLING * 30 
						var byomlPFunctions = simBYOML * simDevices * NUM_SENSORS * POLLING * 30
						var byomlTime = simBYOML * simDevices * POLLING * 30 * 0.5 / 60
						var metricsScanned = simQuery * Q_POINTS * 30 * simDevices + simBYOML * simDevices * POLLING * 30 
						var payloadDb = parseFloat(simDevices * PAYLOAD_BYTES * 100 / 1024 / 1024 / 1024).toFixed(3)
						var resourceDb = parseFloat(simDevices * RESOURCE_BYTES / 1024 / 1024 / 1024).toFixed(3)
						var taskLogs = parseFloat(simDevices * PAYLOAD_BYTES * 100 / 1024 / 1024 / 1024).toFixed(3)
						var executions = reactiveFunctions + pollingFunctions + byomlPFunctions
						var taskLogs = executions / LOGS_CONST 
						$('#assets').val(simDevices)
						$('#messages').val(messages)
						$('#payload-db').val(payloadDb) 
						$('#resource-db').val(resourceDb)
						$('#metrics-stored').val(messages * METRICS_PAYLOAD)
						$('#number-executions').val(executions + webscripts)
						$('#executed-estimation-time').val(150)
						$('#task-transitions').val(reactiveFunctions + pollingFunctions + byomlPFunctions) 
						$('#ml').val(parseFloat(byomlTime).toFixed(1))
						$('#metrics-scanned').val(metricsScanned)
						$('#task-logs').val(parseFloat(taskLogs).toFixed(2)) 
						update()
				}

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
					var payloadDbSize = $('#payload-db').val() || 0
					var payloadReads = $('#payload-reads').val() || 0


					var mqtt = $('input[type=radio][name=mqtt]:checked').val();

					if(mqtt == 'true'){
							result.mqttBrokerCost = parseFloat(billing.mqttBrokerprice.price)
					} else {
							devices = 0
							$('#devices').val('0')
					}

					result.tenantCost = billing.tenant.price

					var billableRequests = numberOfExecutions;
					var requestCost = billableRequests * (billing.requestCharge.price);
					result.executionRequestCost = parseFloat(requestCost);
			
					var totalComputeInSeconds = numberOfExecutions * (executedEstimationTime / 1000);
					var totalComputeGBSeconds = totalComputeInSeconds * (memory/1024);

					var billableCompute = totalComputeGBSeconds * billing.chargeGbSecond.price;
					result.executionComputeCost = parseFloat(billableCompute);
			
					var billableTaskTransitions = parseFloat(taskTransitions) * billing.taskTransitions.price
					result.taskTransitionsCost = parseFloat(billableTaskTransitions)

					var billableTaskLogs = parseFloat(taskLogs) * billing.taskLogCost.price
					result.taskLogCost = parseFloat(billableTaskLogs)

					var billableMessages = messages * billing.messages.price
					result.messagesCost = parseFloat(billableMessages);
			
					var billableAlarms = alarms * billing.alarms.price
					result.alarmsCost = parseFloat(billableAlarms);
			
					var billableAssets = assets * billing.assets.price
					result.assetsCost = parseFloat(billableAssets);

					var billableDevices = devices * billing.mqttDevice.price
					result.mqttDevicesCost = parseFloat(billableDevices);

					var billableML = ml * billing.mlCost.price
					result.machineLearningCost = parseFloat(billableML);

					var billableResouceDbSize = resourceDbSize * billing.dbResourceSizeCost.price
					result.resourceDatabaseCost = parseFloat(billableResouceDbSize);

					var billableObjectDbSize = objectDbSize * billing.objectDbSizeCost.price
					result.objectSizeCost = parseFloat(billableObjectDbSize);

					var billableObjectReads = objectReads * billing.objectReads.price
					result.objectReadsCost = parseFloat(billableObjectReads);

					var billableObjectWrites = objectWrites * billing.objectWrites.price
					result.objectWritesCost = parseFloat(billableObjectWrites);

					var billableMetricsStored = metricsStored * billing.metricsStored.price
					result.metricsStoredCost = parseFloat(billableMetricsStored);

					var billableMetricsScanned = metricsScanned * billing.metricsScanned.price
					result.metricsScannedCost = parseFloat(billableMetricsScanned);

					var billablePayloadDbSize = payloadDbSize * billing.payloadDbSizeCost.price
					result.payloadDatabaseCost = parseFloat(billablePayloadDbSize);

					var billablePayloadReads = payloadReads * billing.payloadReads.price
					result.payloadReadsCost = parseFloat(billablePayloadReads);

					result.totalCost = Object.values(result).reduce((a, b) => a + b);
					/*if (result.totalCost > billing.coupon.price) {
						 result.totalCost -= parseFloat(billing.coupon.price);
					} else if (result.totalCost < billing.coupon.price) {
						 result.totalCost = 0
					}*/

					return result;
				}

			function update() {
				var result = calculateCost()
				if(result.totalCost > ENTERPRISE_THR) {
					$("#dialog").dialog("open")
				}
				$('#discount').text('0%')
				if (result.totalCost !== undefined) {
					for (var i = 0; i < discounts.length; i++) {
						  if(result.totalCost > discounts[i][0]) {
						  	var discount = result.totalCost * discounts[i][1]
						  	$('#discount').text('' + 100 * discounts[i][1] + '%')
				 				result.totalCost = result.totalCost - discount
				 			 break; //doesn't work for forEach
				 			}
					}	

					 $('#more-info').show();
						$('#total-cost').text(parseFloat(result.totalCost).toFixed(2))
						$('#total-cost1').text(parseFloat(result.totalCost).toFixed(2))
						$('#estimation tbody').empty();
						$('#estimation').append('<tr><td>Item</td><td>Cost</td></tr>')
						Object.keys(result).forEach(function(key){
						if(key !== 'totalCost' && result[key])
					  $('#estimation').append('<tr><td>'+ splitCamelCaseToString(key)+'</td><td>'+ '$' + parseFloat(result[key]).toFixed(2) + '</td></tr>')
					})
						$('#billing tbody').empty();
						$('#billing').append('<tr><td>Item</td><td>Cost')
						Object.keys(billing).forEach(function(key){
						 $('#billing').append('<tr><td>'+ billing[key].metricName + ' [' + billing[key].unit + '] </td><td> $'+ billing[key].price + '</td></tr>')
					})
				} else {
					$('#more-info').hide();
				}


			}
			$('.myClass').on('input propertychange paste', function(result, value) {
				update();
			});

			$('.myClass1').on('input propertychange paste', function(result, value) {
				recalc()
			});

			$('.myClass2').on('input propertychange paste', function(result, value) {
				recalcUseCase()
			});
	});

})(jQuery);
