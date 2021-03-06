django.jQuery(function sortableTabularInline() {
	
	// restrain local jQuery to `SortableTabularInline` elements
	var $context = window.$('.suit-sortable-tabular');
	var $ = $context.find.bind($context);
	
	// hide the position columns
	$('th:contains("Position"), td.field-position').hide();
	
	// init sortable UI interaction
	$('.inline-related .form-row').css('cursor', 'move');
	$('.inline-related').sortable({
		axis: 'y',
		items: '.form-row:not(.empty-form)',
		cancel: 'input,textarea,button,select,option,.sortable-cancel',
		cursor: 'move'
	});
	
	// always update positions when table rows change
	// (including Django `add another` or `remove`, and sortable drag & drop)
	new MutationObserver(function onTableRowsChange() {
			
			// skip drag & drop interaction (jQuery integrates a placeholder at that time)
			if ($('.ui-sortable-placeholder').length)
				return;
			
			// update positions
			$('.inline-related .form-row:not(.empty-form)').each(function (i) {
				window.$('input[id$=position]', this).val(i + 1);
			});
		})
		.observe($('tbody')[0], {childList: true});
});

