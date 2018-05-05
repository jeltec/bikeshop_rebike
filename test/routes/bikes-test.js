var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
chai.use(chaiHttp);
var _ = require('lodash' );
chai.use(require('chai-things'));
describe('Bikes', function (){
    beforeEach(function(){
        //before each test block, empty the database and refill it with 2 bike objects.
        var bike = {
            year: 2008,
            type: 'Road bike',
            brand: 'CHAI TESTING',
            users: 0,
            gender: 'W'};
        chai.request(server)
            .post('/bikes')
            .send(bike)
    describe('GET /', function () {
        it('should return the homepage', function(done) {
            chai.request(server)
                .get('/')
                .end(function(err, res) {
                    chai.expect(res).to.have.status(200);
                    done();
                });

        });
    });
    describe.only('GET /bikes', function () {
        it('should return an array with all bikes', function(done) {
            chai.request(server)
                .get('/bikes')
                .end(function(err, res) {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a('array');
                    chai.expect(res.body.length).to.equal(1);
                    var result = _.map(res.body, function (bike) {
                        return { id: bike.id,
                            year: bike.year };
                    });
                    chai.expect(result).to.include( { brand: 'CHAI TESTING', year: 2008  } );
                    done();
                });

        });
    });

    describe('GET /bikes/:id', function () {
        /*it('should return one bike with the right id', function(done) {
        chai.request(server)
            .get('/bikes/1000000')
            .end(function(err, res) {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.a('array');
                chai.expect(res.body.length).to.equal(1);
                var result = _.map(res.body, function (bike) {
                    return { id: bike.id,
                        year: bike.year };
                });
                chai.expect(result).to.include( { id: 1000000, year: 2002  } );
                done();
            });
        });*/
        it('should return a 404 status and message for invalid bike id', function(done) {
            chai.request(server)
                .get('/bikes/1100001')
                .end(function(err, res) {
                    chai.expect(res).to.have.status(404);
                    chai.expect(res.body).to.have.property('message').equal('Invalid Bike Id!' ) ;
                    done();
                });
        });
    });
    describe('POST /bikes', function () {
        it('should return confirmation message and update database', function(done) {
            var bike = {
                year: 2008,
                type: 'Road bike',
                brand: 'CHAI TESTING',
                users: 0,
                gender: 'W'};
            chai.request(server)
                .post('/bikes')
                .send(bike)
                .end(function(err, res) {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.have.property('message').equal('Bike Added!' ) ;
                    done();
                });
            after(function (done) {
                chai.request(server)
                    .get('/bikes')
                    .end(function(err, res) {
                        var result = _.map(res.body, function (bike) {
                            return {
                                year: bike.year
                            };
                        } );
                        chai.expect(result).to.include( {
                            year: 2008
                        } );
                        done();
                    });
            });
        });
    });
    describe('PUT /bikes/:id/users', function () {
        it('should return all bikes with users of specified bike incremented', function(done) {
            chai.request(server)
                .put('/bikes/1000001/users')
                .end(function(err, res) {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).be.be.a('array');
                    var result = _.map(res.body, function (bike) {
                        return { id: bike.id,
                            users: bike.users };
                    }  );
                    chai.expect(result).to.include( { id: 1000001, users: 2  } );
                    done();
                });
        });
        it('should return a 404 status and message for invalid bike id', function(done) {
            chai.request(server)
                .put('/bikes/1100001/users')
                .end(function(err, res) {
                    chai.expect(res).to.have.status(404);
                    chai.expect(res.body).to.have.property('message').equal('Invalid Bike Id!' ) ;
                    done();
                });
        });
    });
    describe('DELETE /bikes/:id', function(){
        it('should not return the deleted bike', function(done) {
            chai.request(server)
                .delete('/bikes/1000001')
                .end(function(err, res) {
                    chai.expect(res).to.have.status(200);
                    done();
                });
            after(function (done) {
                chai.request(server) .get('/bikes')
                    .end(function(err, res) {
                        var result = _.map(res.body, function (bike) {
                            return {
                                id: bike.id, year: bike.year
                            };
                        } );
                        chai.expect(result).to.not.include( {
                            id:1000001 , year: 1999
                        } );
                        chai.expect(result).to.include( {
                            id: 1000000, year: 2002
                        } );done();
                    });
            });
        });
        it('should return a 404 status and message for invalid bike id', function(done) {
            chai.request(server)
                .delete('/bikes/1100001')
                .end(function(err, res) {
                    chai.expect(res).to.have.status(404);
                    chai.expect(res.body).to.have.property('message').equal('Invalid Bike Id!' ) ;
                    done();
                });
        });
    });
});})
