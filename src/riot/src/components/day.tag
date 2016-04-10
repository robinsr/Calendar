<day class="{ isThisMonth ? 'this-month' : 'other-month' }">
    <div class="dateHolder">{ prettyDate }</div>
    <item each={ items } data={ this } />

    <script>
        this.prettyDate = moment( opts.data.iso ).format( 'DD' );
        this.items = opts.data.items;
        this.isThisMonth = opts.data.isInMonthRange;
    </script>

    <style scoped>
        :scope {
            display: inline-block;
            border-radius: 3px;
            border-bottom-right-radius: 0px;
            vertical-align: top;
            width:134px;
            background-color: #777;
            max-height: 80px;
            overflow: hidden;
            height: 80px;
            font-size: 12px;
            box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5);
        }

        :scope.this-month {
            background-color: #efe0a5;
        }

    </style>
</day>