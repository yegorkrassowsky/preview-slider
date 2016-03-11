function previewSliderInit(sliderInitOpts) {

	var 
		listClass = sliderInitOpts.listClass || 'preview-slider',
		list = document.querySelector('.' + listClass),
		container = list.parentElement,
		items = list.children,
		itemsNumber = items.length,
		itemWidth = items[0].offsetWidth,
		itemsCount = Math.floor(container.clientWidth / itemWidth),
		itemsOffset = Math.round((container.clientWidth - itemsCount * itemWidth) / (itemsCount + 1));

		itemWidth += itemsOffset;
		
		for (var i = 0; i < itemsNumber; i++) {
			items[i].style.marginLeft = itemsOffset  + 'px';
		}
				
	if(itemsNumber > itemsCount) {
			
		var arrowLeft = document.createElement('span'),
			arrowRight = document.createElement('span'),			
			listWidth = itemsNumber * itemWidth,
			step = itemWidth,
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
			if(pos < listWidth - step * itemsCount) {
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


