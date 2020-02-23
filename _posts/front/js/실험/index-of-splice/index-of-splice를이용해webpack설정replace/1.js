extend( config, ctx ) {
  //console.log( 'xxxxxxxxxxxxxxx config', config )
  //config.resolve.alias['@']
  if ( config.module && config.module.rules ) {
    const rule = config.module.rules.find( ( r ) => {
      if ( r && r.test ) {
        console.log( r.test.toString() )

        var regex = RegExp( '(png|jpe?g|gif|svg|webp)' )
        console.log( regex.test( r.test.toString() ) )

        if ( regex.test( r.test.toString() ) ) {
          return r
        }

        //r.test.toString() === '/.(png|jpe?g|gif|svg|webp)$/i'
        //console.log( r.test.toString() === '/.(png|jpe?g|gif|svg|webp)$/i' )

        ///\.(png|jpe?g|gif|svg|webp)$/i === '/\\.(png|jpe?g|gif|svg|webp)$/i'
      }
    } )
    if ( rule ) {
      console.log( 'KKKKKKKKKKK rule', rule )
      console.log(
        'KKKKKKKKKKK config.module.rules.indexOf( rule )',
        config.module.rules.indexOf( rule )
      )
      config.module.rules.splice( config.module.rules.indexOf( rule ), 1 )
    }

    console.log( 'IIIIIIIIIIIII config.module.rules', config.module.rules )

    /*
    const urlLoader = config.module.rules.find( ( rule, index ) => {
      console.log( 'this index', index )
      if ( rule && rule.use && rule.use.loader ) {
        //console.log( 'rule:', rule['test'] )
        console.log( 'rule2:', rule )
        return rule.loader === 'url-loader'
      }
    } )
    console.log( 'kkkkkkkkkkkkkkk urlLoader', urlLoader )
    if ( urlLoader ) {
      urlLoader.exclude = /(png|jpe?g|gif|svg)/
      console.log( 'yyyyyyyyyyyyyyy urlLoader', urlLoader )
    }*/

    config.module.rules.push( {
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      loader: 'url-loader',
      options: {
        limit: 4096,
        name: '[path][name].[ext]'
      }
    } )
  }
  //console.log( 'yyyyyyyyyyyyyyy config', config )
}