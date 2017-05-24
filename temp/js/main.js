	function showMask(){     
	    $("#mask").css("height",'100%');     
	    $("#mask").css("width",$(document).width());   
	    $("#mask").show(); 

	   $("body").css("overflow", "hidden");

	}  

	//隐藏遮罩层  
	function hideMask(){     
	    $("#mask").hide();
	    $('body').css('overflow', 'auto');     
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
		}else{
			hideMask();
			hideMenu();
			flag= true;
		}
	});


	/*遮罩层出来，禁止往下滚动*/
	 $(".left_menu").on("click",function(e){  
        e.stopPropagation();  
     })	

     /*todo  点击弹窗菜单之外隐藏*/
