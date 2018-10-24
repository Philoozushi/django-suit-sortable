django.jQuery(function sortableTabularInline() {
	
	// restrain local jQuery to `SortableTabularInline` elements
	var $context = window.$('.suit-sortable-tabular');
	var $ = $context.find.bind($context);
	
	// hide the position columns
	$('th:contains("Position"), td.field-position').hide();
	$('th:contains("Index"), td.field-index').hide();
	
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
	$('tbody').each(function () {
        var _this = this;
	new MutationObserver(function onTableRowsChange() {
			
			// skip drag & drop interaction (jQuery integrates a placeholder at that time)
			if ($('.ui-sortable-placeholder').length)
				return;
			
			// update positions
			$(_this).find('.form-row.has_original:not(.empty-form)').each(function (i) {
				window.$('input.sortable', this).val(i + 1);
			});
		})
		.observe(this, {childList: true});
	})
});
