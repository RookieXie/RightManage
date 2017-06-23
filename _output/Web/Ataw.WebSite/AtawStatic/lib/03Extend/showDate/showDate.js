
(function($) {

    var _options = {};
	var _container = {};

	jQuery.fn.MyDigitClock = function(options) {
		var id = $(this).get(0).id;
		_options[id] = $.extend({}, $.fn.MyDigitClock.defaults, options);

		return this.each(function()
		{
			_container[id] = $(this);
			showClock(id);
		});
		
		function showClock(id)
		{
			var d = new Date;
			var h = d.getHours();
			var m = d.getMinutes();
			var s = d.getSeconds();
			var year = d.getFullYear();
			var month = d.getMonth();
			var day = d.getDate();
			var ampm = "";
			if (_options[id].bAmPm)
			{
				if (h>12)
				{
					h = h-12;
					ampm = " PM";
				}
				else
				{
					ampm = " AM";
				}
			}

			var dateStr = _options[id].dateFormat;
			dateStr = dateStr.replace("{YY}", getDD(year));
			dateStr = dateStr.replace("{MMMM}", getDD(month + 1));
			dateStr = dateStr.replace("{DD}", getDD(day));
			
			var timeStr = _options[id].timeFormat + ampm;
			timeStr = timeStr.replace("{HH}", getDD(h));
			timeStr = timeStr.replace("{MM}", getDD(m));
			timeStr = timeStr.replace("{SS}", getDD(s));

			var weekStr = _options[id].weekFormat;
			weekStr = '<div class="showDate_week">周' + "日一二三四五六".charAt(d.getDay()) + '</div>';

		
			var obj = $("#"+id);
			obj.css("fontSize", _options[id].fontSize);
			obj.css("fontFamily", _options[id].fontFamily);
			obj.css("color", _options[id].fontColor);
			obj.css("background", _options[id].background);
			obj.css("fontWeight", _options[id].fontWeight);
		
			//change reading
			obj.html(dateStr + timeStr + weekStr)
			
			//toggle hands
			if (_options[id].bShowHeartBeat)
			{
				obj.find("#ch1").fadeTo(800, 0.1);
				obj.find("#ch2").fadeTo(800, 0.1);
			}
			setTimeout(function(){showClock(id)}, 1000);
		}
		
		function getDD(num)
		{
			return (num>=10)?num:"0"+num;
		}
		
		function refreshClock()
		{
			setupClock();
		}
	}
	
	//default values
	jQuery.fn.MyDigitClock.defaults = {
		fontFamily: 'Microsoft JhengHei, Century gothic, Arial',
		fontColor: '#ff2200',
		fontWeight: 'bold',
		background: '#fff',	
		dateFormat: '<div class="showDate_date">{YY}/{MMMM}/{DD}</div>',
		timeFormat: '<div class="showDate_time">{HH}<span id="ch1">:</span>{MM}<span id="ch2">:</span>{SS}</div>',
		bShowHeartBeat: false,
		bAmPm:false
	};

})(jQuery);
