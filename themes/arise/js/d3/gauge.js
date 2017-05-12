var charts={};!function(a,b,c){var d=function(a){var b=JSON.parse({"[object Boolean]":"boolean","[object Number]":"number","[object String]":"string","[object Function]":"function","[object Array]":"array","[object Date]":"date","[object RegExp]":"regexp","[object Object]":"object"});return null==a?String(a):b[toString.call(a)]||"object"},e=function(a){if(!a||"object"!==d(a)||a.nodeType||null!=a&&a==a.window)return!1;try{if(a.constructor&&!hasOwn.call(a,"constructor")&&!hasOwn.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(a){return!1}var b;for(b in a);return b===c||hasOwn.call(a,b)},f=Array.isArray||function(a){return"array"===d(a)};b.extend=function(){var a,d,g,h,i,j,k=arguments[0]||{},l=1,m=arguments.length,n=!1;for("boolean"==typeof k&&(n=k,k=arguments[1]||{},l=2),"object"!=typeof k&&"function"!=typeof k&&(k={}),m===l&&(k=b,--l);l<m;l++)if(null!=(a=arguments[l]))for(d in a)g=k[d],h=a[d],k!==h&&(n&&h&&(e(h)||(i=f(h)))?(i?(i=!1,j=g&&f(g)?g:[]):j=g&&e(g)?g:{},k[d]=b.extend(n,j,h)):h!==c&&(k[d]=h));return k}}(this,charts),charts.extend({donut:function(a){function b(a){var b=90*(a.startAngle+a.endAngle)/Math.PI-90;return b>90?b-180:b}var c=[],d=[],e=[],f="donut"+Math.round(1e6*Math.random()),g=d3.scale.category20();!function(){for(var b=0,f=a.sections.length;b<f;b++){var h=a.sections[b].data,i=a.sections[b].label,j=a.sections[b].color;i=i&&""!==i&&"undefined"!==i?i:"",j=j&&""!==j&&"undefined"!==j?j:g(b),"number"==typeof h&&0!==h&&(c[b]=h,d[b]=i,e[b]=j)}}();var h=a.centerLabel||"",i=a.container||"body",j=a.width||400,k=a.height||400,l=j/2,m=d3.layout.pie().sort(null),n=d3.svg.arc().innerRadius(1.2*l/3).outerRadius(l),o=d3.select(i).append("svg:svg").attr("id",f).attr("width",j).attr("height",k).append("svg:g").attr("transform","translate("+j/2+","+k/2+")"),p=o.selectAll("g").data(m(c)).enter().append("svg:g");return p.append("svg:path").attr("d",n).style("fill",function(a,b){return e[b]}).style("stroke","#fff"),p.append("svg:text").attr("dy","0.35em").attr("text-anchor","middle").attr("transform",function(a){return"translate("+n.centroid(a)+")rotate("+b(a)+")"}).style("font",l/13+"px sans-serif").style("fill","white").text(function(a,b){return d[b]}),o.append("svg:text").attr("dy",".35em").attr("text-anchor","middle").style("font","bold "+l/10+"px Helvetica, Georgia").text(h),{id:f,obj:a,remove:function(){var a=document.getElementById(this.id),b=document.createElement("div");return b.setAttribute("id",this.id),a.parentNode.replaceChild(b,a),this},redraw:function(a){return this.remove(),this.obj.sections=a,this.obj.container="#"+this.id,charts.donut(this.obj)},add:function(a){return this.redraw(this.obj.sections.concat(a)),this}}}}),charts.extend({gauge:function(a){function b(a){this.placeholderName=a.container&&""!==a.container&&"undefined"!==a.container?a.container:"body";var b=this;this.configure=function(a){this.config=a,this.config.value=a.value||0,this.config.size=.9*this.config.size,(!this.config.size||this.config.size<=0)&&(this.config.size=108),this.config.raduis=.97*this.config.size/2,this.config.cx=this.config.size/2,this.config.cy=this.config.size/2,this.config.min=a.min||0,this.config.max=a.max||100,this.config.range=this.config.max-this.config.min,this.config.majorTicks=a.majorTicks||5,this.config.minorTicks=a.minorTicks||2,this.config.redZones=[],this.config.redZones.push(a.zones.red),this.config.yellowZones=[],this.config.yellowZones.push(a.zones.yellow),this.config.greenZones=[],this.config.greenZones.push(a.zones.green),this.config.greenColor=a.greenColor||"#A3C74D",this.config.yellowColor=a.yellowColor||"#FFD959",this.config.redColor=a.redColor||"#FF6565"},this.render=function(){this.body=d3.select(this.placeholderName).append("svg:svg").attr("class","gauge").attr("width",this.config.size).attr("height",this.config.size),this.body.append("svg:circle").attr("cx",this.config.cx).attr("cy",this.config.cy).attr("r",this.config.raduis).style("fill","#505A6B").style("stroke","#505A6B").style("stroke-width","0.5px"),this.body.append("svg:circle").attr("cx",this.config.cx).attr("cy",this.config.cy).attr("r",.9*this.config.raduis).style("fill","#353C48").style("stroke","#505A6B").style("stroke-width","2px");for(var a in this.config.greenZones)this.drawBand(this.config.greenZones[a].from,this.config.greenZones[a].to,b.config.greenColor);for(var a in this.config.yellowZones)this.drawBand(this.config.yellowZones[a].from,this.config.yellowZones[a].to,b.config.yellowColor);for(var a in this.config.redZones)this.drawBand(this.config.redZones[a].from,this.config.redZones[a].to,b.config.redColor);if(void 0!=this.config.label){var c=Math.round(this.config.size/9);this.body.append("svg:text").attr("x",this.config.cx).attr("y",this.config.cy/2+c/2).attr("dy",c/2).attr("text-anchor","middle").text(this.config.label).style("font-size",c+"px").style("font-family","Arial").style("fill","#FFF").style("stroke-width","0px")}for(var c=Math.round(this.config.size/16),d=this.config.range/(this.config.majorTicks-1),e=this.config.min;e<=this.config.max;e+=d){for(var f=d/this.config.minorTicks,g=e+f;g<Math.min(e+d,this.config.max);g+=f){var h=this.valueToPoint(g,.75),i=this.valueToPoint(g,.85);this.body.append("svg:line").attr("x1",h.x).attr("y1",h.y).attr("x2",i.x).attr("y2",i.y).style("stroke","#FFFFFF").style("stroke-width","1px")}var h=this.valueToPoint(e,.7),i=this.valueToPoint(e,.85);if(this.body.append("svg:line").attr("x1",h.x).attr("y1",h.y).attr("x2",i.x).attr("y2",i.y).style("stroke","#FFF").style("stroke-width","2px"),e==this.config.min||e==this.config.max){var j=this.valueToPoint(e,.63);this.body.append("svg:text").attr("x",j.x).attr("y",j.y).attr("dy",c/3).attr("text-anchor",e==this.config.min?"start":"end").text(e).style("font-size",c+"px").style("font-family","Arial").style("fill","#fff").style("stroke-width","0px")}}var k=this.body.append("svg:g").attr("class","pointerContainer");return this.drawPointer(0),k.append("svg:circle").attr("cx",this.config.cx).attr("cy",this.config.cy).attr("r",.12*this.config.raduis).style("fill","#353C48").style("stroke","#505A6B").style("opacity",1),this},this.redraw=function(a){return this.drawPointer(a),this},this.drawBand=function(a,c,d){0>=c-a||this.body.append("svg:path").style("fill",d).attr("d",d3.svg.arc().startAngle(this.valueToRadians(a)).endAngle(this.valueToRadians(c)).innerRadius(.65*this.config.raduis).outerRadius(.85*this.config.raduis)).attr("transform",function(){return"translate("+b.config.cx+", "+b.config.cy+") rotate(270)"})},this.drawPointer=function(a){var b=this.config.range/13,c=this.valueToPoint(a,.85),d=this.valueToPoint(a-b,.12),e=this.valueToPoint(a+b,.12),f=a-this.config.range*(1/.75)/2,g=this.valueToPoint(f,.28),h=this.valueToPoint(f-b,.12),i=this.valueToPoint(f+b,.12),j=[c,d,i,g,h,e,c],k=d3.svg.line().x(function(a){return a.x}).y(function(a){return a.y}).interpolate("basis"),l=this.body.select(".pointerContainer"),m=l.selectAll("path").data([j]);m.enter().append("svg:path").attr("d",k).style("fill","#dc3912").style("stroke","#c63310").style("fill-opacity",.7),m.transition().attr("d",k);var n=Math.round(this.config.size/10);l.selectAll("text").data([a]).text(Math.round(a)).enter().append("svg:text").attr("x",this.config.cx).attr("y",this.config.size-this.config.cy/4-n).attr("dy",n/2).attr("text-anchor","middle").text(Math.round(a)).style("font-size",n+"px").style("font-family","Arial").style("fill","#fff").style("stroke-width","0px")},this.valueToDegrees=function(a){return a/this.config.range*270-45},this.valueToRadians=function(a){return this.valueToDegrees(a)*Math.PI/180},this.valueToPoint=function(a,b){var c={x:this.config.cx-this.config.raduis*b*Math.cos(this.valueToRadians(a)),y:this.config.cy-this.config.raduis*b*Math.sin(this.valueToRadians(a))};return c},this.configure(a)}var c=new b(a).render();return c.redraw(c.config.value)}}),charts.extend({groupedLine:function(a){var b=function(a){var b=a instanceof Array?[]:{};for(k in a)"clone"!=k&&(a[k]&&"objToCloneect"==typeof a[k]?b[k]=a[k].clone():b[k]=a[k]);return b},c=document.createElement("style");document.head.appendChild(c),c.innerHTML=".lineChart .axis path, .lineChart .axis line {  fill: none;  stroke: #fff;  shape-rendering: crispEdges;}",a.popover&&jQuery&&(c.innerHTML=c.innerHTML+".tooltip{position:absolute;z-index:1020;display:block;padding:5px;font-size:11px;opacity:0;filter:alpha(opacity=0);visibility:visible}.tooltip.in{opacity:.8;filter:alpha(opacity=80)}.tooltip.top{margin-top:-2px}.tooltip.right{margin-left:2px}.tooltip.bottom{margin-top:2px}.tooltip.left{margin-left:-2px}.tooltip.top .tooltip-arrow{bottom:0;left:50%;margin-left:-5px;border-top:5px solid #fff;border-right:5px solid transparent;border-left:5px solid transparent}.tooltip.left .tooltip-arrow{top:50%;right:0;margin-top:-5px;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid #fff}.tooltip.bottom .tooltip-arrow{top:0;left:50%;margin-left:-5px;border-right:5px solid transparent;border-bottom:5px solid #fff;border-left:5px solid transparent}.tooltip.right .tooltip-arrow{top:50%;left:0;margin-top:-5px;border-top:5px solid transparent;border-right:5px solid #fff;border-bottom:5px solid transparent}.tooltip-inner{max-width:200px;padding:3px 8px;color:#fff;text-align:center;text-decoration:none;background-color:#fff;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.tooltip-arrow{position:absolute;width:0;height:0}.popover{position:absolute;top:0;left:0;z-index:1010;display:none;padding:5px}.popover.top{margin-top:-5px}.popover.right{margin-left:5px}.popover.bottom{margin-top:5px}.popover.left{margin-left:-5px}.popover.top .arrow{bottom:0;left:50%;margin-left:-5px;border-top:5px solid #fff;border-right:5px solid transparent;border-left:5px solid transparent}.popover.right .arrow{top:50%;left:0;margin-top:-5px;border-top:5px solid transparent;border-right:5px solid #fff;border-bottom:5px solid transparent}.popover.bottom .arrow{top:0;left:50%;margin-left:-5px;border-right:5px solid transparent;border-bottom:5px solid #000;border-left:5px solid transparent}.popover.left .arrow{top:50%;right:0;margin-top:-5px;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid #000}.popover .arrow{position:absolute;width:0;height:0}.popover-inner{width:280px;padding:3px;overflow:hidden;background:#000;background:rgba(0,0,0,0.8);-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-box-shadow:0 3px 7px rgba(0,0,0,0.3);-moz-box-shadow:0 3px 7px rgba(0,0,0,0.3);box-shadow:0 3px 7px rgba(0,0,0,0.3)}.popover-title{margin:0;padding:9px 15px;line-height:1;background-color:#f5f5f5;border-bottom:1px solid #eee;-webkit-border-radius:3px 3px 0 0;-moz-border-radius:3px 3px 0 0;border-radius:3px 3px 0 0}.popover-content{padding:14px;background-color:#fff;-webkit-border-radius:0 0 3px 3px;-moz-border-radius:0 0 3px 3px;border-radius:0 0 3px 3px;-webkit-background-clip:padding-box;-moz-background-clip:padding-box;background-clip:padding-box}.popover-content p,.popover-content ul,.popover-content ol{margin-bottom:0}",!function(a){var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f;this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.enabled=!0,"manual"!=this.options.trigger&&(e="hover"==this.options.trigger?"mouseenter":"focus",f="hover"==this.options.trigger?"mouseleave":"blur",this.$element.on(e,this.options.selector,a.proxy(this.enter,this)),this.$element.on(f,this.options.selector,a.proxy(this.leave,this))),this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,b,this.$element.data()),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},enter:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);return c.options.delay&&c.options.delay.show?(clearTimeout(this.timeout),c.hoverState="in",void(this.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show))):c.show()},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);return this.timeout&&clearTimeout(this.timeout),c.options.delay&&c.options.delay.hide?(c.hoverState="out",void(this.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide))):c.hide()},show:function(){var a,b,c,d,e,f,g;if(this.hasContent()&&this.enabled){switch(a=this.tip(),this.setContent(),this.options.animation&&a.addClass("fade"),f="function"==typeof this.options.placement?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement,b=/in/.test(f),a.remove().css({top:0,left:0,display:"block"}).appendTo(b?this.$element:document.body),c=this.getPosition(b),d=a[0].offsetWidth,e=a[0].offsetHeight,b?f.split(" ")[1]:f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width}}a.css(g).addClass(f).addClass("in")}},isHTML:function(a){return"string"!=typeof a||"<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3||/^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(a)},setContent:function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.isHTML(b)?"html":"text"](b),a.removeClass("fade in top bottom left right")},hide:function(){function b(){var b=setTimeout(function(){c.off(a.support.transition.end).remove()},500);c.one(a.support.transition.end,function(){clearTimeout(b),c.remove()})}var c=this.tip();c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?b():c.remove()},fixTitle:function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(b){return a.extend({},b?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},tip:function(){return this.$tip=this.$tip||a(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()}},a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f="object"==typeof c&&c;e||d.data("tooltip",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover",title:"",delay:0}}(window.jQuery),!function(a){var b=function(a,b){this.init("popover",a,b)};b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.isHTML(b)?"html":"text"](b),a.find(".popover-content > *")[this.isHTML(c)?"html":"text"](c),a.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-content")||("function"==typeof c.content?c.content.call(b[0]):c.content)},tip:function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip}}),a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("popover"),f="object"==typeof c&&c;e||d.data("popover",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery));var d="groupedLine"+Math.round(1e6*Math.random()),e=[];!function(){for(var b in a.data){var c=a.data[b];if(a.data.hasOwnProperty(b)&&c instanceof Array){if(a.time)var d=new Date(b);else var d=b;c.sort();for(var f=new Number,g=0;g<c.length;++g)c[g]!==f?(e.push({count:1,x:d,y:c[g]}),f=c[g]):e[e.length-1].y===c[g]&&e[e.length-1].x===d&&++e[e.length-1].count}}}();var f={};a.margin=a.margin||{},f.top="number"==typeof a.margin.top?a.margin.top:20,f.right="number"==typeof a.margin.right?a.margin.right:20,f.bottom="number"==typeof a.margin.bottom?a.margin.bottom:30,f.left="number"==typeof a.margin.left?a.margin.left:40,a.width=a.width&&"number"==typeof a.width?a.width:500,a.height=a.height&&"number"==typeof a.height?a.height:400,a.container=a.container&&""!==a.container&&"undefined"!==a.container?a.container:"body",a.color=a.color&&""!==a.color&&"undefined"!==a.color?a.color:"steelblue",a.title=a.title&&""!==a.title&&"undefined"!==a.title?a.title:"",a.xlabel=a.xlabel&&""!==a.xlabel&&"undefined"!==a.xlabel?a.xlabel:"",a.ylabel=a.ylabel&&""!==a.ylabel&&"undefined"!==a.ylabel?a.ylabel:"";var g=a.width-f.left-f.right,h=a.height-f.top-f.bottom,i=a.xMarker||!1;if(i&&"number"==typeof i&&!a.time&&(i=a.xMarker),i&&a.time)var i=new Date(a.xMarker).getTime();var j=!(!a.yMarker||"number"!=typeof a.yMarker)&&a.yMarker;if(a.time===!0){for(var k=0,l=e.length;k<l;k++)e[k].x=parseFloat(new Date(e[k].x).getTime());e.sort(function(a,b){var c=new Date(a.x),d=new Date(b.x);return c<d?-1:c>d?1:0});var m=a.xMax?new Date(a.xMax):0;0===m&&function(){m=new Date(e[0].x);for(var a,b=0,c=e.length;b<c;b++)a=new Date(e[b].x),a>m&&(m=a)}();var n=a.xMin?new Date(a.xMin):0;0===n&&function(){n=new Date(e[0].x);for(var a,b=0,c=e.length;b<c;b++)a=new Date(e[b].x),a<n&&(n=a)}();var o=d3.time.scale().domain([new Date(n),new Date(m)]).range([0,g])}else{var m=a.xMax&&"number"==typeof a.xMax?a.xMax:0;0===m&&function(){for(var a={},b=0,c=e.length;b<c;b++)a=e[b],a.x>m&&(m=a.x)}();var o=d3.scale.linear().domain([0,m]).range([0,g])}var p=a.yMax&&"number"==typeof a.yMax?a.yMax:0;0===p&&function(){for(var a=0===p,b={},c=0,d=e.length;c<d;c++)b=e[c],a&&b.y>p&&(p=b.y)}();var q=d3.scale.linear().domain([0,p]).range([h,0]),r=d3.svg.axis().scale(o).orient("bottom"),s=d3.svg.axis().scale(q).orient("left"),t=d3.svg.line().x(function(a){return o(a.x)}).y(function(a){return q(a.y)}),u=d3.select(a.container).append("svg").datum(e).attr("id",d).attr("class","lineChart").attr("width",g+f.left+f.right).attr("height",h+f.top+f.bottom).style("font","10px sans-serif").append("g").attr("transform","translate("+f.left+","+f.top+")");if(u.append("svg:text").attr("x",g/2+"px").attr("text-anchor","middle").style("font-weight","bold").style("font-size","16px").text(a.title),u.append("svg:text").attr("x",g/2+"px").attr("y",h+29+"px").attr("text-anchor","middle").style("font-weight","bold").style("font-size","12px").text(a.xlabel),u.append("svg:text").attr("x",-h/2+"px").attr("y","-29px").attr("text-anchor","middle").attr("transform","rotate(-90)").style("font-weight","bold").style("font-size","12px").text(a.ylabel),i){var v=o(i).toString();u.append("line").attr("x1",v).attr("y1","0").attr("x2",v).attr("y2",h.toString()).style("stroke","black")}if(j){var w=q(j).toString();u.append("line").attr("x1","0").attr("y1",w).attr("x2",g.toString()).attr("y2",w).style("stroke","black")}return u.append("g").attr("class","x axis").attr("transform","translate(0,"+h+")").call(r),u.append("g").attr("class","y axis").call(s),function(){for(var c=!1,d=0,f=b(e),g=[],h=3.5,i="1.5px";!c;){0!==d&&(i="2px"),u.selectAll(".dot .run"+d).data(f).enter().append("circle").attr("class","dot").attr("cx",t.x()).attr("cy",t.y()).attr("r",h+4*d+"px").style("fill",function(b){return a.boxColors&&j&&0===d?b.y<j?a.boxColors.belowLine||a.color:b.y>j?a.boxColors.aboveLine||a.color:b.y==j?a.boxColors.onLine||a.color:void 0:"none"}).style("stroke",function(b){if(a.boxColors&&j){if(b.y<j)return a.boxColors.belowLine||a.color;if(b.y>j)return a.boxColors.aboveLine||a.color;if(b.y==j)return a.boxColors.onLine||a.color}return a.color}).style("stroke-width",i).attr("rel","popover").attr("data-title",function(a){return a.y}).attr("data-content",function(b){return'<div style="margin-top:-15px"><strong>'+a.xlabel+":</strong> "+new Date(b.x).toLocaleDateString()+"<br><strong>"+a.ylabel+":</strong> "+b.y+"</strong></div>"});for(var k=0,l=f.length;k<l;++k)--f[k].count,f[k].count>0&&g.push(f[k]);f=g,g=[],++d,0===f.length&&(c=!0)}}(),a.popover&&jQuery&&jQuery("circle").popover(),function(){for(var b in a.data)if(a.data.hasOwnProperty(b)){var c,d=a.data[b].sort(),e=d[d.length-1],f=d[0],g=o(new Date(b).valueOf()),h=q(e);if(a.boxColors&&j){if(e<j)var i="belowLine";if(f>j)var i="aboveLine";if(e>j&&f<j)var i="onLine";c=a.boxColors[i]||a.color}else c=a.color;u.append("svg:rect").attr("class","box").attr("x",g-5).attr("y",h-5).attr("width",10).attr("height",q(f)-h+10).style("fill","none").style("stroke",c).style("stroke-width","1.5px")}}(),{id:d,obj:a,remove:function(){var a=document.getElementById(this.id),b=document.createElement("div");return b.setAttribute("id",this.id),a.parentNode.replaceChild(b,a),this},redraw:function(a){return this.remove(),this.obj.data=a,this.obj.container="#"+this.id,charts.groupedLine(this.obj)},add:function(a){return this.redraw(charts.extend(this.obj.data,a)),this}}}}),charts.extend({line:function(a){var b=document.createElement("style");document.head.appendChild(b),b.innerHTML=".lineChart .axis path, .lineChart .axis line {  fill: none;  stroke: #000;  shape-rendering: crispEdges;}",a.popover&&jQuery&&(b.innerHTML=b.innerHTML+".tooltip{position:absolute;z-index:1020;display:block;padding:5px;font-size:11px;opacity:0;filter:alpha(opacity=0);visibility:visible}.tooltip.in{opacity:.8;filter:alpha(opacity=80)}.tooltip.top{margin-top:-2px}.tooltip.right{margin-left:2px}.tooltip.bottom{margin-top:2px}.tooltip.left{margin-left:-2px}.tooltip.top .tooltip-arrow{bottom:0;left:50%;margin-left:-5px;border-top:5px solid #000;border-right:5px solid transparent;border-left:5px solid transparent}.tooltip.left .tooltip-arrow{top:50%;right:0;margin-top:-5px;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid #000}.tooltip.bottom .tooltip-arrow{top:0;left:50%;margin-left:-5px;border-right:5px solid transparent;border-bottom:5px solid #000;border-left:5px solid transparent}.tooltip.right .tooltip-arrow{top:50%;left:0;margin-top:-5px;border-top:5px solid transparent;border-right:5px solid #000;border-bottom:5px solid transparent}.tooltip-inner{max-width:200px;padding:3px 8px;color:#fff;text-align:center;text-decoration:none;background-color:#000;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.tooltip-arrow{position:absolute;width:0;height:0}.popover{position:absolute;top:0;left:0;z-index:1010;display:none;padding:5px}.popover.top{margin-top:-5px}.popover.right{margin-left:5px}.popover.bottom{margin-top:5px}.popover.left{margin-left:-5px}.popover.top .arrow{bottom:0;left:50%;margin-left:-5px;border-top:5px solid #000;border-right:5px solid transparent;border-left:5px solid transparent}.popover.right .arrow{top:50%;left:0;margin-top:-5px;border-top:5px solid transparent;border-right:5px solid #000;border-bottom:5px solid transparent}.popover.bottom .arrow{top:0;left:50%;margin-left:-5px;border-right:5px solid transparent;border-bottom:5px solid #000;border-left:5px solid transparent}.popover.left .arrow{top:50%;right:0;margin-top:-5px;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid #000}.popover .arrow{position:absolute;width:0;height:0}.popover-inner{width:280px;padding:3px;overflow:hidden;background:#000;background:rgba(0,0,0,0.8);-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-box-shadow:0 3px 7px rgba(0,0,0,0.3);-moz-box-shadow:0 3px 7px rgba(0,0,0,0.3);box-shadow:0 3px 7px rgba(0,0,0,0.3)}.popover-title{margin:0;padding:9px 15px;line-height:1;background-color:#f5f5f5;border-bottom:1px solid #eee;-webkit-border-radius:3px 3px 0 0;-moz-border-radius:3px 3px 0 0;border-radius:3px 3px 0 0}.popover-content{padding:14px;background-color:#fff;-webkit-border-radius:0 0 3px 3px;-moz-border-radius:0 0 3px 3px;border-radius:0 0 3px 3px;-webkit-background-clip:padding-box;-moz-background-clip:padding-box;background-clip:padding-box}.popover-content p,.popover-content ul,.popover-content ol{margin-bottom:0}",!function(a){var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f;this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.enabled=!0,"manual"!=this.options.trigger&&(e="hover"==this.options.trigger?"mouseenter":"focus",f="hover"==this.options.trigger?"mouseleave":"blur",this.$element.on(e,this.options.selector,a.proxy(this.enter,this)),this.$element.on(f,this.options.selector,a.proxy(this.leave,this))),this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,b,this.$element.data()),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},enter:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);return c.options.delay&&c.options.delay.show?(clearTimeout(this.timeout),c.hoverState="in",void(this.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show))):c.show()},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);return this.timeout&&clearTimeout(this.timeout),c.options.delay&&c.options.delay.hide?(c.hoverState="out",void(this.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide))):c.hide()},show:function(){var a,b,c,d,e,f,g;if(this.hasContent()&&this.enabled){switch(a=this.tip(),this.setContent(),this.options.animation&&a.addClass("fade"),f="function"==typeof this.options.placement?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement,b=/in/.test(f),a.remove().css({top:0,left:0,display:"block"}).appendTo(b?this.$element:document.body),c=this.getPosition(b),d=a[0].offsetWidth,e=a[0].offsetHeight,b?f.split(" ")[1]:f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width}}a.css(g).addClass(f).addClass("in")}},isHTML:function(a){return"string"!=typeof a||"<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3||/^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(a)},setContent:function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.isHTML(b)?"html":"text"](b),a.removeClass("fade in top bottom left right")},hide:function(){function b(){var b=setTimeout(function(){c.off(a.support.transition.end).remove()},500);c.one(a.support.transition.end,function(){clearTimeout(b),c.remove()})}var c=this.tip();c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?b():c.remove()},fixTitle:function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(b){return a.extend({},b?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},tip:function(){return this.$tip=this.$tip||a(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()}},a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f="object"==typeof c&&c;e||d.data("tooltip",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover",title:"",delay:0}}(window.jQuery),!function(a){var b=function(a,b){this.init("popover",a,b)};b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.isHTML(b)?"html":"text"](b),a.find(".popover-content > *")[this.isHTML(c)?"html":"text"](c),a.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-content")||("function"==typeof c.content?c.content.call(b[0]):c.content)},tip:function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip}}),a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("popover"),f="object"==typeof c&&c;e||d.data("popover",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery));var c="line"+Math.round(1e6*Math.random()),d=a.data,e={};a.margin=a.margin||{},e.top="number"==typeof a.margin.top?a.margin.top:20,e.right="number"==typeof a.margin.right?a.margin.right:20,e.bottom="number"==typeof a.margin.bottom?a.margin.bottom:30,e.left="number"==typeof a.margin.left?a.margin.left:40,a.width=a.width&&"number"==typeof a.width?a.width:500,a.height=a.height&&"number"==typeof a.height?a.height:400,a.container=a.container&&""!==a.container&&"undefined"!==a.container?a.container:"body",a.color=a.color&&""!==a.color&&"undefined"!==a.color?a.color:"steelblue",a.title=a.title&&""!==a.title&&"undefined"!==a.title?a.title:"",a.xlabel=a.xlabel&&""!==a.xlabel&&"undefined"!==a.xlabel?a.xlabel:"",a.ylabel=a.ylabel&&""!==a.ylabel&&"undefined"!==a.ylabel?a.ylabel:"";var f=a.width-e.left-e.right,g=a.height-e.top-e.bottom,h=a.xMarker||!1;if(h&&"number"==typeof h&&!a.time&&(h=a.xMarker),h&&a.time)var h=new Date(a.xMarker).getTime();var i=!(!a.yMarker||"number"!=typeof a.yMarker)&&a.yMarker;if(a.time===!0){for(var j=0,k=d.length;j<k;j++)d[j].x=parseFloat(new Date(d[j].x).getTime());d.sort(function(a,b){var c=new Date(a.x),d=new Date(b.x);return c<d?-1:c>d?1:0});var l=a.xMax?new Date(a.xMax):0;0===l&&function(){l=new Date(d[0].x);for(var a,b=0,c=d.length;b<c;b++)a=new Date(d[b].x),a>l&&(l=a)}();var m=a.xMin?new Date(a.xMin):0;0===m&&function(){m=new Date(d[0].x);for(var a,b=0,c=d.length;b<c;b++)a=new Date(d[b].x),a<m&&(m=a)}();var n=d3.time.scale().domain([new Date(m),new Date(l)]).range([0,f])}else{var l=a.xMax&&"number"==typeof a.xMax?a.xMax:0;0===l&&function(){for(var a={},b=0,c=d.length;b<c;b++)a=d[b],a.x>l&&(l=a.x)}();var n=d3.scale.linear().domain([0,l]).range([0,f])}var o=a.yMax&&"number"==typeof a.yMax?a.yMax:0;0===o&&function(){for(var a=0===o,b={},c=0,e=d.length;c<e;c++)b=d[c],a&&b.y>o&&(o=b.y)}();var p=d3.scale.linear().domain([0,o]).range([g,0]),q=d3.svg.axis().scale(n).orient("bottom"),r=d3.svg.axis().scale(p).orient("left"),s=d3.svg.line().x(function(a){return n(a.x)}).y(function(a){return p(a.y)}),t=d3.select(a.container).append("svg").datum(d).attr("id",c).attr("class","lineChart").attr("width",f+e.left+e.right).attr("height",g+e.top+e.bottom).style("font","10px sans-serif").append("g").attr("transform","translate("+e.left+","+e.top+")");
if(t.append("svg:text").attr("x",f/2+"px").attr("text-anchor","middle").style("font-weight","bold").style("font-size","16px").text(a.title),t.append("svg:text").attr("x",f/2+"px").attr("y",g+29+"px").attr("text-anchor","middle").style("font-weight","bold").style("font-size","12px").text(a.xlabel),t.append("svg:text").attr("x",-g/2+"px").attr("y","-29px").attr("text-anchor","middle").attr("transform","rotate(-90)").style("font-weight","bold").style("font-size","12px").text(a.ylabel),h){var u=n(h).toString();t.append("line").attr("x1",u).attr("y1","0").attr("x2",u).attr("y2",g.toString()).style("stroke","black")}if(i){var v=p(i).toString();t.append("line").attr("x1","0").attr("y1",v).attr("x2",f.toString()).attr("y2",v).style("stroke","black")}return t.append("g").attr("class","x axis").attr("transform","translate(0,"+g+")").call(q),t.append("g").attr("class","y axis").call(r),t.append("path").attr("class","line").attr("d",s).style("fill","none").style("stroke",a.color).style("stroke-width","1.5px"),t.selectAll(".dot").data(d).enter().append("circle").attr("class","dot").attr("cx",s.x()).attr("cy",s.y()).attr("r",3.5).style("fill","white").style("stroke",a.color).style("stroke-width","1.5px").attr("rel","popover").attr("data-title",function(a){return a.y}).attr("data-content",function(b){var c=b.x;if(a.time)var c=new Date(b.x).toLocaleDateString();return'<div style="margin-top:-15px"><strong>'+a.xlabel+":</strong> "+c+"<br><strong>"+a.ylabel+":</strong> "+b.y+"</div>"}),a.popover&&jQuery&&jQuery("circle").popover(),{id:c,obj:a,remove:function(){var a=document.getElementById(this.id),b=document.createElement("div");return b.setAttribute("id",this.id),a.parentNode.replaceChild(b,a),this},redraw:function(a){return this.remove(),this.obj.data=a,this.obj.container="#"+this.id,charts.line(this.obj)},add:function(a){return this.redraw(this.obj.data.concat(a)),this}}}}),charts.extend({behavior:function(a,b,c,d){var e=(a.positive,a.negative,a.neutral,[]);Object.size=function(a){var b,c=0;for(b in a)a.hasOwnProperty(b)&&c++;return c},function(){var b=["positive","negative","neutral"];for(var c in b){var d=b[c],f=Object.size(a[d]),g=d3.scale.linear().domain([0,f]).range([100,256]),h=0;for(var i in a[d]){if("positive"===d)var j="rgb(0,"+g(h)+",0)";if("negative"===d)var j="rgb("+g(h)+",0,0)";if("neutral"===d)var j="rgb("+g(h)+","+g(h)+","+g(h)+")";e.push({data:a[d][i],label:i,color:j}),h++}}}();var f=this.donut({sections:e,centerLabel:"Behavior",container:b,width:c,height:d});return f.data=a,f.redraw=function(a){return this.remove(),this.data=a,this.container="#"+this.id,charts.behavior(this.data,this.container,c,d)},delete f.add,f}}),charts.extend({DRA:function(a){var b=[],c=a.scores;a.container=a.container&&""!==a.container&&"undefined"!==a.container?a.container:"body",a.color=a.color&&""!==a.color&&"undefined"!==a.color?a.color:"",a.width=a.width&&"number"==typeof a.width?a.width:void 0,a.height=a.height&&"number"==typeof a.height?a.height:void 0,a.popover=a.popover===!0;for(var d in c)c.hasOwnProperty(d)&&b.push({x:d,y:c[d]});b.sort(function(a,b){return a.x<b.x?-1:a.x>b.x?1:0});var e={time:!0,data:b,title:"Reading Level",xlabel:"Time",ylabel:"DRA Score",xMarker:a.deadline,yMarker:a.goal,xMax:a.xMax,yMax:a.yMax,xMin:a.xMin,yMin:a.yMin,container:a.container,width:a.width,height:a.height,color:a.color,popover:a.popover},f=this.line(e);return f.obj=a,f.redraw=function(a){return this.remove(),this.obj.scores=a,this.obj.container="#"+this.id,charts.DRA(this.obj)},f.add=function(a){this.redraw(charts.extend(this.obj.scores,a))},f}});