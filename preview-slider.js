function previewSliderInit(sliderInitOpts) {

	var listClass = sliderInitOpts.listClass || 'preview-slider',
		listStep = sliderInitOpts.listStep || 1,
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
			step = itemWidth * listStep,
			pos = 0;
			
		arrowLeft.className = listClass + '-arrow' + ' ' + listClass + '-arrow-left';
		arrowRight.className = listClass + '-arrow' + ' ' + listClass + '-arrow-right';
		arrowLeft.innerHTML = sliderInitOpts.prevArrowText || 'Prev';	
		arrowRight.innerHTML = sliderInitOpts.nextArrowText || 'Next';
		container.appendChild(arrowLeft);
		container.appendChild(arrowRight);
		list.style.width = listWidth + 'px';
		list.style.left = 0;
		
		arrowRight.addEventListener('click', function(event){
			if(pos < listWidth - itemWidth * itemsCount) {
			list.style.left = parseInt(list.style.left) - step + 'px';
			pos += step;
			}
		});	
		arrowLeft.addEventListener('click', function(event){
			if(pos) { 
			list.style.left = parseInt(list.style.left) + step + 'px';
			pos -= step;
			}
		});
	}
	
}


