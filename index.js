  const fse = require('fs-extra')

  const sourcebase = `./node_modules/djs-template-gen/slash`;
  const sourcedestino = `./`;
  
  const sourcebase1 = `./node_modules/djs-template-gen/prefix`;
  const sourcedestino1 = `./`;
                                   
   // fse.readdir("", console.log)

  console.log("Digite o número da base que deseja criar \n1- slash\n2- comandos")
  
  process.stdin.on('data', data => {
      if(data == 1){
        try {
          fse.copySync(sourcebase, sourcedestino, { overwrite: true|false })
          console.log('Bot foi enviado para a pasta `src`')
        } catch (err) {
          console.error(err)
        }
          process.exit();
      } else if(data == 2){
        fse.copySync(sourcebase1, sourcedestino1, { overwrite: true|false })
        console.log('Bot foi enviado para a pasta `src`')
          process.exit();
      } else {
          console.log("Digite apenas os numeros possíveis")
      }
    
  });




