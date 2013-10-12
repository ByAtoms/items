/*global $, jQuery*/
(function($)
{   "use strict";
    var definition      =   {
                                itemscope   :   'data-itemscope',
                                itemprop    :   'data-itemprop',
                                itemref     :   'data-itemref',
                                delimiter   :   '-',
                                arrayPattern:   /^[\w\W]*\[\]$/,
                                getSelector :   function(definition) 
                                                {
                                                    return definition.replace(/^([\w\W]*)$/, '[$1]');
                                                }
                            };

    var createItem      =   function(element)
                            {
                                var item                =   {};
                                var $this               =   $(element);
                                var itempropSelector    =   definition.getSelector(definition.itemprop);
                                var itemscopeSelector   =   definition.getSelector(definition.itemscope);
                                var $itemprops          =   $this.find(itempropSelector);
                                var $not                =   $itemprops.find(itempropSelector);
                                $itemprops              =   $itemprops.not($not);
                                var handleItemprops     =   function()
                                                            {
                                                                var $this      =    $(this);
                                                                var isItem     =    $this.itemscope();
                                                                var isItemref  =    $this.attr(definition.itemref) !== undefined;
                                                                var itemref    =    $this.attr(definition.itemref);
                                                                var property   =    $this.attr(definition.itemprop);
                                                                var isArray    =    definition.arrayPattern.test(property);

                                                                $this          =    isItemref ? $('#'+itemref): $this;

                                                                var isInput    =    $this.is(':input');
                                                                var value      =    isInput ? $this.val() : $this.text();

                                                                property        =   property.replace(/\[\]+/g,'');

                                                                item[property]  =   isArray ? $this.children(itemscopeSelector).items()	: 
                                                                                    isItem ? $this.items() : value;
                                                            };

                                $itemprops.each(handleItemprops);

                                return item;
                            };

    var createItems      =  function(query)
                            {
                                var items       =    [];
                                var handleQuery =   function()
                                                    {
                                                        var item = createItem(this);
                                                        items.push(item);
                                                     };

                                query.each(handleQuery);

                                return items;
                            };

    $.fn.item           =   function(object)
                            {
                                var query      = this;
                                var items      = createItems(query);
                                var hasItems   = items.length > 0;

                                return hasItems ? items[0] : {};  
                            };
    $.fn.items          =     function(object)
                            {
                                var query       = this;
                                var items       = createItems(query);
                                var hasItems    = items.length > 0;

                                return hasItems ? items : [];
           
                            };
    $.fn.itemValue      =   function()
                            {
                                var $this       =   $(this);
                                var isInput     =   $this.is(':input');
                                var value       =   isInput ? $this.val() : $this.text();
                            };         
    $.fn.closestItem    =   function()
                            {
                                var itemscopeSelector   = definition.getSelector(definition.itemscope);

                                var query       = this.closest(itemscopeSelector);
                                var items       = createItems(query);
                                var hasItems    = items.length > 0;
                                return hasItems ? items[0] : {};
                            };
    $.fn.nextItem      =    function()
                            {
                                var query       = this.next(itemscopeSelector);
                                var items       = createItems(query);
                                var hasItems    = items.length > 0;
                                return hasItems ? items[0] : {};
                            };
    $.fn.itemscope      =   function()
                            {
                                var query      = this;

                                return query.attr(definition.itemscope)!== undefined;
                            ;
}($));
