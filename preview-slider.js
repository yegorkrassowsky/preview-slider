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
			pos = 0;
			
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
			if(pos < listWidth - listFrameWidth) {
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
				isDragReady = true;
				e.pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
				dragoffset = e.pageX - list.offsetLeft;			
			});
		}
				
		document.addEventListener('mouseup', function(e){
			if(isDragReady){
				list.classList.add('animated');
				e.pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
				list.style.left = '-' + pos + 'px';
				if(e.pageX - dragoffset + pos < 0) {
					moveRight();
				} else {
					moveLeft();
				}
				isDragReady = false;
			}
		});

		document.addEventListener('mousemove', function(e){
			if(isDragReady){
				e.pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
				if((Math.abs(e.pageX - dragoffset) < listWidth - listFrameWidth + listBreakOffset) && (e.pageX - dragoffset < listBreakOffset)) {
		        	list.style.left = (e.pageX - dragoffset) + 'px';
		        }
			}
		});

	}
	
}


