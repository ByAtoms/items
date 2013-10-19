/*global $, jQuery*/
(function($)
{   "use strict";
    var definition      =   {
                                itemscope   :   'data-itemscope',
                                itemprop    :   'data-itemprop',
                                itemref     :   'data-itemref',
                                itemid      :   'data-itemid',
                                itemtype    :   'data-itemtype',
                                delimiter   :   '-',
                                arrayPattern:   /^[\w\W]*\[\]$/,
                                getSelector :   function(definition) 
                                                {
                                                    return definition.replace(/^([\w\W]*)$/, '[$1]');
                                                }
                            };
    var getProperties   =   function(query)
                            {
                                var itempropSelector    =   definition.getSelector(definition.itemprop);
                                var $itemprops          =   query.find(itempropSelector);
                                var $children           =   $itemprops.find(itempropSelector);
                                $itemprops              =   $itemprops.not($children);

                                return $itemprops;
                            };
    var populateItem    =   function(element, item)
                            {
                                var $this               =   $(element);
                                var itemscopeSelector   =   definition.getSelector(definition.itemscope);
                                var $itemprops          =   getProperties($this);
                                var handleItemprops     =   function($this)
                                                            {
                                                                var $this       =   $(this);
                                                                var isItem      =   $this.isItem();
                                                                var isItemref   =   $this.isItemref();
                                                                var itemref     =   $this.attr(definition.itemref);
                                                                var property    =   $this.attr(definition.itemprop);
                                                                var isArray     =   definition.arrayPattern.test(property);

                                                                $this           =   isItemref ? $('#'+itemref): $this;

                                                                property        =   property.replace(/\[\]+/g,'');

                                                                var value       =   item[property];

                                                                isArray ? $this.children(itemscopeSelector).items(value) : 
                                                                isItem  ? $this.item(value) : $this.itemValue(value);
                                                            };

                                $itemprops.each(handleItemprops);
                            };
    var populateItems    =   function(query, items)
                            {
                                for(var index in items)
                                {
                                    var item    = items[index];
                                    var element = query[index];
                                    populateItem(element, item);
                                }
                            };
    var createItem      =   function(element)
                            {
                                var item                =   {};
                                var $this               =   $(element);
                                var itemscopeSelector   =   definition.getSelector(definition.itemscope);
                                var $itemprops          =   getProperties($this);
                                var handleItemprops     =   function($this)
                                                            {
                                                                var $this       =   $(this);
                                                                var isItem      =   $this.isItem();
                                                                var isItemref   =   $this.isItemref();
                                                                var itemref     =   $this.attr(definition.itemref);
                                                                var property    =   $this.attr(definition.itemprop);
                                                                var isArray     =   definition.arrayPattern.test(property);

                                                                $this           =   isItemref ? $('#'+itemref): $this;

                                                                var value       =   $this.itemValue();

                                                                property        =   property.replace(/\[\]+/g,'');

                                                                item[property]  =   isArray ? $this.children(itemscopeSelector).items() : 
                                                                                    isItem ? $this.item() : value;
                                                            };

                                $itemprops.each(handleItemprops);

                                return item;
                            };

    var createItems     =   function(query)
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

    $.fn.item           =   function(item)
                            {
                                var query           =   this;
                                var shouldPopulate  =   item !== undefined;
                                var handlePopulate  =   function()
                                                        {
                                                            if(shouldPopulate)
                                                            {
                                                                populateItems(query, [item]);
                                                            }
                                                        };

                                handlePopulate();
                                
                                var items           = createItems(query);
                                var hasItems        = items.length > 0;

                                return hasItems ? items[0] : {};  
                            };
    $.fn.items          =   function(items)
                            {
                                var query           =   this;
                                var shouldPopulate  =   items !== undefined;
                                var handlePopulate  =   function()
                                                        {
                                                            if(shouldPopulate)
                                                            {
                                                                populateItems(query, items);
                                                            }
                                                        };

                                handlePopulate();

                                var items       = createItems(query);
                                var hasItems    = items.length > 0;

                                return hasItems ? items : [];
           
                            };
    $.fn.itemValue      =   function(value)
                            {

                                var query           = this;
                                var isInput         = query.is(':input');
                                var shouldSet       = value !== undefined;
                               
                                if(shouldSet)
                                {
                                    isInput ? query.val(value) : query.text(value);
                                }

                                value               = isInput ? query.val() : query.text();

                                return value;
                            };
    $.fn.isItem         =   function()
                            {
                                var query   = this;

                                return query.attr(definition.itemscope)!== undefined;
                            };
    $.fn.isItemref      =   function()
                            {
                                var query   = this;

                                return query.attr(definition.itemref) !== undefined;
                            };
    $.fn.isItemprop     =   function()
                            {
                                var query   = this;

                                return query.attr(definition.itemprop) !== undefined;
                            };       
    $.fn.closestItem    =   function()
                            {
                                var itemscopeSelector   = definition.getSelector(definition.itemscope);

                                var query   = this.closest(itemscopeSelector);
                                var item    = query.item();

                                return item;
                            };
    $.fn.nextItem       =   function()
                            {
                                var itemscopeSelector   = definition.getSelector(definition.itemscope);

                                var query   = this.next(itemscopeSelector);
                                var item    = query.item();
                                
                                return item;
                            };
    $.fn.prevItem       =   function()
                            {
                                var itemscopeSelector   = definition.getSelector(definition.itemscope);

                                var query   = this.prev(itemscopeSelector);
                                var item    = query.item();
                                
                                return item;
                            };
    $.fn.findItem       =   function(id)
                            {
                                var itemscopeSelector   =   definition.getSelector(definition.itemscope);
                                var itemidSelector      =   definition.getSelector(definition.itemid);
                                var selector            =   itemscopeSelector + itemidSelector;
                                var byItemid            =   function()
                                                            {
                                                                var $this   =   $(this);
                                                                var itemid  =   $this.attr(definition.itemid);
                                                                return id == itemid;
                                                            };

                                var query   = this.find(selector).filter(byItemid);
                                var item    = query.item();
                                
                                return item;
                            };
    $.fn.repeatItem     =   function(item)
                            {
                                var query   = this.first();  
                                var $clone  = query.clone();

                                $clone.insertAfter(query);

                                return $clone.item(item);
                            };
    $.fn.repeatItems    =   function(items)
                            {
                                var query           =   this.last(); 
                                var $clones         =   $();
                                var handleClones    =   function()
                                                        {
                                                            for (var index in items) 
                                                            {
                                                                var $clone  =   query.clone();
                                                                $clones     =   $clones.add($clone); 
                                                            };
                                                           
                                                        };

                                handleClones();

                                $clones.insertAfter(query);

                                return $clones.items(items);
                            };
}($));