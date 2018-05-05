var chai = require('chai');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var expect = chai.expect;
var until = webdriver.until;
var By = webdriver.By;

var driver;
var mochaTimeOut = 30000;

var pageSelector;
var noDonations;

test.describe('Donate page', function() {
    this.timeout(mochaTimeOut);
    test.before( function() {
        driver = new webdriver.Builder()
            .withCapabilities( webdriver.Capabilities.chrome() )
            .build();
        pageSelector = By.id('donate'); 
        driver.get('http://localhost:3000/#/donations');
        driver.wait(until.elementLocated(By.tagName('h1')), 2000);
        driver.findElements(By.id('donations'))
            .then( function( donations ) {
                noDonations = donations.length;
            });
    } );
    test.beforeEach( function() {
        driver.get('http://localhost:3000/#/donate');
        driver.wait(until.elementLocated(pageSelector), 2000);
    } );
    test.it( 'shows the main header', function() {
        driver.findElement(By.tagName('h1')).then( function( element ) {
            element.getText().then(function(text) {
                expect(text).to.contain('Donate money for a good cause');
            });
        });
    } );


    test.it( 'accepts donation and displays donation in list', function() {
        var select = driver.findElement(By.tagName('select'));
        select.then( function( element ) {
            return element.findElements(By.tagName('option'));
        })
            .then(function(elements) {
                elements[1].click();
            } )
            .then(function() {
                return driver.findElement(By.tagName('input'));
            })
            .then(function(element) {
                element.clear();
                return element;
            } )            
            .then(function(element) {
                element.sendKeys('789');
            } )
            .then(function() {
                return driver.findElement(By.id('donatebtn'));
            })
            .then(function(element) {
                element.submit();
            } ) 
            .then(function() {
                driver.wait(until.elementLocated(By.id('donations')), 20000);
                return driver.findElements(By.id('donations'));
            })
            .then( function( bikes ) {
                expect(bikes.length).to.equal(noDonations + 1) ;
                return bikes;
            })
            .then( function( bikes ) {
                return bikes[noDonations].findElement(By.name('payment'));
            })
            .then(function(element) {
                return element.getText();
            })
            .then(function(text) {
                expect(text).to.equal('Direct');
            } );
    } );

    test.afterEach( function() {
        driver.manage().deleteAllCookies() ;
    } );
 
    test.after(function() {
        driver.quit();
    });
});


