describe('isShorthand', function () {

    it('should return true for border shorthands', function () {
        SC.isShorthand('border').should.be.true;
        SC.isShorthand('border-image').should.be.true;
        SC.isShorthand('border-radius').should.be.true;
        SC.isShorthand('border-left').should.be.true;
        SC.isShorthand('border-style').should.be.true;
    });

    it('should return false for border final (scalar) properties', function () {
        SC.isShorthand('border-bottom-left-radius').should.be.false;
        SC.isShorthand('border-image-repeat').should.be.false;
        SC.isShorthand('border-left-width').should.be.false;
        SC.isShorthand('border-spacing').should.be.false;
        SC.isShorthand('border-left-style').should.be.false;
    });

});
