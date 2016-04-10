<days>
    <day each={ days } data={ this } />
    
    <script>
    this.mixin( 'dayCalc' );
    this.days = this.getDays( opts.iso );

    this.on( 'update', function () {
        this.days = this.getDays( opts.iso );
    } );
    </script>
</days>