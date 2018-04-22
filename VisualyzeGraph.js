function AmplitudeGraph(x, y, w, h, numgraph, textInput){
	this.pos = createVector(x, y);
	this.size = createVector(w, h);
	this.numgraph = numgraph;
	this.graph = [];
	this.amp = new p5.Amplitude();
	this.col = color(0, 0, 0);
	this.textInput = textInput;
	this.boxcontain = new BoxContain(this.pos.x, this.pos.y, this.size.x, this.size.y);

	this.update = function(){
		var vol = this.amp.getLevel();
		this.graph.push(vol*1.5);
		if(this.graph.length > this.numgraph)
			this.graph.splice(0, 1);

		this.col = map(vol, 0, 0.5, 255, 0);
	}

	this.show = function(){
		stroke(255);
		strokeWeight(3); 
		
		noFill();
		var dis = this.size.x/this.numgraph;
		var y = 0;
		for(var i = 0; i < this.graph.length-1; i++){
			y = map(this.graph[i], 0, 1, 0, this.size.y/2);
			y2 = map(this.graph[i+1], 0, 1, 0, this.size.y/2);

			stroke(map(this.graph[i], 0, 0.5, 255, 0), 255, 255);
			line(i*dis+(this.pos.x-this.size.x/2), this.pos.y-y, 
				(i+1)*dis+(this.pos.x-this.size.x/2), this.pos.y-y2);
		}
		
		// circle at end graph
		fill(255);
		ellipse(this.pos.x+this.size.x/2, this.pos.y-y, 12, 12);
	
		// ground line
		strokeWeight(1);
		stroke(255-this.col, 255, 255);
		line(this.pos.x-this.size.x/2, this.pos.y, this.pos.x+this.size.x/2, this.pos.y);
		
		// big circle and text
		fill(this.col, 255, 255);
		noStroke();
		ellipse(this.pos.x, this.pos.y, y*2, y*2);
		
		// moving line
		stroke(100);
		line(this.pos.x-this.size.x/2, this.pos.y-y, this.pos.x+this.size.x/2, this.pos.y-y);

		// readyState http://www.developphp.com/lib/JavaScript/Audio
		if(myAudio.elt.readyState  == 4 && !myAudio.elt.paused){
			fill(255);
			stroke(255);
			textSize(y/2+0.5);
			text(this.textInput, this.pos.x, this.pos.y);
		}
	}

	this.show2= function(){

	}

	this.run = function(){
		this.update();
		this.show();

		// show box contain
		if(showBoxContain){
			strokeWeight(1);
			stroke(255);
			this.boxcontain.show();
		}
	}

	this.changeText = function(newText){
		this.textInput = newText;
	}

	this.changeProperties = function(newX, newY, newW, newH, newNumgraph, newText){
		this.pos.x = newX || this.pos.x;
		this.pos.y = newY || this.pos.y;
		this.size.x = newW || this.size.x;
		this.size.y = newH || this.size.y;
		this.numgraph = newNumgraph || this.numgraph;
		this.textInput = newText || this.textInput;

		this.boxcontain = new BoxContain(this.pos.x, this.pos.y, this.size.x, this.size.y);
	}
}

function FFTGraph(x, y, w, h, numgraph){
	this.pos = createVector(x, y);
	this.size = createVector(w, h);
	this.graph;
	this.fft = new p5.FFT(0.7, numgraph);
	this.boxcontain = new BoxContain(this.pos.x, this.pos.y, this.size.x, this.size.y);

	this.update = function(){
		this.graph = this.fft.analyze();
	}

	this.show = function(){
		var y;
		var barWidth = this.size.x/(this.graph.length-15);
		noStroke();
		strokeWeight(barWidth-1);

		beginShape();
		for(var i = 0; i < this.graph.length-15; i++){
			y = map(this.graph[i], 0, 255, 0, this.size.y);

			vertex(i*barWidth+(this.pos.x-this.size.x/2), this.pos.y+this.size.y/2-y);

			stroke(color('hsba('+ (255-this.graph[i]) +', 100%, 100%, 0.7)'));
			var x1 = i*barWidth+(this.pos.x-this.size.x/2)+barWidth/2;
			var y1 = this.pos.y+this.size.y/2-y;
			var x2 = x1;
			var y2 = this.pos.y+this.size.y/2;
			line(x1, y1, x2, y2);
		}
		noFill();
		stroke(255);
		strokeWeight(3)
		endShape();
	}

	this.show2 = function(){
		var barWidth = this.size.x/(this.graph.length-15);
		strokeWeight(barWidth/1.5);

		for(var i = 0; i < this.graph.length-15; i++){
			var len = map(this.graph[i], 0, 255, 0, this.size.y);
			
			stroke(color('hsba('+ (255-this.graph[i]) +', 100%, 100%, 1)'));
			var x1 = i*barWidth+(this.pos.x-this.size.x/2)+barWidth/2;
			var y1 = this.pos.y;
			line(x1, y1-len/2-1, x1, y1+len/2);
		}
	}

	this.run = function(){
		this.update();
		this.show();

		// show box contain
		if(showBoxContain){
			strokeWeight(1);
			stroke(255);
			this.boxcontain.show();
		}
	}

	this.changeProperties = function(newX, newY, newW, newH, newNumgraph){
		this.pos.x = newX || this.pos.x;
		this.pos.y = newY || this.pos.y;
		this.size.x = newW || this.size.x;
		this.size.y = newH || this.size.y;
		this.numgraph = newNumgraph || this.numgraph;

		this.boxcontain = new BoxContain(this.pos.x, this.pos.y, this.size.x, this.size.y);
	}
}