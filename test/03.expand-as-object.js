describe('expand as object', function () {

    it('should expand border shorthand with a value and flag to an object', function () {
        SC.expand('border', '1px solid red', false)
            .should.eql({
                'border-width': '1px',
                'border-style': 'solid',
                'border-color': 'red'
            });
    });

    it('should expand border shorthand with a value to an object', function () {
        SC.expand('border', '1px solid red')
            .should.eql({
                'border-top-width': '1px',
                'border-right-width': '1px',
                'border-bottom-width': '1px',
                'border-left-width': '1px',
                'border-top-style': 'solid',
                'border-right-style': 'solid',
                'border-bottom-style': 'solid',
                'border-left-style': 'solid',
                'border-top-color': 'red',
                'border-right-color': 'red',
                'border-bottom-color': 'red',
                'border-left-color': 'red'
            });
    });

});
