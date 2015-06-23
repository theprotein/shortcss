describe('expand', function () {

    it('should expand shorthand to an array', function () {
        SC.expand('list-style')
            .should.eql([
                'list-style-type',
                'list-style-position',
                'list-style-image'
            ]);
    });

    it('should expand non-shorthand props as themselves in an array', function () {
        SC.expand('color').should.eql(['color']);
    });

    it('should return an array with all scalar props as array', function () {
        SC.expand('border')
            .should.eql([
                'border-top-width',
                'border-right-width',
                'border-bottom-width',
                'border-left-width',
                'border-top-style',
                'border-right-style',
                'border-bottom-style',
                'border-left-style',
                'border-top-color',
                'border-right-color',
                'border-bottom-color',
                'border-left-color'
            ]);
    });

    it('should return an array with scalar properties as array by middle', function () {
        SC.expand('border-width')
            .should.eql([
                'border-top-width',
                'border-right-width',
                'border-bottom-width',
                'border-left-width'
            ]);
    });

    it('should return shorthands for border shorthand property without recursive flag', function () {
        SC.expand('border', false)
            .should.eql(['border-width', 'border-style', 'border-color']);
    });

});
