var items = require( '../../common/items.json' );
var fs    = require( 'fs' );
var path  = require( 'path' );


var folders = {}

items.forEach( function ( item ) {

  var _dateParts = item.date.split( '/' );

  var year = _dateParts[2];
  var month = _dateParts[0];

  if ( !folders[ year ] ) {
    folders[ year ] = {};
  }

  if ( !folders[ year ][ month ] ) {
    folders[ year ][ month ] = [];
  }

  folders[ year ][ month ].push( item );
} )

var years = Object.keys( folders )

years.forEach( function ( year ) {

  var rootPath = path.join( __dirname, year );

  if ( !fs.existsSync( rootPath ) ) {
    fs.mkdirSync( rootPath );
  }


  var months = Object.keys( folders[ year ] );

  months.forEach( function ( month ) {

    var filepath = path.join( rootPath, month + '.json' );

    console.log(filepath)

    fs.writeFileSync( filepath, JSON.stringify( folders[ year ][ month ] ) )

  } )
} )

