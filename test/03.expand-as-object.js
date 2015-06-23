describe('expand as object', function () {

    it('should expand border shorthand with a flag', function () {
        SC.expand('border', '1px solid red', false)
            .should.eql({
                'border-width': '1px',
                'border-style': 'solid',
                'border-color': 'red'
            });
    });

    it('should expand border shorthand', function () {
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

    it('should expand border-radius shorthand', function () {
        SC.expand('border-radius', '0px 4em 3px')
            .should.eql({
                'border-top-left-radius': '0px',
                'border-top-right-radius': '4em',
                'border-bottom-right-radius': '3px',
                'border-bottom-left-radius': '4em',
            });
    });

});
