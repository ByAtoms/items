test( "item", function()
{
    var expectedUser    =   { 
                                firstName   :   "John",
                                lastName    :   "Smith",
                                userName    :   "john.smith" 
                            };

    var user            =   $('.user:first-child').item();

    deepEqual(user, expectedUser, 'item user');
});

test( "items", function()
{
    var expectedUsers    =  [ 
                                {
                                    firstName   :   "John",
                                    lastName    :   "Smith",
                                    userName    :   "john.smith" 
                                },
                                {
                                    firstName   :   "Frank",
                                    lastName    :   "Hamilton",
                                    userName    :   "frank.hamilton" 
                                }
                            ];

    var users            =  $('.user').items();

    deepEqual(users, expectedUsers, 'items users');
});
test( "item value", function()
{
    var expectedValue    =  'John';
    var value            =  $('.user:first-child').find('.first-name').itemValue();

   equal(value, expectedValue, 'items value');
});
test( "closest item", function()
{
    var expectedUser    =   {
                                firstName   :   "John",
                                lastName    :   "Smith",
                                userName    :   "john.smith"
                            };
    var user             =  $('.user:first-child').find('.first-name').closestItem();

    deepEqual(user, expectedUser, 'closest item');
});
test( "next item", function()
{
    var expectedUser    =   {
                                firstName   :   "Frank",
                                lastName    :   "Hamilton",
                                userName    :   "frank.hamilton"
                            };
    var user             =  $('.user:first-child').nextItem();

    deepEqual(user, expectedUser, 'next item');
});
test( "prev item", function()
{
    var expectedUser    =   {
                                firstName   :   "John",
                                lastName    :   "Smith",
                                userName    :   "john.smith"
                            };
    var user             =  $('.user:nth-child(2)').prevItem();

    deepEqual(user, expectedUser, 'prev item');
});