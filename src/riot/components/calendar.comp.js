<calendar>
    <div class="calender-header">
        <button onclick={ goUp }>Button Left</button>
        <p>{ opts.monthname }, { opts.yearname }</p>
        <button onclick={ goDown }>>Button Right</button>
    </div>
    <div class="calendar-body">
        
    </div>
    <footer>
        <a href="/">Back to Demos</a>
        <a href="/">About</a>
    </footer>

    <script>
    opts.monthname = 0;
    opts.yearname = "year"

    goUp () {
        opts.monthname++;
    }

    goDown () {
        opts.monthname--;
    }
    </script>
</calendar>
