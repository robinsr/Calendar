<calendar>
    <div class="calender-header">
        <button onclick={ goDown }>Button Left</button>
        <p>{ monthname }, { yearname }</p>
        <button onclick={ goUp }>>Button Right</button>
    </div>
    <div class="calendar-body">
        <days moment={ moment }/>
    </div>
    <footer>
        <a href="/">Back to Demos</a>
        <a href="/">About</a>
    </footer>

    <script>
    var now = moment();

    this.monthname = moment( now ).format( 'MMMM' );
    this.yearname = moment( now ).format( 'YYYY' );
    this.moment = now.toISOString();

    goUp () {
        now.add( 1, 'month' )
        this.monthname = now.format( 'MMMM' );
        this.yearname = now.format( 'YYYY' );
    }

    goDown () {
        now.subtract( 1, 'month' )
        this.monthname = now.format( 'MMMM' );
        this.yearname = now.format( 'YYYY' );
    }
    </script>
</calendar>
