/*
window.onload = function () { 

console.log('hi'); 

var y = [0, 5, 3, 3, 1, 5, 8, 5, 7, 5, 9, 3, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  

var dat = [1,2,3,4,5,6,7,8]
generateTimeGraph(y); 

generateBarGraph(dat);


};

*/
//helper function
function fillArray(value, length) {
  var arr = [], i = length;
  while (i--) {
    arr[i] = value;
  }
  return arr;
}

function generateTimeGraph(array){

    var x = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    
    var y = fillArray(0,24);
    for(var index in array){
        y[index] = array[index];
    }
    
    
    var r = Raphael("crime-times"),
        txtattr = { font: "12px sans-serif" };

    var opts = {
      "width": 1,
      "axis" : '0,0,1,1',
      "smooth": true,
      "shade": true,
      "symbol": 'circle',
      "colors": ['black']
    };

    r.text(160, 10, "Average Crimes Per Hour").attr(txtattr);

    var lines = r.linechart(10, 10, 300, 220, x, [y.slice(0, 1e3)], opts);
    
    lines.hoverColumn(function () {
       
        this.tags = r.set();
   
        for (var i = 0, ii = this.y.length; i < ii; i++) {
            this.tags.push(r.tag(this.x, this.y[i], this.values[i], 160, 10).insertBefore(this).attr([{ fill: "#fff" }, 
            { fill: this.symbols.attr("fill") }]));
        }



    }, function () {
        console.log(this.tags);
        console.log(this.set);
        console.log(this.tags);
        this.tags.remove() && this.set.remove();
    });
    lines.symbols.attr({ 
      r: 2
    });

    // lines.lines[0].animate({"stroke-width": 6}, 1000);
    // lines.symbols[0].attr({stroke: "#fff"});
    // lines.symbols[0][1].animate({fill: "#f00"}, 1000);
}



function generateBarGraph(data){
    
    if(data.length == 0){
        return;
    }

    var crimes = [];
    var y = [];
    for(key in data){
      crimes.push(key);
      y.push(data);
    }

    var r = Raphael("crime-types"),
        txtattr = { font: "12px sans-serif" };
    


    var opts = {
      type: "soft",
      colors: [ '#203d3e', '#185ac2', '#eecaca', '#d9074b']
       
    },

    fin = function () {
      this.flag = r.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
    },
    fout = function () {
      this.flag.animate({opacity: 0}, 300, function () {this.remove();});
    };

    r.text(160, 10, "Total Crimes in Area").attr(txtattr);




    var bars = r.barchart(10, 10, 300, 220, y, opts);
    bars.hover(fin, fout);
    bars.label(crimes,true);
}


