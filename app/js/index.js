function autoScroll(obj){  
	$(obj).find("ul").animate({  
		marginTop : "-39px"  
	},500,function(){  
		$(this).css({marginTop : "0px"}).find("li:first").appendTo(this);  
	})  
}

$(function(){
	var iFunctions = {};

	iFunctions = {
		init: function(){
			iFunctions.globalFuc();
		},
		globalFuc: function(){
			iFunctions.tabsFuc();
			iFunctions.add_phone_num();
			iFunctions.choose_type();
			iFunctions.toggle_modal();
			iFunctions.browse_distribution();			
			iFunctions.closeModal();
			iFunctions.personalFuc();
			iFunctions.intelligent_service();

			$('.close_win_btn').on('click', function(e){
				e.preventDefault();

				$('.g_wrapper').hide();
			});
		},
		tabsFuc: function(){//按钮页面切换
			var $nav_btn = $('.nav_btn'),
				count = 1;

			$nav_btn.on('click', function(e){
				e.preventDefault();

				var self = this;

				if($(self).attr('data-show')=='#block5'){
					$(self).attr('flag') ? $(self).attr('flag', $(self).attr('flag')+1) : $(self).attr('flag', count++);
				}

				if($(self).hasClass('active')){
					return false
				} else {
					$(self).addClass('active').siblings().removeClass('active');

					if($(self).attr('data-show')=='#block2') {
						$($(self).attr('data-show')).siblings().hide().end().show();
					} else {
						
						//$('.gl_loading').removeClass('hide');
						$('.gl_loading').show();
						if($(self).attr('data-show')=='#block5' && $(self).attr('flag')>1){							
							$('.gl_loading').css('background','transparent');
							$($(self).attr('data-show')).siblings().hide().end().fadeIn();
							setTimeout(function(){
								//$('.gl_loading').addClass('hide');								
								$('.gl_loading').fadeOut();								
							},1000);
						}else {
							$('.gl_loading').css('background','#fff');
							$($(self).attr('data-show')).siblings().hide().end().fadeIn();
							setTimeout(function(){
								//$('.gl_loading').addClass('hide');	
								$('.gl_loading').fadeOut();							
							},1000);
						}						
					}						

					iFunctions.resetPageFuc();					
				}
			});
		},
		resetPageFuc: function(){//页面重置
			$('.tabs_block').find('.g_modal_wrp').addClass('hide').css({'width':0,'height':0});

			$('.speed_test_loading,.test_loading').removeClass('hide');
			$('.speed_test_cont,.test_result').addClass('hide');
		},
		add_phone_num: function(){
			$(document).on('click','.reduce',function(){
				var phone_num=$(this).next().text();
				
				if(phone_num>=1){
					var new_phone_num=phone_num-1;
					$(this).next().text(new_phone_num);
				}
			})
			$(document).on('click','.add',function(){
				var phone_num=parseInt($(this).prev().text());
				
				if(phone_num>=0){
					var new_phone_num=phone_num+1;
					$(this).prev().text(new_phone_num);
				}
			})
		},
		choose_type: function(){
			$(document).on('click','.renew_long_choose',function(){
				$(this).addClass('active').siblings().removeClass('active');
			})
		},
		toggle_modal: function(){ 
			$(document).on('click','.closed',function(){
				$('.bill_black_wrapper').addClass('hide');
				$('.close_win_btn').removeClass('gray_bac');
			})
			$(document).on('click','.see_more',function(){
				$('.close_win_btn').addClass('gray_bac');
				$('.bill_black_wrapper').removeClass('hide');
			})
		},
		browse_distribution: function(){//上网浏览分布图表
			$('#containers').highcharts({
		        chart: {
		            type: 'bar'
		        },
		        title: {
		            text: '上网浏览分布',
		            align: 'left'
		        },
		        xAxis: {
		            categories: ['影视', '游戏', '网购', '旅游', '音乐', '运动', '美食', '阅读'],
		            title: {
		                text: null
		            },
		            tickWidth:0,
		            gridLineWidth: 0,
		            lineWidth: 0
		        },
		        yAxis: {
		            gridLineWidth: 0,
		            lineWidth: 0,
		            labels:{
		                enabled:false
		            },
		            title:{
		                enabled:false
		            }
		        },
		        tooltip: {
		            enabled: false
		        },
		        plotOptions: {
		            bar: {
		                dataLabels: {
		                    enabled: true
		                }
		            },
		            series: {
		                borderWidth: 0,
		                dataLabels: {
		                    enabled: true,
		                    format: '{point.y:.1f}%'
		                },
		                point: {
		                    events: {
		                        mouseOver: function (event) {
		                        	var index = event.target.index;
		                            
		                        	$('.right_box_block').eq(index).show().siblings().hide();
		                        }
		                    }
		                }
		            }
		        },
		        credits: {
		            enabled: false
		        },
		        legend: {
		            enabled: false
		        },
		        series: [{
		            data : [{
		                color : "#ffc435",
		                y : 34
		            }, {
		                color : "#56cb06",
		                y : 19
		            },{
		                color : "#56cb06",
		                y : 17
		            },{
		                color : "#56cb06",
		                y : 13
		            },{
		                color : "#56cb06",
		                y : 12
		            },{
		                color : "#56cb06",
		                y : 8
		            },{
		                color : "#56cb06",
		                y : 6
		            },{
		                color : "#9a9a9a",
		                y : 4
		            },]
		        }]
		    });
			/*$(document).on('mouseover','.highcharts-point',function(){
				$(this).parents('.habit_box').next().removeClass('hide');
			})
			$(document).on('mouseleave','.highcharts-point',function(){
				$(this).parents('.habit_box').next().addClass('hide');
			})*/

		},				
		closeModal: function(){ //弹窗关闭
			$(document).on('click', '.close_btn', function(e){
				e.preventDefault();

				$(this).parents('.g_modal_wrp').animate({							
					'height': 0,
					'width': 0
					},
					200, function() {
					/* stuff to do after animation is complete */
					$(this).addClass('hide');
				});

				$('.speed_test_loading,.test_loading').removeClass('hide');
				$('.speed_test_cont,.test_result').addClass('hide');
			});
		},
		personalFuc: function(){ //我的宽带
			/*编辑个人资料*/
			$('.setting_btn').on('click', function(){
				$('.personal_setting_wrp').fadeIn();
				$('.close_win_btn').addClass('gray_bac');
			});

			$('.info_edit_btn').on('click', function(e){
				e.preventDefault();

				$('.user_info').addClass('hide');
				$('.user_info_editing').removeClass('hide');
			});

			$('.edit_cancel_btn').on('click', function(e){
				e.preventDefault();

				$('.user_info').removeClass('hide');
				$('.user_info_editing').addClass('hide');
				$('.user_info_editing input').val('');
				$('.user_info_editing textarea').val('');
			});

			$('.close_personal_btn').on('click', function(e){
				e.preventDefault();

				$('.personal_setting_wrp').fadeOut();
				$('.user_info').removeClass('hide');
				$('.user_info_editing').addClass('hide');
				$('.user_info_editing input').val('');
				$('.user_info_editing textarea').val('');
				$('.close_win_btn').removeClass('gray_bac');
			});

			$('.user_info_editing .avatar_upload').on('click', function(){
				//上传图片
			});			

			/*点击测速*/
			$('#block1 .speed_test_btn').on('click', function(e){
				e.preventDefault();
				var $ele = $('#block1').find('.speed_test_wrp');

				$ele.removeClass('hide');
				$ele.animate({							
					'width': '928px',
					'height': '492px'
					},
					200, function() {
					/* stuff to do after animation is complete */		
					setTimeout(function(){
						$ele.find('.speed_test_loading').addClass('hide');
						$ele.find('.speed_test_cont').removeClass('hide');
					},3000)
				});
			});

			/*点击查看套餐*/
			$('.see_packges').on('click',function(e){
				e.preventDefault();
				var $ele = $(this).parents('#block1').find('.user_no_renew_wrp');

				$ele.removeClass('hide');
				$ele.animate({							
					'width': '928px',
					'height': '492px'
					},200)
			})

			//点击查看账单
			$('.see_bill').on('click',function(){

				$(this).parents('#block1').hide();
				$('#block5').show();
				$('.tabs ul li:first').removeClass('active');
				$('.tabs ul li:last').addClass('active').attr('flag',2);
				/*var $ele = $(this).parents('.tabs_block_wrp').siblings('#block5');
				$(this).parents('#block1').addClass('hide');
				$('#block5').show();
				$(this).parents('.tabs ul').firstChild().removeClass('active');*/
				
			})

			//点击查看时长
			$('.see_usetime').on('click',function(e){
				e.preventDefault();
				var $ele = $('#block1').find('.surfing_like_wrp');

				$ele.removeClass('hide');
				$ele.animate({							
					'width': '928px',
					'height': '492px'
					},200,function(){
						setTimeout(function(){
							$ele.find('.test_loading').addClass('hide');
							$ele.find('.test_result').removeClass('hide');
						},3000)
					})
			})

			//点击查看成长轨迹
			$('.my_groupup').on('click',function(e){
				e.preventDefault();
				var $ele = $('#block1').find('.grow_history_wrp');

				$ele.removeClass('hide');
				$ele.animate({							
					'width': '928px',
					'height': '492px'
					},200)
			})

			//点击我要提速
			$('.speed_up_btn').on('click',function(){
				$(this).parents('#block1').hide();
				$(this).parents('#block2').hide();
				$('#block4').show();
				$('#block4 .old_increase_speed').removeClass('hide');
				$('#block4 .quickly_renew').addClass('hide');
				$('#block4 .package_type').addClass('hide');
				$('.tabs ul li:first').removeClass('active');
				$('.tabs ul li:eq(1)').removeClass('active');
				$('.tabs ul li:eq(3)').addClass('active');
			})

			//点击我要续约
			$('.renew_it').on('click',function(){
				$(this).parents('#block1').hide();
				$('#block4').show();
				$('#block4 .quickly_renew').removeClass('hide');
				$('#block4 .old_increase_speed').addClass('hide');
				$('#block4 .package_type').addClass('hide');
				$('.tabs ul li:first').removeClass('active');
				$('.tabs ul li:eq(3)').addClass('active');
			})

			/*$(document).on('mousewheel','.no_renew_cont',function(event, delta){
				var dir = delta > 0 ? 'Up' : 'Down';
				if (dir == 'Down') {
					$(this).find('.package_cont_ul').animate({  
						marginTop : "-134px"  
					},function(){  
						$(this).css({marginTop : "0px"}).find("li:first").appendTo(this);  
					}) 
				} else {
					$(this).find('.package_cont_ul').animate({  
						marginTop : "134px"  
					},function(){  
						$(this).css({marginTop : "0px"}).find("li:first").appendTo(this);  
					}) 
				}
				return false;
			})*/
			

			/*上网时长不含喜欢数据图表*/
			$('#surfing_graphi_wrp').highcharts({
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: '本周平均一天上网的时间分布(分钟)'
		        },
		        credits: {
		        	enabled: false   //设置右下角的商标链接
		        },
		        xAxis: {
		            categories: [
		                '7:00-10:00',
		                '10:00-19:00',
		                '19:00-23:00',
		                '23:00-03:00'
		            ],
		            tickWidth: 0,  //设置刻度的像素宽度（突出来的刻度）
		            lineColor: '#e9e9e9'
		        },
		        yAxis: [{
		            min: 0,     //设置刻度起始值
		            title: {
		            	text: null
		            },
		            tickInterval: 20,   //设置刻度间隔大小
		            lineWidth: 1,
		            lineColor: '#e9e9e9',
		            gridLineColor: '#e9e9e9'
		        	},{
		        		title: {
			            	text: null
			            },
		        		lineWidth: 1,
		        		lineColor: '#e9e9e9',
		        		opposite: true  
		        	}
		        ],
		        tooltip: {
		            /*headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
		            footerFormat: '</table>',
		            shared: true,
		            useHTML: true*/
		            enabled: false
		        },
		        plotOptions: {
		            column: {
		                pointPadding: 0.2,
		                borderWidth: 0
		            },
		            series: {
		                color: '#006bcf'
		            }
		        },
		        legend: {
		        	enabled: false
		        },
		        series: [{
		            name: '',
		            data: [39.9, 25, 4, 125],
		            enableMouseTracking: false //不允许鼠标动作
		        }]
		    });

			$('#surfing_graphi_wrp2').highcharts({
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: '本周平均一天上网的时间分布(分钟)'
		        },
		        credits: {
		        	enabled: false   //设置右下角的商标链接
		        },
		        xAxis: {
		            categories: [
		                '7:00-10:00',
		                '10:00-19:00',
		                '19:00-23:00',
		                '23:00-03:00'
		            ],
		            tickWidth: 0,  //设置刻度的像素宽度（突出来的刻度）
		            lineColor: '#e9e9e9'
		        },
		        yAxis: [{
		            min: 0,     //设置刻度起始值
		            title: {
		            	text: null
		            },
		            tickInterval: 20,   //设置刻度间隔大小
		            lineWidth: 1,
		            lineColor: '#e9e9e9',
		            gridLineColor: '#e9e9e9'
		        	},{
		        		title: {
			            	text: null
			            },
		        		lineWidth: 1,
		        		lineColor: '#e9e9e9',
		        		opposite: true  
		        	}
		        ],
		        tooltip: {
		            /*headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
		            footerFormat: '</table>',
		            shared: true,
		            useHTML: true*/
		            enabled: false
		        },
		        plotOptions: {
		            column: {
		                pointPadding: 0.2,
		                borderWidth: 0
		            },
		            series: {
		                color: '#006bcf'
		            }
		        },
		        legend: {
		        	enabled: false
		        },
		        series: [{
		            name: '',
		            data: [39.9, 25, 4, 125],
		            enableMouseTracking: false //不允许鼠标动作
		        }]
		    });

			/*上网时长含喜欢数据*/
			$('#surfing_graphi_wrp_left').highcharts({//上网时长喜欢数据图表
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: '本周平均一天上网的时间分布(分钟)'
		        },
		        credits: {
		        	enabled: false   //设置右下角的商标链接
		        },
		        xAxis: {
		            categories: [
		                '7:00-10:00',
		                '10:00-19:00',
		                '19:00-23:00',
		                '23:00-03:00'
		            ],
		            tickWidth: 0,  //设置刻度的像素宽度（突出来的刻度）
		            lineColor: '#e9e9e9'
		        },
		        yAxis: [{
		            min: 0,     //设置刻度起始值
		            title: {
		            	text: null
		            },
		            tickInterval: 20,   //设置刻度间隔大小
		            lineWidth: 1,
		            lineColor: '#e9e9e9',
		            gridLineColor: '#e9e9e9'
		        	},{
		        		title: {
			            	text: null
			            },
		        		lineWidth: 1,
		        		lineColor: '#e9e9e9',
		        		opposite: true  
		        	}
		        ],
		        tooltip: {
		            /*headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
		            footerFormat: '</table>',
		            shared: true,
		            useHTML: true*/
		            enabled: false
		        },
		        plotOptions: {
		            column: {
		                pointPadding: 0.2,
		                borderWidth: 0
		            },
		            series: {
		                color: '#006bcf'
		            }
		        },
		        legend: {
		        	enabled: false
		        },
		        series: [{
		            name: '',
		            data: [39.9, 25, 4, 125],
		            enableMouseTracking: false //不允许鼠标动作
		        }]
		    });
			$('#surfing_graphi_wrp_left2').highcharts({
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: '本周平均一天上网的时间分布(分钟)'
		        },
		        credits: {
		        	enabled: false   //设置右下角的商标链接
		        },
		        xAxis: {
		            categories: [
		                '7:00-10:00',
		                '10:00-19:00',
		                '19:00-23:00',
		                '23:00-03:00'
		            ],
		            tickWidth: 0,  //设置刻度的像素宽度（突出来的刻度）
		            lineColor: '#e9e9e9'
		        },
		        yAxis: [{
		            min: 0,     //设置刻度起始值
		            title: {
		            	text: null
		            },
		            tickInterval: 20,   //设置刻度间隔大小
		            lineWidth: 1,
		            lineColor: '#e9e9e9',
		            gridLineColor: '#e9e9e9'
		        	},{
		        		title: {
			            	text: null
			            },
		        		lineWidth: 1,
		        		lineColor: '#e9e9e9',
		        		opposite: true  
		        	}
		        ],
		        tooltip: {
		            /*headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
		            footerFormat: '</table>',
		            shared: true,
		            useHTML: true*/
		            enabled: false
		        },
		        plotOptions: {
		            column: {
		                pointPadding: 0.2,
		                borderWidth: 0
		            },
		            series: {
		                color: '#006bcf'
		            }
		        },
		        legend: {
		        	enabled: false
		        },
		        series: [{
		            name: '',
		            data: [39.9, 25, 4, 125],
		            enableMouseTracking: false //不允许鼠标动作
		        }]
		    });

			$('#surfing_graphi_wrp_right').highcharts({ //环形图
		        chart: {
		            type: 'pie'
		        },
		        title: {
		            text: '上网喜好'
		        },
		        credits: {
		        	enabled: false   //设置右下角的商标链接
		        },
		        plotOptions: {
		            pie: {
		            	size: 215,
		            	borderWidth: null,
		            	borderColor: null,
		                innerSize: 140,
		                colors:[
		                	'#f1f1f1',
		                	'#a9d86e',
		                	'#f8a20f',
		                	'#5faee3',
		                	'#9aaee7'
		                ],
		                center: [170, 100],
		                dataLabels: {
			            	enabled: false
			            },
			            showInLegend: true,  //是否显示图例
			            point : {
				            events : {
				                legendItemClick: function() {
				                    return false;
				                }
				            }
				        }
		            }
		        },
		        legend: {
		        	layout: 'vertical',
		            backgroundColor: 'transparent',
		            align: 'left',
		            verticalAlign: 'top',
		            floating: true,
		            symbolRadius: 0,
		            symbolWidth: 11,
		            symbolHeight: 11,
		            symbolPadding: 11,
		            itemMarginBottom: 8,
		            itemStyle: {
		                color: '#666666',
		                fontSize: 12,
		                fontWeight: 'normal'
		            },
		            itemHoverStyle: {
		                color: '#666666'
		            },
		            y: 35
		        },
		        series: [{
		            data: [
	            		['影视', 10],			            		
	            		['游戏' ,30], 
	            		['音乐', 30],
	            		['网购', 30]
		            ],
		            enableMouseTracking: false //不允许鼠标动作
		        }]
		    });

			$('#surfing_graphi_wrp_right2').highcharts({ //环形图
		        chart: {
		            type: 'pie'
		        },
		        title: {
		            text: '上网喜好'
		        },
		        credits: {
		        	enabled: false   //设置右下角的商标链接
		        },
		        plotOptions: {
		            pie: {
		            	size: 215,
		            	borderWidth: null,
		            	borderColor: null,
		                innerSize: 140,
		                colors:[
		                	'#f1f1f1',
		                	'#a9d86e',
		                	'#f8a20f',
		                	'#5faee3',
		                	'#9aaee7'
		                ],
		                center: [170, 100],
		                dataLabels: {
			            	enabled: false
			            },
			            showInLegend: true,  //是否显示图例
			            point : {
				            events : {
				                legendItemClick: function() {
				                    return false;
				                }
				            }
				        }
		            }
		        },
		        legend: {
		        	layout: 'vertical',
		            backgroundColor: 'transparent',
		            align: 'left',
		            verticalAlign: 'top',
		            floating: true,
		            symbolRadius: 0,
		            symbolWidth: 11,
		            symbolHeight: 11,
		            symbolPadding: 11,
		            itemMarginBottom: 8,
		            itemStyle: {
		                color: '#666666',
		                fontSize: 12,
		                fontWeight: 'normal'
		            },
		            itemHoverStyle: {
		                color: '#666666'
		            },
		            y: 35
		        },
		        series: [{
		            data: [
	            		['影视', 10],			            		
	            		['游戏' ,30], 
	            		['音乐', 30],
	            		['网购', 30]
		            ],
		            enableMouseTracking: false //不允许鼠标动作
		        }]
		    });
		},

		intelligent_service: function(){//智能服务页

			$(document).on('click','.share_btn',function(){
				$('.share_black').removeClass('hide');
				$('.close_win_btn').addClass('gray_bac');
			})
			$(document).on('click','.closed_code',function(){
				$(this).parents('.share_black').addClass('hide');
				$('.close_win_btn').removeClass('gray_bac');
			})

			//点击开始测试
			$('#block2 .speed_test_btn').on('click', function(e){
				e.preventDefault();
				var $ele = $('#block2').find('.speed_test_wrp');

				$ele.removeClass('hide');
				$ele.animate({							
					'width': '928px',
					'height': '492px'
					},
					200, function() {
					/* stuff to do after animation is complete */		
					setTimeout(function(){
						$ele.find('.speed_test_loading').addClass('hide');
						$ele.find('.speed_test_cont').removeClass('hide');
					},3000)
				});
			});

			//点击上网时长分析
			$('.surfing_test_btn').on('click',function(e){
				e.preventDefault();
				var $ele = $('#block2').find('.surfing_like_wrp');

				$ele.removeClass('hide');
				$ele.animate({							
					'width': '928px',
					'height': '492px'
					},
					200, function() {
					/* stuff to do after animation is complete */		
					setTimeout(function(){
						$ele.find('.test_loading').addClass('hide');
						$ele.find('.test_result').removeClass('hide');
					},3000)
				});
			})
		}
	};

	var networkService = (function(){
		iFunctions.init();
	}());		
});