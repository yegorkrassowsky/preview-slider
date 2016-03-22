function previewSliderInit(sliderInitOpts) {

	var listClass = sliderInitOpts.listClass || 'preview-slider',
		listStep = sliderInitOpts.listStep || 1,
		listBreakOffset = sliderInitOpts.listBreakOffset || 100,
		list = document.querySelector('.' + listClass),
		container = list.parentElement,
		items = list.children,
		itemsNumber = items.length,
		itemStyle = getComputedStyle(items[0]),
		itemWidth = parseInt(itemStyle.width) + parseInt(itemStyle.marginLeft) + parseInt(itemStyle.marginRight),
		itemsCount = Math.floor(container.clientWidth / itemWidth);
				
	if(itemsNumber > itemsCount) {
			
		var arrowLeft = document.createElement('span'),
			arrowRight = document.createElement('span'),			
			listWidth = itemsNumber * itemWidth,
			listFrameWidth = itemWidth * itemsCount,
			step = itemWidth * listStep,
			isDragReady = false,
			dragoffset,
			pos = 0,
			endPos = itemsNumber % listStep + itemsCount % listStep == 0 ? listWidth - listFrameWidth : Math.floor(itemsNumber / itemsCount) * listFrameWidth;
			
		arrowLeft.className = listClass + '-arrow' + ' ' + listClass + '-arrow-left';
		arrowRight.className = listClass + '-arrow' + ' ' + listClass + '-arrow-right';
		arrowLeft.innerHTML = sliderInitOpts.prevArrowText || 'Prev';	
		arrowRight.innerHTML = sliderInitOpts.nextArrowText || 'Next';
		container.appendChild(arrowLeft);
		container.appendChild(arrowRight);
		list.style.width = listWidth + 'px';
		list.style.left = 0;
		list.classList.add('animated');
		
		function moveRight(){
			if(pos < endPos) {
				list.style.left = parseInt(list.style.left) - step + 'px';
				pos += step;
			}			
		}
		
		function moveLeft(){
			if(pos) {
				list.style.left = parseInt(list.style.left) + step + 'px';
				pos -= step;
			}			
		}
		
		arrowRight.addEventListener('click', moveRight);	
		arrowLeft.addEventListener('click', moveLeft);
		
		// Draggable
		
		list.ondragstart = function() { return false; }
		
		for (var i = 0; i < itemsNumber; i++){
			items[i].addEventListener('mousedown', function(e){
				list.classList.remove('animated');
				list.classList.add('ondrag');
				isDragReady = true;
				dragoffset = e.pageX - list.offsetLeft;			
			});
		}
				
		document.addEventListener('mouseup', function(e){
			if(isDragReady){
				var dragStep = Math.floor(Math.abs(e.pageX - dragoffset + pos) / step) * step;
				list.classList.add('animated');
				list.classList.remove('ondrag');
				list.style.left = '-' + pos + 'px';
				if(e.pageX - dragoffset + pos < -20) {
					if(dragStep > step){
						if(dragStep + pos >= endPos){
							list.style.left = '-' + endPos + 'px';
							pos = endPos;
						} else {
							list.style.left = parseInt(list.style.left) - dragStep + 'px';
							pos += dragStep;
						}
					} else {
						moveRight();
					}
				} else if(e.pageX - dragoffset + pos > 20){
					if(dragStep > step){
						if(pos - dragStep <= 0){
							list.style.left = 0;
							pos = 0;
						} else {
							list.style.left = parseInt(list.style.left) + dragStep + 'px';
							pos -= dragStep;
						}
					} else {
						moveLeft();
					}
				}
				isDragReady = false;
			}
		});

		document.addEventListener('mousemove', function(e){
			if(isDragReady){
				if((Math.abs(e.pageX - dragoffset) < endPos + listBreakOffset) && (e.pageX - dragoffset < listBreakOffset)) {
		        	list.style.left = (e.pageX - dragoffset) + 'px';
		        }
			}
		});

	}
	
}


