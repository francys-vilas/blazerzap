const express = require('express')
const app = express();
const axios = require('axios')

app.set('view engine','ejs')

app.get("/",function(req,res){
    var msg = "Proteja seus dados com tecnologia de criptografia e monitoramento contínuo."
    res.render("index",{
        nome: msg
    })
})

app.get("/teste",function(req,res){
var parametro = req.query["canal"]
res.send(parametro)
    
})

async function updateBitcoinPrice() {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'bitcoin',
          vs_currencies: 'usd'
        }
      })
      btcPrice = response?.data?.bitcoin?.usd || 'Preço não encontrado'
      console.log(`Preço atualizado do Bitcoin: $${btcPrice}`)
    } catch (error) {
      console.error('Erro ao atualizar o preço do Bitcoin:', error.message)
    }
  }
  
  // Atualiza imediatamente e depois a cada 10s
  updateBitcoinPrice()
  setInterval(updateBitcoinPrice, 10000)
  
  // Endpoint que retorna o último preço salvo
  app.get("/btc", function(req, res) {
    res.send({ price: btcPrice })
  })

app.listen(4000,function(erro){
    if(erro){
        console.log('Ocorreu um erro')
    } else {
        console.log('Servidor rodando liso')
    }
})
