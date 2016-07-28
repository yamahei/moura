
(function(g){
	var matrix = [], _titles = undefined;
	var Patterns = function(titles, items, excludes){
		if(titles !== null){
			if(titles instanceof Array){
				if(titles.length != items.length){
					throw new Error("titles.length isn't equals the items one.");
				}else{
					_titles = titles;
				}
			}
		}
		if(excludes.length > 0){
			for(var i=0; i<excludes.length; i++){
				if(excludes[i].length != items.length){
					throw new Error("excludes["+i+"].length isn't equals the items one.");
				}
			}
		}
		var result = [];
		while(items.length > 0){
			var item = items.shift();
			if(result.length == 0){
				result = item.map(function(e){
					return [e];
				});
				continue;
			}
			var _result = [];
			while(result.length > 0){
				var _line = result.shift();
				for(var i=0; i<item.length; i++){
					var new_line = _line.concat();
					new_line.push(item[i]);
					_result.push(new_line);
				}
			}
			result = _result;
		}
		result = result.filter(function(e){
			var ex = excludes.concat();
			var total = e.length, matches=0;
			for(var i=0; i<e.length; i++){
				var value = e[i];
				var ex = ex.filter(function(_e){
					var _exp = _e[i];
					if(_exp === null){ return true; }
					if(_exp == value){ return true; }
					return false;
				});
			}
			return (ex.length <= 0) ? true : false;
		});
		matrix = result;
	};
	Patterns.prototype.toString = function toString(){
		var header = _titles.join("\t");
		var table = matrix.map(function(e){
			return e.join("\t");
		}).join("\n");
		if(_titles){
			return [header, table].join("\n");
		}else{
			return table;
		}
	};
	g.Patterns = Patterns;
})(window);

/* 列タイトル */
var titles = [
	"性別",
	"服装",
	"場所",
];
/* 出現項目（列ごとに配列） */
var items = [
	//パターンA
	"男 女".split(/\s+/),
	//パターンB
	"ズボン スカート 袴 ふんどし".split(/\s+/),
	//パターンC
	"花火 男湯 女子トイレ".split(/\s+/),
];
/* 除外パターン（無歯列はnull） */
var excludes = [
	//A B C
	[ "男", "スカート", null ],
	[ "男", null, "女子トイレ" ],
	[ "女", "ふんどし", null ],
	[ "女", null, "男湯" ],
];

var p = new window.Patterns(titles, items, excludes);
console.log(p.toString());
