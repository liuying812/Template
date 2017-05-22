	 function showMask(){     
			    $("#mask").css("height",'100%');     
			    $("#mask").css("width",$(document).width());   
			    $("#mask").show(); 

			  }  

			//隐藏遮罩层  
			function hideMask(){     
			    $("#mask").hide();     
			}

			//显示菜单
			function showMenu(){
				$('.left_menu').animate({left: '+0%'}, "fast");
			}

			function hideMenu(){
				$('.left_menu').animate({left: '-70%'}, "fast");
			}

			var flag = true;
			$("#nav_menu").click(function(){
				if(flag){
					showMask();
					showMenu();
					flag= false;

					 $('#mask').bind("touchmove",function(e){  
		                e.preventDefault();  
		        	});   
				}else{
					hideMask();
					hideMenu();
					flag= true;
				}
			});
