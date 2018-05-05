var chai = require('chai');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var expect = chai.expect;
var until = webdriver.until;
var By = webdriver.By;

var driver;
var mochaTimeOut = 30000;

var pageSelector;
var noBikes;

test.describe('Add bike page', function() {
    this.timeout(mochaTimeOut);
    test.before( function() {
        driver = new webdriver.Builder()
            .withCapabilities( webdriver.Capabilities.chrome() )
            .build();
        pageSelector = By.id('addbike');
        driver.get('http://localhost:3000/#/bikes');
        driver.wait(until.elementLocated(By.tagName('h1')), 2000);
        driver.findElements(By.id('bikes'))
            .then( function( donations ) {
                noBikes = donations.length;
            });
    } );
    test.beforeEach( function() {
        driver.get('http://localhost:3000/#/addbike');
        driver.wait(until.elementLocated(pageSelector), 2000);
    } );
    test.it( 'shows the main header', function() {
        driver.findElement(By.tagName('h1')).then( function( element ) {
            element.getText().then(function(text) {
                expect(text).to.contain('Donate a bike');
            });
        });
    } );


    test.it( 'accepts bike and displays bike in list', function() {
        var select = driver.findElement(By.id('type'));
        select.then( function( element ) {
            return element.findElements(By.tagName('option'));
        })
            .then(function(elements) {
                elements[1].click();
            } )
            .then(function() {
                return driver.findElement(By.id('brand'));
            })
            .then(function(element) {
                element.clear();
                return element;
            } )
            .then(function(element) {
                element.sendKeys('zz Acceptance');
            } )
            .then(function(){
                return driver.findElement(By.id('year'));
            })
            .then(function(element){
                element.clear();
                return element;
            })
            .then(function(element){
                element.sendKeys('1900')
            })
            .then(function() {
                return driver.findElement(By.id('donatebtn'));
            })
            .then(function(element) {
                element.submit();
            } )
            .then(function() {
                driver.wait(until.elementLocated(By.id('bikes')), 20000);
                return driver.findElements(By.id('bikes'));
            })
            .then( function( bikes ) {
                expect(bikes.length).to.equal(noBikes + 1) ;
                return bikes;
            })
            .then( function( bikes ) {
                return bikes[noBikes].findElement(By.name('bikeheader'));
            })
            .then(function(element) {
                return element.getText();
            })
            .then(function(text) {
                expect(text).to.equal('zz Acceptance');
            } );
    } );

    test.afterEach( function() {
        driver.manage().deleteAllCookies() ;
    } );

    test.after(function() {
        driver.quit();
    });
});


