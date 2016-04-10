<calendar>
    <calendar-header>
        <button onclick={ goDown }>Button Left</button>
        <calendar-title>{ monthname }, { yearname }</calendar-title>
        <button onclick={ goUp }>>Button Right</button>
    </calendar-header>
    <calendar-body>
        <day each={ days } data={ this } />
    </calendar-body>
    <footer>
        <a href="/">Back to Demos</a>
        <a href="/">About</a>
    </footer>

    <script>
    this.mixin( 'days' );

    var now = moment();

    this.monthname = moment( now ).format( 'MMMM' );
    this.yearname = moment( now ).format( 'YYYY' );
    this.days = this.getDays( now.toISOString(), opts.items );

    goUp () {
        now.add( 1, 'month' )
        this.monthname = now.format( 'MMMM' );
        this.yearname = now.format( 'YYYY' );
        this.days = this.getDays( now.toISOString(), opts.items );
    }

    goDown () {
        now.subtract( 1, 'month' )
        this.monthname = now.format( 'MMMM' );
        this.yearname = now.format( 'YYYY' );
        this.days = this.getDays( now.toISOString(), opts.items );
    }
    </script>
</calendar>
