describe('compact object', function () {

    it('should compact an Array of props', function () {
        SC.compact([
            'border-top-left-radius',
            'border-top-right-radius',
            'border-bottom-right-radius',
            'border-bottom-left-radius'
        ]).should.eql('border-radius');
    });

    describe('for border-radius properties', function () {

        it('should compact them with 1 value', function () {
            SC.compact({
                'border-top-left-radius': '9px',
                'border-top-right-radius': '9px',
                'border-bottom-right-radius': '9px',
                'border-bottom-left-radius': '9px',
            }).should.eql({
                'border-radius': '9px',
            });
        });

        it('should compact them partially', function () {
            SC.compact({
                'border-top-left-radius': '9px',
                'border-bottom-left-radius': '9px',
            }).should.eql({
                'border-radius': '9px none none 9px',
            });
        });

        it('should compact them with 2 different values', function () {
            SC.compact({
                'border-top-left-radius': '9px',
                'border-top-right-radius': '12px',
                'border-bottom-right-radius': '9px',
                'border-bottom-left-radius': '12px',
            }).should.eql({
                'border-radius': '9px 12px',
            });
        });

        it('should compact them with 3 different values', function () {
            SC.compact({
                'border-top-right-radius': '5px',
                'border-bottom-right-radius': '10px',
                'border-bottom-left-radius': '5px',
            }).should.eql({
                'border-radius': 'none 5px 10px',
            });
        });

    });

    describe('simplification of the same value', function () {

        it('should simplify border-width value', function () {
            SC.compact({
                'border-width': '2px 2px 2px',
            }).should.eql({
                'border-width': '2px',
            });
        });

        it('should simplify more complex border-width to 2 values', function () {
            SC.compact({
                'border-width': '0px 5px 0px 5px',
            }).should.eql({
                'border-width': '0px 5px',
            });
        });

        it('should strip the last border-radius value to 3 values', function () {
            SC.compact({
                'border-radius': '0px 5px 10px 5px',
            }).should.eql({
                'border-radius': '0px 5px 10px',
            });
        });

    });

});
