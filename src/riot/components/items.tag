<items>
    <item each={ items } data={ this } />

    <script>
        this.mixin( 'data' );

        this.items = [];

        var self = this;

        this.getData( opts.date )
        .then( function ( items ) {
            self.items = items;
            self.update();
        } );
    </script>
</items>