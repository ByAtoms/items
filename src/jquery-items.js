/*global $, jQuery*/
(function($)
{   "use strict";
    var definition      =   {
                                itemscope   :   'data-itemscope',
                                itemprop    :   'data-itemprop',
                                itemref     :   'data-itemref',
                                itemid      :   'data-itemid',
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
                                                                var $this       =   $(this);
                                                                var isItem      =   $this.itemscope();
                                                                var isItemref   =   $this.attr(definition.itemref) !== undefined;
                                                                var itemref     =   $this.attr(definition.itemref);
                                                                var property    =   $this.attr(definition.itemprop);
                                                                var isArray     =   definition.arrayPattern.test(property);

                                                                $this           =   isItemref ? $('#'+itemref): $this;

                                                                var value       =   $this.itemValue();

                                                                property        =   property.replace(/\[\]+/g,'');

                                                                item[property]  =   isArray ? $this.children(itemscopeSelector).items()	: 
                                                                                    isItem ? $this.item() : value;
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
                                var query       = this;
                                var isInput     = query.is(':input');
                                var value       = isInput ? query.val() : query.text();

                                return value;
                            };         
    $.fn.closestItem    =   function()
                            {
                                var itemscopeSelector   = definition.getSelector(definition.itemscope);

                                var query   = this.closest(itemscopeSelector);
                                var item    = query.item();

                                return item;
                            };
    $.fn.nextItem      =    function()
                            {
                                var itemscopeSelector   = definition.getSelector(definition.itemscope);

                                var query   = this.next(itemscopeSelector);
                                var item    = query.item();
                                
                                return item;
                            };
    $.fn.prevItem      =    function()
                            {
                                var itemscopeSelector   = definition.getSelector(definition.itemscope);

                                var query   = this.prev(itemscopeSelector);
                                var item    = query.item();
                                
                                return item;
                            };
    $.fn.findItem      =    function(id)
                            {definition.itemid
                                var itemscopeSelector   =   definition.getSelector(definition.itemscope);
                                var itemidSelector      =   definition.getSelector(definition.itemid);
                                var selector            =   itemscopeSelector + itemidSelector;
                                var byItemid            =   function()
                                                            {
                                                                var $this   =   $(this);
                                                                var itemid  =   $this.attr(definition.itemid);
                                                                return id == itemid;
                                                            };
                                console.log(this);
                                var query   = this.find(selector).filter(byItemid);
                                console.log(query);
                                var item    = query.item();
                                
                                return item;
                            };
    $.fn.itemscope      =   function()
                            {
                                var query   = this;

                                return query.attr(definition.itemscope)!== undefined;
                            };
}($));
