/*
 * 	IFrame Then 0.1 - jQuery plugin
 *	written by cyokodog
 *
 *	Copyright (c) 2013 cyokodog 
 *		http://www.cyokodog.net/
 *		http://cyokodog.tumblr.com/
 *		http://d.hatena.ne.jp/cyokodog/)
 *	MIT LICENCE
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

;(function($){

	// Constructor
	var plugin = $.iframeThen = function(option){
		if(!(this instanceof plugin)) return new plugin(option);
		if(typeof option == 'function') option = $.extend({}, plugin.defaults, {callback:option});
		var o = this,
		c = o.config = $.extend(true,{}, plugin.defaults, option);
		var s = plugin.status;
		if(s.isIFrame) {
			$('html').addClass(plugin.id);
			if($('html').hasClass(c.toFitClass) || o.getIFrame().hasClass(c.toFitClass)){
				o.fitFrame();
			}
			$('.' + c.toRemoveClass).remove();
			$('.' + c.toHideClass).hide();
			$('.' + c.toSpanClass).each(function(){
				var t = $(this);
				$('<span/>').html(t.html()).insertAfter(t);
				t.remove();
			});
			c.callback.apply(o,[o]);
		}
	}

	// API
	$.extend(plugin.prototype, {
		getParentLocation : function(){
			return window.parent.location;
		},
		getParentBody : function(){
			var body = $([]);
			try{body = $(window.parent.document).find('body');}catch(e){}
			return body;
		},
		getIFrame : function(){
			var iframe = [];
			try{
				$(window.parent.document).find('iframe').each(function(){
					var href = this.contentWindow.location.href;
					if(location.href == href){
						iframe.push(this);
					}
				});
			}
			catch(e){
			}
			return $(iframe);
		},
		fitFrame : function(){
			var o = this, c = o.config;
			o.getIFrame().prop('frameborder','0').height(o.getDocumentHeight());
			$('html').css({overflow:'auto'});
		},
		getDocumentHeight : function(){
			return $('body').height() + parseInt($('body').css('margin-top')) + parseInt($('body').css('margin-bottom'));
		}
	});

	// Setting
	$.extend(plugin,{
		defaults : {
			callback : function(api){},
			toFitClass : 'iframe-then-fit',
			toRemoveClass : 'iframe-then-remove',
			toHideClass : 'iframe-then-hide',
			toSpanClass : 'iframe-then-text'
		},
		status : {
			isIFrame : window.parent != window
		},
		version : '0.1',
		id : 'iframe-then'
	});
})(jQuery);
