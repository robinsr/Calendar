<day>
    <div class="dateHolder">{ iso }</div>
    <item each={ items } data={ this } />

    <script>
        this.items = opts.data.items
    </script>
</day>