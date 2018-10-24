from django import forms
from django.contrib import admin


class SortableAdmin(admin.ModelAdmin):

    class Media:
        js = ('js/jquery-ui-1.10.3.sortable.min.js',
              'js/sortable.changelist.js', )


class SortableInlineMixin(object):

    _suit_sortable_class = ''

    def __init__(self, *args, **kwargs):
        self._ensure_sortable_class()
        super(SortableInlineMixin, self).__init__(*args, **kwargs)

    def _ensure_sortable_class(self):
        suit_classes = getattr(self, 'suit_classes', None)
        if suit_classes:
            suit_classes = suit_classes.split(' ')
        else: suit_classes = []
        if not self._suit_sortable_class in suit_classes:
            suit_classes.append(self._suit_sortable_class)
        self.suit_classes = ' '.join(suit_classes)


class SortableTabularInline(SortableInlineMixin, admin.TabularInline):

    _suit_sortable_class = 'suit-sortable-tabular'

    def formfield_for_dbfield(self, db_field, **kwargs):
        if db_field.name == self.sortable:
            kwargs['widget'] = forms.NumberInput({'class': 'sortable'})
        return super(SortableTabularInline, self).formfield_for_dbfield(
            db_field, **kwargs)

    class Media:
        js = ('js/jquery-ui-1.10.3.sortable.min.js',
              'js/sortable.tabular.inline.js', )


class SortableStackedInline(SortableInlineMixin, admin.StackedInline):

    _suit_sortable_class = 'suit-sortable-stacked'

    class Media:
        js = ('js/jquery-ui-1.10.3.sortable.min.js',
              'js/sortable.stacked.inline.js', )

