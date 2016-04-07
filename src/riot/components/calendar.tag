<calendar>
    <div class="calender-header">
        <button onclick={ goDown }>Button Left</button>
        <p>{ opts.monthname }, { opts.yearname }</p>
        <button onclick={ goUp }>>Button Right</button>
    </div>
    <div class="calendar-body">
        
    </div>
    <footer>
        <a href="/">Back to Demos</a>
        <a href="/">About</a>
    </footer>

    <script>
    var now = moment();

    opts.monthname = moment( now ).format( 'MMMM' );
    opts.yearname = moment( now ).format( 'YYYY' );

    goUp () {
        now.add( 1, 'month' )
        opts.monthname = now.format( 'MMMM' );
        opts.yearname = now.format( 'YYYY' );
    }

    goDown () {
        now.subtract( 1, 'month' )
        opts.monthname = now.format( 'MMMM' );
        opts.yearname = now.format( 'YYYY' );
    }
    </script>
</calendar>
