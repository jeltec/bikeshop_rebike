# Assignment - Web Application.

Name: Jelte Crabbé

Student No.:  20078727

## Overview.

Description

ReBike Bikeshop is a charity in which people can rent or buy a bike and donate it back when they don't need it anymore. Those who do not have a bike to donate, can always donate some money for a good cause.
The webapp is divided in 2, one is checking all the donated bikes and adding a bike, the other is checking all the money donated an donating some money yourself.

On the donations page, you can see the total amount of money already donated and the separate donations.
You can filter on paymenttype PayPal or Direct or you can push the 'All' button again to show all donations.
If you click on a donation (text), you can edit it my filling in the form. Once submitted, you are redirected to the donations page and the donation is updated.
If you click on the 'X' button (delete), the donation gets deleted and isn't shown on the donations overview.

On the bikes page, you can see all the donated bikes in a separate card.
You can filter on all bikes, road bikes, bmx bikes, city bikes or mountain bikes and these types will be shown.
If you click on 'like(s)' button, the amount of likes gets updated and the bike with the most likes will be shown first (filtered on likes).
If you click on 'show' button, this specific bike will open on a new page on which you can check this specific bike out.
If you click on the 'X' button (delete), the bike gets deleted and isn't shown on the bikes overview.

All data will be stored in the MongoDB bikesdb and donationsdb in following schemas:

var bikeSchema = new mongoose.Schema({
    year: Number,
    type: String,
    brand: String,
    users: {type: Number, default: 0},
    gender: String
});

var DonationSchema = new mongoose.Schema({
    paymenttype: String,
    amount: Number,
    upvotes: {type: Number, default: 0}
});

For the design I used bootstrap material design found on: https://fezvrasta.github.io/bootstrap-material-design/

Link to git repo: https://github.com/jeltec/bikeshop_rebike

## Acceptance Testing.

MacBook-Pro-Jelte:bikeshop jelte$ npm run acceptance

> Bikeshop@0.0.0 acceptance /Users/jelte/Downloads/bikeshop
> cross-env NODE_ENV=test PORT=4000 mocha test/acceptance/



  Add bike page
    ✓ shows the main header (56ms)
    ✓ accepts bike and displays bike in list (570ms)

  Bikes page
    ✓ shows the main header (45ms)
    ✓ shows the title (41ms)
    ✓ displays the bikes (102ms)

  Donate page
    ✓ shows the main header
    ✓ accepts donation and displays donation in list (836ms)

  Donations page
    ✓ shows the main header (66ms)
    ✓ displays the donations


  9 passing (11s)


