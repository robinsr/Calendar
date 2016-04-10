<items>
    <item each={ items } data={ this } />

    <script>
        this.items = opts.items;

        this.on( 'update', function () {
        } )
    </script>
</items>