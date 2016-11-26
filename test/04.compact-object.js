describe('compact object', function () {
    it('should compact an Array of props', function () {
        SC.compact([
            'border-top-left-radius',
            'border-top-right-radius',
            'border-bottom-right-radius',
            'border-bottom-left-radius'
        ]).should.eql('border-radius');
    });
});
