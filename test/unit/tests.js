
test( "item", function()
{
    var expectedUser    =   getUsers()[0];
    var user            =   $('.user:first-child').item();

    deepEqual(user, expectedUser, 'item user');
});
test( "items", function()
{
    var expectedUsers   =  getUsers();
    var users           =  $('.user').items();

    deepEqual(users, expectedUsers, 'items users');
});
test( "item value", function()
{
    var expectedUser    =   getUsers()[0];
    var expectedValue   =   expectedUser.firstName;
    var value           =   $('.user:first-child').find('.first-name').itemValue();

   equal(value, expectedValue, 'items value');
});
test( "is item", function()
{
    var isItem          =   $('.user:first-child').find('.address').isItem();

    ok(isItem, 'is item');
});
test( "is item prop", function()
{
    var isItemprop      =  $('.user:first-child').find('.first-name').isItemprop();

    ok(isItemprop, 'is item prop');
});
test( "closest item", function()
{
    var expectedUser    = getUsers()[0];
    var user            = $('.user:first-child').find('.first-name').closestItem();

    deepEqual(user, expectedUser, 'closest item');
});
test( "next item", function()
{
    var expectedUser    =   getUsers()[1];
    var user            =  $('.user:first-child').nextItem();

    deepEqual(user, expectedUser, 'next item');
});
test( "prev item", function()
{
    var expectedUser    =   getUsers()[0];
    var user            =  $('.user:nth-child(2)').prevItem();

    deepEqual(user, expectedUser, 'prev item');
});
test( "find item", function()
{
    var expectedUser    =   getUsers()[0];
    var user            =  $('.users').findItem(1);

    deepEqual(user, expectedUser, 'find item');
});

var getUsers    =   function()
                    {
                        var users    =   [ 
                                                        {
                                                            firstName   :   "John",
                                                            lastName    :   "Smith",
                                                            userName    :   "john.smith",
                                                            address     :   {
                                                                                address1: "28 Mary Ann St",
                                                                                city    : "Newnan",
                                                                                state   : "GA",
                                                                                zip     : "30263-2446"
                                                                            },
                                                            comments    :   [
                                                                                {
                                                                                    text    : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                                                                                    date    : "12/11/2013",
                                                                                },
                                                                                {
                                                                                    text    : "Suspendisse hendrerit risus sit amet arcu varius consectetur.",
                                                                                    date    : "12/12/2013",
                                                                                }
                                                                            ]
                                                        },
                                                        { 
                                                            firstName   :   "Frank",
                                                            lastName    :   "Hamilton",
                                                            userName    :   "frank.hamilton",
                                                            address     :   {
                                                                                address1: "49 Chickasaw Bluff Rd",
                                                                                city    : "Benton",
                                                                                state   : "KY",
                                                                                zip     : "42025-0000"
                                                                            },
                                                            comments    :   [
                                                                                {
                                                                                    text    : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                                                                                    date    : "12/11/2013",
                                                                                },
                                                                                {
                                                                                    text    : "Suspendisse hendrerit risus sit amet arcu varius consectetur.",
                                                                                    date    : "12/12/2013",
                                                                                }
                                                                            ]
                                                        }
                                                    ];
                        return users;
                    };