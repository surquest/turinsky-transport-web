/*
 * Parallax Mouse Interaction v1.4
 *
 * Copyright 2012-2013, LambertGroup
 * 
*/


(function($) {

	function animate_singular_text(elem,current_obj,options) {
		  var ver_ie=getInternetExplorerVersion();
		  //elem.stop();
		  if (options.responsive) {
			  newCss='';
			  if (elem.css('font-size').lastIndexOf('px')!=-1) {
				  fontSize=elem.css('font-size').substr(0,elem.css('font-size').lastIndexOf('px'));
				  //alert (fontSize+'  -   '+fontSize/(options.origWidth/options.width));
				  newCss+='font-size:'+fontSize/(options.origWidth/options.width)+'px;';
				  
			  } else if (elem.css('font-size').lastIndexOf('em')!=-1) {
				  fontSize=elem.css('font-size').substr(0,elem.css('font-size').lastIndexOf('em'));
				  newCss+='font-size:'+fontSize/(options.origWidth/options.width)+'em;';
			  }
			  
			  if (elem.css('line-height').lastIndexOf('px')!=-1) {
				  lineHeight=elem.css('line-height').substr(0,elem.css('line-height').lastIndexOf('px'));
				  newCss+='line-height:'+lineHeight/(options.origWidth/options.width)+'px;';
			  } else if (elem.css('line-height').lastIndexOf('em')!=-1) {
				  lineHeight=elem.css('line-height').substr(0,elem.css('line-height').lastIndexOf('em'));
				  newCss+='line-height:'+lineHeight/(options.origWidth/options.width)+'em;';
			  }
			  
			  elem.wrapInner('<div class="newFS" style="'+newCss+'" />');
			  
		  }
  
		  var leftPos;
		  var topPos;
		  var opacity_aux;
  
		  leftPos=elem.attr('data-final-left');
		  topPos=elem.attr('data-final-top');
		  if (options.responsive) {
			  leftPos=parseInt(leftPos/(options.origWidth/options.width),10);
			  topPos=parseInt(topPos/(options.origWidth/options.width),10);
		  }		
		  //elem.css({'display':'block'});
		  if (elem.attr('data-preanimate')!='true') {
			  var easing_aux=options.defaultEasing;
			  if (elem.attr('data-easing')!='' && elem.attr('data-easing')!=undefined) {
				  easing_aux=elem.attr('data-easing');
			  }
			  
			  opacity_aux=1;
			  if (current_obj.isVideoPlaying==true)
				 opacity_aux=0;
				 
			  if (ver_ie!=-1 && ver_ie<9) {
				  elem.css({'opacity':1 });
			  }
			  
        elem.css({'margin-left':0 });
        elem.css({'margin-top':0 });
        elem.css({'margin-right':0 });
        elem.css({'margin-bottom':0 });
        	 
			  elem.
			  stop()
			  .animate({
					  opacity: opacity_aux,
					  left:leftPos+'px',
					  top: topPos+'px'
					}, elem.attr('data-duration')*1000, easing_aux ,function() {

					  if (current_obj.isVideoPlaying==true) {
						 var alltexts = $(current_obj.currentImg.attr('data-text-id')).children();
						 alltexts.css("opacity",0);
					  }
					  
					  current_obj.textInPlace[current_obj.textInPlace.length]=1;
					  
					  //continuous move
					  if (elem.attr('data-continuous-left')!=undefined && elem.attr('data-continuous-left')!='') {
					  	animate_continuous_singular_text(elem,current_obj,options);
					  	current_obj.continuouseIntervalIDs[current_obj.continuouseIntervalIDs.length]=setInterval(function(){animate_continuous_singular_text(elem,current_obj,options)},elem.attr('data-continuous-duration')*1000);
					  }
					  
					  //rotate
					  if (ver_ie==-1 || (ver_ie!=-1 && ver_ie>=9) ) {
						  if (elem.attr('data-rotate')!=undefined && elem.attr('data-rotate')!='' && elem.attr('data-rotate')=='true') {
								rotDuration=0.5;
								if (elem.attr('data-rotate-duration')!=undefined && elem.attr('data-rotate-duration')!='') {
									rotDuration=elem.attr('data-rotate-duration');
								}
								current_obj.rotationDurationArr[elem.index()]=rotDuration;
								current_obj.rotationFunctionsArr[elem.index()] = function (){
									if (current_obj.rotationFunctionsArr.length && current_obj.rotationDurationArr[elem.index()]!=undefined && current_obj.rotationDurationArr[elem.index()]!='') {
									  elem.rotate({
										  angle:0, 
										  animateTo:360, 
										  duration:current_obj.rotationDurationArr[elem.index()]*1000,
										  callback: current_obj.rotationFunctionsArr[elem.index()],
										  easing:function(x, t, b, c, d) { return (t/d)*c ; }
									   });
									}
								}
								current_obj.rotationFunctionsArr[elem.index()]();			  
						  }
					  }
					  
					});		
		  } else {
				elem.css({
					'left':leftPos+'px',
					'top': topPos+'px',
					'opacity':1
				});
				current_obj.textInPlace[current_obj.textInPlace.length]=1;
		  }
	};
    
    
    
    
	function animate_texts(current_obj,curImg,options,parallax_mouseinteraction_the,parallax_mouseinteraction_container,bannerControls,isPrevious) {
		//jQuery.fx.off = false;
		/*if (!isPrevious)
			$(curImg.attr('data-text-id')).css("display","block");*/
		var thetexts = $(curImg.attr('data-text-id')).children();
		var theLeft;
		var theTop;


		var i=0;
		currentText_arr=Array();
		
		if (isPrevious) {
			$('.newFS', parallax_mouseinteraction_container ).contents().unwrap();
		} else {
			current_obj.textInPlace.length=0;	
		}
		thetexts.each(function() {
			currentText_arr[i] = $(this);
			var currentText=currentText_arr[i];
			
			
			
			if (isPrevious && currentText.attr('data-preanimate')=='true') {
				//alert (currentText.attr('data-final-left'))
				currentText.css({'display':'block'});
			 	theLeft=currentText.attr('data-final-left');
			  	theTop=currentText.attr('data-final-top');
			  	if (options.responsive) {
					theLeft=parseInt(theLeft/(options.origWidth/options.width),10);
					theTop=parseInt(theTop/(options.origWidth/options.width),10);
			  	}					
				currentText.css({
					"left":theLeft+"px",
					"top":theTop+"px",					
					"opacity":1,
					"display":"block"
			  });	
			} else if (isPrevious) {
				currentText.css({
					"display":"none",
					"opacity":0
			  	});					
			} else {
				currentText.css({'display':'block'});
			}
			
			
			if (currentText.attr('data-preanimate')!='true') {
			  theLeft=currentText.attr('data-initial-left');
			  theTop=currentText.attr('data-initial-top');
			  if (options.responsive) {
					theLeft=parseInt(theLeft/(options.origWidth/options.width),10);
					theTop=parseInt(theTop/(options.origWidth/options.width),10);
			  }		  
	
			  currentText.css({
					"left":theLeft+"px",
					"top":theTop+"px",
					"opacity":parseInt(currentText.attr('data-fade-start'),10)/100
			  });
			}

			if (!isPrevious) {			
					current_obj.timeouts_arr[current_obj.timeouts_arr.length]=setTimeout(function() { animate_singular_text(currentText,current_obj,options);}, (currentText.attr('data-delay')*1000));
					//setTimeout(function() { animate_singular_text(currentText,current_obj,options);}, (currentText.attr('data-delay')*1000));
			}
			
			i++;
		});
	};
	
	
	
	function animate_continuous_singular_text(elem,current_obj,options) {
			var curLeft=parseInt(elem.css('margin-left').substr(0,elem.css('margin-left').lastIndexOf('px')),10);
			var curTop=parseInt(elem.css('margin-top').substr(0,elem.css('margin-top').lastIndexOf('px')),10);
			var theLeft=0;
			var theTop=0;
			/*var theLeft=parseInt(elem.attr('data-final-left')/(options.origWidth/options.width),10);
			var theTop=parseInt(elem.attr('data-final-top')/(options.origWidth/options.width),10);*/
			//alert (curLeft+' --- '+parseInt(elem.attr('data-final-left')/(options.origWidth/options.width),10)+' --- '+parseInt(elem.attr('data-continuous-left')/(options.origWidth/options.width),10));
			if (elem.attr('data-final-left') != elem.attr('data-continuous-left')) {
				if ( curLeft>=(theLeft-2) && curLeft<=(theLeft+2) ) {
					theLeft=parseInt(elem.attr('data-continuous-left')/(options.origWidth/options.width),10)-parseInt(elem.attr('data-final-left')/(options.origWidth/options.width),10);
					theTop=parseInt(elem.attr('data-continuous-top')/(options.origWidth/options.width),10)-parseInt(elem.attr('data-final-top')/(options.origWidth/options.width),10);
				}
			} else {
				if (elem.attr('data-final-top') != elem.attr('data-continuous-top')) {
					if ( curTop>=(theTop-2) && curTop<=(theTop+2) ) {
						theLeft=parseInt(elem.attr('data-continuous-left')/(options.origWidth/options.width),10)-parseInt(elem.attr('data-final-left')/(options.origWidth/options.width),10);
						theTop=parseInt(elem.attr('data-continuous-top')/(options.origWidth/options.width),10)-parseInt(elem.attr('data-final-top')/(options.origWidth/options.width),10);
					}
				}
			}
			elem.stop().animate({
			  'margin-left':theLeft+'px',
			  'margin-top': theTop+'px'
			}, elem.attr('data-continuous-duration')*1000, elem.attr('data-continuous-easing') ,function() {
				//animation complete
			});	

	}	
	
	
	function animate_exit_texts(current_obj,options,parallax_mouseinteraction_the,bannerControls) {
		//jQuery.fx.off = false;
		var thetexts = $(current_obj.currentImg.attr('data-text-id')).children();

		var i=0;
		currentText_arr=Array();
		thetexts.each(function() {
			currentText_arr[i] = $(this);
			var currentText=currentText_arr[i];
			//alert ('ss  --  '+currentText.attr('data-exit-left')+'   ---   '+currentText_arr[i]);
			//exit left
			var cur_exit_left=options.defaultExitLeft;
			if (currentText.attr('data-exit-left')!=undefined && currentText.attr('data-exit-left')!=''){
				cur_exit_left=parseInt(currentText.attr('data-exit-left')/(options.origWidth/options.width),10);
			}
			//exit top
			var cur_exit_top=options.defaultExitTop;
			if (currentText.attr('data-exit-top')!=undefined && currentText.attr('data-exit-top')!=''){
				cur_exit_top=parseInt(currentText.attr('data-exit-top')/(options.origWidth/options.width),10);
			}
			//exit duration
			var cur_exit_duration=options.defaultExitDuration;
			if (currentText.attr('data-exit-duration')!=undefined && currentText.attr('data-exit-duration')!=''){
				cur_exit_duration=parseFloat(currentText.attr('data-exit-duration'));
			}
			//exit delay
			var cur_exit_delay=options.defaultExitDelay;
			if (currentText.attr('data-exit-delay')!=undefined && currentText.attr('data-exit-delay')!=''){
				cur_exit_delay=parseFloat(currentText.attr('data-exit-delay'));
			}
			/*//exit fade
			var cur_exit_fade=options.defaultExitFade;
			if (currentText.attr('data-exit-fade')!=undefined && currentText.attr('data-exit-fade')!=''){
				cur_exit_fade=parseFloat(currentText.attr('data-exit-fade'));
			}*/
			//exit easing
			var cur_exit_easing=options.defaultExitEasing;
			if (currentText.attr('data-exit-easing')!=undefined && currentText.attr('data-exit-easing')!=''){
				cur_exit_easing=currentText.attr('data-exit-easing');
			}
			
			var cur_exit_off=options.defaultExitOFF.toString();
			if (currentText.attr('data-exit-off')!=undefined && currentText.attr('data-exit-off')!=''){
				cur_exit_off=currentText.attr('data-exit-off');
			}
			if (cur_exit_off=='true') {
				cur_exit_duration=0;
			}
			
			//alert ('cur_exit_left: '+cur_exit_left+'  ---  cur_exit_top: '+cur_exit_top+'  ---  cur_exit_fade: '+cur_exit_fade+'  ---  cur_exit_duration: '+cur_exit_duration+'  ---  cur_exit_easing: '+cur_exit_easing+'  ---  cur_exit_delay: '+cur_exit_delay);
			//alert (parseInt(currentText.attr('data-final-top')/(options.origWidth/options.width),10)+' == '+parseInt(currentText.css('top').substr(0,currentText.css('top').lastIndexOf('px')),10));
			if (cur_exit_duration>0/* && parseInt(currentText.attr('data-final-top')/(options.origWidth/options.width),10)==parseInt(currentText.css('top').substr(0,currentText.css('top').lastIndexOf('px')),10)*/) {
				current_obj.timeouts_arr[current_obj.timeouts_arr.length]=setTimeout(function() { 
					//alert (cur_exit_duration+'  --  '+currentText);
					currentText
					.stop()
					.animate({
						left:cur_exit_left+'px',
						top: cur_exit_top+'px'/*,
						opacity: cur_exit_fade*/
					  }, cur_exit_duration*1000, cur_exit_easing ,function() {
						  //currentText.css({'display':'none'});
						  if (currentText.attr('data-preanimate')!='true' && cur_exit_off=='false'){
						    currentText.css({'display':'none'});
						  } else {
								theLeft=currentText.attr('data-final-left');
								theTop=currentText.attr('data-final-top');
								if (options.responsive) {
									theLeft=parseInt(theLeft/(options.origWidth/options.width),10);
									theTop=parseInt(theTop/(options.origWidth/options.width),10);
								}					
								currentText.css({
									"left":theLeft+"px",
									"top":theTop+"px",					
									"opacity":1
							  });										  
						  }
					  });			
				
				}, (cur_exit_delay*1000));    
			} else {
				if (currentText.attr('data-preanimate')!='true' && cur_exit_off=='false'){
					currentText.css({'display':'none'});
				}
			}
            	
            i++;
        });		
	};	
	
	
	function preanimate_texts(imgs,options,parallax_mouseinteraction_the,total_images) {
		var cur_Slide;
		for (k=0;k<total_images;k++) {
			cur_Slide = $(imgs[k]);
			//$(cur_Slide.attr('data-text-id')).css("display","block");
			var thetexts = $(cur_Slide.attr('data-text-id')).children();
	
			var i=0;
			currentText_arr=Array();
			thetexts.each(function() {
				  currentText_arr[i] = $(this);
				  var currentText=currentText_arr[i];
				  
				  if (currentText.attr('data-preanimate')=='true'){
					  currentText.css({'display':'block'});
					  var theLeft=currentText.attr('data-final-left');
					  var theTop=currentText.attr('data-final-top');
					  if (options.responsive) {
							theLeft=parseInt(theLeft/(options.origWidth/options.width),10);
							theTop=parseInt(theTop/(options.origWidth/options.width),10);
					  }		  
						/*opacity_aux=0;
						if (currentText.attr('data-preshow')=='true'){
							opacity_aux=parseFloat(currentText.attr('data-preshow'));
						}
						currentText.css({
								"opacity":opacity_aux
							});*/
					
						currentText.css({
							"left":theLeft+"px",
							"top":theTop+"px",
							"opacity":1
						});
					} else {
						currentText.css({'display':'none'});
					}
	
			});		
		}
	};	
	
	
	function clear_all_timeouts(timeoutsArr) {
		  if (timeoutsArr) for (var i in timeoutsArr) if (timeoutsArr[i]) clearTimeout(timeoutsArr[i]);
		  //timeoutsArr = [];
		  timeoutsArr.length = 0;
	}
	
	function clear_all_intervals(intervalsArr) {
		  if (intervalsArr) for (var i in intervalsArr) if (intervalsArr[i]) clearInterval(intervalsArr[i]);
		  //intervalsArr = [];
		  intervalsArr.length = 0;
	} 	
	
	function clear_all_rotations(rotationsArr,current_obj) {
		  if (rotationsArr) 
		  	for (var i in rotationsArr) 
				if (rotationsArr[i]) {
					rotationsArr[i]=function () { };
				}
 //rotationsArr[i]=function () { };
		  //rotationsArr = [];
		  rotationsArr.length = 0;
		  current_obj.rotationDurationArr.length = 0;
		  //rotationsArr.splice(0, rotationsArr.length);
	} 		
	
	
	function move_texts(current_obj,curImg,options,distanceX,distanceY) {
		var thetexts = $(curImg.attr('data-text-id')).children();
		if (current_obj.textInPlace.length == thetexts.length) {
			//alert (current_obj.textInPlace.length+" == "+thetexts.length);
			if (distanceX!=0 || distanceY!=0) {
				var i=1;
				var currentText;
				var curEnableMouseInteraction=true;
		
				thetexts.each(function() {
					  currentText=$(this);
					  curEnableMouseInteraction=true;
					  if (currentText.attr('data-enableMouseInteraction')=="false")
					  	curEnableMouseInteraction=false;
					  if (curEnableMouseInteraction) { 
						  currentText.stop().animate({
							  "left":parseInt(currentText.attr('data-final-left')/(options.origWidth/options.width),10)+parseInt(distanceX*i/thetexts.length,10)+"px",
							  "top":parseInt(currentText.attr('data-final-top')/(options.origWidth/options.width),10)+parseInt(distanceY*i/thetexts.length,10)+"px"
						  }, { queue: true, duration: options.mouseInteractionDuration*1000, easing: options.mouseInteractionEasing } ,function() {
							//animation complete
						  });
					  }
		
					i++;
				});
			}
		}
	};	
		
	
	//circ
	function the_arc(current_obj,options) {
			nowx = (new Date).getTime();
			if (!current_obj.mouseOverBanner && !current_obj.effectIsRunning && options.showCircleTimer && !current_obj.slideIsRunning) {	 
				current_obj.ctx.clearRect(0,0,current_obj.canvas.width,current_obj.canvas.height);
  	            
                current_obj.ctx.beginPath();
                current_obj.ctx.globalAlpha=options.behindCircleAlpha/100;
                current_obj.ctx.arc(options.circleRadius+2*options.circleLineWidth, options.circleRadius+2*options.circleLineWidth, options.circleRadius, 0, 2 * Math.PI, false);
                current_obj.ctx.lineWidth = options.circleLineWidth+2;
                current_obj.ctx.strokeStyle = options.behindCircleColor;
                current_obj.ctx.stroke();
                

                current_obj.ctx.beginPath();
                current_obj.ctx.globalAlpha=options.circleAlpha/100;
                current_obj.ctx.arc(options.circleRadius+2*options.circleLineWidth, options.circleRadius+2*options.circleLineWidth, options.circleRadius, 0, ((current_obj.timeElapsed+nowx)-current_obj.arcInitialTime)/1000*2/options.autoPlay*Math.PI,  false);
                current_obj.ctx.lineWidth = options.circleLineWidth;
                current_obj.ctx.strokeStyle = options.circleColor;
                current_obj.ctx.stroke();
             }
    }	
	
    // navigation
	function parallax_mouseinteraction_navigation(direction,current_obj,options,total_images,bottomNavButs,imgs,parallax_mouseinteraction_the,bannerControls,parallax_mouseinteraction_contentHolder,parallax_mouseinteraction_container,parallax_mouseinteraction_playOver,thumbsHolder_Thumbs,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,thumbsHolder_Thumb,parallax_mouseinteraction_thumbsHolderWrapper,parallax_mouseinteraction_bottomNav){
		var navigateAllowed=true;
		var bgPrevNo;
		if ((!options.loop && current_obj.current_img_no+direction>=total_images) || (!options.loop && current_obj.current_img_no+direction<0))
			navigateAllowed=false;				
		
		if (navigateAllowed && !current_obj.slideIsRunning && current_obj.firstLoadingComplete) {
			current_obj.slideIsRunning=true;
			clear_all_timeouts(current_obj.timeouts_arr);
			clear_all_intervals(current_obj.continuouseIntervalIDs);
			clear_all_rotations(current_obj.rotationFunctionsArr,current_obj);
			current_obj.textInPlace.length=0;
			bgPrevNo=current_obj.previous_current_img_no;
			//jQuery.fx.off = true;
			//alert ((current_obj.currentImg.attr('data-text-id')));
			//$(current_obj.currentImg.attr('data-text-id')).children().css({'opacity':0.5});
			$(current_obj.currentImg.attr('data-text-id')).children().clearQueue();

			animate_exit_texts(current_obj,options,parallax_mouseinteraction_the,bannerControls);
			
			//$('.newFS', parallax_mouseinteraction_container ).contents().unwrap();
			/*current_obj.arcInitialTime=(new Date).getTime();
			current_obj.timeElapsed=0;*/
			
				if (options.showCircleTimer) {
						//clearInterval(current_obj.intervalID);
	
						current_obj.ctx.clearRect(0,0,current_obj.canvas.width,current_obj.canvas.height);
						current_obj.ctx.beginPath();
						current_obj.ctx.globalAlpha=options.behindCircleAlpha/100;
						current_obj.ctx.arc(options.circleRadius+2*options.circleLineWidth, options.circleRadius+2*options.circleLineWidth, options.circleRadius, 0, 2 * Math.PI, false);
						current_obj.ctx.lineWidth = options.circleLineWidth+2;
						current_obj.ctx.strokeStyle = options.behindCircleColor;
						current_obj.ctx.stroke();            
						
						
						current_obj.ctx.beginPath();
						current_obj.ctx.globalAlpha=options.circleAlpha/100;
						current_obj.ctx.arc(options.circleRadius+2*options.circleLineWidth, options.circleRadius+2*options.circleLineWidth, options.circleRadius, 0, 0,  false);
						current_obj.ctx.lineWidth = options.circleLineWidth;
						current_obj.ctx.strokeStyle = options.circleColor;
						current_obj.ctx.stroke();	
								
						//current_obj.intervalID=setInterval(function(){the_arc(current_obj,options)}, 125);
				}			
			
			
			
			//current_obj.previous_current_img_no=current_obj.current_img_no;
			/*//hide previous texts
			if (options.hideElementsOnPreviousSlide) {
				$(current_obj.currentImg.attr('data-text-id')).css("display","none");
			}*/
			
			
			//deactivate previous
			if (options.skin=="bullets") {
				$(bottomNavButs[current_obj.current_img_no]).removeClass('bottomNavButtonON');
			} else {
				 $(thumbsHolder_Thumbs[current_obj.current_img_no]).removeClass('thumbsHolder_ThumbON');
			}
			

			parallax_mouseinteraction_playOver.css('display','none');				
			
			//set current img
			if (current_obj.current_img_no+direction>=total_images) {
				current_obj.current_img_no=0;
			} else if (current_obj.current_img_no+direction<0) {
				current_obj.current_img_no=total_images-1;
			} else {
				current_obj.current_img_no+=direction;
			}
			
			//alert (direction+' -- '+current_obj.current_img_no+' -- '+total_images)

			
			
			
			
			//activate current
			if (options.showBottomNav) {
				if (options.skin=="bullets") {
					if (!options.autoHideBottomNav)
						parallax_mouseinteraction_bottomNav.css("display","block");				
					$(bottomNavButs[current_obj.current_img_no]).addClass('bottomNavButtonON');				
				} else {
				   	if (!options.autoHideBottomNav)	
						parallax_mouseinteraction_thumbsHolderWrapper.css("display","block");
	
				   $(thumbsHolder_Thumbs[current_obj.current_img_no]).addClass('thumbsHolder_ThumbON');
				   //auto scroll carousel if needed
				   currentCarouselLeft=parallax_mouseinteraction_thumbsHolder.css('left').substr(0,parallax_mouseinteraction_thumbsHolder.css('left').lastIndexOf('px'));
				   if (current_obj.current_img_no===0 || current_obj.current_img_no===total_images-1) {
					  carouselScroll(0,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,options,total_images,thumbsHolder_Thumb,current_obj);
				   } else {
					 carouselScroll(1001,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,options,total_images,thumbsHolder_Thumb,current_obj);
				  }
				}	
			}
			
			current_obj.currentImg = $(imgs[current_obj.current_img_no]);		


			parallax_mouseinteraction_contentHolder.animate({
			    left:(-1)*current_obj.current_img_no*options.width+'px'
			  }, options.scrollSlideDuration*1000, options.scrollSlideEasing, function() {
			    // Animation complete.
				  current_obj.slideIsRunning=false;
				  
				  current_obj.arcInitialTime=(new Date).getTime();
				  current_obj.timeElapsed=0;	
				  
				  //jQuery.fx.off = true;
				  
				  if ($(imgs[current_obj.current_img_no]).attr('data-video')=='true')
					parallax_mouseinteraction_playOver.css('display','block');

				  //reinit content to stop videos
				  if ($(imgs[current_obj.previous_current_img_no]).attr('data-video')=='true') {
				  		$('#contentHolderUnit_'+current_obj.previous_current_img_no, parallax_mouseinteraction_container).html($(imgs[current_obj.previous_current_img_no]).html());
						resizeRepositionUnitContent(current_obj.previous_current_img_no,current_obj,options,imgs,parallax_mouseinteraction_container,parallax_mouseinteraction_the,bannerControls);					
				  }
				 
				  clear_all_timeouts(current_obj.timeouts_arr);
				  //reposition previous texts
			      animate_texts(current_obj,$(imgs[bgPrevNo]),options,parallax_mouseinteraction_the,parallax_mouseinteraction_container,bannerControls,true);
				  //position current texts				  
				  animate_texts(current_obj,current_obj.currentImg,options,parallax_mouseinteraction_the,parallax_mouseinteraction_container,bannerControls,false);

				  //show current text
				  /*if (options.hideElementsOnPreviousSlide) {
						$(current_obj.currentImg.attr('data-text-id')).css("display","block");
				  }*/
				  
				  if (options.autoPlay>0 && total_images>1 && !current_obj.mouseOverBanner) {
					  clearTimeout(current_obj.timeoutID);
					  current_obj.timeoutID=setTimeout(function(){current_obj.previous_current_img_no=current_obj.current_img_no; parallax_mouseinteraction_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,parallax_mouseinteraction_the,bannerControls,parallax_mouseinteraction_contentHolder,parallax_mouseinteraction_container,parallax_mouseinteraction_playOver,thumbsHolder_Thumbs,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,thumbsHolder_Thumb,parallax_mouseinteraction_thumbsHolderWrapper,parallax_mouseinteraction_bottomNav)},options.autoPlay*1000);
				  }						  
			});					
			//alert (current_obj.current_img_no)

			
		} // if navigateAllowed
		
	};
	
		
		
		
		function resizeImg(imageToResize,arrayID,current_obj,options,isBg) {
			var origDim=current_obj.origImgsDimensions[arrayID].split(";");
			if (options.responsive) {	
				origDim[0]=origDim[0]/(options.origWidth/options.width);
				origDim[1]=origDim[1]/(options.origWidth/options.width);
			}
			
			imageToResize.width(origDim[0]);
			imageToResize.height(origDim[1]);
			
			//center bg image for w&H 100%
			if (isBg && options.width100Proc && options.height100Proc) {				
				//alert (imageToResize.attr('src'));
				imageToResize.css({
					'position':'relative',
					'left':parseInt(options.width-imageToResize.width(),10)+"px",
					'top':parseInt(options.height-imageToResize.height(),10)+"px"
				});
				//alert (imageToResize.height()+'  --  '+options.height+'    /    '+imageToResize.width()+'  --   '+options.width);
			}
		}
		
		
		function resizeRepositionUnitContent(arrayID,current_obj,options,imgs,parallax_mouseinteraction_container,parallax_mouseinteraction_the,bannerControls) {
			if (options.responsive) {
				imgInside = $('#contentHolderUnit_'+arrayID, parallax_mouseinteraction_container).find('img:first');
				if (imgInside.width()!=null) {
					resizeImg(imgInside,arrayID,current_obj,options,true);
				}
				
				textIdChildren = $($(imgs[arrayID]).attr('data-text-id')).children();
				k=-1;
				textIdChildren.each(function() {
					k++;
					//alert ( $(this).attr('id') );
					imgInside = $(this).find('img:first');
					if (imgInside.width()!=null) {
						resizeImg(imgInside,($(imgs[arrayID]).attr('data-text-id')+'-'+k),current_obj,options,false);
					}
				});
				
				//reposition text
				$($(imgs[arrayID]).attr('data-text-id')).css({
					'width':options.width+'px',
					'left':parseInt(arrayID*options.width,10),
					'top':bannerControls.css('top')
				});
			}
		}
		
		
		
    function carouselScroll(direction,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,options,total_images,thumbsHolder_Thumb,current_obj) {
		currentCarouselLeft=parallax_mouseinteraction_thumbsHolder.css('left').substr(0,parallax_mouseinteraction_thumbsHolder.css('left').lastIndexOf('px'));
		if (direction===1 || direction===-1) {
			current_obj.isCarouselScrolling=true;
			parallax_mouseinteraction_thumbsHolder.css('opacity','0.5');
			parallax_mouseinteraction_thumbsHolder.animate({
			    opacity: 1,
			    left: '+='+direction*current_obj.carouselStep
			  }, 500, 'easeOutCubic', function() {
			      // Animation complete.
				  disableCarouselNav(current_obj,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,options,total_images,thumbsHolder_Thumb);						  
				  current_obj.isCarouselScrolling=false;
			});				
		} else {
				if ( currentCarouselLeft != (-1) * Math.floor( current_obj.current_img_no/options.numberOfThumbsPerScreen )*current_obj.carouselStep) {
					current_obj.isCarouselScrolling=true;
					parallax_mouseinteraction_thumbsHolder.css('opacity','0.5');
					parallax_mouseinteraction_thumbsHolder.animate({
					    opacity: 1,
					    left: (-1) * Math.floor( current_obj.current_img_no/options.numberOfThumbsPerScreen )*current_obj.carouselStep
					  }, 500, 'easeOutCubic', function() {
					      // Animation complete.
						  disableCarouselNav(current_obj,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,options,total_images,thumbsHolder_Thumb);						  
						  current_obj.isCarouselScrolling=false;
					});
				}
		}
	
		
	};
	
	function disableCarouselNav(current_obj,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,options,total_images,thumbsHolder_Thumb) {
		currentCarouselLeft=parallax_mouseinteraction_thumbsHolder.css('left').substr(0,parallax_mouseinteraction_thumbsHolder.css('left').lastIndexOf('px'));
		if (currentCarouselLeft <0 ) {
			if (parallax_mouseinteraction_carouselLeftNav.hasClass('carouselLeftNavDisabled'))
				parallax_mouseinteraction_carouselLeftNav.removeClass('carouselLeftNavDisabled');
		} else {
			parallax_mouseinteraction_carouselLeftNav.addClass('carouselLeftNavDisabled');
		}		
		
		if (Math.abs(currentCarouselLeft-current_obj.carouselStep)<(thumbsHolder_Thumb.width()+current_obj.thumbMarginLeft)*total_images) {
			if (parallax_mouseinteraction_carouselRightNav.hasClass('carouselRightNavDisabled'))
				parallax_mouseinteraction_carouselRightNav.removeClass('carouselRightNavDisabled');
		} else {
			parallax_mouseinteraction_carouselRightNav.addClass('carouselRightNavDisabled');
		}				
	};




			function rearangethumbs(current_obj,options,total_images,parallax_mouseinteraction_container,thumbsHolder_Thumbs,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,thumbsHolder_Thumb,parallax_mouseinteraction_thumbsHolderVisibleWrapper,parallax_mouseinteraction_thumbsHolderWrapper) {
						//thumbs
						
						if (options.skin=="thumbs") {
							parallax_mouseinteraction_thumbsHolderWrapper.css({
								"bottom":parseInt(options.thumbsWrapperMarginBottom/(options.origWidth/options.width),10)+"px", 
								"top":"auto", 
								"height":parseInt(options.origthumbsHolderWrapperH/(options.origWidth/options.width),10)+"px"
							});

							bgTopCorrection=0;

							parallax_mouseinteraction_carouselLeftNav.css('background-position','0px '+((parallax_mouseinteraction_thumbsHolderWrapper.height()-options.origthumbsHolderWrapperH)/2+bgTopCorrection)+'px');
							parallax_mouseinteraction_carouselRightNav.css('background-position','0px '+((parallax_mouseinteraction_thumbsHolderWrapper.height()-options.origthumbsHolderWrapperH)/2+bgTopCorrection)+'px');
							
							parallax_mouseinteraction_thumbsHolderVisibleWrapper.css('width',options.width-parallax_mouseinteraction_carouselLeftNav.width()-parallax_mouseinteraction_carouselRightNav.width());
							options.origWidthThumbsHolderVisibleWrapper=options.origWidth-parallax_mouseinteraction_carouselLeftNav.width()-parallax_mouseinteraction_carouselRightNav.width()	;				
							

							thumbsHolder_Thumbs.css({
								'width':parseInt(options.origThumbW/(options.origWidthThumbsHolderVisibleWrapper/parallax_mouseinteraction_thumbsHolderVisibleWrapper.width()),10)+'px',
								'height':parseInt(options.origThumbH/(options.origWidthThumbsHolderVisibleWrapper/parallax_mouseinteraction_thumbsHolderVisibleWrapper.width()),10)+'px'
	
							});
							
							
							if (options.numberOfThumbsPerScreen >= total_images) {
								parallax_mouseinteraction_thumbsHolderVisibleWrapper.css('left',parseInt((parallax_mouseinteraction_thumbsHolderWrapper.width() - (thumbsHolder_Thumb.width()+current_obj.thumbMarginLeft)*total_images)/2,10)+'px');
							}							
							
							
							var imageInside = $('.thumbsHolder_ThumbOFF', parallax_mouseinteraction_container).find('img:first');

							imageInside.css({
								"width":thumbsHolder_Thumbs.width()+"px",
								"height":thumbsHolder_Thumbs.height()+"px",
								"margin-top":parseInt((parallax_mouseinteraction_thumbsHolderWrapper.height()-thumbsHolder_Thumbs.height())/2,10)+"px"
							});
							
							
							
							current_obj.thumbMarginLeft=Math.floor( (parallax_mouseinteraction_thumbsHolderWrapper.width()-parallax_mouseinteraction_carouselLeftNav.width()-parallax_mouseinteraction_carouselRightNav.width()-thumbsHolder_Thumb.width()*options.numberOfThumbsPerScreen)/(options.numberOfThumbsPerScreen-1) );
							thumb_i=-1;
							parallax_mouseinteraction_thumbsHolder.children().each(function() {
								thumb_i++;
								theThumb = $(this);
								theThumb.css('background-position','center '+(options.thumbsOnMarginTop/(options.origWidth/options.width))+'px');
								if ( thumb_i<=0 ) {
									theThumb.css('margin-left',Math.floor( ( parallax_mouseinteraction_thumbsHolderWrapper.width()-parallax_mouseinteraction_carouselLeftNav.width()-parallax_mouseinteraction_carouselRightNav.width()-(current_obj.thumbMarginLeft+theThumb.width())*(options.numberOfThumbsPerScreen-1) - theThumb.width() )/2 )+'px');
								} else {
									theThumb.css('margin-left',current_obj.thumbMarginLeft+'px');		
								}
							});

							current_obj.carouselStep=(thumbsHolder_Thumb.width()+current_obj.thumbMarginLeft)*options.numberOfThumbsPerScreen;

						}
			}		
		
	
	
		function doResize(current_obj,options,total_images,imgs,parallax_mouseinteraction_the,bannerControls,parallax_mouseinteraction_contentHolderVisibleWrapper,parallax_mouseinteraction_contentHolder,parallax_mouseinteraction_container,parallax_mouseinteraction_playOver,bottomNavButs,parallax_mouseinteraction_leftNav,bottomNavBut,parallax_mouseinteraction_bottomNav,thumbsHolder_Thumbs,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,thumbsHolder_Thumb,parallax_mouseinteraction_thumbsHolderVisibleWrapper,parallax_mouseinteraction_thumbsHolderWrapper) {
					
					//var bodyOverflow_initial=$('body').css('overflow');
					//$('body').css('overflow','hidden');
					
					responsiveWidth=parallax_mouseinteraction_the.parent().parent().width();
					responsiveHeight=parallax_mouseinteraction_the.parent().parent().height();
					if (options.responsiveRelativeToBrowser) {
						responsiveWidth=$(window).width();
						responsiveHeight=$(window).height();
					}
					

					if (options.width100Proc) {
						options.width=responsiveWidth;
					}
					
					if (options.height100Proc) {
						options.height=responsiveHeight;
					}

					if (options.origWidth!=responsiveWidth || options.width100Proc) {
						if (options.origWidth>responsiveWidth || options.width100Proc) {
							options.width=responsiveWidth;
						} else if (!options.width100Proc) {
							options.width=options.origWidth;
						}
						if (!options.height100Proc)
							options.height=options.width/current_obj.bannerRatio;

						
						//set banner size
						parallax_mouseinteraction_container.width(options.width);
						parallax_mouseinteraction_container.height(options.height);
						
						parallax_mouseinteraction_contentHolderVisibleWrapper.width(options.width);
						parallax_mouseinteraction_contentHolderVisibleWrapper.height(options.height);
						
						parallax_mouseinteraction_contentHolder.width(options.width);//initial width
						parallax_mouseinteraction_contentHolder.height(options.height);
						
						//bannerControls.width('100%');
						//bannerControls.height('100%');
						bannerControls.css('margin-top',parseInt((options.height-parallax_mouseinteraction_leftNav.height())/2,10)+'px');
						
						//if (options.preanimateElementsOverImage) {
							preanimate_texts(imgs,options,parallax_mouseinteraction_the,total_images);		
						//}						

						
						contentHolderUnit = $('.contentHolderUnit', parallax_mouseinteraction_container);
						contentHolderUnit.width(options.width);
						contentHolderUnit.height(options.height);

						holderWidth=options.width*total_images;
						for (i=0; i<total_images; i++) {
							resizeRepositionUnitContent(i,current_obj,options,imgs,parallax_mouseinteraction_container,parallax_mouseinteraction_the,bannerControls);													
						}

						
	
						parallax_mouseinteraction_contentHolder.width(holderWidth);

						if (options.skin=="bullets") {
							if (options.thumbsWrapperMarginBottom>=0) {
								parallax_mouseinteraction_bottomNav.css({
									"left": parseInt((parallax_mouseinteraction_container.width()-parallax_mouseinteraction_bottomNav.width())/2,10)+"px",
									"bottom": parseInt(options.thumbsWrapperMarginBottom/(options.origWidth/options.width),10)+"px",
									"top": "auto"
								});		
							} else {
								parallax_mouseinteraction_bottomNav.css({
									"left": parseInt((parallax_mouseinteraction_container.width()-parallax_mouseinteraction_bottomNav.width())/2,10)+"px"
								});							}
						} else {
							rearangethumbs(current_obj,options,total_images,parallax_mouseinteraction_container,thumbsHolder_Thumbs,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,thumbsHolder_Thumb,parallax_mouseinteraction_thumbsHolderVisibleWrapper,parallax_mouseinteraction_thumbsHolderWrapper);
						}

						
							
		 
		 
					//playover
					parallax_mouseinteraction_playOver.css({
						'left':parseInt((options.width-parallax_mouseinteraction_playOver.width())/2,10)+'px',
						'top':parseInt((options.height-parallax_mouseinteraction_playOver.height())/2,10)+'px'
					});

					
					clearTimeout(current_obj.timeoutID);
					
					clear_all_intervals(current_obj.continuouseIntervalIDs);
					
					if (total_images<2) {
						$('.newFS', parallax_mouseinteraction_container ).contents().unwrap();
						animate_texts(current_obj,current_obj.currentImg,options,parallax_mouseinteraction_the,parallax_mouseinteraction_container,bannerControls,false);
					
					} else {
						parallax_mouseinteraction_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,parallax_mouseinteraction_the,bannerControls,parallax_mouseinteraction_contentHolder,parallax_mouseinteraction_container,parallax_mouseinteraction_playOver,thumbsHolder_Thumbs,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,thumbsHolder_Thumb,parallax_mouseinteraction_thumbsHolderWrapper,parallax_mouseinteraction_bottomNav);
					}
						
						
					}
					

					//$('body').css('overflow',bodyOverflow_initial);
			}			



			function getInternetExplorerVersion()
			// -1 - not IE
			// 7,8,9 etc
			{
			   var rv = -1; // Return value assumes failure.
			   if (navigator.appName == 'Microsoft Internet Explorer')
			   {
				  var ua = navigator.userAgent;
				  var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
				  if (re.exec(ua) != null)
					 rv = parseFloat( RegExp.$1 );
			   }
			   return parseInt(rv,10);
			}
	
	

	
	$.fn.parallax_mouseinteraction = function(options) {

		var options = $.extend({},$.fn.parallax_mouseinteraction.defaults, options);

		return this.each(function() {
			var parallax_mouseinteraction_the = $(this);
					responsiveWidth=parallax_mouseinteraction_the.parent().width();
					responsiveHeight=parallax_mouseinteraction_the.parent().height();
					if (options.responsiveRelativeToBrowser) {
						responsiveWidth=$(window).width();
						responsiveHeight=$(window).height();
					}			
					options.origWidth=options.width;
					if (options.width100Proc)
						options.width=responsiveWidth;
					
					options.origHeight=options.height;
					if (options.height100Proc) {
						options.height=responsiveHeight;
					}
						
					if (options.responsive && (options.origWidth!=responsiveWidth || options.width100Proc)) {
						if (options.origWidth>responsiveWidth || options.width100Proc) {
							options.width=responsiveWidth;
						} else {
							options.width=options.origWidth;
						}
						if (!options.height100Proc)
							options.height=options.width/(options.origWidth/options.origHeight);	
					}			
			
			
			//the controllers
			var parallax_mouseinteraction_wrap = $('<div></div>').addClass('parallax_mouseinteraction').addClass(options.skin);
			var bannerControls = $('<div class="bannerControls">   <div class="leftNav"></div>   <div class="rightNav"></div>    </div>  <div class="contentHolderVisibleWrapper"><div class="contentHolder"></div></div>   <div class="playOver"></div>  <div class="thumbsHolderWrapper"><div class="thumbsHolderVisibleWrapper"><div class="thumbsHolder"></div></div></div>  <canvas class="mycanvas"></canvas>');
			parallax_mouseinteraction_the.wrap(parallax_mouseinteraction_wrap);
			parallax_mouseinteraction_the.after(bannerControls);
			

			
			//the elements
			var parallax_mouseinteraction_container = parallax_mouseinteraction_the.parent('.parallax_mouseinteraction');
			var bannerControls = $('.bannerControls', parallax_mouseinteraction_container);
			
			
			var parallax_mouseinteraction_contentHolderVisibleWrapper = $('.contentHolderVisibleWrapper', parallax_mouseinteraction_container);
			var parallax_mouseinteraction_contentHolder = $('.contentHolder', parallax_mouseinteraction_container);			
			
			
			var bottomNavLeft_aux=$('<div class="bottomNavLeft"></div>');
			var bottomNav_aux=$('<div class="bottomNav"></div>');
			var bottomNavRight_aux=$('<div class="bottomNavRight"></div>');
			
			parallax_mouseinteraction_the.after(bottomNavLeft_aux);
			parallax_mouseinteraction_the.after(bottomNav_aux);
			parallax_mouseinteraction_the.after(bottomNavRight_aux);
			 
			if (!options.showAllControllers)
				bannerControls.css("display","none");			
			
			
			var parallax_mouseinteraction_leftNav = $('.leftNav', parallax_mouseinteraction_container);
			var parallax_mouseinteraction_rightNav = $('.rightNav', parallax_mouseinteraction_container);
			parallax_mouseinteraction_leftNav.css("display","none");
			parallax_mouseinteraction_rightNav.css("display","none");			
			if (options.showNavArrows) {
				if (options.showOnInitNavArrows) {
					parallax_mouseinteraction_leftNav.css("display","block");
					parallax_mouseinteraction_rightNav.css("display","block");
				}
			}
			
			var parallax_mouseinteraction_bottomNav = $('.bottomNav', parallax_mouseinteraction_container);
			var parallax_mouseinteraction_bottomNavLeft = $('.bottomNavLeft', parallax_mouseinteraction_container);
			var parallax_mouseinteraction_bottomNavRight = $('.bottomNavRight', parallax_mouseinteraction_container);
			var parallax_mouseinteraction_bottomOverThumb;
			parallax_mouseinteraction_bottomNav.css("display","block");
			parallax_mouseinteraction_bottomNavLeft.css("display","block");
			parallax_mouseinteraction_bottomNavRight.css("display","block");

				parallax_mouseinteraction_bottomNav.css({"bottom":parseInt(options.thumbsWrapperMarginBottom/(options.origWidth/options.width),10)+"px", "top":"auto"});
				parallax_mouseinteraction_bottomNavLeft.css({"bottom":parseInt(options.thumbsWrapperMarginBottom/(options.origWidth/options.width),10)+"px", "top":"auto"});
				parallax_mouseinteraction_bottomNavRight.css({"bottom":parseInt(options.thumbsWrapperMarginBottom/(options.origWidth/options.width),10)+"px", "top":"auto"});			
			
			if (!options.showBottomNav) {
				parallax_mouseinteraction_bottomNav.css("display","none");
				parallax_mouseinteraction_bottomNavLeft.css("display","none");
				parallax_mouseinteraction_bottomNavRight.css("display","none");
			}
			if (!options.showOnInitBottomNav) {
				parallax_mouseinteraction_bottomNav.css("left","-5000px");
				parallax_mouseinteraction_bottomNavLeft.css("left","-5000px");
				parallax_mouseinteraction_bottomNavRight.css("left","-5000px");				
			}
			
			
			//thumbs
			var parallax_mouseinteraction_thumbsHolderWrapper = $('.thumbsHolderWrapper', parallax_mouseinteraction_container);
            var parallax_mouseinteraction_thumbsHolderVisibleWrapper = $('.thumbsHolderVisibleWrapper', parallax_mouseinteraction_container);
			var parallax_mouseinteraction_thumbsHolder = $('.thumbsHolder', parallax_mouseinteraction_container);
			
			var parallax_mouseinteraction_carouselLeftNav;
			var parallax_mouseinteraction_carouselRightNav;
			parallax_mouseinteraction_carouselLeftNav=$('<div class="carouselLeftNav"></div>');
			parallax_mouseinteraction_carouselRightNav=$('<div class="carouselRightNav"></div>');
			parallax_mouseinteraction_thumbsHolderWrapper.append(parallax_mouseinteraction_carouselLeftNav);
			parallax_mouseinteraction_thumbsHolderWrapper.append(parallax_mouseinteraction_carouselRightNav);
			parallax_mouseinteraction_carouselRightNav.css('right','0');
			
			parallax_mouseinteraction_thumbsHolder.css('width',parallax_mouseinteraction_carouselLeftNav.width()+'px');
			
			if (!options.showBottomNav || !options.showOnInitBottomNav) {
				parallax_mouseinteraction_thumbsHolderWrapper.css({
					"opacity":0,
					"display":"none"
				});
			}
				
				
			if (options.skin=="thumbs") {
					parallax_mouseinteraction_thumbsHolderWrapper.css({"bottom":parseInt(options.thumbsWrapperMarginBottom/(options.origWidth/options.width),10)+"px", "top":"auto"});
			}			
			
			
			
			if (options.enableTouchScreen) {
				//parallax_mouseinteraction_container.css('cursor','url(skins/hand.cur),url(skins/hand.cur),move');
				parallax_mouseinteraction_contentHolder.css({
					'cursor':'url('+options.absUrl+'skins/hand.cur),url('+options.absUrl+'skins/hand.cur),move',
					'left':0+'px',
					'top':0+'px',
					'position':'absolute'
				});				
				
				parallax_mouseinteraction_contentHolder.draggable({ 
					axis: 'x',
					distance:10,
					disabled: true,
					start: function(event, ui) {
						origLeft=parseInt($(this).css('left'),10);
						parallax_mouseinteraction_playOver.css('display','none');
						current_obj.previous_current_img_no=current_obj.current_img_no;
					},
					stop: function(event, ui) {
						if (!current_obj.slideIsRunning) {
							finalLeft=parseInt($(this).css('left'),10);
							direction=1;
							//alert (origLeft+ ' < '+finalLeft);
							if (origLeft<finalLeft) {
								direction=-1;
							}	
							parallax_mouseinteraction_navigation(direction,current_obj,options,total_images,bottomNavButs,imgs,parallax_mouseinteraction_the,bannerControls,parallax_mouseinteraction_contentHolder,parallax_mouseinteraction_container,parallax_mouseinteraction_playOver,thumbsHolder_Thumbs,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,thumbsHolder_Thumb,parallax_mouseinteraction_thumbsHolderWrapper,parallax_mouseinteraction_bottomNav);
						}
					}
				});
		
			}
			
			
			
			
			//the vars
			
			var parallax_mouseinteraction_playOver=$('.playOver', parallax_mouseinteraction_container);
			parallax_mouseinteraction_playOver.css({
				'left':parseInt((options.width-parallax_mouseinteraction_playOver.width())/2,10)+'px',
				'top':parseInt((options.height-parallax_mouseinteraction_playOver.height())/2,10)+'px'
			});
			
			$('.myloader', parallax_mouseinteraction_container).css({
				'left':((options.width-$('.myloader', parallax_mouseinteraction_container).width())/2)+'px',
				'top':((options.height-$('.myloader', parallax_mouseinteraction_container).height())/2)+'px'
			});			
			var ver_ie=getInternetExplorerVersion();
			
			var total_images=0;
			var current_obj = {
					current_img_no:0,
					currentImg:0,
					previous_current_img_no:0,
					slideIsRunning:false,
					mouseOverBanner:false,
					isVideoPlaying:false,
					carouselStep:0,
					thumbMarginLeft:0,					
					timeoutID:'',
					intervalID:'',
					arcInitialTime:(new Date).getTime(),
					timeElapsed:0,
					windowWidth:0,
					origImgsDimensions:Array(),
					firstLoadingComplete:false,
					canvas:'',
					ctx:'',
					timeouts_arr:Array(),
					continuouseIntervalIDs:Array(),
					rotationFunctionsArr:Array(),
					rotationDurationArr:Array(),
					textInPlace:Array(),
					prevMouseX:0,
					prevMouseY:0,
					bannerRatio:options.origWidth/options.origHeight
				};				

			//var current_obj.timeoutID; // the autoplay timeout ID
			
			
			var previousBottomHovered=0;
			var i = 0;
			
			current_obj.canvas = $('.mycanvas', parallax_mouseinteraction_container)[0];//here 3 out of if
			current_obj.canvas.width=2*options.circleRadius+4*options.circleLineWidth;
			current_obj.canvas.height=2*options.circleRadius+4*options.circleLineWidth;		
					
			if (ver_ie!=-1 && ver_ie<9) {
			   options.showCircleTimer=false;
			}
			if (options.showCircleTimer) {				
				current_obj.ctx = current_obj.canvas.getContext('2d');
			}			

			
			//set banner size
			parallax_mouseinteraction_container.width(options.width);
			parallax_mouseinteraction_container.height(options.height);
			
			parallax_mouseinteraction_contentHolderVisibleWrapper.width(options.width);
			parallax_mouseinteraction_contentHolderVisibleWrapper.height(options.height);
			
			parallax_mouseinteraction_contentHolder.width(options.width);//initial width
			parallax_mouseinteraction_contentHolder.height(options.height);
			
			//bannerControls.width('100%');
			//bannerControls.height('100%');
			bannerControls.css('margin-top',parseInt((options.height-parallax_mouseinteraction_leftNav.height())/2,10)+'px');
			
			//get images
			//var origImgsDimensions=new Array();
			/*var origSlidesImgsDimensions=new Array();
			var origTextsImgsDimensions=new Array();*/
			
			var theul=parallax_mouseinteraction_the.find('ul:first');
			//alert (theul.attr("title"));
			
			var imgs = theul.children();
			var contentHolderUnit;
			var holderWidth=0;
			var bottomNavBut;
			var thumbsHolder_Thumb;
			var bottomNavWidth=0;
			var bottomNavMarginTop=0;
			var imgInside;		
			imgs.each(function() {
	            current_obj.currentImg = $(this);
	            if(!current_obj.currentImg.is('li')){
	            	current_obj.currentImg = current_obj.currentImg.find('li:first');
	            }
	            
	            //alert (current_obj.currentImg.attr('title'))
	            	
	            if(current_obj.currentImg.is('li')){
	            	total_images++;
	            	//'+current_obj.currentImg.html()+'
	            	contentHolderUnit = $('<div class="contentHolderUnit" rel="'+ (total_images-1) +'" id="contentHolderUnit_'+ (total_images-1) +'">'+current_obj.currentImg.html()+'</div>');
	            	contentHolderUnit.width(options.width);
	            	contentHolderUnit.height(options.height);
	            	parallax_mouseinteraction_contentHolder.append(contentHolderUnit);
	            	holderWidth=holderWidth+options.width;
	            	//alert (holderWidth);
					
	            	imgInside = $('#contentHolderUnit_'+(total_images-1), parallax_mouseinteraction_container).find('img:first');
	            	if (imgInside.width()!=null) {
						current_obj.origImgsDimensions[total_images-1]=imgInside.width()+';'+imgInside.height();
						if (options.responsive && options.origWidth!=responsiveWidth) {
							resizeImg(imgInside,(total_images-1),current_obj,options,true);
						}
					} else {
						current_obj.origImgsDimensions[total_images-1]=null;
					}
					//alert (current_obj.origImgsDimensions[total_images-1]);
	            	
					
					if (options.skin=="bullets") {
						//generate bottomNav
						bottomNavBut = $('<div class="bottomNavButtonOFF" rel="'+ (total_images-1) +'"></div>');
						parallax_mouseinteraction_bottomNav.append(bottomNavBut);
						
						
						bottomNavWidth+=parseInt(bottomNavBut.css('padding-left').substring(0, bottomNavBut.css('padding-left').length-2),10)+bottomNavBut.width();
						bottomNavMarginTop=parseInt((parallax_mouseinteraction_bottomNav.height()-parseInt(bottomNavBut.css('height').substring(0, bottomNavBut.css('height').length-2)))/2,10);
						//alert (bottomNavMarginTop);
						bottomNavBut.css('margin-top',bottomNavMarginTop+'px');					
					} else { //thumbs generate thumbsHolder             
						image_name=$(imgs[total_images-1]).attr('data-bottom-thumb');
						thumbsHolder_Thumb = $('<div class="thumbsHolder_ThumbOFF" rel="'+ (total_images-1) +'"><img src="'+ image_name + '"></div>');
						parallax_mouseinteraction_thumbsHolder.append(thumbsHolder_Thumb);
						if (options.origThumbW==0) {
	
							if (options.numberOfThumbsPerScreen==0) {
								options.numberOfThumbsPerScreen=Math.floor((options.origWidth-parallax_mouseinteraction_carouselLeftNav.width()-parallax_mouseinteraction_carouselRightNav.width())/thumbsHolder_Thumb.width());
							}
							options.origThumbW=thumbsHolder_Thumb.width();
							options.origThumbH=thumbsHolder_Thumb.height();
							options.origthumbsHolderWrapperH=parallax_mouseinteraction_thumbsHolderWrapper.height();
							current_obj.thumbMarginLeft=Math.floor( (options.origWidth-parallax_mouseinteraction_carouselLeftNav.width()-parallax_mouseinteraction_carouselRightNav.width()-thumbsHolder_Thumb.width()*options.numberOfThumbsPerScreen)/(options.numberOfThumbsPerScreen-1) );
						}
	
	
						parallax_mouseinteraction_thumbsHolder.css('width',parallax_mouseinteraction_thumbsHolder.width()+current_obj.thumbMarginLeft+thumbsHolder_Thumb.width()+'px');
					
						thumbsHolder_MarginTop=parseInt((parallax_mouseinteraction_thumbsHolderWrapper.height()-parseInt(thumbsHolder_Thumb.css('height').substring(0, thumbsHolder_Thumb.css('height').length-2)))/2,10);
						
						
                	}					
		            
		            parallax_mouseinteraction_contentHolder.append($(current_obj.currentImg.attr('data-text-id')));
		    		$(current_obj.currentImg.attr('data-text-id')).css({
						'width':options.width+'px',
						/*'height':options.height+'px',
						'width':'100%',
						'border':'1px solid #FF0',*/
						'height':'100%',
						'overflow':'hidden',
						'left':parseInt((total_images-1)*options.width,10),
						'top':bannerControls.css('top')
					});
					
	            	
					
					var textIdChildren = $(current_obj.currentImg.attr('data-text-id')).children();
					var k=-1;
					textIdChildren.each(function() {
						k++;
						//alert ( $(this).attr('id') );
						imgInside = $(this).find('img:first');
						if (imgInside.width()!=null) {
							current_obj.origImgsDimensions[current_obj.currentImg.attr('data-text-id')+'-'+k]=imgInside.width()+';'+imgInside.height();
							if (options.responsive && options.origWidth!=responsiveWidth) {	
								resizeImg(imgInside,(current_obj.currentImg.attr('data-text-id')+'-'+k),current_obj,options,false);
							}
						} else {
							current_obj.origImgsDimensions[current_obj.currentImg.attr('data-text-id')+'-'+k]=null;
						}
					});

		            
	            }	            

	        });		

			parallax_mouseinteraction_contentHolder.width(holderWidth);
			
			
			if (options.skin=="bullets") {
				parallax_mouseinteraction_bottomNav.width(bottomNavWidth);
				if (options.showOnInitBottomNav) {
					parallax_mouseinteraction_bottomNav.css("left",parseInt((parallax_mouseinteraction_container.width()-bottomNavWidth)/2,10)+'px');
					parallax_mouseinteraction_bottomNavLeft.css("left",parseInt(parallax_mouseinteraction_bottomNav.css('left').substring(0, parallax_mouseinteraction_bottomNav.css('left').length-2),10)-parallax_mouseinteraction_bottomNavLeft.width()+'px');
					parallax_mouseinteraction_bottomNavRight.css("left",parseInt(parallax_mouseinteraction_bottomNav.css('left').substring(0, parallax_mouseinteraction_bottomNav.css('left').length-2),10)+parallax_mouseinteraction_bottomNav.width()+parseInt(bottomNavBut.css('padding-left').substring(0, bottomNavBut.css('padding-left').length-2),10)+'px');
				}	
			} else {//thumbs
				parallax_mouseinteraction_thumbsHolderVisibleWrapper.css({
					'width':(options.origWidth-parallax_mouseinteraction_carouselLeftNav.width()-parallax_mouseinteraction_carouselRightNav.width()),
					'left':parallax_mouseinteraction_carouselLeftNav.width()+'px'
				});
				
				current_obj.carouselStep=(thumbsHolder_Thumb.width()+current_obj.thumbMarginLeft)*options.numberOfThumbsPerScreen;
				//disable left nav
				parallax_mouseinteraction_carouselLeftNav.addClass('carouselLeftNavDisabled');
				
				//disable right nav and center thumbs
				if (options.numberOfThumbsPerScreen >= total_images) {
					parallax_mouseinteraction_carouselRightNav.addClass('carouselRightNavDisabled');
					parallax_mouseinteraction_carouselLeftNav.css('display','none');
					parallax_mouseinteraction_carouselRightNav.css('display','none');
					parallax_mouseinteraction_thumbsHolderVisibleWrapper.css('left',parseInt((parallax_mouseinteraction_thumbsHolderWrapper.width() - (thumbsHolder_Thumb.width()+current_obj.thumbMarginLeft)*total_images)/2,10)+'px');
				}
				
				//parallax_mouseinteraction_thumbsHolderWrapper.css("top",options.height+'px');
				
	
				var img_inside = $('.thumbsHolder_ThumbOFF', parallax_mouseinteraction_container).find('img:first');
				img_inside.css("margin-top",thumbsHolder_MarginTop+"px");
				options.origthumbsHolder_MarginTop=thumbsHolder_MarginTop;
			}
			thumbsHolder_Thumbs=$('.thumbsHolder_ThumbOFF', parallax_mouseinteraction_container);
			rearangethumbs(current_obj,options,total_images,parallax_mouseinteraction_container,thumbsHolder_Thumbs,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,thumbsHolder_Thumb,parallax_mouseinteraction_thumbsHolderVisibleWrapper,parallax_mouseinteraction_thumbsHolderWrapper);				
			
			
			if (total_images<=1) {
				options.showAllControllers=false;
				bannerControls.css("display","none");
				if (options.skin=="bullets") {
					parallax_mouseinteraction_bottomNav.css("display","none");
					parallax_mouseinteraction_bottomNavLeft.css("display","none");
					parallax_mouseinteraction_bottomNavRight.css("display","none");					
				} else { //thumbs 
					parallax_mouseinteraction_thumbsHolderVisibleWrapper.css("display","none");
				}
					
				options.enableTouchScreen=false;
				
				//parallax_mouseinteraction_contentHolder.draggable( "option", "disabled", true );
				parallax_mouseinteraction_contentHolder.css({'cursor':'default'});						
			}			
			
			//for youtube iframes
			$("iframe", parallax_mouseinteraction_container).each(function(){
			      var ifr_source = $(this).attr('src');
				  var wmode = "?wmode=transparent";
				  if ( ifr_source.indexOf('?')!=-1 )
				  	wmode = "&wmode=transparent";
			      $(this).attr('src',ifr_source+wmode);
			});
			
			
	        //initialize first number image
			current_obj.current_img_no=0;			
	        
	        
			current_obj.currentImg = $(imgs[0]);
	        
	        
	        

			
/*
	        //Event when Animation finishes
			parallax_mouseinteraction_container.bind('effectComplete', function(){
				current_obj.slideIsRunning=false;
				
				
				//alert (current_obj.currentImg.attr('data-text-id'));
				animate_texts(current_obj,options,parallax_mouseinteraction_the,bannerControls);
				
				if (options.autoPlay>0 && total_images>1 && !current_obj.mouseOverBanner) {
					clearTimeout(current_obj.timeoutID);
					current_obj.timeoutID=setTimeout(function(){ parallax_mouseinteraction_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,parallax_mouseinteraction_the,bannerControls,parallax_mouseinteraction_contentHolder,parallax_mouseinteraction_container,parallax_mouseinteraction_playOver,thumbsHolder_Thumbs,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,thumbsHolder_Thumb,parallax_mouseinteraction_thumbsHolderWrapper,parallax_mouseinteraction_bottomNav)},options.autoPlay*1000);
				}				
	        }); //bind
*/			
			


			parallax_mouseinteraction_container.mousemove(function(event) {
				if (options.enableMouseInteraction) {
					var middleX=parseInt(options.width/2,10);
					var middleY=parseInt(options.height/2,10);
					var distanceX=0;
					var distanceY=0;
					var maxXmove=parseInt(options.maxInteractionXmove/(options.origWidth/options.width));
					var maxYmove=parseInt(options.maxInteractionYmove/(options.origWidth/options.width));
					   //alert ( event.pageX+'  ----  '+parallax_mouseinteraction_container.position().left );
					   distanceX=event.pageX-parallax_mouseinteraction_container.position().left-middleX;
					   distanceY=event.pageY-parallax_mouseinteraction_container.position().top-middleY;
					   
					   distanceX = parseInt(distanceX*maxXmove/middleX);
					   distanceY = parseInt(distanceY*maxYmove/middleY);

					   move_texts(current_obj,current_obj.currentImg,options,distanceX,distanceY);	
				}
			});
			
			
			
			//pause on hover
			parallax_mouseinteraction_container.mouseenter(function() {
				if (options.pauseOnMouseOver && total_images>1 && current_obj.firstLoadingComplete) {
					current_obj.mouseOverBanner=true;
					clearTimeout(current_obj.timeoutID);
					nowx = (new Date).getTime();
					current_obj.timeElapsed=current_obj.timeElapsed+(nowx-current_obj.arcInitialTime);
				}
				
				
				if (options.autoHideNavArrows && options.showNavArrows) {
					parallax_mouseinteraction_leftNav.css("display","block");
					parallax_mouseinteraction_rightNav.css("display","block");
				}
				if (options.autoHideBottomNav && options.showBottomNav) {
					if (options.skin=="bullets") {
						parallax_mouseinteraction_bottomNav.css({
							'display':'block',
							'left':parseInt((parallax_mouseinteraction_container.width()-bottomNavWidth)/2,10)+'px'
						});
						
						parallax_mouseinteraction_bottomNavLeft.css({
							'display':'block',
							'left':parseInt(parallax_mouseinteraction_bottomNav.css('left').substring(0, parallax_mouseinteraction_bottomNav.css('left').length-2),10)-parallax_mouseinteraction_bottomNavLeft.width()+'px'
							
						});
						
						parallax_mouseinteraction_bottomNavRight.css({
							'display':'block',
							'left':parseInt(parallax_mouseinteraction_bottomNav.css('left').substring(0, parallax_mouseinteraction_bottomNav.css('left').length-2),10)+parallax_mouseinteraction_bottomNav.width()+parseInt(bottomNavBut.css('padding-left').substring(0, bottomNavBut.css('padding-left').length-2),10)+'px'
						});
					} else {
						
						 	if (options.thumbsWrapperMarginBottom<0 && current_obj.isVideoPlaying) {
                       			//nothing
							} else {
								if (options.showBottomNav) {
									parallax_mouseinteraction_thumbsHolderWrapper.css({
										"display":"block"
									});
									parallax_mouseinteraction_thumbsHolderWrapper
									.stop()
									.animate({
										opacity:1
									}, 500, 'swing', function() {
									 //complete
									});
								}								
							}
                     
					}
	
					
				}				
			});
			
			parallax_mouseinteraction_container.mouseleave(function() {
				if (options.pauseOnMouseOver && total_images>1 && current_obj.firstLoadingComplete) {
					current_obj.mouseOverBanner=false;					
				}
				
				if (options.autoHideNavArrows && options.showNavArrows) {
					parallax_mouseinteraction_leftNav.css("display","none");
					parallax_mouseinteraction_rightNav.css("display","none");
				}
				if (options.autoHideBottomNav && options.showBottomNav) {
					if (options.skin=="bullets") {
						parallax_mouseinteraction_bottomNav.css("display","none");
						parallax_mouseinteraction_bottomNavLeft.css("display","none");
						parallax_mouseinteraction_bottomNavRight.css("display","none");
					}	else {
							parallax_mouseinteraction_thumbsHolderWrapper
										.stop()
										.animate({
											opacity:0
										}, 300, 'swing', function() {
										 //complete
										});
					  }					
				}
				if (options.autoPlay>0 && total_images>1 && !current_obj.isVideoPlaying && options.pauseOnMouseOver && current_obj.firstLoadingComplete) {
					clearTimeout(current_obj.timeoutID);
					nowx = (new Date).getTime();
					current_obj.arcInitialTime = (new Date).getTime();
					var new_delay = parseInt(options.autoPlay*1000-((current_obj.timeElapsed+nowx)-current_obj.arcInitialTime),10);
					current_obj.timeoutID=setTimeout(function(){ parallax_mouseinteraction_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,parallax_mouseinteraction_the,bannerControls,parallax_mouseinteraction_contentHolder,parallax_mouseinteraction_container,parallax_mouseinteraction_playOver,thumbsHolder_Thumbs,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,thumbsHolder_Thumb,parallax_mouseinteraction_thumbsHolderWrapper,parallax_mouseinteraction_bottomNav)},new_delay);
				}
			});
			
			
			
			var contentHolderUnit=$('.contentHolderUnit', parallax_mouseinteraction_contentHolder);
			contentHolderUnit.click(function() {
				var i=$(this).attr('rel');
                if ($(imgs[current_obj.current_img_no]).attr('data-video')=='true') {
					
					if (i!=current_obj.current_img_no) {
						current_obj.isVideoPlaying=false;
					} else {
						clearTimeout(current_obj.timeoutID);	
						imgInside = $(this).find('img:first');
						imgInside.css('display','none');
						parallax_mouseinteraction_playOver.css('display','none');
						current_obj.isVideoPlaying=true;
						
						if (options.skin=="thumbs" && options.thumbsWrapperMarginBottom>(-1)*options.origthumbsHolderWrapperH) {
                       			parallax_mouseinteraction_thumbsHolderWrapper.css("display","none");
						}
 						if (options.skin=="bullets" && options.thumbsWrapperMarginBottom>=0) {
					   			parallax_mouseinteraction_bottomNav.css("display","none");								
						}					

					}
				}
				
				if ($(imgs[current_obj.current_img_no]).attr('data-link')!=undefined && i==current_obj.current_img_no && $(imgs[current_obj.current_img_no]).attr('data-link')!='') {
					var cur_target=options.target;
					if ($(imgs[current_obj.current_img_no]).attr('data-target')!=undefined && $(imgs[current_obj.current_img_no]).attr('data-target')!=''){
						cur_target=$(imgs[current_obj.current_img_no]).attr('data-target');
					}
					
					if (cur_target=="_blank")
						window.open($(imgs[current_obj.current_img_no]).attr('data-link'));
					else
						window.location = $(imgs[current_obj.current_img_no]).attr('data-link');
				}				
			});
			
			parallax_mouseinteraction_playOver.click(function() {
				parallax_mouseinteraction_playOver.css('display','none');						
				clearTimeout(current_obj.timeoutID);	
				imgInside = $('#contentHolderUnit_'+current_obj.current_img_no, parallax_mouseinteraction_container).find('img:first');
				imgInside.css('display','none');
				current_obj.isVideoPlaying=true;	
				
				if (options.skin=="thumbs" && options.thumbsWrapperMarginBottom>(-1)*options.origthumbsHolderWrapperH) {
						parallax_mouseinteraction_thumbsHolderWrapper.css("display","none");
				}
				if (options.skin=="bullets" && options.thumbsWrapperMarginBottom>=0) {
						parallax_mouseinteraction_bottomNav.css("display","none");								
				}				
			});		
			

			var allTexts=$('.parallax_mouseinteraction_texts', parallax_mouseinteraction_container);
			allTexts.click(function() {
				  if ($(imgs[current_obj.current_img_no]).attr('data-link')!=undefined && $(imgs[current_obj.current_img_no]).attr('data-link')!='' && !current_obj.slideIsRunning) {
					  var cur_target=options.target;
					  if ($(imgs[current_obj.current_img_no]).attr('data-target')!=undefined && $(imgs[current_obj.current_img_no]).attr('data-target')!=''){
						  cur_target=$(imgs[current_obj.current_img_no]).attr('data-target');
					  }
					  
					  if (cur_target=="_blank")
						  window.open($(imgs[current_obj.current_img_no]).attr('data-link'));
					  else
						  window.location = $(imgs[current_obj.current_img_no]).attr('data-link');
				  }
			});				
			
			
			
			//controllers
			parallax_mouseinteraction_leftNav.click(function() {
				if (!current_obj.slideIsRunning) {
					current_obj.isVideoPlaying=false;
					current_obj.previous_current_img_no=current_obj.current_img_no;
					clearTimeout(current_obj.timeoutID);
					parallax_mouseinteraction_navigation(-1,current_obj,options,total_images,bottomNavButs,imgs,parallax_mouseinteraction_the,bannerControls,parallax_mouseinteraction_contentHolder,parallax_mouseinteraction_container,parallax_mouseinteraction_playOver,thumbsHolder_Thumbs,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,thumbsHolder_Thumb,parallax_mouseinteraction_thumbsHolderWrapper,parallax_mouseinteraction_bottomNav);
				}
			});
			parallax_mouseinteraction_rightNav.click(function() {
				if (!current_obj.slideIsRunning) {
					current_obj.isVideoPlaying=false;
					current_obj.previous_current_img_no=current_obj.current_img_no;
					clearTimeout(current_obj.timeoutID);
					parallax_mouseinteraction_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,parallax_mouseinteraction_the,bannerControls,parallax_mouseinteraction_contentHolder,parallax_mouseinteraction_container,parallax_mouseinteraction_playOver,thumbsHolder_Thumbs,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,thumbsHolder_Thumb,parallax_mouseinteraction_thumbsHolderWrapper,parallax_mouseinteraction_bottomNav);
				}
			});
			
			
			
			var TO = false;
			$(window).resize(function() {
				var ver_ie=getInternetExplorerVersion();
				doResizeNow=true;
				if (navigator.userAgent.indexOf('Android') != -1) {
					if (options.windowOrientationScreenSize0==0 && window.orientation==0)
						options.windowOrientationScreenSize0=$(window).width();
						
					if (options.windowOrientationScreenSize90==0 && window.orientation==90)
						options.windowOrientationScreenSize90=$(window).height();	
						
					if (options.windowOrientationScreenSize_90==0 && window.orientation==-90)
						options.windowOrientationScreenSize_90=$(window).height();						
					
					if (options.windowOrientationScreenSize0 && window.orientation==0 && $(window).width()>options.windowOrientationScreenSize0)	
						doResizeNow=false;

					if (options.windowOrientationScreenSize90 && window.orientation==90 && $(window).height()>options.windowOrientationScreenSize90)	
						doResizeNow=false;
						
					if (options.windowOrientationScreenSize_90 && window.orientation==-90 && $(window).height()>options.windowOrientationScreenSize_90)	
						doResizeNow=false;	
						
						
					if (current_obj.windowWidth==0) {
						doResizeNow=false;
						current_obj.windowWidth=$(window).width();
					}

				}
				if (ver_ie!=-1 && ver_ie==9 && current_obj.windowWidth==0)
					doResizeNow=false;
				
				
				if (current_obj.windowWidth==$(window).width()) {
					doResizeNow=false;
					if (options.windowCurOrientation!=window.orientation && navigator.userAgent.indexOf('Android') != -1) {
						options.windowCurOrientation=window.orientation;
						doResizeNow=true;
					}
				} else
					current_obj.windowWidth=$(window).width();
				
				
				
				if (options.responsive && doResizeNow) {
					 if(TO !== false)
						clearTimeout(TO);
					 
					
					 TO = setTimeout(function(){ doResize(current_obj,options,total_images,imgs,parallax_mouseinteraction_the,bannerControls,parallax_mouseinteraction_contentHolderVisibleWrapper,parallax_mouseinteraction_contentHolder,parallax_mouseinteraction_container,parallax_mouseinteraction_playOver,bottomNavButs,parallax_mouseinteraction_leftNav,bottomNavBut,parallax_mouseinteraction_bottomNav,thumbsHolder_Thumbs,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,thumbsHolder_Thumb,parallax_mouseinteraction_thumbsHolderVisibleWrapper,parallax_mouseinteraction_thumbsHolderWrapper) }, 300); //200 is time in miliseconds
				}
			});			
			
			
			
			
			if (options.skin=="bullets") {
			//bottom nav
				var bottomNavButs=$('.bottomNavButtonOFF', parallax_mouseinteraction_container);
				bottomNavButs.click(function() {
					if (!current_obj.slideIsRunning && current_obj.firstLoadingComplete) {
						current_obj.isVideoPlaying=false;
						
						var currentBut=$(this);
						var i=currentBut.attr('rel');
						if (current_obj.current_img_no != i) {
							//deactivate previous 
							$(bottomNavButs[current_obj.current_img_no]).removeClass('bottomNavButtonON');
							current_obj.previous_current_img_no=current_obj.current_img_no;
							  //reinit content to stop videos
							  if ($(imgs[current_obj.previous_current_img_no]).attr('data-video')=='true') {
									$('#contentHolderUnit_'+current_obj.previous_current_img_no, parallax_mouseinteraction_container).html($(imgs[current_obj.previous_current_img_no]).html());
									resizeRepositionUnitContent(current_obj.previous_current_img_no,current_obj,options,imgs,parallax_mouseinteraction_container,parallax_mouseinteraction_the,bannerControls);					
							  }
							
		
							current_obj.current_img_no=i-1;
							parallax_mouseinteraction_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,parallax_mouseinteraction_the,bannerControls,parallax_mouseinteraction_contentHolder,parallax_mouseinteraction_container,parallax_mouseinteraction_playOver,thumbsHolder_Thumbs,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,thumbsHolder_Thumb,parallax_mouseinteraction_thumbsHolderWrapper,parallax_mouseinteraction_bottomNav);
							
							//alert (i+'  --  '+current_obj.current_img_no+'  --  '+total_images);
						}
					}
				});
				
				bottomNavButs.mouseenter(function() {
					var currentBut=$(this);
					var i=currentBut.attr('rel');
					
					
					
					if (options.showPreviewThumbs) {
						parallax_mouseinteraction_bottomOverThumb = $('<div class="bottomOverThumb"></div>');
						currentBut.append(parallax_mouseinteraction_bottomOverThumb);
						var image_name=$(imgs[i]).attr('data-bottom-thumb');
						var previous_image=$(imgs[previousBottomHovered]).attr('data-bottom-thumb');
						var thumb_marginLeft=80; //80 thumb width, 4 border
						var thumb_marginLeftFinal=-80;
						if (previousBottomHovered>i) {
						   thumb_marginLeft=-80;
						   thumb_marginLeftFinal=80;
						 }
						var thumb_marginTop=-80;
						parallax_mouseinteraction_bottomOverThumb.html('');
						parallax_mouseinteraction_bottomOverThumb.html('<div class="innerBottomOverThumb"><img src="'+ previous_image + '"style="margin:0px;" id="oldThumb"><img src="'+ image_name + '" style="margin-top:'+thumb_marginTop+'px; margin-left:'+thumb_marginLeft+'px;" id="newThumb"></div>');
						$('#newThumb')
							 .stop()
							 .animate({
								marginLeft:'0px'
							  },150,function(){
									parallax_mouseinteraction_bottomOverThumb.html('<div class="innerBottomOverThumb"><img src="'+ image_name + '"></div>'); //opera fix
							  });                    
						$('#oldThumb')
							 .stop()
							 .animate({
								marginLeft:thumb_marginLeftFinal+'px'
							  },150,function(){
									//
							  });
						previousBottomHovered=i;
					}
					
					currentBut.addClass('bottomNavButtonON');
				});
				
				bottomNavButs.mouseleave(function() {
					var currentBut=$(this);
					var i=currentBut.attr('rel');
	
					if (options.showPreviewThumbs) {
						parallax_mouseinteraction_bottomOverThumb.remove();
					}				
					
					if (current_obj.current_img_no!=i)
						currentBut.removeClass('bottomNavButtonON');
				});			
			
            } ////if (options.skin=="bullets") {	
			
			
			


			//thumbs bottom nav
			thumbsHolder_Thumbs.mousedown(function() {
				arrowClicked=true;
				if (!current_obj.effectIsRunning && current_obj.firstLoadingComplete) {
				    current_obj.isVideoPlaying=false;
					var currentBut=$(this);
					var i=currentBut.attr('rel');
					if (current_obj.current_img_no != i) {
						//deactivate previous 
						$(thumbsHolder_Thumbs[current_obj.current_img_no]).removeClass('thumbsHolder_ThumbON');
						current_obj.previous_current_img_no=current_obj.current_img_no;
						  //reinit content to stop videos
						  if ($(imgs[current_obj.previous_current_img_no]).attr('data-video')=='true') {
								$('#contentHolderUnit_'+current_obj.previous_current_img_no, parallax_mouseinteraction_container).html($(imgs[current_obj.previous_current_img_no]).html());
								resizeRepositionUnitContent(current_obj.previous_current_img_no,current_obj,options,imgs,parallax_mouseinteraction_container,parallax_mouseinteraction_the,bannerControls);					
						  }
						current_obj.bottomNavClicked=true;
						
						current_obj.current_img_no=i-1;
						parallax_mouseinteraction_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,parallax_mouseinteraction_the,bannerControls,parallax_mouseinteraction_contentHolder,parallax_mouseinteraction_container,parallax_mouseinteraction_playOver,thumbsHolder_Thumbs,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,thumbsHolder_Thumb,parallax_mouseinteraction_thumbsHolderWrapper,parallax_mouseinteraction_bottomNav);
					}
				}
			});
			thumbsHolder_Thumbs.mouseup(function() {
				arrowClicked=false;
			});				
			
			thumbsHolder_Thumbs.mouseenter(function() {
				var currentBut=$(this);
				var i=currentBut.attr('rel');
				
				currentBut.addClass('thumbsHolder_ThumbON');
			});
			
			thumbsHolder_Thumbs.mouseleave(function() {
				var currentBut=$(this);
				var i=currentBut.attr('rel');

				if (current_obj.current_img_no!=i)
					currentBut.removeClass('thumbsHolder_ThumbON');
			});	
			
			
			//carousel controllers
			parallax_mouseinteraction_carouselLeftNav.click(function() {
				if (!current_obj.isCarouselScrolling) {
					currentCarouselLeft=parallax_mouseinteraction_thumbsHolder.css('left').substr(0,parallax_mouseinteraction_thumbsHolder.css('left').lastIndexOf('px'));

					if (currentCarouselLeft <0 ) 
						carouselScroll(1,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,options,total_images,thumbsHolder_Thumb,current_obj);
				}
			});
			
			
			parallax_mouseinteraction_carouselRightNav.click(function() {
				if (!current_obj.isCarouselScrolling) {
					currentCarouselLeft=parallax_mouseinteraction_thumbsHolder.css('left').substr(0,parallax_mouseinteraction_thumbsHolder.css('left').lastIndexOf('px'));
					if (Math.abs(currentCarouselLeft-current_obj.carouselStep)<(thumbsHolder_Thumb.width()+current_obj.thumbMarginLeft)*total_images) 
						carouselScroll(-1,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,options,total_images,thumbsHolder_Thumb,current_obj);
				}
			});
			
			


			//first start autoplay
			if (options.skin=="bullets") {
				
				$(bottomNavButs[current_obj.current_img_no]).addClass('bottomNavButtonON');
			} else {
				$(thumbsHolder_Thumbs[current_obj.current_img_no]).addClass('thumbsHolder_ThumbON');
			}
			
			
			setTimeout (function () {
				$('.myloader', parallax_mouseinteraction_container).css('display','none');
				
				//if (options.preanimateElementsOverImage) {
					preanimate_texts(imgs,options,parallax_mouseinteraction_the,total_images);		
				//}
				
				current_obj.firstLoadingComplete=true;
				if (total_images>1) {
					if (options.enableTouchScreen) {
						parallax_mouseinteraction_contentHolder.draggable( "option", "disabled", false );				
					}
					current_obj.arcInitialTime = (new Date).getTime();
					current_obj.mouseOverBanner=false;
					current_obj.timeElapsed=0;						
				}
				//generate the text for first image
				animate_texts(current_obj,current_obj.currentImg,options,parallax_mouseinteraction_the,parallax_mouseinteraction_container,bannerControls,false,current_obj.current_img_no);
				
				if (options.autoPlay>0 && total_images>1) {
					if (options.showCircleTimer) {
						current_obj.intervalID=setInterval(function(){the_arc(current_obj,options)}, 125);
					}				
					
					current_obj.timeoutID=setTimeout(function(){ parallax_mouseinteraction_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,parallax_mouseinteraction_the,bannerControls,parallax_mouseinteraction_contentHolder,parallax_mouseinteraction_container,parallax_mouseinteraction_playOver,thumbsHolder_Thumbs,parallax_mouseinteraction_thumbsHolder,parallax_mouseinteraction_carouselLeftNav,parallax_mouseinteraction_carouselRightNav,thumbsHolder_Thumb,parallax_mouseinteraction_thumbsHolderWrapper,parallax_mouseinteraction_bottomNav)},options.autoPlay*1000);
				}
			}, options.myloaderTime*1000 );

			if ($(imgs[current_obj.current_img_no]).attr('data-video')=='true')
				parallax_mouseinteraction_playOver.css('display','block');
				
			
			
		});
	};

	
	//
	// plugin skins
	//
	$.fn.parallax_mouseinteraction.defaults = {
			skin: 'bullets',
			width:918,
			height:382,
			width100Proc:false,
			height100Proc:false,			
			autoPlay:7,
			loop:true,
			target:"_blank", //_blank/_self
			absUrl:'',
			showAllControllers:true,
			showNavArrows:true,
			showOnInitNavArrows:true, // o1
			autoHideNavArrows:true, // o1
			showBottomNav:true,
			showOnInitBottomNav:true, // o2
			autoHideBottomNav:true, // o2
			showPreviewThumbs:true,
			enableTouchScreen:true,
			
			pauseOnMouseOver:true,
			showCircleTimer:true,
			showCircleTimerIE8IE7:false,
			circleRadius:10,
			circleLineWidth:4,
			circleColor: "#FF0000",
			circleAlpha: 100,
			behindCircleColor: "#000000",
			behindCircleAlpha: 50,
			responsive:false,
			responsiveRelativeToBrowser:true,
			
			thumbsWrapperMarginBottom:-35,
			
			scrollSlideDuration:0.8,
			scrollSlideEasing:'easeOutQuad',
			numberOfThumbsPerScreen:0,
			thumbsOnMarginTop:10,
			defaultEasing:'swing', //texts/elements over image Easing
			//preanimateElementsOverImage:false,
			//hideElementsOnPreviousSlide:true,
			myloaderTime:4,
			defaultExitLeft:0,
			defaultExitTop:0,
			defaultExitDuration:0,
			defaultExitDelay:0,
			//defaultExitFade:1,
			defaultExitEasing:'swing',
			defaultExitOFF:false,
			
			enableMouseInteraction:true,
			maxInteractionXmove:70,
			maxInteractionYmove:40,
			/*mouseInteractionXmove:10,
			mouseInteractionYmove:10,*/
			mouseInteractionEasing:'easeOutQuint',
			mouseInteractionDuration:1,
			
			
			origWidth:0,
			origHeight:0,
			origThumbW:0,
			origThumbH:0,
			origthumbsHolderWrapperH:0,
			origWidthThumbsHolderVisibleWrapper:0,	
			windowOrientationScreenSize0:0,
			windowOrientationScreenSize90:0,
			windowOrientationScreenSize_90:0,
			windowCurOrientation:0			
			
	};

})(jQuery);
